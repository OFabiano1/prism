/**
 * Gera dist/manifest.json a partir de dist/manifest.js (compilado de src/manifest.ts).
 * O manifesto é o contrato que impede inventar prop.
 */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pkg = JSON.parse(await readFile(path.join(root, 'package.json'), 'utf8'));
const { components } = await import(pathToFileURL(path.join(root, 'dist', 'manifest.js')).href);

const names = new Set();
for (const entry of components) {
  if (names.has(entry.name)) throw new Error(`componente duplicado no manifesto: ${entry.name}`);
  names.add(entry.name);
}

const manifest = {
  name: pkg.name,
  version: pkg.version,
  description: pkg.description,
  components,
};

await writeFile(path.join(root, 'dist', 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
console.log(`dist/manifest.json  ${components.length} entradas`);
