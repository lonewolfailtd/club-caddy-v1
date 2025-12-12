/**
 * Rate Limiting Utility
 *
 * Implements rate limiting using Upstash Redis to prevent API abuse,
 * DDoS attacks, and brute force attempts.
 *
 * Compliance: OWASP A07, ASVS V13, CIS Control 13, NIST SI-10
 *
 * Setup Required:
 * 1. Sign up at https://upstash.com (free tier available)
 * 2. Create Redis database
 * 3. Add to .env.local:
 *    UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
 *    UPSTASH_REDIS_REST_TOKEN=xxx
 */

import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Check if Upstash credentials are configured
const isConfigured = !!(
  process.env.UPSTASH_REDIS_REST_URL &&
  process.env.UPSTASH_REDIS_REST_TOKEN
);

// Create Redis client (or null if not configured)
const redis = isConfigured
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : null;

/**
 * Rate Limit Configurations
 *
 * Each limiter defines:
 * - Window: Time period for the limit (e.g., "1 h" = 1 hour)
 * - Limit: Number of requests allowed in that window
 * - Algorithm: slidingWindow (most accurate, prevents bursts)
 */

// Strict limit for booking creation (prevent reservation spam)
export const bookingCreationLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(3, '1 h'), // 3 bookings per hour per IP/user
      analytics: true,
      prefix: 'ratelimit:booking:create',
    })
  : null;

// Moderate limit for availability checks (prevent scraping)
export const availabilityCheckLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(30, '1 m'), // 30 checks per minute
      analytics: true,
      prefix: 'ratelimit:booking:availability',
    })
  : null;

// Strict limit for quote requests (prevent spam)
export const quoteRequestLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, '1 h'), // 5 quotes per hour
      analytics: true,
      prefix: 'ratelimit:quote:create',
    })
  : null;

// Moderate limit for checkout session creation
export const checkoutSessionLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, '10 m'), // 10 sessions per 10 minutes
      analytics: true,
      prefix: 'ratelimit:stripe:checkout',
    })
  : null;

// Strict limit for admin API endpoints
export const adminApiLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(100, '1 m'), // 100 requests per minute
      analytics: true,
      prefix: 'ratelimit:admin',
    })
  : null;

// General API rate limit (fallback)
export const generalApiLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(60, '1 m'), // 60 requests per minute
      analytics: true,
      prefix: 'ratelimit:api:general',
    })
  : null;

/**
 * Get identifier for rate limiting
 *
 * Prefers authenticated user ID over IP address to:
 * - Prevent rate limit bypass via VPN/proxy
 * - Allow legitimate users behind same NAT
 * - Track abuse by user account
 *
 * @param request - Next.js request object
 * @param userId - Optional authenticated user ID
 * @returns Identifier string for rate limiting
 */
export function getRateLimitIdentifier(
  request: Request,
  userId?: string
): string {
  // Prefer user ID if authenticated (more accurate)
  if (userId) {
    return `user:${userId}`;
  }

  // Fall back to IP address for unauthenticated requests
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded
    ? forwarded.split(',')[0].trim()
    : request.headers.get('x-real-ip') || 'anonymous';

  return `ip:${ip}`;
}

/**
 * Rate limit result interface
 */
export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

/**
 * Check rate limit for a request
 *
 * Returns success: true if request is allowed, false if rate limit exceeded.
 * Also returns metadata for response headers (X-RateLimit-*).
 *
 * @param request - Next.js request object
 * @param limiter - Ratelimit instance to use
 * @param identifier - Optional custom identifier (defaults to auto-detection)
 * @returns Rate limit result
 *
 * @example
 * ```typescript
 * const result = await checkRateLimit(request, bookingCreationLimiter, user?.id);
 * if (!result.success) {
 *   return NextResponse.json(
 *     { error: 'Too many requests' },
 *     {
 *       status: 429,
 *       headers: {
 *         'X-RateLimit-Limit': result.limit.toString(),
 *         'X-RateLimit-Remaining': '0',
 *         'Retry-After': Math.ceil((result.reset - Date.now()) / 1000).toString(),
 *       }
 *     }
 *   );
 * }
 * ```
 */
export async function checkRateLimit(
  request: Request,
  limiter: Ratelimit | null,
  identifier?: string
): Promise<RateLimitResult> {
  // If rate limiting not configured (missing Upstash credentials), allow all requests
  if (!limiter) {
    console.warn(
      'Rate limiting not configured. Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.'
    );
    return {
      success: true,
      limit: Infinity,
      remaining: Infinity,
      reset: Date.now(),
    };
  }

  // Get identifier (user ID or IP)
  const id = identifier || getRateLimitIdentifier(request);

  // Check rate limit
  const { success, limit, remaining, reset } = await limiter.limit(id);

  return {
    success,
    limit,
    remaining,
    reset,
  };
}

/**
 * Create standardized rate limit error response
 *
 * Returns Next.js Response with 429 status and proper headers.
 *
 * @param result - Rate limit result from checkRateLimit
 * @param message - Optional custom error message
 * @returns NextResponse with 429 status
 */
export function createRateLimitResponse(
  result: RateLimitResult,
  message: string = 'Too many requests. Please try again later.'
) {
  const { NextResponse } = require('next/server');

  const retryAfter = Math.ceil((result.reset - Date.now()) / 1000);

  return NextResponse.json(
    {
      error: message,
      retryAfter: new Date(result.reset).toISOString(),
    },
    {
      status: 429,
      headers: {
        'X-RateLimit-Limit': result.limit.toString(),
        'X-RateLimit-Remaining': '0',
        'X-RateLimit-Reset': result.reset.toString(),
        'Retry-After': retryAfter.toString(),
      },
    }
  );
}

/**
 * Rate limit middleware wrapper for API routes
 *
 * Simplifies rate limiting by wrapping your handler function.
 *
 * @param limiter - Ratelimit instance to use
 * @param handler - Your API route handler
 * @param getUserId - Optional function to extract user ID from request
 * @returns Wrapped handler with rate limiting
 *
 * @example
 * ```typescript
 * export const POST = withRateLimit(
 *   bookingCreationLimiter,
 *   async (request) => {
 *     // Your handler code
 *     return NextResponse.json({ success: true });
 *   },
 *   async (request) => {
 *     const supabase = await createClient();
 *     const { data: { user } } = await supabase.auth.getUser();
 *     return user?.id;
 *   }
 * );
 * ```
 */
export function withRateLimit(
  limiter: Ratelimit | null,
  handler: (request: Request, ...args: any[]) => Promise<Response>,
  getUserId?: (request: Request) => Promise<string | undefined>
) {
  return async (request: Request, ...args: any[]) => {
    // Get user ID if function provided
    const userId = getUserId ? await getUserId(request) : undefined;

    // Check rate limit
    const result = await checkRateLimit(request, limiter, userId);

    // If rate limit exceeded, return 429
    if (!result.success) {
      return createRateLimitResponse(result);
    }

    // Otherwise, call the original handler
    return handler(request, ...args);
  };
}

/**
 * Export configured status for monitoring
 */
export const rateLimitingEnabled = isConfigured;

/**
 * Log configuration status on module load
 */
if (!isConfigured) {
  console.warn(
    '⚠️  Rate limiting is DISABLED. Configure Upstash Redis to enable:\n' +
      '   1. Sign up at https://upstash.com\n' +
      '   2. Create Redis database\n' +
      '   3. Add UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN to .env.local'
  );
} else {
  console.log('✅ Rate limiting enabled with Upstash Redis');
}
