import { sendEmail } from '../send'
import * as React from 'react'
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
} from '../templates'

const ADMIN_EMAIL = 'admin@clubcaddycarts.com'

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
  return sendEmail({
    to: bookingData.customer_email,
    subject: `Booking Confirmed #${bookingData.booking_number} - Club Caddy Carts`,
    react: React.createElement(BookingConfirmationCustomerEmail, bookingData),
  })
}

export async function sendBookingConfirmationAdminEmail(bookingData: any) {
  return sendEmail({
    to: ADMIN_EMAIL,
    subject: `New Booking #${bookingData.booking_number} - Action Required`,
    react: React.createElement(BookingConfirmationAdminEmail, bookingData),
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
