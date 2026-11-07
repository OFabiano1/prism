/**
 * check:docs — docs canônicas e cobertura do catálogo.
 *
 * Regras:
 *   1. Os sete documentos canônicos existem.
 *   2. Todo item do manifesto tem âncora em COMPONENTES.md.
 *   3. Todo componente não-hook aparece no catálogo (data-component).
 *   4. Nenhum link relativo de docs/prism aponta para arquivo ausente.
 */
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const docsDir = path.join(root, 'docs', 'prism');
const catalogDir = path.join(root, 'examples', 'src');

const REQUIRED = [
  'README.md',
  'FUNDAMENTOS.md',
  'COMPONENTES.md',
  'ESTADOS.md',
  'CONTRATO.md',
  'ACESSIBILIDADE.md',
  'REVISAO.md',
];

function slug(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function anchors(source) {
  const found = new Set();
  for (const match of source.matchAll(/^#{2,4}\s+(.+)$/gm)) found.add(slug(match[1]));
  return found;
}

let manifest;
try {
  manifest = JSON.parse(await readFile(path.join(root, 'dist', 'manifest.json'), 'utf8'));
} catch {
  console.error('dist/manifest.json ausente. Rode `npm run build` antes de check:docs.');
  process.exit(1);
}

const problems = [];

for (const file of REQUIRED) {
  try {
    const info = await stat(path.join(docsDir, file));
    if (!info.isFile() || info.size < 200) problems.push(`docs/prism/${file}: ausente ou vazio.`);
  } catch {
    problems.push(`docs/prism/${file}: ausente.`);
  }
}

const componentsDoc = await readFile(path.join(docsDir, 'COMPONENTES.md'), 'utf8');
const componentAnchors = anchors(componentsDoc);

for (const entry of manifest.components) {
  const [, anchor] = entry.doc.split('#');
  if (!componentAnchors.has(anchor)) {
    problems.push(`docs/prism/COMPONENTES.md: falta a âncora #${anchor} (${entry.name}).`);
  }
}

const catalogFiles = [];
for (const entry of await readdir(catalogDir, { withFileTypes: true })) {
  if (entry.isFile() && /\.(tsx?|jsx?)$/.test(entry.name)) catalogFiles.push(path.join(catalogDir, entry.name));
}
const catalog = (await Promise.all(catalogFiles.map((file) => readFile(file, 'utf8')))).join('\n');
const shown = new Set();
for (const entry of manifest.components) {
  if (entry.kind === 'hook') continue;
  if (new RegExp(`<${entry.name}\\b`).test(catalog)) shown.add(entry.name);
  else problems.push(`examples/: ${entry.name} sem uso no catálogo.`);
}

for (const file of REQUIRED) {
  const source = await readFile(path.join(docsDir, file), 'utf8');
  for (const match of source.matchAll(/\]\(([^)#][^)]*)\)/g)) {
    const target = match[1].split('#')[0];
    if (!target || /^[a-z]+:/i.test(target)) continue;
    try {
      const info = await stat(path.resolve(docsDir, target));
      if (!info.isFile() && !info.isDirectory()) problems.push(`docs/prism/${file}: link morto -> ${target}.`);
    } catch {
      problems.push(`docs/prism/${file}: link morto -> ${target}.`);
    }
  }
}

if (problems.length > 0) {
  console.error('check:docs falhou:');
  for (const problem of problems) console.error(`  ${problem}`);
  process.exit(1);
}

console.log(
  `check:docs ok — ${REQUIRED.length} docs, ${manifest.components.length} âncoras, ${shown.size} componentes no catálogo.`,
);
