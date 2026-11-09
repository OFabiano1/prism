/**
 * Contrato público do PRISM.
 * Esta é a fonte do `dist/manifest.json` e do guarda de docs.
 * Se um componente muda de prop, muda aqui e na doc no mesmo commit.
 */

export type ManifestKind = 'component' | 'primitive' | 'hook';

export type ManifestProp = {
  name: string;
  type: string;
  required: boolean;
  values?: readonly string[];
  summary: string;
};

export type ManifestEntry = {
  name: string;
  kind: ManifestKind;
  summary: string;
  doc: string;
  props: readonly ManifestProp[];
};

const DOC = 'docs/prism/COMPONENTES.md';

export const components: readonly ManifestEntry[] = [
  {
    name: 'DesignSystemProvider',
    kind: 'primitive',
    summary: 'Raiz visual: aplica tema e tokens no wrapper e hospeda os portais.',
    doc: `${DOC}#designsystemprovider`,
    props: [
      { name: 'theme', type: "'dark' | 'light'", required: true, values: ['dark', 'light'], summary: 'Tema controlado. Escuro é o padrão.' },
      { name: 'onThemeChange', type: '(theme: PrismTheme) => void', required: false, summary: 'Sem este callback o ThemeToggle fica indisponível.' },
      { name: 'children', type: 'ReactNode', required: true, summary: 'Conteúdo da aplicação.' },
    ],
  },
  {
    name: 'useTheme',
    kind: 'hook',
    summary: 'Lê o tema atual e a capacidade de troca dentro do provider.',
    doc: `${DOC}#usetheme`,
    props: [],
  },
  {
    name: 'useReducedMotion',
    kind: 'hook',
    summary: 'Devolve true quando o sistema pede menos movimento; false sem matchMedia.',
    doc: `${DOC}#usereducedmotion`,
    props: [],
  },
  {
    name: 'Text',
    kind: 'primitive',
    summary: 'Tipografia do sistema com tamanho, tom, mono e truncamento.',
    doc: `${DOC}#text`,
    props: [
      { name: 'as', type: 'elemento', required: false, values: ['p', 'span', 'div', 'h1', 'h2', 'h3', 'h4', 'strong', 'label', 'li'], summary: 'Elemento renderizado. Padrão: p.' },
      { name: 'size', type: 'TextSize', required: false, values: ['display', 'h1', 'h2', 'h3', 'h4', 'body-lg', 'body', 'body-sm', 'caption', 'overline'], summary: 'Passo da escala. Padrão: body.' },
      { name: 'tone', type: 'TextTone', required: false, values: ['default', 'secondary', 'muted', 'brand'], summary: 'Cor semântica do texto.' },
      { name: 'mono', type: 'boolean', required: false, summary: 'Usa a fonte mono para código e metadados.' },
      { name: 'truncate', type: 'boolean', required: false, summary: 'Recorta em uma linha com reticências.' },
      { name: 'id', type: 'string', required: false, summary: 'Id para âncoras e aria.' },
      { name: 'children', type: 'ReactNode', required: true, summary: 'Conteúdo.' },
    ],
  },
  {
    name: 'Container',
    kind: 'primitive',
    summary: 'Largura máxima do sistema, centralizada, com gutter responsivo.',
    doc: `${DOC}#container`,
    props: [
      { name: 'as', type: 'elemento', required: false, values: ['div', 'main', 'section', 'header', 'footer'], summary: 'Elemento renderizado.' },
      { name: 'children', type: 'ReactNode', required: true, summary: 'Conteúdo.' },
    ],
  },
  {
    name: 'VisuallyHidden',
    kind: 'primitive',
    summary: 'Texto disponível só para leitores de tela.',
    doc: `${DOC}#visuallyhidden`,
    props: [{ name: 'children', type: 'ReactNode', required: true, summary: 'Conteúdo.' }],
  },
  {
    name: 'Stack',
    kind: 'primitive',
    summary: 'Empilha conteúdo na vertical com o espaçamento do sistema.',
    doc: `${DOC}#stack`,
    props: [
      { name: 'gap', type: 'SpaceStep', required: false, summary: 'Passo de espaço. Padrão: 4.' },
      { name: 'align', type: 'string', required: false, values: ['stretch', 'start', 'center', 'end'], summary: 'Alinhamento no eixo cruzado.' },
      { name: 'as', type: 'elemento', required: false, values: ['div', 'section', 'article', 'ul', 'form'], summary: 'Elemento renderizado.' },
      { name: 'children', type: 'ReactNode', required: true, summary: 'Conteúdo.' },
    ],
  },
  {
    name: 'Inline',
    kind: 'primitive',
    summary: 'Alinha conteúdo na horizontal, com quebra controlada.',
    doc: `${DOC}#inline`,
    props: [
      { name: 'gap', type: 'SpaceStep', required: false, summary: 'Passo de espaço. Padrão: 3.' },
      { name: 'align', type: 'string', required: false, values: ['start', 'center', 'end', 'baseline'], summary: 'Alinhamento vertical.' },
      { name: 'justify', type: 'string', required: false, values: ['start', 'center', 'end', 'between'], summary: 'Distribuição horizontal.' },
      { name: 'wrap', type: 'boolean', required: false, summary: 'Permite quebra de linha. Padrão: true.' },
      { name: 'children', type: 'ReactNode', required: true, summary: 'Conteúdo.' },
    ],
  },
  {
    name: 'Grid',
    kind: 'primitive',
    summary: 'Grade responsiva do sistema, sem estilo inline.',
    doc: `${DOC}#grid`,
    props: [
      { name: 'columns', type: 'number', required: false, values: ['1', '2', '3', '4', '6', '12'], summary: 'Colunas no desktop. Padrão: 2.' },
      { name: 'gap', type: 'SpaceStep', required: false, summary: 'Passo de espaço. Padrão: 4.' },
      { name: 'as', type: 'elemento', required: false, values: ['div', 'section', 'ul'], summary: 'Elemento renderizado.' },
      { name: 'children', type: 'ReactNode', required: true, summary: 'Conteúdo.' },
    ],
  },
  {
    name: 'Alert',
    kind: 'component',
    summary: 'Mensagem persistente na página. Temporária é Toast.',
    doc: `${DOC}#alert`,
    props: [
      { name: 'tone', type: 'AlertTone', required: false, values: ['info', 'success', 'warning', 'danger'], summary: 'Tom semântico. Padrão: info.' },
      { name: 'title', type: 'string', required: true, summary: 'Título curto e visível.' },
      { name: 'description', type: 'string', required: false, summary: 'Detalhe em uma ou duas frases.' },
      { name: 'action', type: 'ReactNode', required: false, summary: 'Ação opcional, como desfazer.' },
      { name: 'hideIcon', type: 'boolean', required: false, summary: 'Remove o ícone; o tom continua no texto e na cor.' },
    ],
  },
  {
    name: 'Avatar',
    kind: 'component',
    summary: 'Avatar com imagem ou iniciais, com anel de status opcional.',
    doc: `${DOC}#avatar`,
    props: [
      { name: 'name', type: 'string', required: true, summary: 'Nome acessível e origem das iniciais.' },
      { name: 'src', type: 'string', required: false, summary: 'Imagem. Sem ela, entram as iniciais.' },
      { name: 'size', type: 'AvatarSize', required: false, values: ['xs', 'sm', 'md', 'lg'], summary: 'Tamanho. Padrão: md.' },
      { name: 'status', type: 'string', required: false, values: ['online', 'away', 'busy'], summary: 'Anel de presença, decorativo.' },
    ],
  },
  {
    name: 'Badge',
    kind: 'component',
    summary: 'Rótulo curto de estado. Não substitui texto explicativo.',
    doc: `${DOC}#badge`,
    props: [
      { name: 'label', type: 'string', required: true, summary: 'Texto do rótulo.' },
      { name: 'tone', type: 'BadgeTone', required: false, values: ['neutral', 'brand', 'success', 'warning', 'danger', 'info'], summary: 'Tom semântico. Padrão: neutral.' },
      { name: 'size', type: 'BadgeSize', required: false, values: ['sm', 'md'], summary: 'Tamanho. Padrão: md.' },
      { name: 'dot', type: 'boolean', required: false, summary: 'Ponto colorido antes do texto.' },
      { name: 'icon', type: 'ReactNode', required: false, summary: 'Ícone decorativo de 12px.' },
    ],
  },
  {
    name: 'Breadcrumbs',
    kind: 'component',
    summary: 'Trilha de navegação; o último item é a página atual.',
    doc: `${DOC}#breadcrumbs`,
    props: [
      { name: 'label', type: 'string', required: false, summary: 'Nome da navegação. Padrão: Trilha de navegação.' },
      { name: 'items', type: 'BreadcrumbItem[]', required: true, summary: 'Lista de { label, href? }.' },
    ],
  },
  {
    name: 'Button',
    kind: 'component',
    summary: 'Ação do sistema. A variante semântica resolve; não há classe nem estilo.',
    doc: `${DOC}#button`,
    props: [
      { name: 'label', type: 'string', required: true, summary: 'Rótulo visível.' },
      { name: 'onClick', type: '() => void', required: false, summary: 'Ação do clique.' },
      { name: 'variant', type: 'ButtonVariant', required: false, values: ['primary', 'secondary', 'outline', 'ghost', 'destructive'], summary: 'Peso da ação. Padrão: primary.' },
      { name: 'size', type: 'ButtonSize', required: false, values: ['sm', 'md', 'lg'], summary: 'Altura 32, 40 ou 48px.' },
      { name: 'icon', type: 'LucideIcon', required: false, summary: 'Ícone opcional.' },
      { name: 'iconPosition', type: 'string', required: false, values: ['start', 'end'], summary: 'Lado do ícone. Padrão: start.' },
      { name: 'loading', type: 'boolean', required: false, summary: 'Desabilita e anuncia aria-busy.' },
      { name: 'disabled', type: 'boolean', required: false, summary: 'Bloqueia a ação.' },
      { name: 'type', type: 'string', required: false, values: ['button', 'submit', 'reset'], summary: 'Tipo nativo. Padrão: button.' },
      { name: 'fullWidth', type: 'boolean', required: false, summary: 'Ocupa a largura disponível.' },
      { name: 'ariaLabel', type: 'string', required: false, summary: 'Nome acessível quando o rótulo não basta.' },
      { name: 'href', type: 'string', required: false, summary: 'Renderiza link com a mesma aparência.' },
      { name: 'external', type: 'boolean', required: false, summary: 'Com href: nova aba e rel seguro.' },
    ],
  },
  {
    name: 'Card',
    kind: 'component',
    summary: 'Superfície de conteúdo. A variante muda peso, não o layout da página.',
    doc: `${DOC}#card`,
    props: [
      { name: 'variant', type: 'CardVariant', required: false, values: ['default', 'interactive', 'featured', 'outlined', 'elevated', 'compact'], summary: 'Peso visual. Padrão: default.' },
      { name: 'as', type: 'elemento', required: false, values: ['div', 'article', 'section', 'li'], summary: 'Elemento renderizado.' },
      { name: 'children', type: 'ReactNode', required: true, summary: 'Conteúdo.' },
    ],
  },
  {
    name: 'CardHeader',
    kind: 'component',
    summary: 'Título, descrição e metadado do Card.',
    doc: `${DOC}#cardheader`,
    props: [
      { name: 'title', type: 'string', required: true, summary: 'Título.' },
      { name: 'description', type: 'string', required: false, summary: 'Linha de apoio.' },
      { name: 'meta', type: 'ReactNode', required: false, summary: 'Badge ou ação à direita.' },
    ],
  },
  {
    name: 'CardBody',
    kind: 'component',
    summary: 'Corpo do Card.',
    doc: `${DOC}#cardbody`,
    props: [{ name: 'children', type: 'ReactNode', required: true, summary: 'Conteúdo.' }],
  },
  {
    name: 'CardFooter',
    kind: 'component',
    summary: 'Rodapé do Card, separado por linha.',
    doc: `${DOC}#cardfooter`,
    props: [{ name: 'children', type: 'ReactNode', required: true, summary: 'Ações ou metadado.' }],
  },
  {
    name: 'Checkbox',
    kind: 'component',
    summary: 'Caixa de seleção com rótulo clicável.',
    doc: `${DOC}#checkbox`,
    props: [
      { name: 'label', type: 'string', required: true, summary: 'Rótulo visível.' },
      { name: 'checked', type: 'boolean', required: true, summary: 'Estado controlado.' },
      { name: 'onChange', type: '(checked: boolean) => void', required: true, summary: 'Recebe o novo estado.' },
      { name: 'hint', type: 'string', required: false, summary: 'Ajuda abaixo do controle.' },
      { name: 'error', type: 'string', required: false, summary: 'Erro; liga aria-invalid e aria-describedby.' },
      { name: 'disabled', type: 'boolean', required: false, summary: 'Bloqueia o controle.' },
      { name: 'required', type: 'boolean', required: false, summary: 'Marca o campo como obrigatório.' },
      { name: 'name', type: 'string', required: false, summary: 'Nome no formulário.' },
    ],
  },
  {
    name: 'IconButton',
    kind: 'component',
    summary: 'Botão só de ícone. O rótulo é obrigatório e vira aria-label.',
    doc: `${DOC}#iconbutton`,
    props: [
      { name: 'label', type: 'string', required: true, summary: 'Nome acessível.' },
      { name: 'icon', type: 'LucideIcon', required: true, summary: 'Ícone.' },
      { name: 'onClick', type: '() => void', required: false, summary: 'Ação do clique.' },
      { name: 'variant', type: 'IconButtonVariant', required: false, values: ['ghost', 'outline', 'secondary'], summary: 'Peso visual. Padrão: ghost.' },
      { name: 'size', type: 'IconButtonSize', required: false, values: ['sm', 'md', 'lg'], summary: 'Alvo de 32, 40 ou 48px.' },
      { name: 'disabled', type: 'boolean', required: false, summary: 'Bloqueia a ação.' },
      { name: 'type', type: 'string', required: false, values: ['button', 'submit'], summary: 'Tipo nativo. Padrão: button.' },
    ],
  },
  {
    name: 'Input',
    kind: 'component',
    summary: 'Campo de texto com rótulo, dica e erro ligados por aria.',
    doc: `${DOC}#input`,
    props: [
      { name: 'label', type: 'string', required: true, summary: 'Rótulo visível.' },
      { name: 'value', type: 'string', required: true, summary: 'Valor controlado.' },
      { name: 'onChange', type: '(value: string) => void', required: true, summary: 'Recebe o novo valor.' },
      { name: 'type', type: 'InputType', required: false, values: ['text', 'password', 'search', 'number', 'email', 'tel', 'url'], summary: 'Tipo nativo. Padrão: text.' },
      { name: 'placeholder', type: 'string', required: false, summary: 'Exemplo; nunca substitui o rótulo.' },
      { name: 'hint', type: 'string', required: false, summary: 'Ajuda abaixo do campo.' },
      { name: 'error', type: 'string', required: false, summary: 'Erro; liga aria-invalid e aria-describedby.' },
      { name: 'disabled', type: 'boolean', required: false, summary: 'Bloqueia o campo.' },
      { name: 'readOnly', type: 'boolean', required: false, summary: 'Somente leitura.' },
      { name: 'required', type: 'boolean', required: false, summary: 'Marca o campo como obrigatório.' },
      { name: 'name', type: 'string', required: false, summary: 'Nome no formulário.' },
      { name: 'autoComplete', type: 'string', required: false, summary: 'Dica de autofill.' },
      { name: 'hideLabel', type: 'boolean', required: false, summary: 'Esconde o rótulo mantendo o nome acessível.' },
      { name: 'inputMode', type: 'string', required: false, summary: 'Teclado em telas pequenas.' },
      { name: 'prefix', type: 'string', required: false, summary: 'Prefixo visual fixo, como um domínio.' },
    ],
  },
  {
    name: 'Spinner',
    kind: 'component',
    summary: 'Indicador de carregamento com nome acessível.',
    doc: `${DOC}#spinner`,
    props: [
      { name: 'label', type: 'string', required: false, summary: 'Nome acessível. Padrão: Carregando.' },
      { name: 'size', type: 'SpinnerSize', required: false, values: ['sm', 'md', 'lg'], summary: 'Tamanho. Padrão: md.' },
    ],
  },
  {
    name: 'Skeleton',
    kind: 'component',
    summary: 'Placeholder de carregamento. Nunca inventa conteúdo.',
    doc: `${DOC}#skeleton`,
    props: [
      { name: 'lines', type: 'number', required: false, summary: 'Linhas de texto simuladas. Padrão: 1.' },
      { name: 'shape', type: 'string', required: false, values: ['title', 'text', 'block', 'avatar'], summary: 'Forma do bloco. Padrão: text.' },
    ],
  },
  {
    name: 'Progress',
    kind: 'component',
    summary: 'Barra de progresso determinada, com progress nativo.',
    doc: `${DOC}#progress`,
    props: [
      { name: 'value', type: 'number', required: true, summary: '0 a 100; o componente limita.' },
      { name: 'label', type: 'string', required: true, summary: 'Rótulo visível e nome acessível.' },
      { name: 'tone', type: 'ProgressTone', required: false, values: ['brand', 'success', 'warning', 'danger'], summary: 'Tom da barra. Padrão: brand.' },
      { name: 'showValue', type: 'boolean', required: false, summary: 'Mostra a porcentagem ao lado do rótulo.' },
    ],
  },
  {
    name: 'RadioGroup',
    kind: 'component',
    summary: 'Grupo de rádio com fieldset e legend.',
    doc: `${DOC}#radiogroup`,
    props: [
      { name: 'label', type: 'string', required: true, summary: 'Legenda do grupo.' },
      { name: 'value', type: 'string', required: true, summary: 'Opção selecionada.' },
      { name: 'onChange', type: '(value: string) => void', required: true, summary: 'Recebe o id escolhido.' },
      { name: 'options', type: 'RadioOption[]', required: true, summary: 'Lista de { id, label, disabled? }.' },
      { name: 'hint', type: 'string', required: false, summary: 'Ajuda abaixo do grupo.' },
      { name: 'error', type: 'string', required: false, summary: 'Erro do grupo.' },
      { name: 'disabled', type: 'boolean', required: false, summary: 'Bloqueia todas as opções.' },
      { name: 'name', type: 'string', required: false, summary: 'Nome no formulário.' },
      { name: 'inline', type: 'boolean', required: false, summary: 'Opções em linha.' },
    ],
  },
  {
    name: 'Select',
    kind: 'component',
    summary: 'Seleção nativa com a aparência do sistema.',
    doc: `${DOC}#select`,
    props: [
      { name: 'label', type: 'string', required: true, summary: 'Rótulo visível.' },
      { name: 'value', type: 'string', required: true, summary: 'Valor controlado.' },
      { name: 'onChange', type: '(value: string) => void', required: true, summary: 'Recebe o id escolhido.' },
      { name: 'options', type: 'SelectOption[]', required: true, summary: 'Lista de { id, label, disabled? }.' },
      { name: 'placeholder', type: 'string', required: false, summary: 'Opção inicial desabilitada.' },
      { name: 'hint', type: 'string', required: false, summary: 'Ajuda abaixo do campo.' },
      { name: 'error', type: 'string', required: false, summary: 'Erro do campo.' },
      { name: 'disabled', type: 'boolean', required: false, summary: 'Bloqueia o campo.' },
      { name: 'required', type: 'boolean', required: false, summary: 'Marca como obrigatório.' },
      { name: 'name', type: 'string', required: false, summary: 'Nome no formulário.' },
      { name: 'hideLabel', type: 'boolean', required: false, summary: 'Esconde o rótulo mantendo o nome acessível.' },
      { name: 'variant', type: 'string', required: false, values: ['default', 'compact'], summary: 'Compacto para barras de ferramenta.' },
    ],
  },
  {
    name: 'Switch',
    kind: 'component',
    summary: 'Interruptor on/off com role switch.',
    doc: `${DOC}#switch`,
    props: [
      { name: 'label', type: 'string', required: true, summary: 'Rótulo visível ou nome acessível.' },
      { name: 'checked', type: 'boolean', required: true, summary: 'Estado controlado.' },
      { name: 'onChange', type: '(checked: boolean) => void', required: true, summary: 'Recebe o novo estado.' },
      { name: 'hint', type: 'string', required: false, summary: 'Ajuda abaixo do controle.' },
      { name: 'disabled', type: 'boolean', required: false, summary: 'Bloqueia o controle.' },
      { name: 'hideLabel', type: 'boolean', required: false, summary: 'Esconde o rótulo mantendo o nome acessível.' },
    ],
  },
  {
    name: 'Tabs',
    kind: 'component',
    summary: 'Abas com roving tabindex, setas, Home e End.',
    doc: `${DOC}#tabs`,
    props: [
      { name: 'label', type: 'string', required: true, summary: 'Nome do tablist.' },
      { name: 'items', type: 'TabItem[]', required: true, summary: 'Lista de { id, label, disabled? }.' },
      { name: 'value', type: 'string', required: true, summary: 'Aba ativa.' },
      { name: 'onChange', type: '(id: string) => void', required: true, summary: 'Recebe o id da aba.' },
      { name: 'children', type: 'ReactNode', required: false, summary: 'Conteúdo do painel.' },
    ],
  },
  {
    name: 'Textarea',
    kind: 'component',
    summary: 'Área de texto com rótulo, dica e erro.',
    doc: `${DOC}#textarea`,
    props: [
      { name: 'label', type: 'string', required: true, summary: 'Rótulo visível.' },
      { name: 'value', type: 'string', required: true, summary: 'Valor controlado.' },
      { name: 'onChange', type: '(value: string) => void', required: true, summary: 'Recebe o novo valor.' },
      { name: 'placeholder', type: 'string', required: false, summary: 'Exemplo; não substitui o rótulo.' },
      { name: 'hint', type: 'string', required: false, summary: 'Ajuda abaixo do campo.' },
      { name: 'error', type: 'string', required: false, summary: 'Erro do campo.' },
      { name: 'disabled', type: 'boolean', required: false, summary: 'Bloqueia o campo.' },
      { name: 'readOnly', type: 'boolean', required: false, summary: 'Somente leitura.' },
      { name: 'required', type: 'boolean', required: false, summary: 'Marca como obrigatório.' },
      { name: 'name', type: 'string', required: false, summary: 'Nome no formulário.' },
      { name: 'rows', type: 'number', required: false, summary: 'Altura inicial em linhas. Padrão: 4.' },
      { name: 'maxLength', type: 'number', required: false, summary: 'Limite de caracteres.' },
      { name: 'hideLabel', type: 'boolean', required: false, summary: 'Esconde o rótulo mantendo o nome acessível.' },
    ],
  },
  {
    name: 'ToastProvider',
    kind: 'component',
    summary: 'Fila de avisos temporários com live region e fechamento manual.',
    doc: `${DOC}#toastprovider`,
    props: [{ name: 'children', type: 'ReactNode', required: true, summary: 'Aplicação que usa useToast.' }],
  },
  {
    name: 'useToast',
    kind: 'hook',
    summary: 'Abre e fecha toasts: { show, dismiss }.',
    doc: `${DOC}#usetoast`,
    props: [],
  },
  {
    name: 'Tooltip',
    kind: 'component',
    summary: 'Dica curta em hover e foco. Nunca é o único caminho para a informação.',
    doc: `${DOC}#tooltip`,
    props: [
      { name: 'label', type: 'string', required: true, summary: 'Texto da dica.' },
      { name: 'children', type: 'ReactElement', required: true, summary: 'Elemento que recebe a dica.' },
      { name: 'side', type: 'string', required: false, values: ['top', 'bottom'], summary: 'Lado da dica. Padrão: top.' },
    ],
  },
];
