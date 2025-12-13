import { sendEmail } from '../send'
import * as React from 'react'
import { renderToBuffer } from '@react-pdf/renderer'
import {
  WelcomeEmail,
  PasswordResetEmail,
  EmailVerificationEmail,
  PasswordChangedEmail,
  OrderConfirmationEmail,
  OrderShippedEmail,
  OrderDeliveredEmail,
  OrderCancelledEmail,
  PaymentReceivedEmail,
  QuoteReceivedCustomerEmail,
  QuoteReceivedAdminEmail,
  QuoteReadyEmail,
  RefundRequestedEmail,
  RefundApprovedEmail,
  RefundProcessedEmail,
  ContactFormEmail,
  NewsletterWelcomeEmail,
  BookingConfirmationCustomerEmail,
  BookingConfirmationAdminEmail,
  BookingReminderEmail,
  BookingThankYouEmail,
  DepositConfirmationEmail,
  BalanceInvoiceEmail,
  BalancePaidEmail,
} from '../templates'
import { DepositInvoicePDF } from '../templates/orders/deposit-invoice-pdf'

const ADMIN_EMAIL = 'contact@lonewolfaisolutions.com'

// ============================================
// AUTH EMAILS
// ============================================

export async function sendWelcomeEmail(to: string, name: string) {
  return sendEmail({
    to,
    subject: 'Welcome to Club Caddy Carts!',
    react: React.createElement(WelcomeEmail, { name, email: to }),
  })
}

export async function sendPasswordResetEmail(
  to: string,
  name: string,
  resetLink: string,
  expiryMinutes = 60
) {
  return sendEmail({
    to,
    subject: 'Reset Your Password - Club Caddy Carts',
    react: React.createElement(PasswordResetEmail, { name, resetLink, expiryMinutes }),
  })
}

export async function sendEmailVerification(to: string, name: string, verificationLink: string) {
  return sendEmail({
    to,
    subject: 'Verify Your Email - Club Caddy Carts',
    react: React.createElement(EmailVerificationEmail, { name, verificationLink }),
  })
}

export async function sendPasswordChangedEmail(to: string, name: string) {
  return sendEmail({
    to,
    subject: 'Password Changed - Club Caddy Carts',
    react: React.createElement(PasswordChangedEmail, { name, changeDate: new Date() }),
  })
}

// ============================================
// ORDER EMAILS
// ============================================

export async function sendOrderConfirmation(to: string, orderData: any) {
  return sendEmail({
    to,
    subject: `Order Confirmation #${orderData.orderNumber} - Club Caddy Carts`,
    react: React.createElement(OrderConfirmationEmail, orderData),
  })
}

export async function sendOrderShipped(to: string, shippingData: any) {
  return sendEmail({
    to,
    subject: `Your Order #${shippingData.orderNumber} Has Shipped!`,
    react: React.createElement(OrderShippedEmail, shippingData),
  })
}

export async function sendOrderDelivered(to: string, deliveryData: any) {
  return sendEmail({
    to,
    subject: `Your Golf Cart Has Been Delivered! - Order #${deliveryData.orderNumber}`,
    react: React.createElement(OrderDeliveredEmail, deliveryData),
  })
}

export async function sendOrderCancelled(to: string, cancellationData: any) {
  return sendEmail({
    to,
    subject: `Order Cancellation Confirmed - #${cancellationData.orderNumber}`,
    react: React.createElement(OrderCancelledEmail, cancellationData),
  })
}

export async function sendPaymentReceived(to: string, paymentData: any) {
  return sendEmail({
    to,
    subject: `Payment Received - Order #${paymentData.orderNumber}`,
    react: React.createElement(PaymentReceivedEmail, paymentData),
  })
}

// ============================================
// QUOTE EMAILS
// ============================================

export async function sendQuoteReceivedToCustomer(to: string, quoteData: any) {
  return sendEmail({
    to,
    subject: `Quote Request Received #${quoteData.quoteNumber} - Club Caddy Carts`,
    react: React.createElement(QuoteReceivedCustomerEmail, quoteData),
  })
}

export async function sendQuoteReceivedToAdmin(quoteData: any) {
  return sendEmail({
    to: ADMIN_EMAIL,
    subject: `New Quote Request #${quoteData.quoteNumber} - Action Required`,
    react: React.createElement(QuoteReceivedAdminEmail, quoteData),
  })
}

export async function sendQuoteReady(to: string, quoteData: any) {
  return sendEmail({
    to,
    subject: `Your Custom Quote is Ready! - #${quoteData.quoteNumber}`,
    react: React.createElement(QuoteReadyEmail, quoteData),
  })
}

// ============================================
// REFUND EMAILS
// ============================================

export async function sendRefundRequested(to: string, refundData: any) {
  return sendEmail({
    to,
    subject: `Refund Request Received - Order #${refundData.orderNumber}`,
    react: React.createElement(RefundRequestedEmail, refundData),
  })
}

export async function sendRefundApproved(to: string, refundData: any) {
  return sendEmail({
    to,
    subject: `Refund Approved - Order #${refundData.orderNumber}`,
    react: React.createElement(RefundApprovedEmail, refundData),
  })
}

export async function sendRefundProcessed(to: string, refundData: any) {
  return sendEmail({
    to,
    subject: `Refund Processed - Order #${refundData.orderNumber}`,
    react: React.createElement(RefundProcessedEmail, refundData),
  })
}

// ============================================
// GENERAL EMAILS
// ============================================

export async function sendContactFormConfirmation(to: string, contactData: any) {
  return sendEmail({
    to,
    subject: 'Message Received - Club Caddy Carts',
    react: React.createElement(ContactFormEmail, contactData),
  })
}

export async function sendNewsletterWelcome(to: string, welcomeData: any) {
  return sendEmail({
    to,
    subject: 'Welcome to Club Caddy Carts Newsletter!',
    react: React.createElement(NewsletterWelcomeEmail, welcomeData),
  })
}

// ============================================
// BOOKING EMAILS
// ============================================

export async function sendBookingConfirmationEmail(bookingData: any) {
  // Transform database fields (snake_case) to template props (camelCase)
  const emailProps = {
    bookingNumber: bookingData.booking_number,
    customerName: bookingData.customer_name,
    productName: bookingData.products?.name || 'Golf Cart',
    productTier: bookingData.products?.tier || 'Standard',
    quantity: bookingData.quantity,
    rentalType: bookingData.rental_type,
    startDate: new Date(bookingData.start_date),
    endDate: new Date(bookingData.end_date),
    durationHours: bookingData.duration_hours,
    durationDays: bookingData.duration_days,
    baseRate: bookingData.base_rate || 0,
    addonTotal: bookingData.addon_total || 0,
    subtotal: bookingData.subtotal || 0,
    taxAmount: bookingData.tax_amount || 0,
    totalAmount: bookingData.total_amount,
    selectedAddons: bookingData.selected_addons || [],
    deliveryAddress: bookingData.delivery_address,
    pickupLocation: bookingData.pickup_location,
    specialRequests: bookingData.special_requests,
  };

  return sendEmail({
    to: bookingData.customer_email,
    subject: `Booking Confirmed #${bookingData.booking_number} - Club Caddy Carts`,
    react: React.createElement(BookingConfirmationCustomerEmail, emailProps),
  })
}

export async function sendBookingConfirmationAdminEmail(bookingData: any) {
  // Transform database fields (snake_case) to template props (camelCase)
  const emailProps = {
    bookingNumber: bookingData.booking_number,
    bookingId: bookingData.id,
    customerName: bookingData.customer_name,
    customerEmail: bookingData.customer_email,
    customerPhone: bookingData.customer_phone,
    productName: bookingData.products?.name || 'Unknown Product',
    productTier: bookingData.products?.tier || 'Standard',
    quantity: bookingData.quantity,
    rentalType: bookingData.rental_type,
    startDate: new Date(bookingData.start_date),
    endDate: new Date(bookingData.end_date),
    durationHours: bookingData.duration_hours,
    durationDays: bookingData.duration_days,
    baseRate: bookingData.base_rate || 0,
    addonTotal: bookingData.addon_total || 0,
    subtotal: bookingData.subtotal || 0,
    taxAmount: bookingData.tax_amount || 0,
    totalAmount: bookingData.total_amount,
    selectedAddons: bookingData.selected_addons || [],
    deliveryAddress: bookingData.delivery_address,
    pickupLocation: bookingData.pickup_location,
    specialRequests: bookingData.special_requests,
    stripePaymentIntentId: bookingData.stripe_payment_intent_id || 'N/A',
    paidAt: new Date(bookingData.paid_at || bookingData.updated_at),
  };

  return sendEmail({
    to: ADMIN_EMAIL,
    subject: `New Booking #${bookingData.booking_number} - Action Required`,
    react: React.createElement(BookingConfirmationAdminEmail, emailProps),
  })
}

export async function sendBookingReminder(bookingData: any) {
  return sendEmail({
    to: bookingData.customer_email,
    subject: `Reminder: Your Rental Starts Tomorrow - Booking #${bookingData.booking_number}`,
    react: React.createElement(BookingReminderEmail, bookingData),
  })
}

export async function sendBookingThankYou(bookingData: any) {
  return sendEmail({
    to: bookingData.customer_email,
    subject: `Thank You for Choosing Club Caddy Carts! - Booking #${bookingData.booking_number}`,
    react: React.createElement(BookingThankYouEmail, bookingData),
  })
}

// ============================================
// ORDER PAYMENT EMAILS
// ============================================

export async function sendOrderDepositConfirmation(orderData: any) {
  const emailProps = {
    orderNumber: orderData.order_number,
    customerName: orderData.customer_name,
    depositAmount: orderData.deposit_amount,
    balanceDue: orderData.balance_due,
    totalAmount: orderData.total_amount,
    subtotal: orderData.subtotal,
    deliveryCost: orderData.delivery_cost || 0,
    deliveryMethod: orderData.delivery_method || 'delivery',
    items: orderData.items,
    orderUrl: `${process.env.NEXT_PUBLIC_APP_URL}/orders/${orderData.id}`,
  };

  // Format shipping address as string for PDF
  const formatShippingAddress = (address: any) => {
    if (!address) return null;
    const parts = [
      address.addressLine1,
      address.addressLine2,
      `${address.city} ${address.postalCode}`,
      address.region,
      address.country
    ].filter(Boolean);
    return parts.join(', ');
  };

  // Generate PDF invoice
  const pdfProps = {
    orderNumber: orderData.order_number,
    customerName: orderData.customer_name,
    customerEmail: orderData.customer_email,
    customerPhone: orderData.customer_phone,
    deliveryMethod: orderData.delivery_method || 'delivery',
    shippingAddress: formatShippingAddress(orderData.shipping_address),
    subtotal: Math.round(orderData.subtotal * 100), // Convert to cents
    deliveryCost: Math.round((orderData.delivery_cost || 0) * 100), // Convert to cents
    depositAmount: Math.round(orderData.deposit_amount * 100), // Convert to cents
    balanceDue: Math.round(orderData.balance_due * 100), // Convert to cents
    totalAmount: Math.round(orderData.total_amount * 100), // Convert to cents
    items: orderData.items,
    orderDate: new Date(orderData.created_at || Date.now()).toLocaleDateString('en-NZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  };

  try {
    // Render PDF to buffer
    const pdfBuffer = await renderToBuffer(React.createElement(DepositInvoicePDF, pdfProps));

    return sendEmail({
      to: orderData.customer_email,
      subject: `Deposit Received - Order #${orderData.order_number} - Club Caddy Carts`,
      react: React.createElement(DepositConfirmationEmail, emailProps),
      attachments: [
        {
          filename: `Invoice-${orderData.order_number}.pdf`,
          content: pdfBuffer,
        },
      ],
    });
  } catch (pdfError) {
    console.error('Failed to generate PDF invoice:', pdfError);
    // Send email without PDF if PDF generation fails
    return sendEmail({
      to: orderData.customer_email,
      subject: `Deposit Received - Order #${orderData.order_number} - Club Caddy Carts`,
      react: React.createElement(DepositConfirmationEmail, emailProps),
    });
  }
}

export async function sendOrderBalanceInvoice(orderData: any) {
  const emailProps = {
    orderNumber: orderData.order_number,
    customerName: orderData.customer_name,
    depositAmount: orderData.deposit_amount,
    balanceDue: orderData.balance_due,
    totalAmount: orderData.total_amount,
    items: orderData.items,
    paymentLink: `${process.env.NEXT_PUBLIC_APP_URL}/orders/${orderData.id}/pay-balance`,
    shippingAddress: orderData.shipping_address,
  };

  return sendEmail({
    to: orderData.customer_email,
    subject: `Your Golf Cart is Ready! Final Payment Required - Order #${orderData.order_number}`,
    react: React.createElement(BalanceInvoiceEmail, emailProps),
  })
}

export async function sendOrderBalancePaid(orderData: any) {
  const emailProps = {
    orderNumber: orderData.order_number,
    customerName: orderData.customer_name,
    balanceAmount: orderData.balance_due,
    totalPaid: orderData.total_amount,
    orderUrl: `${process.env.NEXT_PUBLIC_APP_URL}/orders/${orderData.id}`,
    shippingAddress: orderData.shipping_address,
  };

  return sendEmail({
    to: orderData.customer_email,
    subject: `Payment Complete! Delivery Being Scheduled - Order #${orderData.order_number}`,
    react: React.createElement(BalancePaidEmail, emailProps),
  })
}
