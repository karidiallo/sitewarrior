import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
const build = process.argv.includes('--dist');
const root = process.cwd();
const languages = ['en', 'pl', 'no', 'fr', 'de'];
let issues = 0;
for (const lang of languages) {
  const page = join(root, build ? 'dist' : '.', lang === 'en' ? 'index.html' : `${lang}/index.html`);
  if (!existsSync(page)) { console.error(`MISSING: ${page}`); issues++; continue; }
  const html = readFileSync(page, 'utf8');
  if (!html.includes('id="app"')) { console.error(`MISSING ROOT: ${page}`); issues++; }
  if (!build && !html.includes(`/src/main-${lang}.js`)) { console.error(`ENTRY ERROR: ${page}`); issues++; }
  if (build) {
    const js = [...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map(x => x[1]);
    if (!js.some(x => x.startsWith('/assets/') && x.endsWith('.js'))) { console.error(`BAD BUNDLED SCRIPT: ${page}: ${js}`); issues++; }
    for (const item of js) {
      if (!item.startsWith('/')) continue;
      if (!existsSync(join(root, 'dist', item.slice(1)))) { console.error(`MISSING ASSET: ${item}`); issues++; }
    }
  }
}
if (build) {
  for (const lang of languages) {
    const page = join(root, 'dist', lang === 'en' ? 'index.html' : `${lang}/index.html`);
    if (!existsSync(page)) continue;
    const html = readFileSync(page, 'utf8');
    for (const [, href] of html.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g)) {
      if (!existsSync(join(root, 'dist', href.slice(1)))) { console.error(`MISSING ASSET: ${href}`); issues++; }
    }
  }
}
if (issues) process.exit(1);
console.log(`OK: ${languages.length} language pages, ${build ? 'production' : 'source'} checks passed.`);
