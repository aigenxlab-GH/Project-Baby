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
      incrementalCache: "dummy",
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
      incrementalCache: "dummy",
      tagCache: "dummy",
      queue: "dummy",
    },
  },
};

export default config;
