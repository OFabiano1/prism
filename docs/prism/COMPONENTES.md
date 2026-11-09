# Componentes

Contrato completo em `dist/manifest.json`. As tabelas abaixo mostram o uso comum; o
manifesto vence quando houver dúvida sobre tipo, valor literal ou obrigatoriedade.

Todos os componentes são importados de `prism`. Nenhum aceita `className` ou `style`.

```tsx
import { Button, Card, CardHeader, CardBody, Text } from 'prism';
```

## DesignSystemProvider

Raiz visual do sistema. Aplica tema e tokens em um wrapper `.prism-root` e hospeda os
portais de toast e tooltip. Fica uma vez, no topo do app.

| Prop | Tipo | Padrão | Nota |
| --- | --- | --- | --- |
| `theme` | `'dark' \| 'light'` | obrigatório | Tema controlado. |
| `onThemeChange` | `(theme) => void` | nenhum | Sem ele, a troca de tema fica indisponível. |
| `children` | `ReactNode` | obrigatório | Conteúdo do app. |

## useTheme

Lê o tema atual dentro do provider.

```tsx
const { theme, setTheme, canChangeTheme } = useTheme();
```

`setTheme` só funciona quando o provider recebeu `onThemeChange`. `canChangeTheme`
informa isso antes de renderizar um controle de troca.

## useReducedMotion

Devolve `true` quando o sistema pede menos movimento. Em SSR ou ambiente sem
`matchMedia`, devolve `false`.

```tsx
const reduced = useReducedMotion();
```

## Text

Tipografia do sistema. Não aceita classe nem estilo externo.

| Prop | Tipo | Padrão | Nota |
| --- | --- | --- | --- |
| `as` | elemento | `p` | `p`, `span`, `div`, `h1` a `h4`, `strong`, `label`, `li`. |
| `size` | `TextSize` | `body` | display, h1, h2, h3, h4, body-lg, body, body-sm, caption, overline. |
| `tone` | `TextTone` | `default` | default, secondary, muted, brand. |
| `mono` | `boolean` | `false` | Código, identificador e metadado. |
| `truncate` | `boolean` | `false` | Uma linha com reticências. |
| `id` | `string` | nenhum | Âncora e `aria`. |
| `children` | `ReactNode` | obrigatório | Conteúdo. |

## Container

Largura máxima, centralização e gutter responsivo.

| Prop | Tipo | Padrão | Nota |
| --- | --- | --- | --- |
| `as` | elemento | `div` | `div`, `main`, `section`, `header`, `footer`. |
| `children` | `ReactNode` | obrigatório | Conteúdo. |

## VisuallyHidden

Texto disponível para leitor de tela e invisível na tela. Use para nome de região,
instrução de teclado e rótulo que o visual já comunica.

| Prop | Tipo | Padrão | Nota |
| --- | --- | --- | --- |
| `children` | `ReactNode` | obrigatório | Conteúdo. |

## Stack

Empilha na vertical.

| Prop | Tipo | Padrão | Nota |
| --- | --- | --- | --- |
| `gap` | `SpaceStep` | `4` | Passo da escala de espaço. |
| `align` | `stretch \| start \| center \| end` | `stretch` | Alinhamento no eixo cruzado. |
| `as` | elemento | `div` | `div`, `section`, `article`, `ul`, `form`. |
| `children` | `ReactNode` | obrigatório | Conteúdo. |

## Inline

Alinha na horizontal com quebra controlada.

| Prop | Tipo | Padrão | Nota |
| --- | --- | --- | --- |
| `gap` | `SpaceStep` | `3` | Passo da escala de espaço. |
| `align` | `start \| center \| end \| baseline` | `center` | Alinhamento vertical. |
| `justify` | `start \| center \| end \| between` | `start` | Distribuição horizontal. |
| `wrap` | `boolean` | `true` | Permite quebra de linha. |
| `children` | `ReactNode` | obrigatório | Conteúdo. |

## Grid

Grade local, não layout de página.

| Prop | Tipo | Padrão | Nota |
| --- | --- | --- | --- |
| `columns` | `1 \| 2 \| 3 \| 4 \| 6 \| 12` | `2` | Colunas no desktop. Telas menores reduzem sozinhas. |
| `gap` | `SpaceStep` | `4` | Passo da escala de espaço. |
| `as` | elemento | `div` | `div`, `section`, `ul`. |
| `children` | `ReactNode` | obrigatório | Conteúdo. |

## Alert

Mensagem persistente na página. Para mensagem temporária, use Toast.

| Prop | Tipo | Padrão | Nota |
| --- | --- | --- | --- |
| `tone` | `info \| success \| warning \| danger` | `info` | Tom semântico. |
| `title` | `string` | obrigatório | Título curto e visível. |
| `description` | `string` | nenhum | Uma ou duas frases. |
| `action` | `ReactNode` | nenhum | Ação opcional, como desfazer. |
| `hideIcon` | `boolean` | `false` | Remove o ícone. O tom continua no texto e na cor. |

## Avatar

Imagem ou iniciais, com anel de status opcional.

| Prop | Tipo | Padrão | Nota |
| --- | --- | --- | --- |
| `name` | `string` | obrigatório | Nome acessível e origem das iniciais. |
| `src` | `string` | nenhum | Sem imagem, entram as iniciais. |
| `size` | `xs \| sm \| md \| lg` | `md` | Tamanho. |
| `status` | `online \| away \| busy` | nenhum | Anel decorativo; o status precisa de texto em outro lugar. |

## Badge

Rótulo curto de estado. Não substitui texto explicativo.

| Prop | Tipo | Padrão | Nota |
| --- | --- | --- | --- |
| `label` | `string` | obrigatório | Texto do rótulo. |
| `tone` | `neutral \| brand \| success \| warning \| danger \| info` | `neutral` | Tom semântico. |
| `size` | `sm \| md` | `md` | Tamanho. |
| `dot` | `boolean` | `false` | Ponto colorido antes do texto. |
| `icon` | `ReactNode` | nenhum | Ícone decorativo. |

## Breadcrumbs

Trilha de navegação. O último item é a página atual e não recebe link.

| Prop | Tipo | Padrão | Nota |
| --- | --- | --- | --- |
| `label` | `string` | `Trilha de navegação` | Nome da navegação. |
| `items` | `BreadcrumbItem[]` | obrigatório | `{ label, href? }`. |

## Button

Ação do sistema. A variante semântica resolve; não existe escape de estilo.

| Prop | Tipo | Padrão | Nota |
| --- | --- | --- | --- |
| `label` | `string` | obrigatório | Rótulo visível. |
| `onClick` | `() => void` | nenhum | Ação do clique. |
| `variant` | `primary \| secondary \| outline \| ghost \| destructive` | `primary` | Peso da ação. |
| `size` | `sm \| md \| lg` | `md` | Altura 32, 40 ou 48px. |
| `icon` | `LucideIcon` | nenhum | Ícone opcional. |
| `iconPosition` | `start \| end` | `start` | Lado do ícone. |
| `loading` | `boolean` | `false` | Desabilita e anuncia `aria-busy`. |
| `disabled` | `boolean` | `false` | Bloqueia a ação. |
| `type` | `button \| submit \| reset` | `button` | Tipo nativo. |
| `fullWidth` | `boolean` | `false` | Ocupa a largura disponível. |
| `ariaLabel` | `string` | nenhum | Nome acessível quando o rótulo não basta. |
| `href` | `string` | nenhum | Renderiza `<a>` com a mesma aparência. Use para navegar; `onClick` é para ação. |
| `external` | `boolean` | `false` | Com `href`: abre em nova aba com `rel="noopener noreferrer"`. |

## Card

Superfície de conteúdo. A variante muda peso, não o layout da página.

| Prop | Tipo | Padrão | Nota |
| --- | --- | --- | --- |
| `variant` | `default \| interactive \| featured \| outlined \| elevated \| compact` | `default` | Peso visual. |
| `as` | elemento | `div` | `div`, `article`, `section`, `li`. |
| `children` | `ReactNode` | obrigatório | Conteúdo. |

## CardHeader

Título, descrição e metadado do Card.

| Prop | Tipo | Padrão | Nota |
| --- | --- | --- | --- |
| `title` | `string` | obrigatório | Título. |
| `description` | `string` | nenhum | Linha de apoio. |
| `meta` | `ReactNode` | nenhum | Badge ou ação à direita. |

## CardBody

Corpo do Card.

| Prop | Tipo | Padrão | Nota |
| --- | --- | --- | --- |
| `children` | `ReactNode` | obrigatório | Conteúdo. |

## CardFooter

Rodapé do Card, separado por linha.

| Prop | Tipo | Padrão | Nota |
| --- | --- | --- | --- |
| `children` | `ReactNode` | obrigatório | Ações ou metadado. |

## Checkbox

Caixa de seleção com rótulo clicável.

| Prop | Tipo | Padrão | Nota |
| --- | --- | --- | --- |
| `label` | `string` | obrigatório | Rótulo visível. |
| `checked` | `boolean` | obrigatório | Estado controlado. |
| `onChange` | `(checked) => void` | obrigatório | Recebe o novo estado. |
| `hint` | `string` | nenhum | Ajuda abaixo do controle. |
| `error` | `string` | nenhum | Liga `aria-invalid` e `aria-describedby`. |
| `disabled` | `boolean` | `false` | Bloqueia o controle. |
| `required` | `boolean` | `false` | Marca como obrigatório. |
| `name` | `string` | nenhum | Nome no formulário. |

## IconButton

Botão só de ícone. O rótulo é obrigatório e vira `aria-label` e `title`.

| Prop | Tipo | Padrão | Nota |
| --- | --- | --- | --- |
| `label` | `string` | obrigatório | Nome acessível. |
| `icon` | `LucideIcon` | obrigatório | Ícone. |
| `onClick` | `() => void` | nenhum | Ação do clique. |
| `variant` | `ghost \| outline \| secondary` | `ghost` | Peso visual. |
| `size` | `sm \| md \| lg` | `md` | Alvo de 32, 40 ou 48px. |
| `disabled` | `boolean` | `false` | Bloqueia a ação. |
| `type` | `button \| submit` | `button` | Tipo nativo. |

## Input

Campo de texto com rótulo, dica e erro ligados por `aria`.

| Prop | Tipo | Padrão | Nota |
| --- | --- | --- | --- |
| `label` | `string` | obrigatório | Rótulo visível. |
| `value` | `string` | obrigatório | Valor controlado. |
| `onChange` | `(value) => void` | obrigatório | Recebe o novo valor. |
| `type` | `text \| password \| search \| number \| email \| tel \| url` | `text` | Tipo nativo. |
| `placeholder` | `string` | nenhum | Exemplo. Nunca substitui o rótulo. |
| `hint` | `string` | nenhum | Ajuda abaixo do campo. |
| `error` | `string` | nenhum | Liga `aria-invalid` e `aria-describedby`. |
| `disabled` | `boolean` | `false` | Bloqueia o campo. |
| `readOnly` | `boolean` | `false` | Somente leitura. |
| `required` | `boolean` | `false` | Marca como obrigatório. |
| `name` | `string` | nenhum | Nome no formulário. |
| `autoComplete` | `string` | nenhum | Dica de autofill. |
| `hideLabel` | `boolean` | `false` | Esconde o rótulo mantendo o nome acessível. |
| `inputMode` | `string` | nenhum | Teclado em tela pequena. |
| `prefix` | `string` | nenhum | Prefixo visual fixo, como um domínio. |

## Spinner

Indicador de carregamento com nome acessível.

| Prop | Tipo | Padrão | Nota |
| --- | --- | --- | --- |
| `label` | `string` | `Carregando` | Nome acessível. |
| `size` | `sm \| md \| lg` | `md` | Tamanho. |

## Skeleton

Placeholder de carregamento. Nunca inventa conteúdo.

| Prop | Tipo | Padrão | Nota |
| --- | --- | --- | --- |
| `lines` | `number` | `1` | Linhas de texto simuladas. |
| `shape` | `title \| text \| block \| avatar` | `text` | Forma do bloco. |

## Progress

Barra determinada, com `<progress>` nativo.

| Prop | Tipo | Padrão | Nota |
| --- | --- | --- | --- |
| `value` | `number` | obrigatório | 0 a 100. O componente limita. |
| `label` | `string` | obrigatório | Rótulo visível e nome acessível. |
| `tone` | `brand \| success \| warning \| danger` | `brand` | Tom da barra. |
| `showValue` | `boolean` | `false` | Mostra a porcentagem ao lado do rótulo. |

## RadioGroup

Grupo de rádio com `fieldset` e `legend`. A seta do teclado vem do navegador.

| Prop | Tipo | Padrão | Nota |
| --- | --- | --- | --- |
| `label` | `string` | obrigatório | Legenda do grupo. |
| `value` | `string` | obrigatório | Opção selecionada. |
| `onChange` | `(value) => void` | obrigatório | Recebe o id escolhido. |
| `options` | `RadioOption[]` | obrigatório | `{ id, label, disabled? }`. |
| `hint` | `string` | nenhum | Ajuda abaixo do grupo. |
| `error` | `string` | nenhum | Erro do grupo. |
| `disabled` | `boolean` | `false` | Bloqueia todas as opções. |
| `name` | `string` | nenhum | Nome no formulário. |
| `inline` | `boolean` | `false` | Opções em linha. |

## Select

Seleção nativa com a aparência do sistema.

| Prop | Tipo | Padrão | Nota |
| --- | --- | --- | --- |
| `label` | `string` | obrigatório | Rótulo visível. |
| `value` | `string` | obrigatório | Valor controlado. |
| `onChange` | `(value) => void` | obrigatório | Recebe o id escolhido. |
| `options` | `SelectOption[]` | obrigatório | `{ id, label, disabled? }`. |
| `placeholder` | `string` | nenhum | Opção inicial desabilitada. |
| `hint` | `string` | nenhum | Ajuda abaixo do campo. |
| `error` | `string` | nenhum | Erro do campo. |
| `disabled` | `boolean` | `false` | Bloqueia o campo. |
| `required` | `boolean` | `false` | Marca como obrigatório. |
| `name` | `string` | nenhum | Nome no formulário. |
| `hideLabel` | `boolean` | `false` | Esconde o rótulo mantendo o nome acessível. |
| `variant` | `default \| compact` | `default` | Compacto para barra de ferramenta. |

## Switch

Interruptor on/off com `role="switch"`.

| Prop | Tipo | Padrão | Nota |
| --- | --- | --- | --- |
| `label` | `string` | obrigatório | Rótulo visível ou nome acessível. |
| `checked` | `boolean` | obrigatório | Estado controlado. |
| `onChange` | `(checked) => void` | obrigatório | Recebe o novo estado. |
| `hint` | `string` | nenhum | Ajuda abaixo do controle. |
| `disabled` | `boolean` | `false` | Bloqueia o controle. |
| `hideLabel` | `boolean` | `false` | Esconde o rótulo mantendo o nome acessível. |

## Tabs

Abas com roving tabindex, setas, Home e End.

| Prop | Tipo | Padrão | Nota |
| --- | --- | --- | --- |
| `label` | `string` | obrigatório | Nome do `tablist`. |
| `items` | `TabItem[]` | obrigatório | `{ id, label, disabled? }`. |
| `value` | `string` | obrigatório | Aba ativa. |
| `onChange` | `(id) => void` | obrigatório | Recebe o id da aba. |
| `children` | `ReactNode` | nenhum | Conteúdo do painel. |

## Textarea

Área de texto com rótulo, dica e erro.

| Prop | Tipo | Padrão | Nota |
| --- | --- | --- | --- |
| `label` | `string` | obrigatório | Rótulo visível. |
| `value` | `string` | obrigatório | Valor controlado. |
| `onChange` | `(value) => void` | obrigatório | Recebe o novo valor. |
| `placeholder` | `string` | nenhum | Exemplo. Não substitui o rótulo. |
| `hint` | `string` | nenhum | Ajuda abaixo do campo. |
| `error` | `string` | nenhum | Erro do campo. |
| `disabled` | `boolean` | `false` | Bloqueia o campo. |
| `readOnly` | `boolean` | `false` | Somente leitura. |
| `required` | `boolean` | `false` | Marca como obrigatório. |
| `name` | `string` | nenhum | Nome no formulário. |
| `rows` | `number` | `4` | Altura inicial em linhas. |
| `maxLength` | `number` | nenhum | Limite de caracteres. |
| `hideLabel` | `boolean` | `false` | Esconde o rótulo mantendo o nome acessível. |

## ToastProvider

Fila de avisos temporários com live region e fechamento manual. Fica uma vez no app.

| Prop | Tipo | Padrão | Nota |
| --- | --- | --- | --- |
| `children` | `ReactNode` | obrigatório | App que usa `useToast`. |

## useToast

Abre e fecha avisos.

```tsx
const { show, dismiss } = useToast();
const id = show({ title: 'Rascunho salvo', tone: 'success' });
dismiss(id);
```

`ToastOptions`: `title` obrigatório, `description`, `tone` (`neutral`, `success`,
`danger`) e `durationMs` (padrão 5000; `0` não fecha sozinho).

## Tooltip

Dica curta em hover e foco. Nunca é o único caminho para a informação.

| Prop | Tipo | Padrão | Nota |
| --- | --- | --- | --- |
| `label` | `string` | obrigatório | Texto da dica. |
| `children` | `ReactElement` | obrigatório | Elemento que recebe a dica. |
| `side` | `top \| bottom` | `top` | Lado da dica. |
