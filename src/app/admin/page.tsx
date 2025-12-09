"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Calendar,
  DollarSign,
  Package,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from 'lucide-react';
import type { BookingWithProduct, BookingStatus, PaymentStatus } from '@/types/booking.types';

interface DashboardStats {
  totalBookings: number;
  confirmedBookings: number;
  pendingBookings: number;
  totalRevenue: number;
  avgBookingValue: number;
  availableInventory: number;
  reservedInventory: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalBookings: 0,
    confirmedBookings: 0,
    pendingBookings: 0,
    totalRevenue: 0,
    avgBookingValue: 0,
    availableInventory: 0,
    reservedInventory: 0,
  });
  const [recentBookings, setRecentBookings] = useState<BookingWithProduct[]>([]);
  const [upcomingBookings, setUpcomingBookings] = useState<BookingWithProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    try {
      setLoading(true);

      // Fetch all bookings for stats
      const { data: bookings } = await supabase
        .from('bookings')
        .select('*')
        .gte('created_at', getThirtyDaysAgo());

      // Fetch recent bookings
      const { data: recent } = await supabase
        .from('bookings')
        .select(`
          *,
          products (
            id,
            name,
            slug,
            tier,
            images,
            base_price
          )
        `)
        .order('created_at', { ascending: false })
        .limit(5);

      // Fetch upcoming bookings
      const { data: upcoming } = await supabase
        .from('bookings')
        .select(`
          *,
          products (
            id,
            name,
            slug,
            tier,
            images,
            base_price
          )
        `)
        .gte('start_date', new Date().toISOString())
        .eq('status', 'confirmed')
        .order('start_date', { ascending: true })
        .limit(5);

      // Fetch inventory stats
      const { data: inventory } = await supabase
        .from('inventory')
        .select('available_quantity, reserved_quantity');

      // Calculate stats
      if (bookings) {
        const totalBookings = bookings.length;
        const confirmedBookings = bookings.filter((b: any) => b.status === 'confirmed').length;
        const pendingBookings = bookings.filter((b: any) => b.status === 'pending').length;
        const paidBookings = bookings.filter((b: any) => b.payment_status === 'paid');
        const totalRevenue = paidBookings.reduce((sum: number, b: any) => sum + b.total_amount, 0);
        const avgBookingValue = paidBookings.length > 0 ? totalRevenue / paidBookings.length : 0;

        setStats({
          totalBookings,
          confirmedBookings,
          pendingBookings,
          totalRevenue,
          avgBookingValue,
          availableInventory: inventory?.reduce((sum: number, inv: any) => sum + inv.available_quantity, 0) || 0,
          reservedInventory: inventory?.reduce((sum: number, inv: any) => sum + inv.reserved_quantity, 0) || 0,
        });
      }

      setRecentBookings(recent || []);
      setUpcomingBookings(upcoming || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }

  function getThirtyDaysAgo() {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    return date.toISOString();
  }

  const getStatusBadge = (status: BookingStatus) => {
    const variants: Record<BookingStatus, any> = {
      pending: 'warning',
      confirmed: 'info',
      in_progress: 'info',
      completed: 'success',
      cancelled: 'destructive',
      no_show: 'destructive',
      requires_action: 'warning',
    };
    return <Badge variant={variants[status]}>{status.replace('_', ' ')}</Badge>;
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-semibold text-zinc-900">Loading Dashboard...</div>
          <p className="mt-2 text-zinc-600">Please wait</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-zinc-900">Dashboard</h1>
        <p className="text-zinc-600">Welcome to Club Caddy Admin</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Bookings */}
        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500">Total Bookings</p>
              <p className="text-3xl font-bold text-zinc-900">{stats.totalBookings}</p>
              <p className="mt-1 text-xs text-zinc-500">Last 30 days</p>
            </div>
            <Calendar className="h-12 w-12 text-zinc-300" />
          </div>
        </div>

        {/* Total Revenue */}
        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500">Total Revenue</p>
              <p className="text-3xl font-bold text-green-600">
                ${stats.totalRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </p>
              <p className="mt-1 text-xs text-zinc-500">Last 30 days</p>
            </div>
            <DollarSign className="h-12 w-12 text-green-200" />
          </div>
        </div>

        {/* Available Inventory */}
        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500">Available Carts</p>
              <p className="text-3xl font-bold text-blue-600">{stats.availableInventory}</p>
              <p className="mt-1 text-xs text-zinc-500">
                {stats.reservedInventory} reserved
              </p>
            </div>
            <Package className="h-12 w-12 text-blue-200" />
          </div>
        </div>

        {/* Avg Booking Value */}
        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500">Avg Booking</p>
              <p className="text-3xl font-bold text-rose-800">
                ${stats.avgBookingValue.toFixed(0)}
              </p>
              <p className="mt-1 text-xs text-zinc-500">Per booking</p>
            </div>
            <TrendingUp className="h-12 w-12 text-rose-200" />
          </div>
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="flex items-center space-x-3 rounded-lg bg-white p-4 shadow">
          <CheckCircle className="h-8 w-8 text-green-600" />
          <div>
            <p className="text-sm text-zinc-500">Confirmed</p>
            <p className="text-2xl font-bold text-zinc-900">{stats.confirmedBookings}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 rounded-lg bg-white p-4 shadow">
          <Clock className="h-8 w-8 text-amber-600" />
          <div>
            <p className="text-sm text-zinc-500">Pending</p>
            <p className="text-2xl font-bold text-zinc-900">{stats.pendingBookings}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 rounded-lg bg-white p-4 shadow">
          <Users className="h-8 w-8 text-blue-600" />
          <div>
            <p className="text-sm text-zinc-500">Customers</p>
            <p className="text-2xl font-bold text-zinc-900">
              {new Set(recentBookings.map((b) => b.customer_email)).size}
            </p>
          </div>
        </div>
      </div>

      {/* Pending Actions Alert */}
      {stats.pendingBookings > 0 && (
        <div className="rounded-lg bg-amber-50 border border-amber-200 p-4">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 mr-3" />
            <div className="flex-1">
              <h3 className="font-semibold text-amber-900">Action Required</h3>
              <p className="text-sm text-amber-700 mt-1">
                You have {stats.pendingBookings} pending booking{stats.pendingBookings > 1 ? 's' : ''} waiting for confirmation.
              </p>
              <Link href="/admin/bookings">
                <Button variant="outline" size="sm" className="mt-2">
                  View Pending Bookings
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Two Column Layout */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Bookings */}
        <div className="rounded-lg bg-white shadow">
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="text-lg font-semibold">Recent Bookings</h2>
            <Link href="/admin/bookings">
              <Button variant="ghost" size="sm">View All</Button>
            </Link>
          </div>
          {recentBookings.length === 0 ? (
            <div className="flex h-48 items-center justify-center text-zinc-500">
              No recent bookings
            </div>
          ) : (
            <div className="divide-y">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="p-4 hover:bg-zinc-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium">{booking.customer_name}</p>
                      <p className="text-sm text-zinc-500">
                        {booking.products.name} × {booking.quantity}
                      </p>
                      <p className="text-xs text-zinc-400 font-mono mt-1">
                        {booking.booking_number}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-zinc-900">
                        ${booking.total_amount.toFixed(2)}
                      </p>
                      <div className="mt-1">{getStatusBadge(booking.status)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming Bookings */}
        <div className="rounded-lg bg-white shadow">
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="text-lg font-semibold">Upcoming Rentals</h2>
            <Link href="/admin/bookings">
              <Button variant="ghost" size="sm">View All</Button>
            </Link>
          </div>
          {upcomingBookings.length === 0 ? (
            <div className="flex h-48 items-center justify-center text-zinc-500">
              No upcoming bookings
            </div>
          ) : (
            <div className="divide-y">
              {upcomingBookings.map((booking) => (
                <div key={booking.id} className="p-4 hover:bg-zinc-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium">{booking.customer_name}</p>
                      <p className="text-sm text-zinc-500">
                        {booking.products.name} × {booking.quantity}
                      </p>
                      <p className="text-xs text-zinc-600 mt-1">
                        {new Date(booking.start_date).toLocaleDateString()} - {new Date(booking.end_date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-zinc-900">
                        ${booking.total_amount.toFixed(2)}
                      </p>
                      <Badge variant="info" className="mt-1">
                        {Math.ceil((new Date(booking.start_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid gap-4 md:grid-cols-3">
        <Link href="/admin/bookings" className="group">
          <div className="rounded-lg bg-white p-6 shadow transition-all hover:shadow-lg">
            <Calendar className="h-8 w-8 text-rose-600 mb-3" />
            <h3 className="font-semibold text-zinc-900">Manage Bookings</h3>
            <p className="mt-1 text-sm text-zinc-600">
              View and manage all rental bookings
            </p>
          </div>
        </Link>

        <Link href="/admin/inventory" className="group">
          <div className="rounded-lg bg-white p-6 shadow transition-all hover:shadow-lg">
            <Package className="h-8 w-8 text-rose-600 mb-3" />
            <h3 className="font-semibold text-zinc-900">Inventory Control</h3>
            <p className="mt-1 text-sm text-zinc-600">
              Update quantities and availability
            </p>
          </div>
        </Link>

        <Link href="/admin/pricing" className="group">
          <div className="rounded-lg bg-white p-6 shadow transition-all hover:shadow-lg">
            <DollarSign className="h-8 w-8 text-rose-600 mb-3" />
            <h3 className="font-semibold text-zinc-900">Pricing Management</h3>
            <p className="mt-1 text-sm text-zinc-600">
              Adjust rental rates and pricing
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
