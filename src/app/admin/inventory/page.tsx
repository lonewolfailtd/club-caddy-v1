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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Package,
  Edit,
  Calendar,
  AlertTriangle,
  Plus,
  X,
} from 'lucide-react';
import type { Inventory, AvailabilityBlock, AvailabilityBlockReason } from '@/types/booking.types';

interface InventoryWithProduct extends Inventory {
  products: {
    id: string;
    name: string;
    slug: string;
    tier: string;
  };
}

interface AvailabilityBlockWithProduct extends AvailabilityBlock {
  products: {
    id: string;
    name: string;
  };
}

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryWithProduct[]>([]);
  const [blocks, setBlocks] = useState<AvailabilityBlockWithProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showBlockDialog, setShowBlockDialog] = useState(false);
  const [selectedInventory, setSelectedInventory] = useState<InventoryWithProduct | null>(null);

  // Edit form state
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [maintenanceQuantity, setMaintenanceQuantity] = useState(0);

  // Block form state
  const [blockProductId, setBlockProductId] = useState('');
  const [blockStartDate, setBlockStartDate] = useState('');
  const [blockEndDate, setBlockEndDate] = useState('');
  const [blockQuantity, setBlockQuantity] = useState(1);
  const [blockReason, setBlockReason] = useState<AvailabilityBlockReason>('maintenance');
  const [blockNotes, setBlockNotes] = useState('');

  const supabase = createClient();

  useEffect(() => {
    fetchInventory();
    fetchBlocks();
  }, []);

  async function fetchInventory() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('inventory')
        .select(`
          *,
          products (
            id,
            name,
            slug,
            tier
          )
        `)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setInventory(data || []);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchBlocks() {
    try {
      const { data, error } = await supabase
        .from('availability_blocks')
        .select(`
          *,
          products (
            id,
            name
          )
        `)
        .gte('end_date', new Date().toISOString())
        .order('start_date', { ascending: true });

      if (error) throw error;
      setBlocks(data || []);
    } catch (error) {
      console.error('Error fetching blocks:', error);
    }
  }

  async function updateInventory() {
    if (!selectedInventory) return;

    try {
      const availableQuantity = totalQuantity - selectedInventory.reserved_quantity - maintenanceQuantity;

      const { error } = await supabase
        .from('inventory')
        // @ts-expect-error - Supabase type generation issue with inventory table
        .update({
          total_quantity: totalQuantity,
          available_quantity: availableQuantity,
          maintenance_quantity: maintenanceQuantity,
        })
        .eq('id', selectedInventory.id);

      if (error) throw error;

      await fetchInventory();
      setShowEditDialog(false);
      alert('Inventory updated successfully');
    } catch (error) {
      console.error('Error updating inventory:', error);
      alert('Failed to update inventory');
    }
  }

  async function createBlock() {
    try {
      const { error } = await supabase
        .from('availability_blocks')
        // @ts-expect-error - Supabase type generation issue with availability_blocks table
        .insert({
          product_id: blockProductId,
          start_date: blockStartDate,
          end_date: blockEndDate,
          quantity_blocked: blockQuantity,
          reason: blockReason,
          notes: blockNotes || null,
        });

      if (error) throw error;

      await fetchBlocks();
      setShowBlockDialog(false);
      resetBlockForm();
      alert('Availability block created successfully');
    } catch (error) {
      console.error('Error creating block:', error);
      alert('Failed to create availability block');
    }
  }

  async function deleteBlock(blockId: string) {
    if (!confirm('Are you sure you want to remove this availability block?')) return;

    try {
      const { error } = await supabase
        .from('availability_blocks')
        .delete()
        .eq('id', blockId);

      if (error) throw error;

      await fetchBlocks();
      alert('Block removed successfully');
    } catch (error) {
      console.error('Error deleting block:', error);
      alert('Failed to remove block');
    }
  }

  function resetBlockForm() {
    setBlockProductId('');
    setBlockStartDate('');
    setBlockEndDate('');
    setBlockQuantity(1);
    setBlockReason('maintenance');
    setBlockNotes('');
  }

  function getUtilizationColor(rate: number) {
    if (rate >= 80) return 'text-red-600';
    if (rate >= 60) return 'text-amber-600';
    return 'text-green-600';
  }

  function getUtilizationBadge(rate: number) {
    if (rate >= 80) return <Badge variant="destructive">High</Badge>;
    if (rate >= 60) return <Badge variant="warning">Medium</Badge>;
    return <Badge variant="success">Low</Badge>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">Inventory Management</h1>
          <p className="text-zinc-600">Manage cart quantities and availability</p>
        </div>
        <Button onClick={() => setShowBlockDialog(true)}>
          <Calendar className="mr-2 h-4 w-4" />
          Block Dates
        </Button>
      </div>

      {/* Inventory Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500">Total Carts</p>
              <p className="text-3xl font-bold text-zinc-900">
                {inventory.reduce((sum, inv) => sum + inv.total_quantity, 0)}
              </p>
            </div>
            <Package className="h-12 w-12 text-zinc-300" />
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500">Available Now</p>
              <p className="text-3xl font-bold text-green-600">
                {inventory.reduce((sum, inv) => sum + inv.available_quantity, 0)}
              </p>
            </div>
            <Package className="h-12 w-12 text-green-200" />
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500">Reserved</p>
              <p className="text-3xl font-bold text-amber-600">
                {inventory.reduce((sum, inv) => sum + inv.reserved_quantity, 0)}
              </p>
            </div>
            <Package className="h-12 w-12 text-amber-200" />
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="rounded-lg bg-white shadow">
        <div className="border-b p-4">
          <h2 className="text-lg font-semibold">Product Inventory</h2>
        </div>
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="text-zinc-500">Loading inventory...</div>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Available</TableHead>
                <TableHead>Reserved</TableHead>
                <TableHead>Maintenance</TableHead>
                <TableHead>Utilization</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventory.map((inv) => {
                const utilizationRate =
                  inv.total_quantity > 0
                    ? ((inv.reserved_quantity / inv.total_quantity) * 100)
                    : 0;

                return (
                  <TableRow key={inv.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{inv.products.name}</p>
                        <p className="text-xs text-zinc-500">{inv.products.tier}</p>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold">{inv.total_quantity}</TableCell>
                    <TableCell>
                      <span className="font-semibold text-green-600">
                        {inv.available_quantity}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold text-amber-600">
                        {inv.reserved_quantity}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold text-red-600">
                        {inv.maintenance_quantity}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className={`font-semibold ${getUtilizationColor(utilizationRate)}`}>
                          {utilizationRate.toFixed(0)}%
                        </span>
                        {getUtilizationBadge(utilizationRate)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedInventory(inv);
                          setTotalQuantity(inv.total_quantity);
                          setMaintenanceQuantity(inv.maintenance_quantity);
                          setShowEditDialog(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Low Inventory Alerts */}
      {inventory.some((inv) => inv.available_quantity <= 2) && (
        <div className="rounded-lg bg-amber-50 border border-amber-200 p-4">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 mr-3" />
            <div>
              <h3 className="font-semibold text-amber-900">Low Inventory Alert</h3>
              <div className="mt-2 space-y-1">
                {inventory
                  .filter((inv) => inv.available_quantity <= 2)
                  .map((inv) => (
                    <p key={inv.id} className="text-sm text-amber-700">
                      {inv.products.name}: Only {inv.available_quantity} carts available
                    </p>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Availability Blocks */}
      <div className="rounded-lg bg-white shadow">
        <div className="border-b p-4">
          <h2 className="text-lg font-semibold">Upcoming Availability Blocks</h2>
        </div>
        {blocks.length === 0 ? (
          <div className="flex h-32 items-center justify-center text-zinc-500">
            No upcoming availability blocks
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blocks.map((block) => (
                <TableRow key={block.id}>
                  <TableCell>{block.products.name}</TableCell>
                  <TableCell>{new Date(block.start_date).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(block.end_date).toLocaleDateString()}</TableCell>
                  <TableCell>{block.quantity_blocked}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{block.reason}</Badge>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {block.notes || '-'}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteBlock(block.id)}
                    >
                      <X className="h-4 w-4 text-red-600" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Edit Inventory Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Inventory</DialogTitle>
            <DialogDescription>
              {selectedInventory?.products.name}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="total-quantity">Total Quantity</Label>
              <Input
                id="total-quantity"
                type="number"
                min="0"
                value={totalQuantity}
                onChange={(e) => setTotalQuantity(parseInt(e.target.value) || 0)}
              />
            </div>

            <div>
              <Label htmlFor="maintenance-quantity">Maintenance Quantity</Label>
              <Input
                id="maintenance-quantity"
                type="number"
                min="0"
                max={totalQuantity - (selectedInventory?.reserved_quantity || 0)}
                value={maintenanceQuantity}
                onChange={(e) => setMaintenanceQuantity(parseInt(e.target.value) || 0)}
              />
            </div>

            {selectedInventory && (
              <div className="rounded-lg bg-zinc-50 p-3 text-sm">
                <p className="text-zinc-700">
                  Reserved: <span className="font-semibold">{selectedInventory.reserved_quantity}</span>
                </p>
                <p className="text-zinc-700">
                  Available: <span className="font-semibold text-green-600">
                    {totalQuantity - selectedInventory.reserved_quantity - maintenanceQuantity}
                  </span>
                </p>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
            <Button onClick={updateInventory}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Block Dialog */}
      <Dialog open={showBlockDialog} onOpenChange={setShowBlockDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Block Availability</DialogTitle>
            <DialogDescription>
              Block dates for maintenance, holidays, or other reasons
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="block-product">Product</Label>
              <Select value={blockProductId} onValueChange={setBlockProductId}>
                <SelectTrigger id="block-product">
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>
                <SelectContent>
                  {inventory.map((inv) => (
                    <SelectItem key={inv.product_id} value={inv.product_id}>
                      {inv.products.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="start-date">Start Date</Label>
                <Input
                  id="start-date"
                  type="date"
                  value={blockStartDate}
                  onChange={(e) => setBlockStartDate(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="end-date">End Date</Label>
                <Input
                  id="end-date"
                  type="date"
                  value={blockEndDate}
                  onChange={(e) => setBlockEndDate(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="block-quantity">Quantity to Block</Label>
              <Input
                id="block-quantity"
                type="number"
                min="1"
                value={blockQuantity}
                onChange={(e) => setBlockQuantity(parseInt(e.target.value) || 1)}
              />
            </div>

            <div>
              <Label htmlFor="block-reason">Reason</Label>
              <Select value={blockReason} onValueChange={(value) => setBlockReason(value as AvailabilityBlockReason)}>
                <SelectTrigger id="block-reason">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="holiday">Holiday</SelectItem>
                  <SelectItem value="reserved">Reserved</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="block-notes">Notes (Optional)</Label>
              <Textarea
                id="block-notes"
                value={blockNotes}
                onChange={(e) => setBlockNotes(e.target.value)}
                placeholder="Add notes about this block..."
                rows={2}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowBlockDialog(false);
              resetBlockForm();
            }}>
              Cancel
            </Button>
            <Button onClick={createBlock} disabled={!blockProductId || !blockStartDate || !blockEndDate}>
              Create Block
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
