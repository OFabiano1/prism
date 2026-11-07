/**
 * Concatena os CSS do PRISM em dois artefatos:
 *   dist/tokens.css  — só os tokens
 *   dist/styles.css  — tokens + primitives + componentes
 * Resolve @import em linha, na ordem declarada. Sem minificar: o pacote é legível.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');

const IMPORT = /@import\s+['"]([^'"]+)['"]\s*;/g;

async function inline(file, seen = new Set()) {
  const absolute = path.resolve(file);
  if (seen.has(absolute)) {
    throw new Error(`@import circular em ${path.relative(root, absolute)}`);
  }
  seen.add(absolute);

  const source = await readFile(absolute, 'utf8');
  const parts = [];
  let cursor = 0;

  for (const match of source.matchAll(IMPORT)) {
    parts.push(source.slice(cursor, match.index));
    const next = path.resolve(path.dirname(absolute), match[1]);
    parts.push(await inline(next, new Set(seen)));
    cursor = match.index + match[0].length;
  }
  parts.push(source.slice(cursor));
  return parts.join('');
}

async function build(entry, out) {
  const css = await inline(path.join(root, entry));
  await writeFile(path.join(dist, out), css.trimStart() + '\n', 'utf8');
  return css.length;
}

await mkdir(dist, { recursive: true });
const tokens = await build('tokens/index.css', 'tokens.css');
const styles = await build('src/styles.css', 'styles.css');
console.log(`dist/tokens.css  ${tokens} bytes`);
console.log(`dist/styles.css  ${styles} bytes`);
