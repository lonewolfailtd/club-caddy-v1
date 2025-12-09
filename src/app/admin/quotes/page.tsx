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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  FileText,
  Eye,
  CheckCircle,
  XCircle,
  Send,
} from 'lucide-react';

interface QuoteRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  event_type?: string;
  event_date?: string;
  cart_quantity: number;
  rental_duration?: string;
  special_requirements?: string;
  status: 'pending' | 'responded' | 'converted' | 'rejected';
  admin_notes?: string;
  created_at: string;
}

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');

  const supabase = createClient();

  useEffect(() => {
    fetchQuotes();
  }, []);

  async function fetchQuotes() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('quote_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setQuotes(data || []);
    } catch (error) {
      console.error('Error fetching quotes:', error);
    } finally {
      setLoading(false);
    }
  }

  async function updateQuoteStatus(quoteId: string, status: QuoteRequest['status']) {
    try {
      const { error } = await supabase
        .from('quote_requests')
        // @ts-expect-error - Supabase type generation issue with quote_requests table
        .update({ status })
        .eq('id', quoteId);

      if (error) throw error;

      await fetchQuotes();
      setShowDetailsDialog(false);
      alert('Quote status updated successfully');
    } catch (error) {
      console.error('Error updating quote:', error);
      alert('Failed to update quote status');
    }
  }

  async function saveAdminNotes() {
    if (!selectedQuote) return;

    try {
      const { error } = await supabase
        .from('quote_requests')
        // @ts-expect-error - Supabase type generation issue with quote_requests table
        .update({ admin_notes: adminNotes })
        .eq('id', selectedQuote.id);

      if (error) throw error;

      await fetchQuotes();
      alert('Notes saved successfully');
    } catch (error) {
      console.error('Error saving notes:', error);
      alert('Failed to save notes');
    }
  }

  const getStatusBadge = (status: QuoteRequest['status']) => {
    const variants: Record<QuoteRequest['status'], any> = {
      pending: 'warning',
      responded: 'info',
      converted: 'success',
      rejected: 'destructive',
    };
    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-zinc-900">Quote Requests</h1>
        <p className="text-zinc-600">Manage customer quote requests</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500">Total Quotes</p>
              <p className="text-3xl font-bold text-zinc-900">{quotes.length}</p>
            </div>
            <FileText className="h-12 w-12 text-zinc-300" />
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500">Pending</p>
              <p className="text-3xl font-bold text-amber-600">
                {quotes.filter((q) => q.status === 'pending').length}
              </p>
            </div>
            <FileText className="h-12 w-12 text-amber-200" />
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500">Converted</p>
              <p className="text-3xl font-bold text-green-600">
                {quotes.filter((q) => q.status === 'converted').length}
              </p>
            </div>
            <CheckCircle className="h-12 w-12 text-green-200" />
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500">Conversion Rate</p>
              <p className="text-3xl font-bold text-rose-800">
                {quotes.length > 0
                  ? Math.round((quotes.filter((q) => q.status === 'converted').length / quotes.length) * 100)
                  : 0}
                %
              </p>
            </div>
            <FileText className="h-12 w-12 text-rose-200" />
          </div>
        </div>
      </div>

      {/* Quotes Table */}
      <div className="rounded-lg bg-white shadow">
        <div className="border-b p-4">
          <h2 className="text-lg font-semibold">Quote Requests</h2>
        </div>
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="text-zinc-500">Loading quotes...</div>
          </div>
        ) : quotes.length === 0 ? (
          <div className="flex h-64 items-center justify-center">
            <div className="text-center">
              <FileText className="mx-auto h-12 w-12 text-zinc-300" />
              <h3 className="mt-2 text-sm font-semibold text-zinc-900">No quotes</h3>
              <p className="mt-1 text-sm text-zinc-500">No quote requests yet.</p>
            </div>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Event Type</TableHead>
                <TableHead>Event Date</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quotes.map((quote) => (
                <TableRow key={quote.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{quote.name}</p>
                      <p className="text-xs text-zinc-500">{quote.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>{quote.company || '-'}</TableCell>
                  <TableCell>{quote.event_type || '-'}</TableCell>
                  <TableCell>
                    {quote.event_date
                      ? new Date(quote.event_date).toLocaleDateString()
                      : '-'}
                  </TableCell>
                  <TableCell>{quote.cart_quantity} carts</TableCell>
                  <TableCell>{getStatusBadge(quote.status)}</TableCell>
                  <TableCell className="text-xs">
                    {new Date(quote.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedQuote(quote);
                          setAdminNotes(quote.admin_notes || '');
                          setShowDetailsDialog(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {quote.status === 'pending' && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuoteStatus(quote.id, 'responded')}
                          >
                            <Send className="h-4 w-4 text-blue-600" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuoteStatus(quote.id, 'converted')}
                          >
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Quote Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Quote Request Details</DialogTitle>
            <DialogDescription>
              Submitted on {selectedQuote && new Date(selectedQuote.created_at).toLocaleDateString()}
            </DialogDescription>
          </DialogHeader>

          {selectedQuote && (
            <div className="space-y-4">
              {/* Customer Info */}
              <div>
                <h3 className="font-semibold mb-2">Customer Information</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-zinc-500">Name</p>
                    <p className="font-medium">{selectedQuote.name}</p>
                  </div>
                  <div>
                    <p className="text-zinc-500">Email</p>
                    <p className="font-medium">{selectedQuote.email}</p>
                  </div>
                  <div>
                    <p className="text-zinc-500">Phone</p>
                    <p className="font-medium">{selectedQuote.phone}</p>
                  </div>
                  {selectedQuote.company && (
                    <div>
                      <p className="text-zinc-500">Company</p>
                      <p className="font-medium">{selectedQuote.company}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Event Info */}
              <div>
                <h3 className="font-semibold mb-2">Event Information</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {selectedQuote.event_type && (
                    <div>
                      <p className="text-zinc-500">Event Type</p>
                      <p className="font-medium">{selectedQuote.event_type}</p>
                    </div>
                  )}
                  {selectedQuote.event_date && (
                    <div>
                      <p className="text-zinc-500">Event Date</p>
                      <p className="font-medium">
                        {new Date(selectedQuote.event_date).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="text-zinc-500">Cart Quantity</p>
                    <p className="font-medium">{selectedQuote.cart_quantity} carts</p>
                  </div>
                  {selectedQuote.rental_duration && (
                    <div>
                      <p className="text-zinc-500">Rental Duration</p>
                      <p className="font-medium">{selectedQuote.rental_duration}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Special Requirements */}
              {selectedQuote.special_requirements && (
                <div>
                  <h3 className="font-semibold mb-2">Special Requirements</h3>
                  <p className="text-sm text-zinc-700 whitespace-pre-wrap">
                    {selectedQuote.special_requirements}
                  </p>
                </div>
              )}

              {/* Admin Notes */}
              <div>
                <h3 className="font-semibold mb-2">Admin Notes</h3>
                <Textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Add internal notes about this quote..."
                  rows={4}
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

              {/* Status Actions */}
              <div className="flex gap-2 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => updateQuoteStatus(selectedQuote.id, 'responded')}
                  disabled={selectedQuote.status !== 'pending'}
                >
                  <Send className="mr-2 h-4 w-4" />
                  Mark as Responded
                </Button>
                <Button
                  variant="default"
                  onClick={() => updateQuoteStatus(selectedQuote.id, 'converted')}
                  disabled={selectedQuote.status === 'converted'}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Mark as Converted
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => updateQuoteStatus(selectedQuote.id, 'rejected')}
                  disabled={selectedQuote.status === 'rejected'}
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Reject
                </Button>
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
