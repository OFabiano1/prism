// Banner de README no visual do Prism: lê as cores de tokens/colors.css,
// usa as fontes do pacote e tira o PNG no Chromium do Playwright.
//
// uso: node scripts/readme-banner.mjs <config.json> <saida.png>
//      node scripts/readme-banner.mjs --paleta <saida.png>
//
// config: { eyebrow, titulo, lede, tags: [], motivo: "prisma" | "terminal" | "avatar",
//           linhas?: [[comando, resposta]], avatar?: caminho, legenda? }

import { readFile } from 'node:fs/promises';
import { existsSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from '@playwright/test';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ─── tokens ───

async function lerTokens() {
  const css = await readFile(path.join(root, 'tokens', 'colors.css'), 'utf8');
  // so o bloco escuro (o primeiro): o README e escuro como o tema padrao.
  const escuro = css.slice(0, css.indexOf('}') + 1);
  const brutos = new Map();
  for (const [, nome, valor] of escuro.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) {
    brutos.set(nome, valor.trim());
  }
  const resolver = (valor, profundidade = 0) => {
    const ref = /^var\((--[\w-]+)\)$/.exec(valor);
    if (!ref || profundidade > 8) return valor;
    return resolver(brutos.get(ref[1]) ?? valor, profundidade + 1);
  };
  const cor = (nome) => {
    const valor = resolver(brutos.get(nome) ?? '');
    if (!/^#[0-9a-f]{3,8}$/i.test(valor)) throw new Error(`token sem cor sólida: ${nome}`);
    return valor;
  };
  return { cor, brutos };
}

// ─── navegador ───

function acharChromium() {
  if (process.env.PRISM_CHROME) return process.env.PRISM_CHROME;
  // revisao do playwright instalada pode nao bater com a do pacote: usa a que existir.
  const cache = path.join(process.env.LOCALAPPDATA ?? '', 'ms-playwright');
  if (!existsSync(cache)) return undefined;
  for (const pasta of readdirSync(cache).sort().reverse()) {
    if (!pasta.startsWith('chromium')) continue;
    for (const exe of [
      path.join(cache, pasta, 'chrome-headless-shell-win64', 'chrome-headless-shell.exe'),
      path.join(cache, pasta, 'chrome-win64', 'chrome.exe'),
      path.join(cache, pasta, 'chrome-win', 'chrome.exe'),
    ]) {
      if (existsSync(exe)) return exe;
    }
  }
  return undefined;
}

async function fotografar(html, saida, largura, altura) {
  const navegador = await chromium.launch({ executablePath: acharChromium() });
  try {
    const pagina = await navegador.newPage({
      viewport: { width: largura, height: altura },
      deviceScaleFactor: 2,
    });
    await pagina.setContent(html, { waitUntil: 'load' });
    await pagina.evaluate(() => document.fonts.ready);
    await pagina.locator('#quadro').screenshot({ path: saida, omitBackground: true });
  } finally {
    await navegador.close();
  }
}

// ─── html ───

const esc = (t) =>
  String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

function baseCss(cor) {
  const fonte = (arq) => pathToFileURL(path.join(root, 'fonts', arq)).href;
  return `
@font-face { font-family: PI; src: url("${fonte('InterVariable.woff2')}"); font-weight: 100 900; }
@font-face { font-family: PM; src: url("${fonte('JetBrainsMonoVariable.woff2')}"); font-weight: 100 800; }
* { box-sizing: border-box; margin: 0; }
body { background: transparent; }
#quadro {
  background: ${cor('--background')};
  border: 1px solid ${cor('--border-subtle')};
  border-radius: 20px;
  color: ${cor('--text-primary')};
  font-family: PI, sans-serif;
  overflow: hidden;
  position: relative;
}
.mono { font-family: PM, monospace; }
`;
}

function motivoPrisma(cor) {
  // feixe branco entra no prisma e sai em faixas da rampa violeta. cor solida, sem brilho.
  const faixas = ['--prism-purple-300', '--prism-purple-400', '--prism-purple-500', '--prism-purple-600', '--prism-purple-700'];
  const saidas = faixas
    .map((t, i) => `<line x1="236" y1="${136 + i * 4}" x2="420" y2="${40 + i * 52}" stroke="${cor(t)}" stroke-width="3"/>`)
    .join('');
  return `<svg width="420" height="272" viewBox="0 0 420 272">
    <line x1="0" y1="186" x2="176" y2="146" stroke="${cor('--text-primary')}" stroke-width="3"/>
    ${saidas}
    <polygon points="200,46 286,214 114,214" fill="${cor('--background')}" stroke="${cor('--text-primary')}" stroke-width="2"/>
  </svg>`;
}

function motivoTerminal(cor, linhas) {
  const corpo = linhas
    .map(
      ([cmd, resposta]) => `
      <div class="mono" style="font-size:17px;line-height:26px">
        <span style="color:${cor('--prism-primary-hover')}">&gt;</span>${esc(cmd)}
      </div>
      <div class="mono" style="font-size:15px;line-height:24px;color:${cor('--text-secondary')};margin-bottom:12px">${esc(resposta)}</div>`,
    )
    .join('');
  return `<div style="width:420px;background:${cor('--surface')};border:1px solid ${cor('--border-default')};border-radius:14px;overflow:hidden">
    <div class="mono" style="display:flex;gap:8px;align-items:center;padding:12px 16px;border-bottom:1px solid ${cor('--border-subtle')};font-size:13px;color:${cor('--text-muted')}">
      <span style="width:10px;height:10px;border-radius:50%;background:${cor('--border-strong')}"></span>
      <span style="width:10px;height:10px;border-radius:50%;background:${cor('--border-strong')}"></span>
      <span style="width:10px;height:10px;border-radius:50%;background:${cor('--border-strong')}"></span>
      <span style="margin-left:8px"># geral</span>
    </div>
    <div style="padding:18px 20px 6px">${corpo}</div>
  </div>`;
}

async function motivoAvatar(cor, imagem, legenda) {
  const dados = await readFile(imagem);
  const tipo = imagem.toLowerCase().endsWith('.png') ? 'image/png' : 'image/jpeg';
  return `<div style="display:flex;flex-direction:column;align-items:center;gap:22px;width:420px">
    <img src="data:${tipo};base64,${dados.toString('base64')}" style="width:208px;height:208px;border-radius:50%;object-fit:cover;border:2px solid ${cor('--prism-primary')}">
    <div class="mono" style="font-size:17px;color:${cor('--text-secondary')}">${esc(legenda)}<span style="display:inline-block;width:10px;height:20px;margin-left:4px;vertical-align:-3px;background:${cor('--prism-primary')}"></span></div>
  </div>`;
}

async function htmlBanner(cfg, cor) {
  const tags = (cfg.tags ?? [])
    .map(
      (t) =>
        `<span class="mono" style="font-size:14px;color:${cor('--text-secondary')};border:1px solid ${cor('--border-default')};border-radius:6px;padding:6px 10px">${esc(t)}</span>`,
    )
    .join('');
  let motivo = '';
  if (cfg.motivo === 'prisma') motivo = motivoPrisma(cor);
  else if (cfg.motivo === 'terminal') motivo = motivoTerminal(cor, cfg.linhas ?? []);
  else if (cfg.motivo === 'avatar') motivo = await motivoAvatar(cor, cfg.avatar, cfg.legenda ?? '');
  // titulo com ponto violeta: o unico acento da peca.
  return `<!doctype html><meta charset="utf-8"><style>${baseCss(cor)}</style>
  <div id="quadro" style="width:1280px;height:400px;display:flex;align-items:center;justify-content:space-between;padding:56px 64px">
    <div style="display:flex;flex-direction:column;justify-content:space-between;height:100%;max-width:700px">
      <div class="mono" style="display:flex;align-items:center;gap:10px;font-size:14px;letter-spacing:.12em;text-transform:uppercase;color:${cor('--text-secondary')}">
        <span style="width:8px;height:8px;background:${cor('--prism-primary')}"></span>${esc(cfg.eyebrow)}
      </div>
      <div>
        <div style="font-size:104px;font-weight:700;letter-spacing:-0.045em;line-height:1">${esc(cfg.titulo)}<span style="color:${cor('--prism-primary')}">.</span></div>
        <div style="font-size:22px;line-height:1.45;color:${cor('--text-secondary')};margin-top:18px;max-width:640px">${esc(cfg.lede)}</div>
      </div>
      <div style="display:flex;gap:10px;flex-wrap:wrap">${tags}</div>
    </div>
    ${motivo}
  </div>`;
}

function htmlPaleta(cor, brutos) {
  // so tokens reais: rampa violeta, rampa neutra e semanticas.
  const grupos = [
    ['violeta', [...brutos.keys()].filter((n) => n.startsWith('--prism-purple-'))],
    ['neutro', [...brutos.keys()].filter((n) => n.startsWith('--prism-neutral-'))],
    ['estado', ['--success', '--warning', '--danger', '--info']],
  ];
  const linhas = grupos
    .map(([titulo, nomes]) => {
      const blocos = nomes
        .map((n) => {
          const hex = cor(n);
          const rotulo = n.replace('--prism-purple-', '').replace('--prism-neutral-', '').replace('--', '');
          return `<div style="flex:1;min-width:0">
            <div style="height:64px;background:${hex};border-radius:8px;border:1px solid ${cor('--border-subtle')}"></div>
            <div class="mono" style="font-size:12px;margin-top:8px;color:${cor('--text-primary')}">${esc(rotulo)}</div>
            <div class="mono" style="font-size:11px;color:${cor('--text-muted')}">${esc(hex)}</div>
          </div>`;
        })
        .join('');
      return `<div style="display:flex;gap:16px;align-items:flex-start">
        <div class="mono" style="width:72px;padding-top:24px;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:${cor('--text-secondary')}">${titulo}</div>
        <div style="flex:1;display:flex;gap:10px">${blocos}</div>
      </div>`;
    })
    .join('');
  return `<!doctype html><meta charset="utf-8"><style>${baseCss(cor)}</style>
  <div id="quadro" style="width:1280px;padding:40px 48px;display:flex;flex-direction:column;gap:28px">${linhas}</div>`;
}

// ─── main ───

const args = process.argv.slice(2);
const { cor, brutos } = await lerTokens();
if (args[0] === '--paleta') {
  if (!args[1]) throw new Error('uso: --paleta <saida.png>');
  await fotografar(htmlPaleta(cor, brutos), path.resolve(args[1]), 1280, 600);
} else {
  if (args.length < 2) throw new Error('uso: node scripts/readme-banner.mjs <config.json> <saida.png>');
  const arqConfig = path.resolve(args[0]);
  const cfg = JSON.parse(await readFile(arqConfig, 'utf8'));
  if (cfg.avatar) cfg.avatar = path.resolve(path.dirname(arqConfig), cfg.avatar);
  await fotografar(await htmlBanner(cfg, cor), path.resolve(args[1]), 1280, 400);
}
console.log(`ok: ${args.at(-1)}`);
