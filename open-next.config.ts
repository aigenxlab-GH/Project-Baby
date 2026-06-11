// OpenNext configuration for Cloudflare Workers.
// Docs: https://opennext.js.org/cloudflare/caching
import { defineCloudflareConfig } from "@opennextjs/cloudflare";
// Default export is a ready-to-use StaticAssetsIncrementalCache instance.
// NOTE: the import specifier must be the bare subpath — the package's
// "exports" map is { "./*": "./dist/api/*.js" }, so this resolves to
// ./dist/api/overrides/incremental-cache/static-assets-incremental-cache.js.
// Do NOT include the "dist/api/" prefix or the ".js" suffix or esbuild will
// double them (./dist/api/dist/api/....js.js) and fail to resolve.
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// Serve pre-rendered pages from Cloudflare Workers Static Assets instead of
// re-rendering React on every request. The .cache files are placed under
// cdn-cgi/_next_cache/[buildId]/ at build time by scripts/copy-cache-to-assets.mjs.
// The cdn-cgi/ prefix keeps them inaccessible to browsers but reachable by the
// Worker via env.ASSETS.fetch(). This drops per-request CPU from ~10-15 ms
// (full re-render) to ~1 ms (asset read), fixing Error 1102 on the free plan.
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
