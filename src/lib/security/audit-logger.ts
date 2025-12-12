/**
 * Audit Logging Utility
 *
 * Provides functions to log security-relevant events for compliance,
 * incident response, and forensic analysis.
 *
 * Compliance: OWASP A09, CIS Control 8, GDPR Art. 30, PCI DSS Requirement 10
 *
 * Usage:
 * - Log all sensitive operations (create, update, delete, access)
 * - Log authentication events (login, logout, password reset)
 * - Log payment transactions (payment, refund)
 * - Log admin actions
 * - Log security events (rate limit exceeded, unauthorized access)
 */

import { createClient } from '@supabase/supabase-js';

// Create admin client for audit logging (bypasses RLS)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

/**
 * Audit action types
 */
export type AuditAction =
  | 'create'
  | 'update'
  | 'delete'
  | 'access'
  | 'export'
  | 'login'
  | 'logout'
  | 'password_reset'
  | 'payment'
  | 'refund';

/**
 * Resource types being audited
 */
export type AuditResourceType =
  | 'booking'
  | 'product'
  | 'user'
  | 'payment'
  | 'quote'
  | 'inventory'
  | 'pricing';

/**
 * Severity levels for audit events
 */
export type AuditSeverity = 'info' | 'warning' | 'critical';

/**
 * Audit log entry interface
 */
export interface AuditLogEntry {
  // Who performed the action
  userId?: string;
  userEmail?: string;
  userIpAddress?: string;
  userAgent?: string;

  // What action was performed
  action: AuditAction;
  resourceType: AuditResourceType;
  resourceId?: string;

  // Details of the action
  oldValues?: Record<string, any>;
  newValues?: Record<string, any>;
  metadata?: Record<string, any>;

  // Security classification
  severity?: AuditSeverity;
  success?: boolean;
  errorMessage?: string;
}

/**
 * Log an audit event
 *
 * This function never throws errors to prevent audit logging
 * failures from breaking normal application flow.
 *
 * @param entry - Audit log entry details
 *
 * @example
 * ```typescript
 * await logAudit({
 *   userId: user.id,
 *   userEmail: user.email,
 *   userIpAddress: ipAddress,
 *   userAgent,
 *   action: 'create',
 *   resourceType: 'booking',
 *   resourceId: booking.id,
 *   newValues: {
 *     booking_number: booking.booking_number,
 *     total_amount: booking.total_amount,
 *   },
 *   severity: 'info',
 *   success: true,
 * });
 * ```
 */
export async function logAudit(entry: AuditLogEntry): Promise<void> {
  try {
    const { error } = await supabaseAdmin.from('audit_logs').insert({
      user_id: entry.userId || null,
      user_email: entry.userEmail || null,
      user_ip_address: entry.userIpAddress || null,
      user_agent: entry.userAgent || null,
      action: entry.action,
      resource_type: entry.resourceType,
      resource_id: entry.resourceId || null,
      old_values: entry.oldValues || null,
      new_values: entry.newValues || null,
      metadata: entry.metadata || null,
      severity: entry.severity || 'info',
      success: entry.success !== false,
      error_message: entry.errorMessage || null,
    });

    if (error) {
      // Log audit logging failure to console, but don't throw
      console.error('⚠️ Audit logging failed:', error);
      console.error('Failed audit entry:', entry);
    }
  } catch (error) {
    // Never throw errors from audit logging
    console.error('⚠️ Audit logging exception:', error);
    console.error('Failed audit entry:', entry);
  }
}

/**
 * Helper to extract request metadata (IP and User Agent)
 *
 * @param request - Next.js Request object
 * @returns Object containing ipAddress and userAgent
 */
export function getRequestMetadata(request: Request): {
  ipAddress: string;
  userAgent: string;
} {
  // Get IP address from headers (supports proxies/load balancers)
  const forwarded = request.headers.get('x-forwarded-for');
  const ipAddress = forwarded
    ? forwarded.split(',')[0].trim()
    : request.headers.get('x-real-ip') || 'unknown';

  // Get user agent
  const userAgent = request.headers.get('user-agent') || 'unknown';

  return { ipAddress, userAgent };
}

/**
 * Log a booking action (create, update, delete, access)
 *
 * Convenience function for logging booking-related actions
 * with standardized format.
 *
 * @param action - The action being performed
 * @param booking - The booking object
 * @param request - Next.js Request object
 * @param userId - Optional user ID (if authenticated)
 * @param oldValues - Optional old values (for updates)
 * @param success - Whether the action succeeded
 * @param errorMessage - Optional error message if failed
 */
export async function logBookingAction(params: {
  action: 'create' | 'update' | 'delete' | 'access';
  booking: any;
  request: Request;
  userId?: string;
  oldValues?: Record<string, any>;
  success?: boolean;
  errorMessage?: string;
}): Promise<void> {
  const { ipAddress, userAgent } = getRequestMetadata(params.request);

  await logAudit({
    userId: params.userId,
    userEmail: params.booking.customer_email,
    userIpAddress: ipAddress,
    userAgent,
    action: params.action,
    resourceType: 'booking',
    resourceId: params.booking.id,
    oldValues: params.oldValues,
    newValues: {
      booking_number: params.booking.booking_number,
      status: params.booking.status,
      payment_status: params.booking.payment_status,
      total_amount: params.booking.total_amount,
    },
    severity: params.action === 'delete' ? 'warning' : 'info',
    success: params.success !== false,
    errorMessage: params.errorMessage,
  });
}

/**
 * Log a payment action (payment, refund)
 *
 * Convenience function for logging payment-related actions
 * with standardized format.
 *
 * @param action - The payment action ('payment' or 'refund')
 * @param booking - The booking associated with the payment
 * @param paymentIntentId - Stripe payment intent ID
 * @param amount - Payment amount
 * @param request - Next.js Request object
 * @param success - Whether the action succeeded
 * @param errorMessage - Optional error message if failed
 */
export async function logPaymentAction(params: {
  action: 'payment' | 'refund';
  booking: any;
  paymentIntentId: string;
  amount: number;
  request: Request;
  success?: boolean;
  errorMessage?: string;
}): Promise<void> {
  const { ipAddress, userAgent } = getRequestMetadata(params.request);

  await logAudit({
    userId: params.booking.user_id,
    userEmail: params.booking.customer_email,
    userIpAddress: ipAddress,
    userAgent,
    action: params.action,
    resourceType: 'payment',
    resourceId: params.booking.id,
    newValues: {
      payment_intent_id: params.paymentIntentId,
      amount: params.amount,
      booking_number: params.booking.booking_number,
    },
    severity: 'critical', // Payments are always critical
    success: params.success !== false,
    errorMessage: params.errorMessage,
  });
}

/**
 * Log admin action (any admin operation)
 *
 * Convenience function for logging admin actions with
 * automatic critical severity.
 *
 * @param action - The action being performed
 * @param resourceType - Type of resource being acted upon
 * @param resourceId - ID of the resource
 * @param request - Next.js Request object
 * @param userId - Admin user ID
 * @param userEmail - Admin user email
 * @param details - Additional details about the action
 */
export async function logAdminAction(params: {
  action: AuditAction;
  resourceType: AuditResourceType;
  resourceId?: string;
  request: Request;
  userId: string;
  userEmail: string;
  details?: Record<string, any>;
}): Promise<void> {
  const { ipAddress, userAgent } = getRequestMetadata(params.request);

  await logAudit({
    userId: params.userId,
    userEmail: params.userEmail,
    userIpAddress: ipAddress,
    userAgent,
    action: params.action,
    resourceType: params.resourceType,
    resourceId: params.resourceId,
    metadata: params.details,
    severity: 'warning', // Admin actions are always warnings
    success: true,
  });
}

/**
 * Log authentication event (login, logout, password reset)
 *
 * Convenience function for logging auth events.
 *
 * @param action - The auth action
 * @param userEmail - User's email
 * @param request - Next.js Request object
 * @param userId - Optional user ID (might not be available for failed logins)
 * @param success - Whether the action succeeded
 * @param errorMessage - Optional error message if failed
 */
export async function logAuthEvent(params: {
  action: 'login' | 'logout' | 'password_reset';
  userEmail: string;
  request: Request;
  userId?: string;
  success?: boolean;
  errorMessage?: string;
}): Promise<void> {
  const { ipAddress, userAgent } = getRequestMetadata(params.request);

  await logAudit({
    userId: params.userId,
    userEmail: params.userEmail,
    userIpAddress: ipAddress,
    userAgent,
    action: params.action,
    resourceType: 'user',
    severity: params.success === false ? 'warning' : 'info',
    success: params.success !== false,
    errorMessage: params.errorMessage,
  });
}

/**
 * Log security event (rate limit, unauthorized access, etc.)
 *
 * Convenience function for logging security-related events
 * with automatic critical severity.
 *
 * @param eventType - Description of the security event
 * @param request - Next.js Request object
 * @param userId - Optional user ID
 * @param userEmail - Optional user email
 * @param details - Additional details about the event
 */
export async function logSecurityEvent(params: {
  eventType: string;
  request: Request;
  userId?: string;
  userEmail?: string;
  details?: Record<string, any>;
}): Promise<void> {
  const { ipAddress, userAgent } = getRequestMetadata(params.request);

  await logAudit({
    userId: params.userId,
    userEmail: params.userEmail,
    userIpAddress: ipAddress,
    userAgent,
    action: 'access', // Security events are access attempts
    resourceType: 'user',
    metadata: {
      event_type: params.eventType,
      ...params.details,
    },
    severity: 'critical',
    success: false, // Security events are usually failed attempts
  });
}

/**
 * Export status for monitoring
 */
export const auditLoggingEnabled = !!(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Log configuration status
if (!auditLoggingEnabled) {
  console.warn('⚠️  Audit logging is DISABLED. Check Supabase configuration.');
} else {
  console.log('✅ Audit logging enabled');
}
