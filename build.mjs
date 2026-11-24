// Builds dist/: index.html with Tailwind compiled to static CSS inlined at the
// <!-- build:tailwind --> marker, plus the bundled cover images.
import { execFileSync } from 'node:child_process';
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';

const MARKER = '<!-- build:tailwind -->';

const src = readFileSync('src/index.html', 'utf8');
if (!src.includes(MARKER)) {
  throw new Error(`${MARKER} not found in src/index.html`);
}

const css = execFileSync(
  'npx',
  ['tailwindcss', '-c', 'tailwind.config.js', '--minify'],
  { encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'] },
);

rmSync('dist', { recursive: true, force: true });
mkdirSync('dist', { recursive: true });
const out = src.replace(MARKER, () => `<style>${css.trim()}</style>`);
writeFileSync('dist/index.html', out);
cpSync('src/images', 'dist/images', { recursive: true });
console.log(`dist/index.html: ${out.length} bytes (css ${css.length})`);
