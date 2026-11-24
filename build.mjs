// Builds dist/index.html: a single self-contained file with Tailwind compiled
// to static CSS in place of the cdn.tailwindcss.com runtime script.
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const CDN_BLOCK = /[ \t]*<script src="https:\/\/cdn\.tailwindcss\.com"><\/script>\n/;
const CONFIG_BLOCK = /[ \t]*<script>\s*tailwind\.config = [\s\S]*?<\/script>\n/;

const src = readFileSync('src/index.html', 'utf8');
if (!CDN_BLOCK.test(src) || !CONFIG_BLOCK.test(src)) {
  throw new Error('Tailwind CDN script or inline tailwind.config not found in src/index.html');
}

mkdirSync('dist', { recursive: true });
const css = execFileSync(
  'npx',
  ['tailwindcss', '-c', 'tailwind.config.js', '--minify'],
  { encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'] },
);

const out = src
  .replace(CDN_BLOCK, '')
  .replace(CONFIG_BLOCK, () => `  <style>${css.trim()}</style>\n`);
writeFileSync('dist/index.html', out);
console.log(`dist/index.html: ${out.length} bytes (css ${css.length})`);
