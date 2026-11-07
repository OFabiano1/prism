# Prism Design — design do sistema

Data: 2026-11-01
Status: aguardando aprovação
Pasta: `C:\AxolotlBR\#Projetos\prism`

## Intenção

Prism é o design system do Axolotl BR: componentes React reutilizáveis e um guia de
estilo que garante que site, bots, painéis e projetos futuros pareçam parte do mesmo
universo. A engenharia segue uma filosofia própria: componentes semânticos, sem escape
de estilo, uma geometria só e guardas automáticos.

O sistema resolve um problema de produto: cada componente tem variante semântica e o
app não fura a camada visual. Prism aplica esse raciocínio ao catálogo que o Axolotl
usa de verdade, com docs em português e sem dependência de Tailwind ou motion.

A marca já existe e não deve ser reinventada. O hub (`AxolotlBR/src/styles/tokens.css`)
usa `--bg: #05060c`, violeta `#8f00ff`, Space Grotesk + JetBrains Mono. O bot ALT usa
o mesmo violeta `0x8F00FF`. Prism formaliza isso em tokens, componentes e regras.

## Para quem

- O próprio Axolotl BR: site (React 18), bot/painéis futuros, labs.
- Agentes de código que vão montar telas e precisam de uma API previsível, sem
  adivinhar props.

## Objetivos

1. Um pacote `prism` instalável no workspace, com React 18 **e** 19 como peer.
2. ~20 componentes que o Axolotl usa de verdade, com variantes semânticas e sem
   `className`/`style`.
3. Tokens `--prism-*` com dois temas (escuro padrão, claro como segundo estado do
   mesmo universo) e violeta Axolotl como marca fixa.
4. Catálogo Vite que renderiza todos os componentes nos dois temas, com dados
   sintéticos, sem inventar números da comunidade.
5. Docs em português, curtas e canônicas: fundamentos, componentes, estados,
   contrato do consumidor, acessibilidade.
6. Guardas automáticos: build, typecheck, tokens, manifesto, docs e fronteira do
   consumidor. `npm run verify` roda tudo.
7. Testes de comportamento para o que quebra fácil: foco em diálogo, teclado em
   tabs/select, `prefers-reduced-motion`, toasts.
8. Uma camada de instrução para IA: skill instalável, brief para colar, manifesto de
   props e checklist de revisão, para que qualquer agente produza tela Axolotl sem
   reexplicação da marca.

## Não-objetivos

- Não copia outro design system nem mantém fork de projeto externo.
- Não publica no npm registry; distribuição por `.tgz` (`npm pack`) ou workspace local.
- Não entrega páginas prontas: navbar, hero, footer e layout de página são do app.
- Não traz Tailwind, `motion`, `@dnd-kit`, `embla` ou qualquer dependência pesada.
- Não implementa busca de dados, autenticação, i18n ou regra de negócio.
- Não cria uma segunda marca visual: Prism existe para servir Axolotl BR.

## Anti-objetivos

Falha mesmo que funcione tecnicamente se:

- parecer um dashboard genérico ou um template de Discord;
- usar neon em excesso, gradiente aleatório, glassmorphism;
- tiver componente sem consumidor real só para "completar o catálogo";
- exibir número, evento ou usuário inventado;
- exigir override de CSS do app para ficar correto.

## Restrições

- Windows + PowerShell 5.1 no ambiente do dono.
- Caminho contém `#` (`#Projetos`), que quebra `vite dev`/`build`. Rodar de
  `C:\Temp` quando for executar o catálogo.
- Hub usa React 18.3 + Vite 5 + TypeScript 5.6 + `lucide-react` 0.454. Prism precisa
  funcionar nesse alvo, não só em React 19.
- Convenção do workspace: CSS puro, sem Tailwind; fonte única de verdade para dados.
- Sem segredos, sem `.env`, sem dependência de serviço externo em tempo de build.

## Repositório e distribuição

- O projeto é um repositório próprio, `https://github.com/OFabiano1/prism`, branch
  `main`, licença MIT. Ele fica dentro de `#Projetos` apenas como pasta de trabalho;
  o git do Prism não se mistura com o git do container.
- Não publica no npm registry. Distribuição por `npm pack` → `.tgz` anexado a uma
  GitHub Release, com SHA-256 no release notes. Instalação por URL do asset ou por
  workspace local.
- `dist` não é commitado. `package-lock.json` é commitado.
- Commits em Conventional Commits, em português ou inglês, escopo curto.

## Abordagens consideradas

1. **Port fiel de um design system externo** — copiar o pacote, renomear, trocar tokens.
   Rápido de executar, mas traz ~1100 arquivos, ~60 componentes e docs em inglês
   presos a nomes de outro projeto. Dívida imediata e marca que vira adesivo sobre o
   design de outra pessoa. Descartada.
2. **Prism enxuto** — subconjunto com identidade Axolotl, mesma filosofia de API.
   Escolhida. Custo: ~40 arquivos de código + docs + catálogo.
3. **Só tokens + CSS** — menor, mas o hub é React e não ganha componente de verdade.
   Descartada.

## Decisões

### Estrutura

```
prism/
  package.json            # workspace raiz, scripts verify/dev/test/install:skill
  AGENTS.md               # roteia qualquer agente para a skill e para o manifesto
  PRISM.md                # brief curto para colar em IA sem acesso a arquivo
  packages/prism/
    package.json          # nome "prism"
    src/                  # componentes, tokens.css, index.ts
    fonts/                # Space Grotesk + JetBrains Mono (woff2)
    scripts/              # check-tokens, check-consumer, build-manifest
  apps/catalog/           # catálogo Vite, ?view=components&theme=dark|light
  docs/prism/             # README, FUNDAMENTOS, COMPONENTES, ESTADOS, CONTRATO, ACESSIBILIDADE
  skills/prism/    # SKILL.md: instrução que o agente carrega sozinho
  scripts/                # guardas de workspace + install-skill.mjs
```

Estrutura mínima. Sem `labs/`, sem `evidence/`, sem histórico de migração.

### Stack

- TypeScript 5.9, Vite 5.4, React 18.3/19 como peer.
- CSS puro por componente (`button.css`, `dialog.css`, …) concatenado no build.
- Ícones: `lucide-react` como dependência (mesma família que o hub já usa).
- Movimento: transições CSS + hook próprio `useReducedMotion` (nada de `motion`).
- Testes: `node --test` para guardas e manifesto; Vitest + Testing Library + jsdom
  para comportamento.

### Tokens e tema

- Prefixo `--prism-*`, vocabulário semântico (`--prism-bg`, `--prism-text`,
  `--prism-surface`, `--prism-border`, `--prism-brand`, `--prism-on-brand`, …).
- Marca fixa `#8F00FF` (violeta Axolotl). Não é `brandColor` do chamador: Prism é do
  Axolotl, não um DS multi-marca. `DesignSystemProvider` controla só `theme`.
- Escuro é o padrão (`#05060c`). Claro é derivado da mesma paleta, não um produto novo.
- Escala de espaço, raio, tipografia e motion documentada em `FUNDAMENTOS.md`.
- Fontes self-hosted em `packages/prism/fonts` (o hub puxa do Google Fonts; o pacote
  não deve depender de rede em runtime).

### Componentes da v0.1

| Grupo | Componentes |
| --- | --- |
| Ação | `Button`, `TextLink`, `Chip` |
| Formulário | `TextField`, `TextArea`, `Select`, `Checkbox`, `Switch`, `SegmentedControl` |
| Navegação | `Tabs` |
| Sobreposição | `Dialog`, `Tooltip`, `Toast` (+ `ToastProvider`) |
| Superfície | `Card`, `EmptyState` |
| Dados | `Avatar`, `Badge` |
| Layout | `Stack`, `Inline`, `Grid` |
| Sistema | `DesignSystemProvider`, `ThemeToggle` |

Regras do sistema: variantes semânticas, nunca `className`/`style`; uma
geometria só (alturas e raios compartilhados); rótulo visível; caminho de teclado e
foco devolvido; todo movimento com caminho `prefers-reduced-motion`; estado de
sucesso/erro nunca depende só de cor.

### Fronteira de tema e CSS

- `DesignSystemProvider` renderiza `<div class="prism-root" data-theme="dark|light">`
  e não toca em `:root` nem em `document.documentElement`.
- `Dialog`, `Tooltip` e `Toast` montam portais dentro desse wrapper (container próprio
  do provider), então os tokens herdam sem duplicar variáveis.
- `styles.css` não traz reset e não estiliza elementos globais (`html`, `body`, `*`).
  O app hospedeiro mantém o próprio reset, como o hub já faz.

### Dependências

- Runtime: `react`/`react-dom` (peer), `lucide-react`.
- Sem Radix, sem `motion`, sem `@dnd-kit`, sem Tailwind. Foco preso, listbox, tooltip
  e fila de toast são implementados no próprio pacote.

### Verificação

- Matriz de teste única: React 18.3, Vite 5, TypeScript 5.9. React 19 fica declarado
  no peer e coberto apenas por typecheck com `@types/react` 19.
- Playwright cobre 320px e 1440px nos dois temas, com asserção de overflow horizontal
  e de foco visível. Sem baselines de pixel.
- Paridade de artefato: `dist` não é commitado. `verify` roda `npm pack`, confere a
  lista de arquivos do tarball e faz typecheck de um consumidor React 18 temporário
  que importa `prism` e `prism/styles.css`.

### API pública

- Componentes e `DesignSystemProvider`/`ThemeToggle` entram no manifesto.
- `useToast` e `useReducedMotion` são públicos, documentados, mas fora do manifesto
  (que descreve componentes).
- Tipos exportados (`ToastOptions`, variantes) são documentados junto do componente.

### Camada para IA

O motivo de Prism existir é este: qualquer IA que receba uma tarefa de UI no universo
Axolotl deve produzir tela coerente sem o dono reexplicar a marca. A camada tem quatro
peças, todas versionadas no repo:

1. **`skills/prism/SKILL.md`** — skill com frontmatter (`name`, `description`)
   que descreve quando ela se aplica (qualquer tarefa de UI, layout, componente ou
   revisão visual em projeto Axolotl) e o caminho curto: consultar `manifest.json`,
   importar de `prism`, aplicar as regras de design, rodar o guarda de consumidor.
   Instalada por `npm run install:skill`, que copia para
   `%USERPROFILE%\.config\opencode\skills\prism` e não sobrescreve versão
   existente sem `--force`.
2. **`PRISM.md`** — brief de até 400 palavras para colar em IA sem acesso a arquivo
   (ChatGPT, Claude web, Cursor). Contém tokens resumidos, lista de componentes,
   regras não negociáveis e o checklist final. Sem código longo, sem link morto.
3. **`manifest.json`** — gerado no build, com nome, props, tipos, valores literais,
   resumo e doc de cada componente. É a fonte que impede a IA de inventar prop.
4. **`docs/prism/REVISAO.md`** — checklist de UI/UX que a IA aplica antes de dizer
   "pronto": hierarquia, um CTA focal, ritmo de espaço, contraste, foco visível,
   caminho de movimento reduzido, estado vazio, texto em português natural.

Regras de design que a skill carrega (o que a IA decide sozinha):

- **Hierarquia por tipo e espaço**, não por caixa: no máximo três níveis visíveis por
  seção; nada de card dentro de card.
- **Um CTA focal por tela**, os demais em variante secundária.
- **Violeta é acento**, não preenchimento: `--prism-brand` em marca, seleção, foco e
  progresso; botão cheio usa superfície, não marca.
- **Espaço em múltiplos de 4**, com ritmo entre seções maior que dentro da seção.
- **Movimento curto** (120–240 ms), com `prefers-reduced-motion` sempre.
- **Sem número, usuário, evento ou depoimento inventado.** Se não há dado real, a
  tela mostra estado vazio verdadeiro.
- **Português brasileiro natural**, sem jargão corporativo, sem emoji decorativo.
- **Acessibilidade não é opcional**: rótulo visível, teclado, foco devolvido, contraste.

A skill proíbe explicitamente: `className`/`style` em componente Prism, redeclarar
`--prism-*`, mirar `.prism-*`, inventar componente que não está no manifesto, e
inventar dado para preencher tela.

### Docs e catálogo

- Docs em PT-BR, cada componente com uma entrada curta e o contrato de props.
- `manifest.json` gerado no build: nome, props, tipos, valores literais, resumo e doc.
- Catálogo usa apenas dados sintéticos (`Projeto exemplo`, `pessoa@exemplo.dev`) e
  nunca números de comunidade.

### Guardas

- `check:tokens` — hex literal só em `tokens.css`.
- `check:consumer` — nenhum consumidor passa `className`/`style` a componente Prism,
  nem redeclara `--prism-*`, nem mira `.prism-*`.
- `check:manifest` — todo export público está no manifesto.
- `check:docs` — todo componente tem doc e entrada no catálogo.
- `verify` = build + typecheck + guardas + testes + paridade do artefato.

## O que fica para o builder

- Nomes exatos de props internas, ordem dos arquivos, detalhes de implementação de
  foco e teclado.
- Escolha de valores finos da escala tipográfica e de raios, desde que documentados.
- Conteúdo exato das receitas do catálogo.

## Critérios de aceite

1. `npm run verify` verde a partir de `C:\Temp` (por causa do `#` no caminho).
2. Playwright passa em 320px e 1440px, nos dois temas, sem overflow horizontal e com
   foco visível em cada componente interativo.
3. Nenhum componente sem doc, sem entrada no manifesto ou sem uso no catálogo.
4. Um app React 18 consegue importar `prism` e `prism/styles.css` sem erro de tipo.
5. Nenhum número, usuário ou evento inventado em qualquer tela.
6. Nenhum hex literal fora de `tokens.css` e nenhum `className`/`style` vazando para
   componente Prism nos consumidores do repositório.
7. `npm run install:skill` instala a skill sem sobrescrever instalação existente sem
   `--force`, e a skill aparece na lista de skills do OpenCode.
8. **Teste de agente**: um subagente novo recebe só a skill, o manifesto e a tarefa
   "monte uma tela de perfil com dados de exemplo". O código produzido compila, importa
   apenas de `prism`, passa em `check:consumer`, usa dados sintéticos e não inventa
   número de comunidade.
9. `PRISM.md` tem no máximo 400 palavras e contém todos os itens do checklist final.
