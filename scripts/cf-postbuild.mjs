/**
 * Post-build step for Cloudflare Pages.
 *
 * @opennextjs/cloudflare outputs:
 *   .open-next/assets/   ← static files (served by CDN)
 *   .open-next/worker.js ← Cloudflare Worker (handles SSR + API routes)
 *
 * Cloudflare Pages "Advanced Mode" looks for _worker.js at the ROOT of
 * pages_build_output_dir (.open-next/assets). This script copies it there.
 */

import { copyFileSync, existsSync, mkdirSync } from 'node:fs';

const WORKER_SRC = '.open-next/worker.js';
const ASSETS_DIR = '.open-next/assets';
const WORKER_DEST = `${ASSETS_DIR}/_worker.js`;

if (existsSync(WORKER_DEST)) {
  console.log('✓ _worker.js already in assets — skipping copy');
} else if (existsSync(WORKER_SRC)) {
  mkdirSync(ASSETS_DIR, { recursive: true });
  copyFileSync(WORKER_SRC, WORKER_DEST);
  console.log('✓ Cloudflare worker copied:', WORKER_SRC, '→', WORKER_DEST);
} else {
  console.warn('⚠ No worker.js found at', WORKER_SRC, '— SSR/API routes may not work');
}
