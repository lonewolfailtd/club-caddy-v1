import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';

const updateInventorySchema = z.object({
  total_quantity: z.number().int().min(0),
  maintenance_quantity: z.number().int().min(0),
});

/**
 * PATCH /api/admin/inventory
 * Update inventory quantities (admin only)
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
    const validationResult = updateInventorySchema.safeParse(updates);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.issues[0].message },
        { status: 400 }
      );
    }

    // Get current inventory to calculate available quantity
    const { data: currentInventory, error: fetchError } = await supabase
      .from('inventory')
      .select('reserved_quantity')
      .eq('product_id', productId)
      .single();

    if (fetchError || !currentInventory) {
      return NextResponse.json(
        { error: 'Inventory not found' },
        { status: 404 }
      );
    }

    const { total_quantity, maintenance_quantity } = validationResult.data;
    const available_quantity =
      total_quantity - (currentInventory as any).reserved_quantity - maintenance_quantity;

    // Validate that available quantity is not negative
    if (available_quantity < 0) {
      return NextResponse.json(
        {
          error: 'Invalid quantities: Total must be >= Reserved + Maintenance',
        },
        { status: 400 }
      );
    }

    // Update inventory
    const { data: updatedInventory, error: updateError } = await supabase
      .from('inventory')
      // @ts-expect-error - Supabase type generation issue with inventory table
      .update({
        total_quantity,
        available_quantity,
        maintenance_quantity,
      })
      .eq('product_id', productId)
      .select()
      .single();

    if (updateError) {
      console.error('Inventory update error:', updateError);
      return NextResponse.json(
        { error: 'Failed to update inventory' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      inventory: updatedInventory,
      message: 'Inventory updated successfully',
    });
  } catch (error) {
    console.error('Inventory update error:', error);

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
