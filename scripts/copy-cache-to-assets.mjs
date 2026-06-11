/**
 * Post-build: copy pre-rendered cache files into the ASSETS directory so that
 * StaticAssetsIncrementalCache can serve them from the Cloudflare ASSETS binding.
 *
 * Source:      .open-next/cache/[buildId]/**\/*.cache
 * Destination: .open-next/assets/cdn-cgi/_next_cache/[buildId]/**\/*.cache
 *
 * Why cdn-cgi/?
 *   Cloudflare does not expose cdn-cgi/* paths to browsers, but the Worker CAN
 *   access them via env.ASSETS.fetch().  This keeps the pre-rendered HTML private
 *   (only the Worker serves it) while still being readable by StaticAssetsIncrementalCache.
 *
 * Run automatically as part of:
 *   npm run build:cloudflare
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

// ── Locate the build-ID directory ────────────────────────────────────────────
const cacheRoot = path.join(root, '.open-next', 'cache');

if (!fs.existsSync(cacheRoot)) {
  console.error('ERROR: .open-next/cache/ not found — run the build first.');
  process.exit(1);
}

const buildIds = fs
  .readdirSync(cacheRoot, { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => e.name);

if (buildIds.length === 0) {
  console.error('ERROR: No build-ID directory found under .open-next/cache/');
  process.exit(1);
}

const buildId = buildIds[0];
const srcDir  = path.join(cacheRoot, buildId);
const destDir = path.join(root, '.open-next', 'assets', 'cdn-cgi', '_next_cache', buildId);

console.log(`\nCopying pre-rendered cache to ASSETS — buildId: ${buildId}`);
console.log(`  src : ${srcDir}`);
console.log(`  dest: ${destDir}\n`);

// ── Recursive copy (only .cache files) ───────────────────────────────────────
let copied = 0;
let skipped = 0;

function copyRecursive(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath  = path.join(src,  entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else if (entry.name.endsWith('.cache')) {
      fs.copyFileSync(srcPath, destPath);
      copied++;
    } else {
      skipped++;
    }
  }
}

copyRecursive(srcDir, destDir);

console.log(`✓ Copied  ${copied}  .cache files  →  ASSETS/cdn-cgi/_next_cache/${buildId}/`);
if (skipped > 0) {
  console.log(`  (skipped ${skipped} non-.cache file(s))`);
}
console.log('');
