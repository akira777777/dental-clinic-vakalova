/**
 * Rate Limiting Utility
 *
 * Development: In-memory Map (single instance)
 * Production: Upstash Redis (distributed)
 */

import { NextRequest } from "next/server";

// In-memory store for development
const rateLimitStore = new Map<
  string,
  { count: number; resetTime: number }
>();

interface RateLimitConfig {
  /**
   * Maximum number of requests allowed
   */
  max: number;

  /**
   * Time window in seconds
   */
  windowSeconds: number;

  /**
   * Custom identifier (defaults to IP)
   */
  identifier?: string;
}

interface RateLimitResult {
  /**
   * Whether the request is allowed
   */
  success: boolean;

  /**
   * Seconds until reset
   */
  retryAfter?: number;

  /**
   * Current count
   */
  remaining?: number;
}

/**
 * Rate limit a request
 *
 * @example
 * ```ts
 * const result = await rateLimit(request, {
 *   max: 5,
 *   windowSeconds: 900 // 15 minutes
 * });
 *
 * if (!result.success) {
 *   return NextResponse.json(
 *     { error: 'Too many requests' },
 *     { status: 429 }
 *   );
 * }
 * ```
 */
export async function rateLimit(
  request: NextRequest,
  config: RateLimitConfig
): Promise<RateLimitResult> {
  const { max, windowSeconds, identifier } = config;

  // Get identifier (IP address or custom)
  const ip = identifier || getClientIP(request);

  if (!ip) {
    // If we can't determine IP, allow the request (fail open)
    console.warn('[Rate Limit] Could not determine client IP');
    return { success: true };
  }

  // In production with Upstash Redis, this would use Redis
  // For now, use in-memory Map
  return inMemoryRateLimit(ip, max, windowSeconds);
}

/**
 * In-memory rate limiting (for development)
 */
function inMemoryRateLimit(
  key: string,
  max: number,
  windowSeconds: number
): RateLimitResult {
  const now = Date.now();
  const windowMs = windowSeconds * 1000;

  const record = rateLimitStore.get(key);

  // No record or expired window
  if (!record || now > record.resetTime) {
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + windowMs
    });

    return {
      success: true,
      remaining: max - 1
    };
  }

  // Within window
  if (record.count < max) {
    record.count++;
    rateLimitStore.set(key, record);

    return {
      success: true,
      remaining: max - record.count
    };
  }

  // Rate limit exceeded
  const retryAfter = Math.ceil((record.resetTime - now) / 1000);

  return {
    success: false,
    retryAfter,
    remaining: 0
  };
}

/**
 * Get client IP address from request
 */
function getClientIP(request: NextRequest): string | null {
  // Try various headers (Vercel, Cloudflare, etc.)
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }

  // Fallback: no IP available
  return null;
}

/**
 * Cleanup expired entries (run periodically)
 *
 * In production with Redis, this is handled automatically by TTL
 */
export function cleanupRateLimitStore(): void {
  const now = Date.now();

  for (const [key, record] of rateLimitStore.entries()) {
    if (now > record.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}

// Cleanup every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupRateLimitStore, 5 * 60 * 1000);
}
