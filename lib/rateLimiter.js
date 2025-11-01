// lib/rateLimiter.js
// Simple in-memory token-bucket rate limiter per IP.
// NOT suitable for multi-instance (use Redis for production).

const BUCKETS = new Map();

/**
 * Options:
 *  - capacity: max tokens in bucket
 *  - refillRate: tokens added per second
 *  - cost: tokens consumed per request
 */
function getBucket(ip, opts = { capacity: 10, refillRate: 0.1 }) {
  if (!BUCKETS.has(ip)) {
    BUCKETS.set(ip, {
      tokens: opts.capacity,
      last: Date.now()
    });
  }
  return BUCKETS.get(ip);
}

export function consumeToken(ip, opts = { capacity: 10, refillRate: 0.2, cost: 1 }) {
  // opts.refillRate tokens per second
  const bucket = getBucket(ip, opts);
  const now = Date.now();
  const elapsedSec = (now - bucket.last) / 1000;
  const refill = elapsedSec * opts.refillRate;
  bucket.tokens = Math.min(opts.capacity, bucket.tokens + refill);
  bucket.last = now;

  if (bucket.tokens >= opts.cost) {
    bucket.tokens -= opts.cost;
    return { ok: true, tokensLeft: bucket.tokens };
  } else {
    return { ok: false, tokensLeft: bucket.tokens };
  }
}

// Optional: cleanup old buckets periodically to avoid memory leak
setInterval(() => {
  const TTL_MS = 1000 * 60 * 60; // 1 hour
  const now = Date.now();
  for (const [ip, b] of BUCKETS.entries()) {
    if (now - b.last > TTL_MS) BUCKETS.delete(ip);
  }
}, 1000 * 60 * 30); // every 30 min
