"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Calendar,
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  MoreVertical,
  List,
  CalendarDays,
} from 'lucide-react';
import type { BookingWithProduct, BookingStatus, PaymentStatus } from '@/types/booking.types';

export default function BookingsPage() {
  const [bookings, setBookings] = useState<BookingWithProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [paymentFilter, setPaymentFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [selectedBooking, setSelectedBooking] = useState<BookingWithProduct | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');

  const supabase = createClient();

  useEffect(() => {
    fetchBookings();
  }, [statusFilter, paymentFilter]);

  async function fetchBookings() {
    try {
      setLoading(true);

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
            base_price
          )
        `)
        .order('created_at', { ascending: false });

      // Apply filters
      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }
      if (paymentFilter !== 'all') {
        query = query.eq('payment_status', paymentFilter);
      }

      const { data, error } = await query;

      if (error) throw error;

      setBookings(data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  }

  async function updateBookingStatus(bookingId: string, status: BookingStatus) {
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) throw new Error('Failed to update booking');

      await fetchBookings();
      setShowDetailsDialog(false);
    } catch (error) {
      console.error('Error updating booking:', error);
      alert('Failed to update booking');
    }
  }

  async function saveAdminNotes() {
    if (!selectedBooking) return;

    try {
      const response = await fetch(`/api/bookings/${selectedBooking.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ admin_notes: adminNotes }),
      });

      if (!response.ok) throw new Error('Failed to save notes');

      await fetchBookings();
      alert('Notes saved successfully');
    } catch (error) {
      console.error('Error saving notes:', error);
      alert('Failed to save notes');
    }
  }

  function exportToCSV() {
    const headers = [
      'Booking Number',
      'Customer Name',
      'Email',
      'Phone',
      'Product',
      'Quantity',
      'Start Date',
      'End Date',
      'Total Amount',
      'Status',
      'Payment Status',
      'Created At',
    ];

    const rows = filteredBookings.map((booking) => [
      booking.booking_number,
      booking.customer_name,
      booking.customer_email,
      booking.customer_phone,
      booking.products.name,
      booking.quantity,
      new Date(booking.start_date).toLocaleDateString(),
      new Date(booking.end_date).toLocaleDateString(),
      `$${booking.total_amount.toFixed(2)}`,
      booking.status,
      booking.payment_status,
      new Date(booking.created_at).toLocaleDateString(),
    ]);

    const csv = [headers, ...rows].map((row) => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bookings-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  }

  const filteredBookings = bookings.filter((booking) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      booking.booking_number.toLowerCase().includes(searchLower) ||
      booking.customer_name.toLowerCase().includes(searchLower) ||
      booking.customer_email.toLowerCase().includes(searchLower)
    );
  });

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

  const getPaymentBadge = (status: PaymentStatus) => {
    const variants: Record<PaymentStatus, any> = {
      pending: 'warning',
      processing: 'info',
      paid: 'success',
      failed: 'destructive',
      refunded: 'secondary',
      partially_refunded: 'warning',
    };
    return <Badge variant={variants[status]}>{status.replace('_', ' ')}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">Bookings</h1>
          <p className="text-zinc-600">Manage all rental bookings</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={() => setViewMode(viewMode === 'list' ? 'calendar' : 'list')}
          >
            {viewMode === 'list' ? (
              <>
                <CalendarDays className="mr-2 h-4 w-4" />
                Calendar View
              </>
            ) : (
              <>
                <List className="mr-2 h-4 w-4" />
                List View
              </>
            )}
          </Button>
          <Button variant="outline" onClick={exportToCSV}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 rounded-lg bg-white p-4 shadow">
        <div className="flex-1 min-w-[250px]">
          <Label htmlFor="search">Search</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <Input
              id="search"
              placeholder="Search by booking #, name, or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="w-[180px]">
          <Label htmlFor="status-filter">Status</Label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger id="status-filter">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="no_show">No Show</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-[180px]">
          <Label htmlFor="payment-filter">Payment</Label>
          <Select value={paymentFilter} onValueChange={setPaymentFilter}>
            <SelectTrigger id="payment-filter">
              <SelectValue placeholder="All Payments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Payments</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="refunded">Refunded</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Bookings Table */}
      {viewMode === 'list' && (
        <div className="rounded-lg bg-white shadow">
          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <div className="text-zinc-500">Loading bookings...</div>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="flex h-64 items-center justify-center">
              <div className="text-center">
                <Calendar className="mx-auto h-12 w-12 text-zinc-300" />
                <h3 className="mt-2 text-sm font-semibold text-zinc-900">No bookings</h3>
                <p className="mt-1 text-sm text-zinc-500">
                  No bookings found matching your filters.
                </p>
              </div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking #</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-mono text-xs">
                      {booking.booking_number}
                    </TableCell>
                    <TableCell>
                      <div className="max-w-[200px]">
                        <p className="font-medium truncate">{booking.customer_name}</p>
                        <p className="text-xs text-zinc-500 truncate">
                          {booking.customer_email}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-[150px] truncate">
                        {booking.products.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-xs">
                        <div>{new Date(booking.start_date).toLocaleDateString()}</div>
                        <div className="text-zinc-500">
                          to {new Date(booking.end_date).toLocaleDateString()}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{booking.quantity}</TableCell>
                    <TableCell className="font-semibold">
                      ${booking.total_amount.toFixed(2)}
                    </TableCell>
                    <TableCell>{getStatusBadge(booking.status)}</TableCell>
                    <TableCell>{getPaymentBadge(booking.payment_status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedBooking(booking);
                            setAdminNotes(booking.admin_notes || '');
                            setShowDetailsDialog(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {booking.status === 'pending' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                          >
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </Button>
                        )}
                        {booking.status !== 'cancelled' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                          >
                            <XCircle className="h-4 w-4 text-red-600" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      )}

      {/* Calendar View Placeholder */}
      {viewMode === 'calendar' && (
        <div className="rounded-lg bg-white p-12 shadow text-center">
          <CalendarDays className="mx-auto h-16 w-16 text-zinc-300" />
          <h3 className="mt-4 text-lg font-semibold text-zinc-900">Calendar View</h3>
          <p className="mt-2 text-zinc-600">
            Calendar view is coming soon. For now, use the list view to manage bookings.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => setViewMode('list')}
          >
            Switch to List View
          </Button>
        </div>
      )}

      {/* Booking Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
            <DialogDescription>
              {selectedBooking?.booking_number}
            </DialogDescription>
          </DialogHeader>

          {selectedBooking && (
            <div className="space-y-4">
              {/* Customer Info */}
              <div>
                <h3 className="font-semibold mb-2">Customer Information</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-zinc-500">Name</p>
                    <p className="font-medium">{selectedBooking.customer_name}</p>
                  </div>
                  <div>
                    <p className="text-zinc-500">Email</p>
                    <p className="font-medium">{selectedBooking.customer_email}</p>
                  </div>
                  <div>
                    <p className="text-zinc-500">Phone</p>
                    <p className="font-medium">{selectedBooking.customer_phone}</p>
                  </div>
                </div>
              </div>

              {/* Booking Info */}
              <div>
                <h3 className="font-semibold mb-2">Booking Information</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-zinc-500">Product</p>
                    <p className="font-medium">{selectedBooking.products.name}</p>
                  </div>
                  <div>
                    <p className="text-zinc-500">Quantity</p>
                    <p className="font-medium">{selectedBooking.quantity} carts</p>
                  </div>
                  <div>
                    <p className="text-zinc-500">Rental Type</p>
                    <p className="font-medium">{selectedBooking.rental_type}</p>
                  </div>
                  <div>
                    <p className="text-zinc-500">Duration</p>
                    <p className="font-medium">
                      {selectedBooking.duration_days
                        ? `${selectedBooking.duration_days} days`
                        : `${selectedBooking.duration_hours} hours`}
                    </p>
                  </div>
                  <div>
                    <p className="text-zinc-500">Start Date</p>
                    <p className="font-medium">
                      {new Date(selectedBooking.start_date).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-zinc-500">End Date</p>
                    <p className="font-medium">
                      {new Date(selectedBooking.end_date).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div>
                <h3 className="font-semibold mb-2">Pricing</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Base Rate</span>
                    <span className="font-medium">
                      ${selectedBooking.base_rate.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Addons</span>
                    <span className="font-medium">
                      ${selectedBooking.addon_total.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Tax</span>
                    <span className="font-medium">
                      ${selectedBooking.tax_amount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between border-t pt-1 font-semibold">
                    <span>Total</span>
                    <span>${selectedBooking.total_amount.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Special Requests */}
              {selectedBooking.special_requests && (
                <div>
                  <h3 className="font-semibold mb-2">Special Requests</h3>
                  <p className="text-sm text-zinc-700">{selectedBooking.special_requests}</p>
                </div>
              )}

              {/* Admin Notes */}
              <div>
                <Label htmlFor="admin-notes">Admin Notes</Label>
                <Textarea
                  id="admin-notes"
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Add internal notes about this booking..."
                  rows={3}
                  className="mt-1"
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={saveAdminNotes}
                >
                  Save Notes
                </Button>
              </div>

              {/* Status Update */}
              <div>
                <Label htmlFor="status-update">Update Status</Label>
                <div className="flex gap-2 mt-2">
                  <Select
                    value={selectedBooking.status}
                    onValueChange={(value) =>
                      updateBookingStatus(selectedBooking.id, value as BookingStatus)
                    }
                  >
                    <SelectTrigger id="status-update">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                      <SelectItem value="no_show">No Show</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
