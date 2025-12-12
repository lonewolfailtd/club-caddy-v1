/**
 * Error Sanitization Utility
 *
 * Prevents information disclosure by sanitizing error messages before
 * sending them to clients. Implements OWASP A05 (Security Misconfiguration)
 * and ASVS V7 (Error Handling and Logging) requirements.
 *
 * Security principle: Log detailed errors server-side, return generic errors to client
 */

import { z } from 'zod';

/**
 * Standard error response format
 */
export interface SanitizedError {
  error: string;
  status: number;
  fields?: Array<{ field: string; message: string }>;
}

/**
 * Sanitize database and generic errors
 *
 * Maps Supabase/Postgres error codes to generic user-friendly messages.
 * Prevents leaking database structure and internal implementation details.
 *
 * @param error - The error object to sanitize
 * @param operation - Operation name for server-side logging
 * @returns Sanitized error object safe to send to client
 *
 * @example
 * ```typescript
 * try {
 *   const { data, error } = await supabase.from('bookings').select();
 *   if (error) throw error;
 * } catch (error) {
 *   const sanitized = sanitizeError(error, 'fetch_bookings');
 *   return NextResponse.json({ error: sanitized.error }, { status: sanitized.status });
 * }
 * ```
 */
export function sanitizeError(error: unknown, operation: string): SanitizedError {
  // Log full error details server-side for debugging
  console.error(`[${operation}] Error:`, error);

  // Check if error is an object with properties
  if (error && typeof error === 'object') {
    const err = error as any;

    // Map known database/Supabase error codes to generic messages
    const errorCodeMap: Record<string, SanitizedError> = {
      // Supabase/PostgREST errors
      'PGRST116': {
        error: 'Resource not found',
        status: 404,
      },
      'PGRST301': {
        error: 'Resource not found',
        status: 404,
      },

      // PostgreSQL permission errors
      '42501': {
        error: 'Access denied',
        status: 403,
      },
      '42P01': {
        error: 'Resource not available',
        status: 500,
      },

      // PostgreSQL constraint violations
      '23505': {
        error: 'This resource already exists',
        status: 409,
      },
      '23503': {
        error: 'Invalid reference - related resource not found',
        status: 400,
      },
      '23502': {
        error: 'Required field is missing',
        status: 400,
      },
      '23514': {
        error: 'Invalid data value',
        status: 400,
      },

      // PostgreSQL data errors
      '22P02': {
        error: 'Invalid data format',
        status: 400,
      },
      '22001': {
        error: 'Data value too long',
        status: 400,
      },

      // Connection errors
      '08000': {
        error: 'Service temporarily unavailable',
        status: 503,
      },
      '08003': {
        error: 'Service temporarily unavailable',
        status: 503,
      },
      '08006': {
        error: 'Service temporarily unavailable',
        status: 503,
      },
    };

    // Check for error code and return mapped error
    if (err.code && errorCodeMap[err.code]) {
      return errorCodeMap[err.code];
    }

    // Check for common error message patterns
    if (err.message && typeof err.message === 'string') {
      const message = err.message.toLowerCase();

      if (message.includes('not found') || message.includes('does not exist')) {
        return { error: 'Resource not found', status: 404 };
      }

      if (message.includes('permission') || message.includes('denied') || message.includes('forbidden')) {
        return { error: 'Access denied', status: 403 };
      }

      if (message.includes('duplicate') || message.includes('already exists')) {
        return { error: 'Resource already exists', status: 409 };
      }

      if (message.includes('invalid') || message.includes('malformed')) {
        return { error: 'Invalid request data', status: 400 };
      }

      if (message.includes('timeout') || message.includes('connection')) {
        return { error: 'Service temporarily unavailable', status: 503 };
      }
    }
  }

  // Default generic error for unknown cases
  return {
    error: 'An error occurred processing your request. Please try again later.',
    status: 500,
  };
}

/**
 * Sanitize Zod validation errors
 *
 * Returns only field names and user-friendly messages, not the full
 * validation schema or internal details.
 *
 * @param zodError - The Zod validation error
 * @returns Sanitized error object with field-level errors
 *
 * @example
 * ```typescript
 * const result = schema.safeParse(data);
 * if (!result.success) {
 *   const sanitized = sanitizeValidationError(result.error);
 *   return NextResponse.json(sanitized, { status: 400 });
 * }
 * ```
 */
export function sanitizeValidationError(zodError: z.ZodError): SanitizedError {
  // Log full validation details server-side
  console.error('Validation error:', {
    issues: zodError.issues,
    formErrors: zodError.formErrors,
  });

  // Extract only necessary information for client
  const fields = zodError.issues.map(issue => ({
    field: issue.path.join('.') || 'root',
    message: issue.message,
  }));

  return {
    error: 'Invalid request data. Please check your input and try again.',
    status: 400,
    fields,
  };
}

/**
 * Sanitize Stripe errors
 *
 * Stripe errors may contain sensitive information about payment processing.
 * This function returns generic messages while preserving user-actionable info.
 *
 * @param stripeError - The Stripe error object
 * @returns Sanitized error object
 */
export function sanitizeStripeError(stripeError: any): SanitizedError {
  console.error('Stripe error:', stripeError);

  // Map Stripe error types to user-friendly messages
  const stripeErrorMap: Record<string, string> = {
    'card_declined': 'Your payment method was declined. Please try a different payment method.',
    'expired_card': 'Your payment method has expired. Please use a different payment method.',
    'insufficient_funds': 'Insufficient funds. Please try a different payment method.',
    'incorrect_cvc': 'Invalid security code. Please check your payment details.',
    'processing_error': 'Payment processing error. Please try again.',
    'rate_limit': 'Too many payment attempts. Please try again later.',
  };

  if (stripeError && stripeError.type) {
    const errorMessage = stripeErrorMap[stripeError.type] ||
      'Payment processing error. Please try again or contact support.';

    return {
      error: errorMessage,
      status: 400,
    };
  }

  return {
    error: 'Payment processing error. Please try again later.',
    status: 500,
  };
}

/**
 * Sanitize authentication errors
 *
 * Prevents user enumeration and information disclosure about authentication
 * mechanisms.
 *
 * @param authError - The authentication error
 * @returns Sanitized error object
 */
export function sanitizeAuthError(authError: any): SanitizedError {
  console.error('Auth error:', authError);

  // Generic message prevents user enumeration
  const genericAuthError = {
    error: 'Authentication failed. Please check your credentials and try again.',
    status: 401,
  };

  if (!authError) {
    return genericAuthError;
  }

  // Only reveal specific errors that don't leak sensitive info
  if (authError.message && typeof authError.message === 'string') {
    const message = authError.message.toLowerCase();

    if (message.includes('email not confirmed') || message.includes('verify')) {
      return {
        error: 'Please verify your email address before signing in.',
        status: 403,
      };
    }

    if (message.includes('too many requests') || message.includes('rate limit')) {
      return {
        error: 'Too many login attempts. Please try again later.',
        status: 429,
      };
    }
  }

  return genericAuthError;
}

/**
 * Create a standardized error response for Next.js API routes
 *
 * @param sanitizedError - The sanitized error object
 * @returns NextResponse object ready to return from API route
 *
 * @example
 * ```typescript
 * catch (error) {
 *   const sanitized = sanitizeError(error, 'create_booking');
 *   return createErrorResponse(sanitized);
 * }
 * ```
 */
export function createErrorResponse(sanitizedError: SanitizedError) {
  const { NextResponse } = require('next/server');

  return NextResponse.json(
    {
      error: sanitizedError.error,
      ...(sanitizedError.fields && { fields: sanitizedError.fields }),
    },
    { status: sanitizedError.status }
  );
}
