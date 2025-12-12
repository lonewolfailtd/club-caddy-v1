import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';
import type { UpdateBookingInput, BookingWithProduct } from '@/types/booking.types';
import { sanitizeError, sanitizeValidationError } from '@/lib/utils/error-handler';
import { logBookingAction, logAdminAction, getRequestMetadata } from '@/lib/security/audit-logger';

const updateSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show', 'requires_action']).optional(),
  payment_status: z.enum(['pending', 'processing', 'paid', 'failed', 'refunded', 'partially_refunded']).optional(),
  special_requests: z.string().optional(),
  admin_notes: z.string().optional(),
  cancellation_reason: z.string().optional(),
});

/**
 * GET /api/bookings/[id]
 * Retrieve booking details
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const bookingId = id;

    // Validate UUID
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(bookingId)) {
      return NextResponse.json(
        { error: 'Invalid booking ID format' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Get authenticated user (if any)
    const { data: { user } } = await supabase.auth.getUser();

    // Build query with authorization
    let query = supabase
      .from('bookings')
      .select(`
        *,
        products (
          id,
          name,
          slug,
          tier,
          images,
          base_price,
          category
        )
      `)
      .eq('id', bookingId);

    // If user is authenticated, apply authorization filters
    if (user) {
      // Check if user is admin
      const { data: profile } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', user.id)
        .single();

      // Non-admin users can only see their own bookings
      if (!profile?.is_admin) {
        query = query.or(`user_id.eq.${user.id},customer_email.eq.${user.email}`);
      }
      // Admins can see all bookings (no filter applied)
    } else {
      // Unauthenticated users cannot access booking details
      return NextResponse.json(
        { error: 'Authentication required to view booking details' },
        { status: 401 }
      );
    }

    const { data: booking, error } = await query.single<BookingWithProduct>();

    if (error) {
      const sanitized = sanitizeError(error, 'GET /api/bookings/[id]');
      return NextResponse.json(
        { error: sanitized.error },
        { status: sanitized.status }
      );
    }

    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ booking });
  } catch (error) {
    const sanitized = sanitizeError(error, 'GET /api/bookings/[id]');
    return NextResponse.json(
      { error: sanitized.error },
      { status: sanitized.status }
    );
  }
}

/**
 * PATCH /api/bookings/[id]
 * Update booking details (status, notes, cancellation, etc.)
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const bookingId = id;

    // Validate UUID
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(bookingId)) {
      return NextResponse.json(
        { error: 'Invalid booking ID format' },
        { status: 400 }
      );
    }

    const body: UpdateBookingInput = await request.json();

    // Validate request body
    const validationResult = updateSchema.safeParse(body);
    if (!validationResult.success) {
      const sanitized = sanitizeValidationError(validationResult.error);
      return NextResponse.json(
        {
          error: sanitized.error,
          ...(sanitized.fields && { fields: sanitized.fields })
        },
        { status: sanitized.status }
      );
    }

    const updates = validationResult.data;

    // If status is being set to cancelled, add timestamp
    if (updates.status === 'cancelled' && !updates.cancellation_reason) {
      updates.cancellation_reason = 'Cancelled by user';
    }

    const supabase = await createClient();

    // Get authenticated user
    const { data: { user } } = await supabase.auth.getUser();

    // Fetch old booking data for audit log
    const { data: oldBooking } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', bookingId)
      .single();

    // Prepare update object
    const updateData: any = { ...updates };

    // Add cancelled_at if status is cancelled
    if (updates.status === 'cancelled') {
      updateData.cancelled_at = new Date().toISOString();
    }

    // Update booking - cast to proper type for Supabase
    const { data: booking, error } = await (supabase
      .from('bookings') as any)
      .update(updateData)
      .eq('id', bookingId)
      .select()
      .single();

    if (error) {
      const sanitized = sanitizeError(error, 'PATCH /api/bookings/[id]');
      return NextResponse.json(
        { error: sanitized.error },
        { status: sanitized.status }
      );
    }

    // Log booking update
    await logBookingAction({
      action: 'update',
      booking,
      request,
      userId: user?.id,
      oldValues: oldBooking ? {
        status: oldBooking.status,
        payment_status: oldBooking.payment_status,
        special_requests: oldBooking.special_requests,
        admin_notes: oldBooking.admin_notes,
      } : undefined,
      success: true,
    });

    return NextResponse.json({
      booking,
      message: 'Booking updated successfully',
    });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    const sanitized = sanitizeError(error, 'PATCH /api/bookings/[id]');
    return NextResponse.json(
      { error: sanitized.error },
      { status: sanitized.status }
    );
  }
}

/**
 * DELETE /api/bookings/[id]
 * Cancel a booking (admin only)
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const bookingId = id;

    // Validate UUID
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(bookingId)) {
      return NextResponse.json(
        { error: 'Invalid booking ID format' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Check if user is admin
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', user.id)
      .single();

    if (!(profile as any)?.is_admin) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    // Fetch booking before cancellation for audit log
    const { data: oldBooking } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', bookingId)
      .single();

    // Instead of deleting, cancel the booking
    const { data: cancelledBooking, error } = await (supabase
      .from('bookings') as any)
      .update({
        status: 'cancelled',
        cancelled_at: new Date().toISOString(),
        cancellation_reason: 'Cancelled by admin',
      })
      .eq('id', bookingId)
      .select()
      .single();

    if (error) {
      const sanitized = sanitizeError(error, 'DELETE /api/bookings/[id]');
      return NextResponse.json(
        { error: sanitized.error },
        { status: sanitized.status }
      );
    }

    // Log admin cancellation
    await logAdminAction({
      action: 'delete',
      resourceType: 'booking',
      resourceId: bookingId,
      request,
      userId: user.id,
      userEmail: user.email || 'unknown',
      details: {
        booking_number: cancelledBooking?.booking_number || oldBooking?.booking_number,
        old_status: oldBooking?.status,
        new_status: 'cancelled',
        cancellation_reason: 'Cancelled by admin',
      },
    });

    return NextResponse.json({
      message: 'Booking cancelled successfully',
    });
  } catch (error) {
    const sanitized = sanitizeError(error, 'DELETE /api/bookings/[id]');
    return NextResponse.json(
      { error: sanitized.error },
      { status: sanitized.status }
    );
  }
}
