/**
 * Guarda de consumidor.
 * Falha quando um app faz o que o contrato proíbe:
 *   - className/style em componente PRISM
 *   - redeclaração de --prism-*
 *   - seletor .prism-* fora do pacote
 *
 * Uso: node scripts/check-consumer.mjs [arquivos ou pastas...]
 * Sem argumentos, varre examples/.
 */
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CODE = new Set(['.ts', '.tsx', '.js', '.jsx', '.css']);
const SKIP = new Set(['node_modules', 'dist', 'dist-examples', '.git', 'coverage', 'playwright-report', 'test-results', '.vite']);
/** Pastas internas do pacote: só são puladas quando a varredura começa na raiz. */
const OWN = new Set(['src', 'tokens', 'docs', 'scripts', 'brand', 'fonts']);

const manifest = JSON.parse(await readFile(path.join(root, 'dist', 'manifest.json'), 'utf8'));
const names = manifest.components
  .filter((entry) => entry.kind !== 'hook')
  .map((entry) => entry.name)
  .sort((a, b) => b.length - a.length);

const targets = process.argv.slice(2);
const roots = targets.length > 0 ? targets.map((item) => path.resolve(root, item)) : [path.join(root, 'examples', 'src')];

async function walk(target, files = [], atRoot = false) {
  let info;
  try {
    info = await stat(target);
  } catch {
    throw new Error(`caminho inexistente: ${path.relative(root, target)}`);
  }
  if (info.isFile()) {
    if (CODE.has(path.extname(target))) files.push(target);
    return files;
  }
  for (const entry of await readdir(target, { withFileTypes: true })) {
    if (SKIP.has(entry.name)) continue;
    if (atRoot && OWN.has(entry.name)) continue;
    const next = path.join(target, entry.name);
    if (entry.isDirectory()) await walk(next, files, false);
    else if (CODE.has(path.extname(entry.name))) files.push(next);
  }
  return files;
}

/** Lê a tag JSX a partir de `<Name`, respeitando strings e chaves. */
function tagAt(source, start) {
  let depth = 0;
  let quote = null;
  for (let index = start; index < source.length; index += 1) {
    const char = source[index];
    if (quote) {
      if (char === quote && source[index - 1] !== '\\') quote = null;
      continue;
    }
    if (char === '"' || char === "'" || char === '`') {
      quote = char;
      continue;
    }
    if (char === '{') depth += 1;
    else if (char === '}') depth = Math.max(0, depth - 1);
    else if (char === '>' && depth === 0) return source.slice(start, index + 1);
  }
  return source.slice(start);
}

const problems = [];
const files = (await Promise.all(roots.map((target) => walk(target, [], target === root)))).flat();

for (const file of files) {
  const relative = path.relative(root, file).replaceAll('\\', '/');
  const source = await readFile(file, 'utf8');

  if (file.endsWith('.css')) {
    const token = /--prism-[a-z0-9-]+\s*:/gi;
    const selector = /\.prism-[a-z0-9-]+/gi;
    for (const match of source.matchAll(token)) {
      problems.push(`${relative}:${lineOf(source, match.index)}: token --prism-* redeclarado no consumidor.`);
    }
    for (const match of source.matchAll(selector)) {
      problems.push(`${relative}:${lineOf(source, match.index)}: seletor .prism-* fora do pacote.`);
    }
    continue;
  }

  for (const name of names) {
    const pattern = new RegExp(`<${name}\\b`, 'g');
    for (const match of source.matchAll(pattern)) {
      const tag = tagAt(source, match.index);
      if (/\bclassName\s*=/.test(tag)) {
        problems.push(`${relative}:${lineOf(source, match.index)}: <${name}> recebeu className.`);
      }
      if (/\bstyle\s*=/.test(tag)) {
        problems.push(`${relative}:${lineOf(source, match.index)}: <${name}> recebeu style.`);
      }
      if (/\{\s*\.\.\./.test(tag)) {
        problems.push(`${relative}:${lineOf(source, match.index)}: <${name}> recebeu spread de props.`);
      }
    }
  }

  for (const match of source.matchAll(/--prism-[a-z0-9-]+\s*:/gi)) {
    problems.push(`${relative}:${lineOf(source, match.index)}: token --prism-* redeclarado no consumidor.`);
  }
}

function lineOf(source, index) {
  return source.slice(0, index).split('\n').length;
}

if (problems.length > 0) {
  console.error('check:consumer falhou:');
  for (const problem of problems) console.error(`  ${problem}`);
  process.exit(1);
}

console.log(`check:consumer ok — ${files.length} arquivo(s), ${names.length} componente(s) no contrato.`);
