/**
 * TypeScript types for the booking system
 * Corresponds to database schema in supabase/migrations/20231211_rental_booking_system.sql
 */

export type RentalType = 'hourly' | 'daily' | 'weekly' | 'custom';

export type PaymentStatus =
  | 'pending'
  | 'processing'
  | 'paid'
  | 'failed'
  | 'refunded'
  | 'partially_refunded';

export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'no_show'
  | 'requires_action';

export type AvailabilityBlockReason = 'maintenance' | 'holiday' | 'reserved' | 'other';

// =====================================================
// Rental Pricing
// =====================================================

export interface RentalPricing {
  id: string;
  product_id: string;
  hourly_rate: number | null;
  hourly_minimum_hours: number;
  daily_rate: number | null;
  weekly_rate: number | null;
  monthly_rate: number | null;
  deposit_amount: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateRentalPricingInput {
  product_id: string;
  hourly_rate?: number;
  hourly_minimum_hours?: number;
  daily_rate?: number;
  weekly_rate?: number;
  monthly_rate?: number;
  deposit_amount?: number;
  active?: boolean;
}

// =====================================================
// Inventory
// =====================================================

export interface Inventory {
  id: string;
  product_id: string;
  total_quantity: number;
  available_quantity: number;
  reserved_quantity: number;
  maintenance_quantity: number;
  created_at: string;
  updated_at: string;
}

export interface UpdateInventoryInput {
  total_quantity?: number;
  available_quantity?: number;
  reserved_quantity?: number;
  maintenance_quantity?: number;
}

// =====================================================
// Bookings
// =====================================================

export interface BookingAddon {
  id: string;
  name: string;
  price: number;
  quantity?: number;
}

export interface DeliveryAddress {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
}

export interface Booking {
  id: string;
  booking_number: string;
  user_id: string | null;

  // Customer information
  customer_name: string;
  customer_email: string;
  customer_phone: string;

  // Booking details
  product_id: string;
  quantity: number;

  // Rental period
  rental_type: RentalType;
  start_date: string;
  end_date: string;
  duration_hours: number | null;
  duration_days: number | null;

  // Pricing
  base_rate: number;
  addon_total: number;
  subtotal: number;
  tax_amount: number;
  total_amount: number;

  // Payment tracking
  payment_status: PaymentStatus;
  stripe_payment_intent_id: string | null;
  stripe_session_id: string | null;
  paid_at: string | null;

  // Booking status
  status: BookingStatus;

  // Additional details
  selected_addons: BookingAddon[];
  delivery_address: DeliveryAddress | null;
  pickup_location: string | null;
  special_requests: string | null;

  // Admin notes
  admin_notes: string | null;

  // Cancellation tracking
  cancelled_at: string | null;
  cancellation_reason: string | null;

  // Email tracking
  confirmation_email_sent: boolean;
  reminder_email_sent: boolean;

  // Metadata
  created_at: string;
  updated_at: string;
}

export interface BookingWithProduct extends Booking {
  products: {
    id: string;
    name: string;
    slug: string;
    tier: string;
    images: string[];
    base_price: number;
  };
}

export interface CreateBookingInput {
  productId: string;
  quantity: number;
  rentalType: RentalType;
  startDate: string;
  endDate: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  selectedAddons?: BookingAddon[];
  deliveryAddress?: DeliveryAddress;
  pickupLocation?: string;
  specialRequests?: string;
}

export interface UpdateBookingInput {
  status?: BookingStatus;
  payment_status?: PaymentStatus;
  special_requests?: string;
  admin_notes?: string;
  cancellation_reason?: string;
}

// =====================================================
// Availability Blocks
// =====================================================

export interface AvailabilityBlock {
  id: string;
  product_id: string;
  start_date: string;
  end_date: string;
  quantity_blocked: number;
  reason: AvailabilityBlockReason;
  notes: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateAvailabilityBlockInput {
  product_id: string;
  start_date: string;
  end_date: string;
  quantity_blocked: number;
  reason: AvailabilityBlockReason;
  notes?: string;
}

// =====================================================
// API Request/Response Types
// =====================================================

export interface CheckAvailabilityRequest {
  productId: string;
  startDate: string;
  endDate: string;
  quantity: number;
}

export interface CheckAvailabilityResponse {
  available: boolean;
  error?: string;
}

export interface CreateBookingResponse {
  booking: Booking;
  message: string;
}

export interface CreateCheckoutSessionRequest {
  bookingId: string;
}

export interface CreateCheckoutSessionResponse {
  sessionId: string;
  url: string;
}

export interface BookingStatsResponse {
  total_bookings: number;
  confirmed_bookings: number;
  cancelled_bookings: number;
  total_revenue: number;
  avg_booking_value: number;
}

// =====================================================
// Calendar & UI Helper Types
// =====================================================

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface PricingBreakdown {
  rentalType: RentalType;
  duration: number;
  unitRate: number;
  baseTotal: number;
  addonsTotal: number;
  taxTotal: number;
  grandTotal: number;
}

export interface AvailabilityCalendarDay {
  date: Date;
  available: boolean;
  availableQuantity: number;
  blocked: boolean;
  bookings: number;
}

export interface BookingFormData {
  // Step 1: Dates & Rental Type
  rentalType: RentalType;
  startDate: Date | null;
  endDate: Date | null;

  // Step 2: Quantity
  quantity: number;

  // Step 3: Addons
  selectedAddons: BookingAddon[];

  // Step 4: Customer Info
  customerName: string;
  customerEmail: string;
  customerPhone: string;

  // Step 5: Delivery/Pickup
  needsDelivery: boolean;
  deliveryAddress?: DeliveryAddress;
  pickupLocation?: string;

  // Additional
  specialRequests: string;
}

export interface BookingValidationErrors {
  rentalType?: string;
  startDate?: string;
  endDate?: string;
  quantity?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  deliveryAddress?: string;
  general?: string;
}

// =====================================================
// Admin Dashboard Types
// =====================================================

export interface BookingFilters {
  status?: BookingStatus[];
  payment_status?: PaymentStatus[];
  start_date?: string;
  end_date?: string;
  customer_email?: string;
  booking_number?: string;
  product_id?: string;
}

export interface BookingListItem {
  id: string;
  booking_number: string;
  customer_name: string;
  customer_email: string;
  product_name: string;
  start_date: string;
  end_date: string;
  quantity: number;
  total_amount: number;
  status: BookingStatus;
  payment_status: PaymentStatus;
  created_at: string;
}

export interface InventoryOverview {
  product_id: string;
  product_name: string;
  total_quantity: number;
  available_quantity: number;
  reserved_quantity: number;
  maintenance_quantity: number;
  utilization_rate: number; // percentage
}
