/**
 * check:artifact — o pacote publicado precisa estar inteiro.
 *
 * Regras:
 *   1. dist/ tem JS, tipos, CSS, tokens e manifesto.
 *   2. O CSS final não guarda @import e contém as camadas.
 *   3. package.json empacota fontes, avisos e docs.
 *   4. O manifesto publicado bate com a versão do pacote.
 */
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const problems = [];

async function file(relative, minimum = 1) {
  try {
    const info = await stat(path.join(root, relative));
    if (!info.isFile()) problems.push(`${relative}: não é arquivo.`);
    else if (info.size < minimum) problems.push(`${relative}: ${info.size} bytes, abaixo de ${minimum}.`);
    return info;
  } catch {
    problems.push(`${relative}: ausente.`);
    return null;
  }
}

await file('dist/index.js', 1000);
await file('dist/index.d.ts', 1000);
await file('dist/styles.css', 5000);
await file('dist/tokens.css', 2000);
await file('dist/manifest.js', 1000);
await file('dist/manifest.json', 1000);
await file('fonts/InterVariable.woff2', 10000);
await file('fonts/JetBrainsMonoVariable.woff2', 10000);
await file('THIRD-PARTY-NOTICES.md', 200);

const pkg = JSON.parse(await readFile(path.join(root, 'package.json'), 'utf8'));
const manifest = JSON.parse(await readFile(path.join(dist, 'manifest.json'), 'utf8'));
const styles = await readFile(path.join(dist, 'styles.css'), 'utf8');
const tokens = await readFile(path.join(dist, 'tokens.css'), 'utf8');
const types = await readFile(path.join(dist, 'index.d.ts'), 'utf8');

if (manifest.version !== pkg.version) {
  problems.push(`manifest.json versão ${manifest.version} difere do pacote ${pkg.version}.`);
}

if (manifest.name !== pkg.name) problems.push(`manifest.json nome ${manifest.name} difere do pacote ${pkg.name}.`);

if (/@import/.test(styles)) problems.push('dist/styles.css ainda contém @import.');
if (!styles.includes('.prism-root')) problems.push('dist/styles.css sem .prism-root.');
if (!styles.includes('.prism-button')) problems.push('dist/styles.css sem .prism-button.');
if (!styles.includes('.prism-toast-viewport')) problems.push('dist/styles.css sem .prism-toast-viewport.');
if (!tokens.includes('--prism-primary')) problems.push('dist/tokens.css sem --prism-primary.');
if (!tokens.includes('@font-face')) problems.push('dist/tokens.css sem @font-face.');
if (!tokens.includes('fonts/InterVariable.woff2')) problems.push('dist/tokens.css sem a fonte Inter.');

for (const name of ['Button', 'DesignSystemProvider', 'ToastProvider', 'Text', 'useToast']) {
  if (!types.includes(name)) problems.push(`dist/index.d.ts sem ${name}.`);
}

for (const entry of ['dist', 'fonts', 'tokens', 'src', 'docs/prism', 'THIRD-PARTY-NOTICES.md', 'README.md']) {
  if (!pkg.files.includes(entry)) problems.push(`package.json files sem "${entry}".`);
}

for (const entry of manifest.components) {
  if (typeof entry.doc !== 'string' || !entry.doc.startsWith('docs/prism/')) {
    problems.push(`manifesto: doc inválido em ${entry.name}.`);
  }
}

if (problems.length > 0) {
  console.error('check:artifact falhou:');
  for (const problem of problems) console.error(`  ${problem}`);
  process.exit(1);
}

console.log(`check:artifact ok — ${manifest.components.length} entradas, CSS e fontes empacotados.`);
