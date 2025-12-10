import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * GET /api/admin/stats
 * Get dashboard statistics for admin
 */
export async function GET(request: NextRequest) {
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

    // Get date range from query params (default: last 30 days)
    const { searchParams } = new URL(request.url);
    const daysParam = searchParams.get('days') || '30';
    const days = parseInt(daysParam);

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Fetch bookings stats using the database function
    const { data: statsData, error: statsError } = await supabase.rpc(
      'get_booking_stats',
      // @ts-ignore - Supabase RPC type inference issue
      {
        p_start_date: startDate.toISOString(),
        p_end_date: new Date().toISOString(),
      }
    );

    if (statsError) {
      console.error('Stats fetch error:', statsError);
      throw statsError;
    }

    // Fetch inventory stats
    const { data: inventoryData, error: inventoryError } = await supabase
      .from('inventory')
      .select('total_quantity, available_quantity, reserved_quantity, maintenance_quantity');

    if (inventoryError) throw inventoryError;

    // Calculate inventory stats with proper typing
    const inventoryStats = inventoryData?.reduce(
      (acc, inv: any) => ({
        total: acc.total + (inv.total_quantity || 0),
        available: acc.available + (inv.available_quantity || 0),
        reserved: acc.reserved + (inv.reserved_quantity || 0),
        maintenance: acc.maintenance + (inv.maintenance_quantity || 0),
      }),
      { total: 0, available: 0, reserved: 0, maintenance: 0 }
    ) || { total: 0, available: 0, reserved: 0, maintenance: 0 };

    // Fetch recent bookings count by status
    const { data: statusCounts, error: statusError } = await supabase
      .from('bookings')
      .select('status')
      .gte('created_at', startDate.toISOString());

    if (statusError) throw statusError;

    const statusBreakdown = statusCounts?.reduce((acc: any, booking: any) => {
      acc[booking.status] = (acc[booking.status] || 0) + 1;
      return acc;
    }, {}) || {};

    return NextResponse.json({
      bookingStats: statsData?.[0] || {
        total_bookings: 0,
        confirmed_bookings: 0,
        cancelled_bookings: 0,
        total_revenue: 0,
        avg_booking_value: 0,
      },
      inventoryStats,
      statusBreakdown,
      dateRange: {
        start: startDate.toISOString(),
        end: new Date().toISOString(),
        days,
      },
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch admin statistics' },
      { status: 500 }
    );
  }
}
