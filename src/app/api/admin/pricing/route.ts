import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';

const updatePricingSchema = z.object({
  hourly_rate: z.number().min(0).nullable().optional(),
  hourly_minimum_hours: z.number().int().min(1).max(24).optional(),
  daily_rate: z.number().min(0).nullable().optional(),
  weekly_rate: z.number().min(0).nullable().optional(),
  monthly_rate: z.number().min(0).nullable().optional(),
  deposit_amount: z.number().min(0).optional(),
  active: z.boolean().optional(),
});

/**
 * PATCH /api/admin/pricing
 * Update rental pricing (admin only)
 */
export async function PATCH(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Check authentication
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Check if user is admin
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

    const body = await request.json();
    const { productId, ...updates } = body;

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    // Validate update data
    const validationResult = updatePricingSchema.safeParse(updates);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: (validationResult.error as any).errors[0].message },
        { status: 400 }
      );
    }

    // Update pricing
    const { data: updatedPricing, error: updateError } = await supabase
      .from('rental_pricing')
      // @ts-ignore - Supabase type inference issue with rental_pricing table
      .update(validationResult.data)
      .eq('product_id', productId)
      .select()
      .single();

    if (updateError) {
      console.error('Pricing update error:', updateError);

      if (updateError.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Pricing record not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { error: 'Failed to update pricing' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      pricing: updatedPricing,
      message: 'Pricing updated successfully',
    });
  } catch (error) {
    console.error('Pricing update error:', error);

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
 * POST /api/admin/pricing/toggle-rental
 * Toggle rental_enabled for a product (admin only)
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Check authentication
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Check if user is admin
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

    const { productId, enabled } = await request.json();

    if (!productId || typeof enabled !== 'boolean') {
      return NextResponse.json(
        { error: 'Product ID and enabled status are required' },
        { status: 400 }
      );
    }

    // Update product rental_enabled
    const { error: updateError } = await supabase
      .from('products')
      // @ts-ignore - Supabase type inference issue with products table
      .update({ rental_enabled: enabled })
      .eq('id', productId);

    if (updateError) {
      console.error('Rental toggle error:', updateError);
      return NextResponse.json(
        { error: 'Failed to update rental status' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: `Rental ${enabled ? 'enabled' : 'disabled'} successfully`,
    });
  } catch (error) {
    console.error('Rental toggle error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
