# Prism Design — Plano de Implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir o Prism, design system do Axolotl BR: pacote React `prism`, catálogo, guardas e camada de instrução para IA.

**Architecture:** Monorepo npm workspaces com `packages/prism` (componentes, tokens, fontes) e `apps/catalog` (Vite). Cada componente é um par `.tsx` + `.css` com variantes semânticas e sem escape de estilo. Metadados de props vivem em `src/manifest.ts`, que alimenta `manifest.json`, o guarda de docs e a skill de IA.

**Tech Stack:** TypeScript 5.9, React 18.3 (teste) e 19 (peer), Vite 5.4, Vitest + Testing Library + jsdom, Playwright, `lucide-react`, CSS puro.

**Spec:** `docs/superpowers/specs/2026-11-01-prism-design.md`

## Global Constraints

- Node >= 22; npm workspaces; `package-lock.json` commitado; `dist/` não commitado.
- React peer `^18.3.1 || ^19.0.0`; suite roda em React 18.3.1.
- Nenhum componente aceita `className`, `style` ou spread de `...rest`.
- Hex literal só em `packages/prism/src/tokens.css`.
- Prefixo de token `--prism-*`; prefixo de classe `.prism-*`; nenhum consumidor redeclara token nem mira classe.
- Tema no wrapper `.prism-root[data-theme]`; nunca em `:root`/`documentElement`. Portais montam dentro do wrapper.
- Escuro é o padrão (`--prism-bg: #05060c`), marca `#8F00FF`.
- Espaço em múltiplos de 4; movimento 120–240 ms com caminho `prefers-reduced-motion`.
- Copy em português brasileiro; nenhum número, usuário, evento ou depoimento inventado.
- Rótulo visível obrigatório; quando `hideLabel`, `aria-label` é obrigatório.
- Commits Conventional Commits, escopo curto, em português.
- Caminho do projeto contém `#`: rodar `npm run dev`/`build` a partir de `C:\Temp\prism` (cópia limpa) quando o Vite falhar.

## Review Focus

- Consumidor que tenta `className`/`style` deve falhar no typecheck e no `check:consumer`, não ser ignorado em silêncio.
- Portal de Dialog/Toast fora do wrapper perde token: o teste assere que o portal está dentro de `.prism-root`.
- `matchMedia` ausente em jsdom/SSR: `useReducedMotion` devolve `false` sem quebrar e o markup é igual dos dois lados.
- Texto longo em 320px (rótulo de botão, aba, título de toast) não pode gerar overflow horizontal.
- `hideLabel` sem `aria-label` deve falhar: o campo continua tendo nome acessível.

---

### Task 1: Workspace, tokens e provider

**Files:**
- Create: `package.json`, `.gitignore` (append `dist/`, `node_modules/`, `*.tgz`), `tsconfig.json`, `tsconfig.base.json`
- Create: `packages/prism/package.json`, `packages/prism/tsconfig.json`, `packages/prism/tsconfig.build.json`
- Create: `packages/prism/src/tokens.css`, `packages/prism/src/foundation.css`, `packages/prism/src/provider.tsx`, `packages/prism/src/provider.css`, `packages/prism/src/use-reduced-motion.ts`, `packages/prism/src/index.ts`
- Create: `packages/prism/fonts/` (Space Grotesk + JetBrains Mono woff2), `THIRD-PARTY-NOTICES.md`
- Create: `packages/prism/scripts/build-css.mjs`
- Test: `packages/prism/src/provider.test.tsx`, `packages/prism/src/use-reduced-motion.test.ts`, `packages/prism/scripts/check-tokens.test.mjs`

**Interfaces:**
- Produces: `DesignSystemProvider({ theme, onThemeChange?, children })` — renderiza `<div class="prism-root" data-theme={theme}>`; exporta `PrismTheme = 'dark' | 'light'`.
- Produces: `useReducedMotion(): boolean` — `matchMedia('(prefers-reduced-motion: reduce)')` com fallback `false` quando `matchMedia` não existe.
- Produces: `--prism-bg|surface|subtle|border|text|secondary|faint|brand|brand-hover|brand-ink|success|warning|danger|focus|radius-*|space-*|font-sans|font-mono`.

- [ ] **Step 1: Escrever o teste do provider**

```tsx
// provider.test.tsx
it('aplica tema no wrapper, não no documentElement', () => {
  render(<DesignSystemProvider theme="light"><span>ok</span></DesignSystemProvider>);
  const root = screen.getByText('ok').closest('.prism-root');
  expect(root).toHaveAttribute('data-theme', 'light');
  expect(document.documentElement.getAttribute('data-theme')).toBeNull();
});
// use-reduced-motion.test.ts
it('devolve false quando matchMedia não existe', () => {
  const original = window.matchMedia;
  // @ts-expect-error simula ambiente sem matchMedia
  delete window.matchMedia;
  expect(renderHook(() => useReducedMotion()).result.current).toBe(false);
  window.matchMedia = original;
});
```

- [ ] **Step 2: Rodar e ver falhar**

Run: `npm test -- provider` — Expected: FAIL, módulo `./provider` não existe.

- [ ] **Step 3: Criar workspaces, tsconfig, tokens, fontes e provider**

`package.json` declara `"workspaces": ["packages/*", "apps/*"]`. `tokens.css` declara `.prism-root` com `--prism-*` do tema escuro e `.prism-root[data-theme='light']` com o claro. Nenhum hex fora deste arquivo. Baixar Space Grotesk (400–700) e JetBrains Mono (400–700) em woff2 de `fonts.gstatic.com`, registrar origem e licença OFL em `THIRD-PARTY-NOTICES.md`, e `@font-face` em `foundation.css` apontando para `../fonts/*.woff2`.

- [ ] **Step 4: Escrever o guarda de tokens**

`check-tokens.test.mjs` varre `src/**/*.{css,ts,tsx}` (exceto `tokens.css`) e falha em `#[0-9a-fA-F]{3,8}\b`.

- [ ] **Step 5: Rodar testes e build**

Run: `npm test` — Expected: PASS. Run: `npm run build --workspace prism` — Expected: `dist/index.js`, `dist/styles.css`, sem erro.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(prism): workspace, tokens e provider"
```

---

### Task 2: Ação — Button, TextLink, Chip, Badge

**Files:**
- Create: `packages/prism/src/button.tsx`, `button.css`, `text-link.tsx`, `text-link.css`, `chip.tsx`, `chip.css`, `badge.tsx`, `badge.css`
- Modify: `packages/prism/src/index.ts`
- Test: `packages/prism/src/actions.test.tsx`

**Interfaces:**
- Produces: `Button({ label, onClick?, variant?: 'primary'|'outline'|'ghost'|'destructive', size?: 'md'|'sm', icon?, iconPosition?: 'start'|'end', state?: 'idle'|'loading', disabled?, type?: 'button'|'submit', fullWidth? })`
- Produces: `TextLink({ label, href, external?, purpose?: 'inline'|'nav', onClick? })`
- Produces: `Chip({ label, selected?, onToggle?, onRemove?, disabled? })`
- Produces: `Badge({ label, tone?: 'neutral'|'brand'|'success'|'warning'|'danger' })`

- [ ] **Step 1: Escrever os testes**

```tsx
it('Button em loading fica desabilitado e anuncia o estado', () => {
  render(<Button label="Salvar" state="loading" onClick={fn} />);
  const b = screen.getByRole('button', { name: /salvar/i });
  expect(b).toBeDisabled();
  expect(b).toHaveAttribute('aria-busy', 'true');
  expect(fn).not.toHaveBeenCalled();
});
it('Chip removível expõe botão de remover com nome acessível', () => {
  render(<Chip label="survival" onRemove={fn} />);
  expect(screen.getByRole('button', { name: /remover survival/i })).toBeInTheDocument();
});
```

- [ ] **Step 2: Rodar e ver falhar** — `npm test -- actions`.

- [ ] **Step 3: Implementar os quatro componentes e o CSS**

Botão é pill (40px md, 32px sm); `primary` usa `--prism-text` como fundo, não a marca. Marca aparece em `outline` no hover e em `Badge tone="brand"`.

- [ ] **Step 4: Verificar** — `npm test -- actions` PASS; `npm run typecheck`.

- [ ] **Step 5: Commit** — `feat(prism): componentes de ação`

---

### Task 3: Formulário — TextField, TextArea, Select, Checkbox, Switch, SegmentedControl

**Files:**
- Create: `packages/prism/src/field.tsx` (label/hint/error compartilhados, interno), `text-field.tsx`, `text-area.tsx`, `select.tsx`, `checkbox.tsx`, `switch.tsx`, `segmented-control.tsx`, `forms.css`
- Modify: `packages/prism/src/index.ts`
- Test: `packages/prism/src/forms.test.tsx`

**Interfaces:**
- Produces: `TextField({ label, value, onChange:(v:string)=>void, placeholder?, hint?, error?, disabled?, type?, purpose?: 'default'|'settings', autoComplete?, required?, hideLabel? })`
- Produces: `TextArea({ label, value, onChange, rows?, hint?, error?, disabled? })`
- Produces: `Select({ label, value, onChange, options: readonly {id,label,disabled?}[], placeholder?, disabled?, hideLabel?, variant?: 'input'|'compact', error?, hint? })`
- Produces: `Checkbox({ label, checked, onChange:(v:boolean)=>void, hint?, error?, disabled? })`
- Produces: `Switch({ label, checked, onChange, hint?, disabled? })`
- Produces: `SegmentedControl({ label, value, onChange, options })`

- [ ] **Step 1: Escrever os testes**

```tsx
it('TextField liga erro ao input por aria-describedby', () => {
  render(<TextField label="E-mail" value="" onChange={fn} error="E-mail inválido" />);
  const input = screen.getByLabelText('E-mail');
  expect(input).toHaveAttribute('aria-invalid', 'true');
  expect(document.getElementById(input.getAttribute('aria-describedby')!)).toHaveTextContent('E-mail inválido');
});
it('hideLabel mantém nome acessível', () => {
  render(<TextField label="Buscar" hideLabel value="" onChange={fn} />);
  expect(screen.getByRole('textbox', { name: 'Buscar' })).toBeInTheDocument();
});
it('Select responde ao teclado', async () => {
  render(<Select label="Jogo" value="mc" onChange={fn} options={[{id:'mc',label:'Minecraft'},{id:'cs',label:'Counter-Strike'}]} />);
  const s = screen.getByLabelText('Jogo');
  await userEvent.selectOptions(s, 'cs');
  expect(fn).toHaveBeenCalledWith('cs');
});
```

- [ ] **Step 2: Rodar e ver falhar** — `npm test -- forms`.

- [ ] **Step 3: Implementar `Field` e os seis controles**

`Field` renderiza `<label for>`, hint e erro com `id` gerado por `useId`. `Select` é `<select>` nativo com aparência própria (sem listbox custom). `Switch` é `<button role="switch" aria-checked>`.

- [ ] **Step 4: Verificar** — `npm test -- forms` PASS; `npm run typecheck`.

- [ ] **Step 5: Commit** — `feat(prism): controles de formulário`

---

### Task 4: Tabs

**Files:**
- Create: `packages/prism/src/tabs.tsx`, `tabs.css`
- Modify: `packages/prism/src/index.ts`
- Test: `packages/prism/src/tabs.test.tsx`

**Interfaces:**
- Produces: `Tabs({ label, items: readonly {id,label,disabled?}[], value, onChange:(id:string)=>void })` com `role="tablist"`, setas ←/→, Home/End e roving tabindex.

- [ ] **Step 1: Teste de teclado**

```tsx
it('seta direita move o foco e o tabindex', async () => {
  render(<Tabs label="Seções" value="a" onChange={fn} items={[{id:'a',label:'A'},{id:'b',label:'B'}]} />);
  screen.getByRole('tab', { name: 'A' }).focus();
  await userEvent.keyboard('{ArrowRight}');
  expect(screen.getByRole('tab', { name: 'B' })).toHaveFocus();
  expect(screen.getByRole('tab', { name: 'B' })).toHaveAttribute('tabindex', '0');
  expect(screen.getByRole('tab', { name: 'A' })).toHaveAttribute('tabindex', '-1');
});
```

- [ ] **Step 2: Rodar e ver falhar** — `npm test -- tabs`.
- [ ] **Step 3: Implementar `Tabs`** — uma pill de aba de 40px, indicador por `aria-selected`.
- [ ] **Step 4: Verificar** — PASS.
- [ ] **Step 5: Commit** — `feat(prism): tabs`

---

### Task 5: Sobreposição — Dialog e Tooltip

**Files:**
- Create: `packages/prism/src/dialog.tsx`, `dialog.css`, `tooltip.tsx`, `tooltip.css`, `portal.tsx`
- Modify: `packages/prism/src/index.ts`
- Test: `packages/prism/src/overlays.test.tsx`

**Interfaces:**
- Produces: `Dialog({ open, onClose, title, description?, children, actions?, size?: 'sm'|'md' })` — foco preso, Esc fecha, foco volta ao gatilho, `aria-modal`, portal dentro de `.prism-root`.
- Produces: `Tooltip({ label, children, side?: 'top'|'bottom' })` — abre em hover e foco, fecha em Esc, `aria-describedby`.

- [ ] **Step 1: Testes**

```tsx
it('Dialog prende o foco e devolve ao fechar', async () => {
  const trigger = <button>abrir</button>;
  render(<><button>abrir</button><Dialog open onClose={fn} title="Novo projeto"><button>salvar</button></Dialog></>);
  expect(screen.getByRole('button', { name: 'salvar' })).toHaveFocus();
  await userEvent.keyboard('{Escape}');
  expect(fn).toHaveBeenCalled();
});
it('portal do Dialog fica dentro do wrapper do tema', () => {
  render(<DesignSystemProvider theme="dark"><Dialog open onClose={fn} title="x"><span>y</span></Dialog></DesignSystemProvider>);
  expect(document.querySelector('.prism-root [role="dialog"]')).toBeTruthy();
});
```

- [ ] **Step 2: Rodar e ver falhar** — `npm test -- overlays`.
- [ ] **Step 3: Implementar `Portal`, `Dialog` e `Tooltip`** — `Portal` usa o container do provider; sem provider, cai para `document.body` e emite `console.warn` em dev.
- [ ] **Step 4: Verificar** — PASS.
- [ ] **Step 5: Commit** — `feat(prism): dialog e tooltip`

---

### Task 6: Toast

**Files:**
- Create: `packages/prism/src/toast.tsx`, `toast.css`
- Modify: `packages/prism/src/index.ts`
- Test: `packages/prism/src/toast.test.tsx`

**Interfaces:**
- Produces: `ToastProvider({ children })`, `useToast(): { show(o: ToastOptions): string; dismiss(id: string): void }`, `ToastOptions = { title, description?, tone?: 'neutral'|'success'|'danger', durationMs?: number }` (padrão 5000).

- [ ] **Step 1: Testes**

```tsx
it('mostra, anuncia em live region e remove por botão', async () => {
  function Demo() { const { show } = useToast(); return <button onClick={() => show({ title: 'Salvo' })}>disparar</button>; }
  render(<ToastProvider><Demo /></ToastProvider>);
  await userEvent.click(screen.getByText('disparar'));
  expect(screen.getByRole('status')).toHaveTextContent('Salvo');
  await userEvent.click(screen.getByRole('button', { name: /fechar/i }));
  expect(screen.queryByRole('status')).toBeNull();
});
```

- [ ] **Step 2: Rodar e ver falhar** — `npm test -- toast`.
- [ ] **Step 3: Implementar fila, live region e timer** — timer pausa em `focus`/`hover`; sem `setInterval`.
- [ ] **Step 4: Verificar** — PASS.
- [ ] **Step 5: Commit** — `feat(prism): toast`

---

### Task 7: Superfície, dados e layout

**Files:**
- Create: `packages/prism/src/card.tsx`, `card.css`, `empty-state.tsx`, `empty-state.css`, `avatar.tsx`, `avatar.css`, `layout.tsx`, `layout.css`
- Modify: `packages/prism/src/index.ts`
- Test: `packages/prism/src/surfaces.test.tsx`

**Interfaces:**
- Produces: `Card({ children, padding?: 'md'|'lg' })`
- Produces: `EmptyState({ title, description, action?, icon? })`
- Produces: `Avatar({ name, src?, size?: 'sm'|'md'|'lg' })` — iniciais quando sem `src`, `alt` = `name`.
- Produces: `Stack({ children, gap?: 1|2|3|4|6|8 })`, `Inline({ children, gap?, align?: 'start'|'center'|'end'|'between', wrap? })`, `Grid({ children, columns?: 1|2|3, gap? })`

- [ ] **Step 1: Testes**

```tsx
it('Avatar sem imagem usa iniciais e nome acessível', () => {
  render(<Avatar name="Fabi Café" />);
  expect(screen.getByRole('img', { name: 'Fabi Café' })).toHaveTextContent('FC');
});
it('Grid usa data-attributes, não style inline', () => {
  render(<Grid columns={2}><span>a</span></Grid>);
  expect(document.querySelector('[data-prism-grid]')).toHaveAttribute('data-columns', '2');
  expect(document.querySelector('[data-prism-grid]')).not.toHaveAttribute('style');
});
```

- [ ] **Step 2: Rodar e ver falhar** — `npm test -- surfaces`.
- [ ] **Step 3: Implementar** — espaçamento por `data-gap` no CSS, nunca `style`.
- [ ] **Step 4: Verificar** — PASS.
- [ ] **Step 5: Commit** — `feat(prism): superfícies, avatar e layout`

---

### Task 8: ThemeToggle

**Files:**
- Create: `packages/prism/src/theme-toggle.tsx`, `theme-toggle.css`
- Modify: `packages/prism/src/index.ts`, `packages/prism/src/provider.tsx` (contexto de tema)
- Test: `packages/prism/src/theme-toggle.test.tsx`

**Interfaces:**
- Consumes: `DesignSystemProvider({ theme, onThemeChange })`.
- Produces: `ThemeToggle({ label? })` — botão com `aria-pressed` e nome acessível `Alternar tema`.

- [ ] **Step 1: Teste** — clicar chama `onThemeChange('light')` quando tema é `dark`; sem `onThemeChange`, o botão fica `disabled` e não muda o tema.
- [ ] **Step 2: Rodar e ver falhar** — `npm test -- theme-toggle`.
- [ ] **Step 3: Implementar** contexto `usePrismTheme` interno.
- [ ] **Step 4: Verificar** — PASS.
- [ ] **Step 5: Commit** — `feat(prism): theme toggle`

---

### Task 9: Manifesto, guarda de docs e export público

**Files:**
- Create: `packages/prism/src/manifest.ts`, `packages/prism/scripts/build-manifest.mjs`, `packages/prism/scripts/check-manifest.mjs`, `packages/prism/scripts/check-docs.mjs`
- Create: `packages/prism/scripts/contracts.test.mjs`
- Modify: `packages/prism/package.json` (exports `./manifest.json`), `packages/prism/src/index.ts`

**Interfaces:**
- Produces: `manifest.ts` exporta `components: readonly { name, props: readonly { name, type, required, values?, summary }[], summary, doc }[]` para todos os 20 componentes.
- Produces: `manifest.json` em `dist/` com `{ version, components, tokens }`.

- [ ] **Step 1: Teste de contrato**

```js
it('todo export público tem entrada no manifesto', async () => {
  const idx = await readFile('src/index.ts', 'utf8');
  const exported = [...idx.matchAll(/export \{[^}]*\}/gs)].flatMap(m => m[0].match(/\b[A-Z]\w+/g) ?? []);
  const names = manifest.components.map(c => c.name);
  for (const name of new Set(exported)) expect(names, name).toContain(name);
});
it('todo componente do manifesto tem doc existente', () => { /* lê docs/prism/COMPONENTES.md */ });
```

- [ ] **Step 2: Rodar e ver falhar** — `npm run test:guards --workspace prism`.
- [ ] **Step 3: Implementar `manifest.ts`, `build-manifest.mjs`, `check-docs.mjs`**
- [ ] **Step 4: Verificar** — guardas PASS; `npm run build --workspace prism` gera `dist/manifest.json`.
- [ ] **Step 5: Commit** — `feat(prism): manifesto e guardas de contrato`

---

### Task 10: Catálogo

**Files:**
- Create: `apps/catalog/package.json`, `index.html`, `vite.config.ts`, `src/main.tsx`, `src/App.tsx`, `src/sections/*.tsx`, `src/catalog.css`
- Test: `apps/catalog/src/app.test.tsx`

**Interfaces:**
- Consumes: todos os componentes de `prism`.
- Produces: rotas `?view=components&theme=dark|light`; toda seção usa dados sintéticos (`Projeto exemplo`, `pessoa@exemplo.dev`).

- [ ] **Step 1: Teste** — `App` renderiza um título por componente e nenhum texto casa `/^\d+\s+(membros|jogadores|online)/i`.
- [ ] **Step 2: Rodar e ver falhar** — `npm test -- catalog`.
- [ ] **Step 3: Implementar o catálogo** — grade de seções, uma por componente, nos dois temas, sem número de comunidade.
- [ ] **Step 4: Verificar** — `npm run dev -- --port 5283` a partir de `C:\Temp\prism`; abrir e conferir visualmente os dois temas.
- [ ] **Step 5: Commit** — `feat(catalog): catálogo de componentes`

---

### Task 11: Guarda de consumidor e consumidor React 18

**Files:**
- Create: `scripts/check-consumer.mjs`, `scripts/check-example-consumers.mjs`, `apps/fixture-react18/package.json`, `apps/fixture-react18/src/app.tsx`, `apps/fixture-react18/tsconfig.json`
- Modify: `package.json` (script `check:consumer`)

**Interfaces:**
- Produces: `node scripts/check-consumer.mjs <arquivos>` — falha em `className=`/`style=` aplicado a componente Prism, em `--prism-` redeclarado e em seletor `.prism-` fora de `packages/prism`.

- [ ] **Step 1: Teste** — criar `apps/fixture-react18/src/bad.tsx` temporário com `<Button label="x" className="y" />`; rodar guarda; esperar falha; remover o arquivo.
- [ ] **Step 2: Implementar o guarda** — lista de componentes lida de `manifest.json`.
- [ ] **Step 3: Implementar a fixture** — app React 18.3.1 que importa `prism` e `prism/styles.css` e faz `tsc --noEmit`.
- [ ] **Step 4: Verificar** — `npm run check:consumer` PASS na fixture e FAIL no arquivo ruim.
- [ ] **Step 5: Commit** — `feat: guarda de consumidor e fixture react 18`

---

### Task 12: Playwright

**Files:**
- Create: `playwright.config.ts`, `tests/browser/catalog.spec.ts`
- Modify: `package.json` (script `test:browser`)

- [ ] **Step 1: Teste** — para `320x720` e `1440x900` × `dark|light`: abrir catálogo, assertar `document.documentElement.scrollWidth <= innerWidth` e que cada elemento interativo tem foco visível após `Tab`.
- [ ] **Step 2: Rodar e ver falhar** — `npm run test:browser` sem catálogo no ar: FAIL.
- [ ] **Step 3: Subir catálogo e rodar** — `npm run dev` em `C:\Temp\prism` + `PLAYWRIGHT_BASE_URL=http://127.0.0.1:5283 npm run test:browser` — PASS.
- [ ] **Step 4: Commit** — `test: checagem de layout e foco em navegador`

---

### Task 13: Camada de IA

**Files:**
- Create: `skills/prism/SKILL.md`, `PRISM.md`, `AGENTS.md`, `scripts/install-skill.mjs`, `docs/prism/REVISAO.md`
- Modify: `package.json` (script `install:skill`)

**Interfaces:**
- Produces: skill com frontmatter `name: prism` e `description` que dispara em qualquer tarefa de UI/layout/revisão visual.
- Produces: `PRISM.md` com no máximo 400 palavras e os 8 itens do checklist.

- [ ] **Step 1: Teste** — `scripts/install-skill.test.mjs` verifica frontmatter válido, `PRISM.md` <= 400 palavras e presença das proibições (`className`, `style`, `--prism-`, dado inventado).
- [ ] **Step 2: Rodar e ver falhar** — `node --test scripts/install-skill.test.mjs`.
- [ ] **Step 3: Escrever `SKILL.md`, `PRISM.md`, `AGENTS.md`, `REVISAO.md` e o instalador** — instalador copia para `%USERPROFILE%\.config\opencode\skills\prism` e recusa sobrescrever sem `--force`.
- [ ] **Step 4: Verificar** — teste PASS; `npm run install:skill`; conferir a pasta de skills.
- [ ] **Step 5: Commit** — `feat: skill e brief para ia`

---

### Task 14: Docs em português

**Files:**
- Create: `docs/prism/README.md`, `FUNDAMENTOS.md`, `COMPONENTES.md`, `ESTADOS.md`, `CONTRATO.md`, `ACESSIBILIDADE.md`

- [ ] **Step 1: Escrever as seis docs** — cada componente de `manifest.json` tem seção com props e exemplo; tokens listados em `FUNDAMENTOS.md`.
- [ ] **Step 2: Verificar** — `npm run check:docs --workspace prism` PASS.
- [ ] **Step 3: Commit** — `docs: documentação do prism`

---

### Task 15: Pacote, verificação final e teste de agente

**Files:**
- Create: `scripts/check-artifact.mjs`, `RELEASING.md`
- Modify: `package.json` (script `verify`)

**Interfaces:**
- Produces: `verify` = `build && typecheck && check && check:docs && check:consumer && test && check:artifact && test:browser`.

- [ ] **Step 1: Implementar `check-artifact.mjs`** — roda `npm pack`, extrai, confere `dist/index.js`, `dist/styles.css`, `dist/manifest.json`, `fonts/*.woff2` e ausência de `src/**/*.test.*`.
- [ ] **Step 2: Rodar `npm run verify` a partir de `C:\Temp\prism`** — Expected: tudo PASS.
- [ ] **Step 3: Teste de agente** — subagente novo recebe só `skills/prism/SKILL.md` + `manifest.json` + "monte uma tela de perfil com dados de exemplo"; o código gerado compila, importa só de `prism`, passa em `check:consumer` e não contém número de comunidade.
- [ ] **Step 4: Corrigir o que o teste de agente revelar na skill** (não no app gerado).
- [ ] **Step 5: Commit e push** — `chore: verificação final e release notes`
