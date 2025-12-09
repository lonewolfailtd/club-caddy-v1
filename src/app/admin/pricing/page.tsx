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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DollarSign, Edit, ToggleLeft, ToggleRight } from 'lucide-react';
import type { RentalPricing } from '@/types/booking.types';

interface RentalPricingWithProduct extends RentalPricing {
  products: {
    id: string;
    name: string;
    slug: string;
    tier: string;
    rental_enabled: boolean;
  };
}

export default function PricingPage() {
  const [pricing, setPricing] = useState<RentalPricingWithProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedPricing, setSelectedPricing] = useState<RentalPricingWithProduct | null>(null);

  // Form state
  const [hourlyRate, setHourlyRate] = useState<string>('');
  const [hourlyMinHours, setHourlyMinHours] = useState<string>('2');
  const [dailyRate, setDailyRate] = useState<string>('');
  const [weeklyRate, setWeeklyRate] = useState<string>('');
  const [monthlyRate, setMonthlyRate] = useState<string>('');
  const [depositAmount, setDepositAmount] = useState<string>('0');

  const supabase = createClient();

  useEffect(() => {
    fetchPricing();
  }, []);

  async function fetchPricing() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('rental_pricing')
        .select(`
          *,
          products (
            id,
            name,
            slug,
            tier,
            rental_enabled
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPricing(data || []);
    } catch (error) {
      console.error('Error fetching pricing:', error);
    } finally {
      setLoading(false);
    }
  }

  async function updatePricing() {
    if (!selectedPricing) return;

    try {
      const { error } = await supabase
        .from('rental_pricing')
        // @ts-expect-error - Supabase type generation issue with rental_pricing table
        .update({
          hourly_rate: hourlyRate ? parseFloat(hourlyRate) : null,
          hourly_minimum_hours: parseInt(hourlyMinHours) || 2,
          daily_rate: dailyRate ? parseFloat(dailyRate) : null,
          weekly_rate: weeklyRate ? parseFloat(weeklyRate) : null,
          monthly_rate: monthlyRate ? parseFloat(monthlyRate) : null,
          deposit_amount: parseFloat(depositAmount) || 0,
        })
        .eq('id', selectedPricing.id);

      if (error) throw error;

      await fetchPricing();
      setShowEditDialog(false);
      alert('Pricing updated successfully');
    } catch (error) {
      console.error('Error updating pricing:', error);
      alert('Failed to update pricing');
    }
  }

  async function toggleRentalEnabled(productId: string, currentValue: boolean) {
    try {
      const { error } = await supabase
        .from('products')
        // @ts-expect-error - Supabase type generation issue with products rental_enabled field
        .update({ rental_enabled: !currentValue })
        .eq('id', productId);

      if (error) throw error;

      await fetchPricing();
    } catch (error) {
      console.error('Error toggling rental enabled:', error);
      alert('Failed to update rental status');
    }
  }

  async function bulkUpdatePricing() {
    const percentage = prompt('Enter percentage change (e.g., 10 for +10%, -5 for -5%):');
    if (!percentage) return;

    const percentChange = parseFloat(percentage) / 100;
    if (isNaN(percentChange)) {
      alert('Invalid percentage');
      return;
    }

    if (!confirm(`Are you sure you want to adjust all prices by ${percentage}%?`)) return;

    try {
      const updates = pricing.map((p) => ({
        id: p.id,
        hourly_rate: p.hourly_rate ? p.hourly_rate * (1 + percentChange) : null,
        daily_rate: p.daily_rate ? p.daily_rate * (1 + percentChange) : null,
        weekly_rate: p.weekly_rate ? p.weekly_rate * (1 + percentChange) : null,
        monthly_rate: p.monthly_rate ? p.monthly_rate * (1 + percentChange) : null,
      }));

      for (const update of updates) {
        const { error } = await supabase
          .from('rental_pricing')
          // @ts-expect-error - Supabase type generation issue with rental_pricing table
          .update(update)
          .eq('id', update.id);

        if (error) throw error;
      }

      await fetchPricing();
      alert('Bulk pricing update completed');
    } catch (error) {
      console.error('Error in bulk update:', error);
      alert('Failed to complete bulk update');
    }
  }

  function openEditDialog(pricingItem: RentalPricingWithProduct) {
    setSelectedPricing(pricingItem);
    setHourlyRate(pricingItem.hourly_rate?.toString() || '');
    setHourlyMinHours(pricingItem.hourly_minimum_hours?.toString() || '2');
    setDailyRate(pricingItem.daily_rate?.toString() || '');
    setWeeklyRate(pricingItem.weekly_rate?.toString() || '');
    setMonthlyRate(pricingItem.monthly_rate?.toString() || '');
    setDepositAmount(pricingItem.deposit_amount?.toString() || '0');
    setShowEditDialog(true);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">Pricing Management</h1>
          <p className="text-zinc-600">Manage rental rates and pricing tiers</p>
        </div>
        <Button onClick={bulkUpdatePricing}>
          <DollarSign className="mr-2 h-4 w-4" />
          Bulk Update
        </Button>
      </div>

      {/* Pricing Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500">Active Products</p>
              <p className="text-3xl font-bold text-zinc-900">
                {pricing.filter((p) => p.active).length}
              </p>
            </div>
            <DollarSign className="h-12 w-12 text-zinc-300" />
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500">Rental Enabled</p>
              <p className="text-3xl font-bold text-green-600">
                {pricing.filter((p) => p.products.rental_enabled).length}
              </p>
            </div>
            <ToggleRight className="h-12 w-12 text-green-200" />
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500">Avg Daily Rate</p>
              <p className="text-3xl font-bold text-rose-800">
                $
                {pricing.length > 0
                  ? Math.round(
                      pricing.reduce((sum, p) => sum + (p.daily_rate || 0), 0) /
                        pricing.filter((p) => p.daily_rate).length || 1
                    )
                  : 0}
              </p>
            </div>
            <DollarSign className="h-12 w-12 text-rose-200" />
          </div>
        </div>
      </div>

      {/* Pricing Table */}
      <div className="rounded-lg bg-white shadow">
        <div className="border-b p-4">
          <h2 className="text-lg font-semibold">Product Pricing</h2>
        </div>
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="text-zinc-500">Loading pricing...</div>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Hourly Rate</TableHead>
                <TableHead>Daily Rate</TableHead>
                <TableHead>Weekly Rate</TableHead>
                <TableHead>Monthly Rate</TableHead>
                <TableHead>Rental Enabled</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pricing.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{p.products.name}</p>
                      <p className="text-xs text-zinc-500">{p.products.tier}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {p.hourly_rate ? (
                      <div>
                        <p className="font-semibold">${p.hourly_rate.toFixed(2)}/hr</p>
                        <p className="text-xs text-zinc-500">
                          Min: {p.hourly_minimum_hours}hrs
                        </p>
                      </div>
                    ) : (
                      <span className="text-zinc-400">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {p.daily_rate ? (
                      <span className="font-semibold">${p.daily_rate.toFixed(2)}</span>
                    ) : (
                      <span className="text-zinc-400">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {p.weekly_rate ? (
                      <span className="font-semibold">${p.weekly_rate.toFixed(2)}</span>
                    ) : (
                      <span className="text-zinc-400">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {p.monthly_rate ? (
                      <span className="font-semibold">${p.monthly_rate.toFixed(2)}</span>
                    ) : (
                      <span className="text-zinc-400">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleRentalEnabled(p.product_id, p.products.rental_enabled)}
                    >
                      {p.products.rental_enabled ? (
                        <ToggleRight className="h-5 w-5 text-green-600" />
                      ) : (
                        <ToggleLeft className="h-5 w-5 text-zinc-400" />
                      )}
                    </Button>
                  </TableCell>
                  <TableCell>
                    {p.active ? (
                      <Badge variant="success">Active</Badge>
                    ) : (
                      <Badge variant="secondary">Inactive</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditDialog(p)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Edit Pricing Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Pricing</DialogTitle>
            <DialogDescription>
              {selectedPricing?.products.name}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="hourly-rate">Hourly Rate ($)</Label>
              <Input
                id="hourly-rate"
                type="number"
                step="0.01"
                min="0"
                placeholder="Leave empty to disable"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
              />
            </div>

            {hourlyRate && (
              <div>
                <Label htmlFor="hourly-min">Minimum Hours</Label>
                <Input
                  id="hourly-min"
                  type="number"
                  min="1"
                  max="24"
                  value={hourlyMinHours}
                  onChange={(e) => setHourlyMinHours(e.target.value)}
                />
              </div>
            )}

            <div>
              <Label htmlFor="daily-rate">Daily Rate ($)</Label>
              <Input
                id="daily-rate"
                type="number"
                step="0.01"
                min="0"
                placeholder="Leave empty to disable"
                value={dailyRate}
                onChange={(e) => setDailyRate(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="weekly-rate">Weekly Rate ($)</Label>
              <Input
                id="weekly-rate"
                type="number"
                step="0.01"
                min="0"
                placeholder="Leave empty to disable"
                value={weeklyRate}
                onChange={(e) => setWeeklyRate(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="monthly-rate">Monthly Rate ($)</Label>
              <Input
                id="monthly-rate"
                type="number"
                step="0.01"
                min="0"
                placeholder="Leave empty to disable"
                value={monthlyRate}
                onChange={(e) => setMonthlyRate(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="deposit">Deposit Amount ($)</Label>
              <Input
                id="deposit"
                type="number"
                step="0.01"
                min="0"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
              />
            </div>

            <div className="rounded-lg bg-zinc-50 p-3 text-sm">
              <h4 className="font-semibold mb-1">Pricing Tips</h4>
              <ul className="space-y-1 text-zinc-700">
                <li>• Weekly rate should be 5-6x daily rate</li>
                <li>• Monthly rate should be 20-25x daily rate</li>
                <li>• Hourly rate should be 15-20% of daily rate</li>
              </ul>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
            <Button onClick={updatePricing}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
