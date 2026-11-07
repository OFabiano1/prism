/**
 * check:tokens — integridade da camada de tokens.
 *
 * Regras:
 *   1. Hex literal só existe em tokens/colors.css.
 *   2. --prism-* só é declarado dentro de tokens/.
 *   3. Todo var(--x) usado em tokens/ e src/ tem declaração em tokens/.
 *   4. Todo @font-face aponta para um arquivo real.
 */
import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const TOKENS = path.join(root, 'tokens');
const SRC = path.join(root, 'src');
const EXAMPLES = path.join(root, 'examples');

async function cssFiles(directory) {
  const found = [];
  let entries;
  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch {
    return found;
  }
  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === 'dist-examples') continue;
    const next = path.join(directory, entry.name);
    if (entry.isDirectory()) found.push(...(await cssFiles(next)));
    else if (entry.name.endsWith('.css')) found.push(next);
  }
  return found;
}

function relative(file) {
  return path.relative(root, file).replaceAll('\\', '/');
}

const tokenFiles = await cssFiles(TOKENS);
const sourceFiles = await cssFiles(SRC);
const exampleFiles = await cssFiles(EXAMPLES);
const allFiles = [...tokenFiles, ...sourceFiles, ...exampleFiles];

test('hex literal existe só em tokens/colors.css', async () => {
  const allowed = path.join(TOKENS, 'colors.css');
  const offenders = [];
  for (const file of allFiles) {
    if (file === allowed) continue;
    const source = await readFile(file, 'utf8');
    const matches = source.match(/#[0-9a-fA-F]{3,8}\b/g) ?? [];
    if (matches.length > 0) offenders.push(`${relative(file)}: ${matches.join(', ')}`);
  }
  assert.deepEqual(offenders, [], `hex fora de tokens/colors.css:\n${offenders.join('\n')}`);
});

test('--prism-* só é declarado em tokens/', async () => {
  const offenders = [];
  for (const file of [...sourceFiles, ...exampleFiles]) {
    const source = await readFile(file, 'utf8');
    if (/--prism-[a-z0-9-]+\s*:/i.test(source)) offenders.push(relative(file));
  }
  assert.deepEqual(offenders, [], `token --prism-* declarado fora de tokens/: ${offenders.join(', ')}`);
});

test('todo var(--x) tem declaração em tokens/', async () => {
  const declared = new Set();
  for (const file of tokenFiles) {
    const source = await readFile(file, 'utf8');
    for (const match of source.matchAll(/(--[a-z0-9-]+)\s*:/gi)) declared.add(match[1]);
  }

  const missing = new Map();
  for (const file of [...tokenFiles, ...sourceFiles]) {
    const source = await readFile(file, 'utf8');
    for (const match of source.matchAll(/var\((--[a-z0-9-]+)/gi)) {
      if (!declared.has(match[1])) {
        const list = missing.get(match[1]) ?? [];
        list.push(relative(file));
        missing.set(match[1], list);
      }
    }
  }

  const report = [...missing].map(([name, files]) => `${name} (${[...new Set(files)].join(', ')})`);
  assert.deepEqual(report, [], `variável sem declaração:\n${report.join('\n')}`);
});

test('@font-face aponta para arquivo existente', async () => {
  const missing = [];
  for (const file of tokenFiles) {
    const source = await readFile(file, 'utf8');
    for (const match of source.matchAll(/url\(['"]?([^'")]+)['"]?\)/g)) {
      const target = path.resolve(path.dirname(file), match[1]);
      try {
        const info = await stat(target);
        if (!info.isFile() || info.size < 1000) missing.push(`${relative(file)} -> ${match[1]}`);
      } catch {
        missing.push(`${relative(file)} -> ${match[1]}`);
      }
    }
  }
  assert.deepEqual(missing, [], `fonte ausente ou vazia:\n${missing.join('\n')}`);
});
