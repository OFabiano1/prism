# Fundamentos

Prism tem uma geometria, uma escala e dois temas. Tudo abaixo vale para qualquer
projeto do Axolotl BR. Não existe token paralelo por projeto.

## Cor

O único arquivo com hex literal é `tokens/colors.css`. Componente, catálogo e app leem
papéis semânticos, nunca um valor solto.

| Papel | Token | Uso |
| --- | --- | --- |
| Fundo | `--background` | fundo da página |
| Superfície | `--surface` | card, input, painel |
| Superfície elevada | `--surface-elevated` | toast, tooltip, menu |
| Hover | `--surface-hover` | estado de passagem e seleção neutra |
| Texto | `--text-primary` | texto principal |
| Texto secundário | `--text-secondary` | apoio, rótulo, metadado |
| Texto muted | `--text-muted` | informação de terceiro nível |
| Borda sutil | `--border-subtle` | divisor e limite de seção |
| Borda padrão | `--border-default` | input, card, controle |
| Borda forte | `--border-strong` | contraste de controle |
| Marca | `--prism-primary` | seleção, progresso, foco e marca |
| Marca hover | `--prism-primary-hover` | link e ícone de marca |
| Foco | `--focus-ring` | anel de foco visível |

O violeta é acento, não preenchimento. Ele ocupa no máximo 10% da área. Botão primário
é a exceção declarada do sistema. Fora dele, superfície e borda resolvem.

A paleta do Prism é o espectro: a luz que o prisma abre, em seis cores fixas nos dois
temas. Ela é a marca do próprio Prism (logo, banner, peça sobre o Prism) e não entra
como acento de interface. Usa as seis juntas e nessa ordem, sem gradiente entre elas.

| Token | Cor |
| --- | --- |
| `--prism-spectrum-yellow` | `#fbe22a` |
| `--prism-spectrum-orange` | `#fc782b` |
| `--prism-spectrum-red` | `#fc2b36` |
| `--prism-spectrum-pink` | `#ff00ea` |
| `--prism-spectrum-violet` | `#ba00ff` |
| `--prism-spectrum-purple` | `#7e00fe` |

Cada tom semântico tem três papéis: cor cheia, `*-soft` para fundo e `*-border` para
limite. `success`, `warning`, `danger` e `info` nunca aparecem sozinhos: ícone ou texto
acompanha a cor.

O tema escuro é o padrão. O claro é o mesmo universo com superfícies trocadas, não um
produto novo. O provider aplica `data-theme` no wrapper `.prism-root`; nada toca em
`:root` nem em `document.documentElement`.

## Tipografia

Interface usa Inter. Código, identificador e metadado usam JetBrains Mono. As duas
fontes são self-hosted em `fonts/`, sem dependência de rede em runtime.

| Passo | Token | Tamanho | Line-height | Peso |
| --- | --- | --- | --- | --- |
| display | `--font-size-display` | 56px | 1.08 | 700 |
| h1 | `--font-size-h1` | 40px | 1.2 | 700 |
| h2 | `--font-size-h2` | 32px | 1.2 | 600 |
| h3 | `--font-size-h3` | 24px | 1.2 | 600 |
| h4 | `--font-size-h4` | 20px | 1.4 | 600 |
| body-lg | `--font-size-body-lg` | 18px | 1.6 | 400 |
| body | `--font-size-body` | 16px | 1.6 | 400 |
| body-sm | `--font-size-body-sm` | 14px | 1.4 | 400 |
| caption | `--font-size-caption` | 12px | 1.4 | 500 |
| overline | `--font-size-overline` | 11px | 1.4 | 600 |

Título leva tracking negativo: `-0.03em` no display e `-0.02em` do h1 ao h3. Corpo usa
tracking zero. Overline usa caixa alta e `0.12em`.

Máximo de três tamanhos por seção. Se a hierarquia precisa de um quarto tamanho, o
problema é a hierarquia.

## Espaço

A base é 4px. Use o token, não o número.

`--space-0` 0, `--space-1` 4, `--space-2` 8, `--space-3` 12, `--space-4` 16,
`--space-5` 20, `--space-6` 24, `--space-7` 28, `--space-8` 32, `--space-10` 40,
`--space-12` 48, `--space-16` 64, `--space-20` 80, `--space-24` 96.

Ritmo: espaço entre seções maior que espaço dentro da seção. Conteúdo relacionado fica
junto; conteúdo de outra ordem fica longe.

## Raio, sombra e movimento

Raio: `--radius-xs` 4, `--radius-sm` 6, `--radius-md` 10, `--radius-lg` 14,
`--radius-xl` 20, `--radius-2xl` 28, `--radius-full` 9999.

Sombra existe em quatro passos, `--shadow-1` a `--shadow-4`. É preta e discreta. Não
existe sombra colorida nem glow.

Movimento: `--motion-instant` 100ms, `--motion-fast` 150ms, `--motion-normal` 200ms,
`--motion-moderate` 300ms, `--motion-slow` 500ms. Interface não passa de 300ms.
`prefers-reduced-motion` zera duração e animação dentro de `.prism-root`.

## Layout

Breakpoints usados nas media queries: mobile até 639, tablet 640 a 1023, desktop 1024
a 1439, wide 1440 ou mais.

`.prism-root` publica `--layout-max` 1440px, `--layout-gutter` 16/24/32 e
`--layout-columns` 4/8/12. `Container` aplica largura máxima, centro e gutter.
`--layout-measure` 68ch limita texto corrido.

Grid de layout é responsabilidade do app. `Stack`, `Inline` e `Grid` resolvem arranjo
local. Card dentro de card não entra.

## Regra de bolso

Se a tela precisa de CSS do app para ficar correta, o componente está incompleto. Se a
tela precisa de um token novo, a decisão é de `brand/`, não do app.
