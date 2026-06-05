/**
 * Sliding-window rate limiter for Cloudflare Workers edge runtime.
 *
 * Architecture notes:
 * ─────────────────────────────────────────────────────────────────────────────
 * This implementation uses an in-process Map (per Cloudflare Worker isolate).
 * Each edge PoP runs its own isolate, so rate limits are per-location, not
 * globally coordinated across all 300+ Cloudflare PoPs.
 *
 * This is acceptable for abuse prevention (each location still rate-limits),
 * but if you need globally-coordinated rate limiting, migrate to:
 *   - Cloudflare Durable Objects (strongly consistent, same URL → same instance)
 *   - Cloudflare KV (eventually consistent, good for most use cases)
 *
 * KV upgrade path (when ready):
 *   1. Add KV binding in wrangler.toml:
 *      [[kv_namespaces]]
 *      binding = "RATE_LIMIT_KV"
 *      id = "your-kv-namespace-id"
 *   2. Replace ipMap.get/set with:
 *      await env.RATE_LIMIT_KV.get(key) / .put(key, value, { expirationTtl: windowSec })
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Algorithm: Sliding window — more accurate than fixed window.
 * Each request stores a timestamp array per IP. Requests outside the window
 * are pruned, then the count is checked against the limit.
 */

interface WindowEntry {
  timestamps: number[];
}

const store = new Map<string, WindowEntry>();

// Prune entries older than 5 minutes to avoid unbounded memory growth
const PRUNE_INTERVAL_MS = 5 * 60 * 1000;
let lastPrune = Date.now();

function pruneStale(windowMs: number) {
  const now = Date.now();
  if (now - lastPrune < PRUNE_INTERVAL_MS) return;
  lastPrune = now;
  const cutoff = now - windowMs;
  for (const [key, entry] of store) {
    const fresh = entry.timestamps.filter((t) => t > cutoff);
    if (fresh.length === 0) {
      store.delete(key);
    } else {
      entry.timestamps = fresh;
    }
  }
}

export interface RateLimitResult {
  /** Whether this request is within the allowed rate */
  success: boolean;
  /** How many more requests are allowed in this window */
  remaining: number;
  /** Unix timestamp (ms) when the window resets */
  resetAt: number;
}

/**
 * Check and record a request against the rate limit.
 *
 * @param key      Identifier — typically the client IP address
 * @param limit    Maximum requests allowed per window (default: 5)
 * @param windowMs Duration of the sliding window in ms (default: 60 000 = 1 min)
 */
export function rateLimit(
  key: string,
  { limit = 5, windowMs = 60_000 }: { limit?: number; windowMs?: number } = {}
): RateLimitResult {
  const now = Date.now();
  const cutoff = now - windowMs;

  // Periodic store pruning (non-blocking)
  pruneStale(windowMs);

  const entry = store.get(key) ?? { timestamps: [] };

  // Remove timestamps outside the current window (sliding)
  entry.timestamps = entry.timestamps.filter((t) => t > cutoff);

  const count = entry.timestamps.length;
  const resetAt = entry.timestamps[0]
    ? entry.timestamps[0] + windowMs
    : now + windowMs;

  if (count >= limit) {
    store.set(key, entry);
    return { success: false, remaining: 0, resetAt };
  }

  // Record this request
  entry.timestamps.push(now);
  store.set(key, entry);

  return {
    success: true,
    remaining: limit - entry.timestamps.length,
    resetAt,
  };
}
