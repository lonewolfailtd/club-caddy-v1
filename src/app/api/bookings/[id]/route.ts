import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';
import type { UpdateBookingInput, BookingWithProduct } from '@/types/booking.types';

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

    const { data: booking, error } = await supabase
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
      .eq('id', bookingId)
      .single<BookingWithProduct>();

    if (error) {
      console.error('Booking fetch error:', error);

      // Check if it's a "not found" error
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Booking not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { error: 'Failed to retrieve booking' },
        { status: 500 }
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
    console.error('Booking retrieval error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
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
      return NextResponse.json(
        { error: 'Invalid request data', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const updates = validationResult.data;

    // If status is being set to cancelled, add timestamp
    if (updates.status === 'cancelled' && !updates.cancellation_reason) {
      updates.cancellation_reason = 'Cancelled by user';
    }

    const supabase = await createClient();

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
      console.error('Booking update error:', error);

      // Check if it's a "not found" error or permission denied
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Booking not found' },
          { status: 404 }
        );
      }

      if (error.code === '42501') {
        return NextResponse.json(
          { error: 'Permission denied' },
          { status: 403 }
        );
      }

      return NextResponse.json(
        { error: 'Failed to update booking' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      booking,
      message: 'Booking updated successfully',
    });
  } catch (error) {
    console.error('Booking update error:', error);

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
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

    // Instead of deleting, cancel the booking
    const { error } = await (supabase
      .from('bookings') as any)
      .update({
        status: 'cancelled',
        cancelled_at: new Date().toISOString(),
        cancellation_reason: 'Cancelled by admin',
      })
      .eq('id', bookingId);

    if (error) {
      console.error('Booking cancellation error:', error);
      return NextResponse.json(
        { error: 'Failed to cancel booking' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Booking cancelled successfully',
    });
  } catch (error) {
    console.error('Booking deletion error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
