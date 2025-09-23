// Simple in-memory rate limiting for development
// In production, use Redis or a proper rate limiting service

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

export function checkRateLimit(
  ip: string,
  maxRequests: number = 3,
  windowMs: number = 10 * 60 * 1000 // 10 minutes
): { allowed: boolean; remaining: number; resetTime: number } {
  // Only apply rate limiting in development
  if (process.env.NODE_ENV !== 'development') {
    return { allowed: true, remaining: maxRequests, resetTime: Date.now() + windowMs };
  }

  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    // New entry or expired entry
    const newEntry: RateLimitEntry = {
      count: 1,
      resetTime: now + windowMs,
    };
    rateLimitMap.set(ip, newEntry);
    return { allowed: true, remaining: maxRequests - 1, resetTime: newEntry.resetTime };
  }

  if (entry.count >= maxRequests) {
    // Rate limit exceeded
    return { allowed: false, remaining: 0, resetTime: entry.resetTime };
  }

  // Increment count
  entry.count++;
  rateLimitMap.set(ip, entry);
  
  return { allowed: true, remaining: maxRequests - entry.count, resetTime: entry.resetTime };
}

// Clean up expired entries periodically (every hour)
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap.entries()) {
    if (now > entry.resetTime) {
      rateLimitMap.delete(ip);
    }
  }
}, 60 * 60 * 1000);
