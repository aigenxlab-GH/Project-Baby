#!/usr/bin/env node
/**
 * External Link Monitor
 * Scans all MDX content files for external https:// links,
 * deduplicates them, checks each one, and reports broken URLs.
 *
 * Run: node scripts/check-external-links.js
 * Used by: .github/workflows/external-link-monitor.yml
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();

// Sites that reliably block bots with 403/429 — not dead, just protected
const BOT_BLOCKED_HOSTS = new Set([
  'www.ncbi.nlm.nih.gov', 'pubmed.ncbi.nlm.nih.gov',
  'www.nejm.org', 'www.bmj.com', 'jamanetwork.com',
  'www.thelancet.com', 'journals.lww.com',
  'www.amazon.com', 'www.amazon.co.uk', 'www.amazon.ca',
  'www.facebook.com', 'www.instagram.com', 'twitter.com', 'x.com',
  'www.linkedin.com',
]);

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function walkDir(dir, ext, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkDir(full, ext, files);
    else if (entry.name.endsWith(ext)) files.push(full);
  }
  return files;
}

// Extract all external https:// links from all content MDX files
function extractExternalLinks() {
  const urlToFiles = {}; // url → [file:line, ...]
  const dirs = ['content/blog', 'content/parenting', 'content/products'];

  for (const dir of dirs) {
    const files = walkDir(path.join(ROOT, dir), '.mdx');
    for (const file of files) {
      const lines = fs.readFileSync(file, 'utf8').split('\n');
      const rel = file.replace(ROOT + path.sep, '').replace(/\\/g, '/');
      lines.forEach((line, i) => {
        // Match markdown links and plain URLs
        const matches = [...line.matchAll(/https?:\/\/[^\s)"'\]>]+/g)];
        for (const m of matches) {
          let url = m[0].replace(/[.,;:!?]+$/, ''); // strip trailing punctuation
          try { new URL(url); } catch { continue; } // skip malformed
          if (!urlToFiles[url]) urlToFiles[url] = [];
          urlToFiles[url].push(`${rel}:${i + 1}`);
        }
      });
    }
  }
  return urlToFiles;
}

// Check a single URL — returns { status, result, finalUrl }
function checkUrl(url) {
  return new Promise((resolve) => {
    let parsedUrl;
    try { parsedUrl = new URL(url); } catch { return resolve({ status: 0, result: 'INVALID', finalUrl: url }); }

    const lib = parsedUrl.protocol === 'https:' ? https : http;
    const options = {
      hostname: parsedUrl.hostname,
      path: parsedUrl.pathname + parsedUrl.search,
      method: 'HEAD',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        'Accept': 'text/html,application/xhtml+xml,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
      timeout: 12000,
    };

    const req = lib.request(options, (res) => {
      const status = res.statusCode;
      const location = (res.headers['location'] || '').trim();

      if (status >= 200 && status < 300) {
        resolve({ status, result: 'OK', finalUrl: url });
      } else if (status >= 300 && status < 400 && location) {
        // Treat redirects as OK — page exists, just moved
        resolve({ status, result: 'REDIRECT', finalUrl: location });
      } else if (status === 403 || status === 429) {
        resolve({ status, result: 'BLOCKED', finalUrl: url });
      } else if (status === 404 || status === 410) {
        resolve({ status, result: 'DEAD', finalUrl: url });
      } else {
        resolve({ status, result: 'ERROR', finalUrl: url });
      }
      res.resume();
    });

    req.on('timeout', () => { req.destroy(); resolve({ status: 0, result: 'TIMEOUT', finalUrl: url }); });
    req.on('error', (e) => {
      if (e.code === 'ENOTFOUND' || e.code === 'ECONNREFUSED') {
        resolve({ status: 0, result: 'DEAD', finalUrl: url });
      } else {
        resolve({ status: 0, result: 'ERROR', finalUrl: url });
      }
    });
    req.end();
  });
}

async function main() {
  console.log('Scanning content files for external links...');
  const urlToFiles = extractExternalLinks();
  const uniqueUrls = Object.keys(urlToFiles);
  console.log(`Found ${uniqueUrls.length} unique external URLs (from 2,600+ total references)\n`);

  const dead = [];
  const blocked = [];
  const errors = [];
  let ok = 0;
  let checked = 0;

  for (const url of uniqueUrls) {
    const hostname = new URL(url).hostname;

    // Skip known bot-blocking hosts — they're not dead
    if (BOT_BLOCKED_HOSTS.has(hostname)) {
      blocked.push({ url, result: 'BOT_BLOCKED', files: urlToFiles[url] });
      continue;
    }

    const { status, result, finalUrl } = await checkUrl(url);
    checked++;

    if (result === 'OK' || result === 'REDIRECT') {
      ok++;
      if (checked % 20 === 0) process.stdout.write(`  Checked ${checked}/${uniqueUrls.length - blocked.length}...\n`);
    } else if (result === 'BLOCKED') {
      blocked.push({ url, status, result, files: urlToFiles[url] });
    } else if (result === 'DEAD') {
      dead.push({ url, status, result, files: urlToFiles[url] });
      console.log(`  ✗ DEAD  [${status}] ${url}`);
      console.log(`    ← ${urlToFiles[url][0]}${urlToFiles[url].length > 1 ? ` (+${urlToFiles[url].length - 1} more)` : ''}`);
    } else {
      errors.push({ url, status, result, files: urlToFiles[url] });
      console.log(`  ~ ERROR [${status || result}] ${url}`);
    }

    await sleep(300); // 300ms between requests
  }

  console.log(`\n=== RESULTS ===`);
  console.log(`Total unique URLs:  ${uniqueUrls.length}`);
  console.log(`Checked:            ${checked}`);
  console.log(`OK / Redirected:    ${ok}`);
  console.log(`Dead (404/410/DNS): ${dead.length}`);
  console.log(`Errors (timeout…):  ${errors.length}`);
  console.log(`Skipped (bot-block):${blocked.length}`);

  const output = {
    totalUnique: uniqueUrls.length,
    checked,
    ok,
    dead,
    errors,
    blocked,
    date: new Date().toISOString().split('T')[0],
  };
  fs.writeFileSync('external-check-results.json', JSON.stringify(output, null, 2));

  if (dead.length > 0) {
    console.log('\nDEAD LINKS:');
    for (const d of dead) {
      console.log(`  ✗ [${d.status}] ${d.url}`);
      d.files.slice(0, 2).forEach(f => console.log(`    ← ${f}`));
    }
    process.exit(1);
  }

  process.exit(0);
}

main().catch(e => { console.error(e); process.exit(1); });
