/**
 * check:manifest — o manifesto é o contrato público.
 *
 * Regras:
 *   1. Nome único e tipo válido.
 *   2. Todo export de valor em src/index.ts aparece no manifesto.
 *   3. Todo componente tem resumo e doc existente.
 *   4. Todo componente declara as props obrigatórias.
 */
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

async function loadManifest() {
  const file = path.join(root, 'dist', 'manifest.json');
  try {
    return JSON.parse(await readFile(file, 'utf8'));
  } catch {
    throw new Error('dist/manifest.json ausente. Rode `npm run build` antes de check:manifest.');
  }
}

const manifest = await loadManifest();
const kinds = new Set(['component', 'primitive', 'hook']);

test('manifesto tem nome, versão e entradas', () => {
  assert.equal(typeof manifest.name, 'string');
  assert.equal(typeof manifest.version, 'string');
  assert.ok(Array.isArray(manifest.components));
  assert.ok(manifest.components.length >= 20);
});

test('nome é único e tipo é válido', () => {
  const seen = new Set();
  for (const entry of manifest.components) {
    assert.equal(typeof entry.name, 'string');
    assert.ok(entry.name.length > 0);
    assert.ok(!seen.has(entry.name), `duplicado: ${entry.name}`);
    seen.add(entry.name);
    assert.ok(kinds.has(entry.kind), `tipo inválido em ${entry.name}: ${entry.kind}`);
  }
});

test('todo export de valor em src/index.ts está no manifesto', async () => {
  const source = await readFile(path.join(root, 'src', 'index.ts'), 'utf8');
  const exported = new Set();

  for (const match of source.matchAll(/^export\s*\{([^}]+)\}\s*from/gm)) {
    for (const part of match[1].split(',')) {
      const name = part.trim().split(/\s+as\s+/).pop();
      if (name) exported.add(name);
    }
  }

  const documented = new Set(manifest.components.map((entry) => entry.name));
  const missing = [...exported].filter((name) => !documented.has(name)).sort();
  assert.deepEqual(missing, [], `export sem entrada no manifesto: ${missing.join(', ')}`);
});

test('cada entrada tem resumo, doc e props obrigatórias', () => {
  for (const entry of manifest.components) {
    assert.ok(entry.summary && entry.summary.length > 10, `${entry.name}: resumo curto`);
    assert.match(entry.doc, /^docs\/prism\/[A-Z]+\.md#[a-z0-9-]+$/, `${entry.name}: doc inválido`);
    assert.ok(Array.isArray(entry.props), `${entry.name}: props ausente`);

    if (entry.kind === 'hook') {
      assert.equal(entry.props.length, 0, `${entry.name}: hook não declara props`);
      continue;
    }

    assert.ok(entry.props.length > 0, `${entry.name}: nenhuma prop declarada`);

    for (const prop of entry.props) {
      assert.equal(typeof prop.name, 'string');
      assert.equal(typeof prop.type, 'string');
      assert.equal(typeof prop.required, 'boolean');
      assert.ok(prop.summary && prop.summary.length > 3, `${entry.name}.${prop.name}: resumo curto`);
      if (prop.values) assert.ok(Array.isArray(prop.values) && prop.values.length > 0);
    }
  }
});

test('doc de cada entrada existe no disco', async () => {
  const missing = [];
  for (const entry of manifest.components) {
    const [file] = entry.doc.split('#');
    try {
      const info = await stat(path.join(root, file));
      if (!info.isFile()) missing.push(entry.doc);
    } catch {
      missing.push(entry.doc);
    }
  }
  assert.deepEqual(missing, [], `doc ausente: ${missing.join(', ')}`);
});
