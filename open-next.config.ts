// OpenNext configuration for Cloudflare Pages
// Docs: https://opennext.js.org/cloudflare
import type { OpenNextConfig } from "@opennextjs/cloudflare";

const config: OpenNextConfig = {
  // All routes (pages, API routes, etc.) run in the Cloudflare Workers Node.js runtime.
  // The nodejs_compat flag in wrangler.toml provides full Node.js built-in support.
  default: {
    override: {
      wrapper: "cloudflare-node",
      converter: "edge",
      proxyExternalRequest: "fetch",
      // Use pre-rendered pages stored in Cloudflare Workers Static Assets.
      // Files are placed under cdn-cgi/_next_cache/[buildId]/ at build time by
      // scripts/copy-cache-to-assets.mjs.  The cdn-cgi/ prefix makes them
      // inaccessible to browsers but reachable by the Worker via env.ASSETS.fetch().
      // This eliminates full-page React re-rendering on every request, keeping
      // CPU time well below the 10 ms free-plan limit and fixing Error 1102.
      incrementalCache: () =>
        import(
          "@opennextjs/cloudflare/dist/api/overrides/incremental-cache/static-assets-incremental-cache.js"
        ).then((m) => m.default),
      tagCache: "dummy",
      queue: "dummy",
    },
  },

  edgeExternals: ["node:crypto"],

  middleware: {
    external: true,
    override: {
      wrapper: "cloudflare-edge",
      converter: "edge",
      proxyExternalRequest: "fetch",
      // Middleware only handles routing — it never serves page content,
      // so the dummy cache is correct here.
      incrementalCache: "dummy",
      tagCache: "dummy",
      queue: "dummy",
    },
  },
};

export default config;
