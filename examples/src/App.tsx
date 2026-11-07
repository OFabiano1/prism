import { useState } from 'react';
import type { ReactNode } from 'react';
import {
  Alert,
  Avatar,
  Badge,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Container,
  DesignSystemProvider,
  Grid,
  IconButton,
  Inline,
  Input,
  Progress,
  RadioGroup,
  Select,
  Skeleton,
  Spinner,
  Stack,
  Switch,
  Tabs,
  Text,
  Textarea,
  ToastProvider,
  Tooltip,
  useReducedMotion,
  useTheme,
  useToast,
  VisuallyHidden,
} from 'prism';
import type { PrismTheme, RadioOption, SelectOption, TabItem } from 'prism';
import { ArrowRight, Bell, Check, Copy, Plus, Search, Settings, Trash2 } from 'lucide-react';

const PROJECTS: readonly SelectOption[] = [
  { id: 'alt', label: 'ALT' },
  { id: 'axapi', label: 'AXAPI' },
  { id: 'lab', label: 'LAB' },
  { id: 'arcade', label: 'ARCADE' },
];

const PLANS: readonly RadioOption[] = [
  { id: 'mensal', label: 'Mensal' },
  { id: 'anual', label: 'Anual' },
  { id: 'nenhum', label: 'Sem plano', disabled: true },
];

const TABS: readonly TabItem[] = [
  { id: 'resumo', label: 'Resumo' },
  { id: 'atividade', label: 'Atividade' },
  { id: 'config', label: 'Configuração' },
];

type SectionProps = {
  id: string;
  index: string;
  title: string;
  lead: string;
  components: string;
  children: ReactNode;
};

function Section({ id, index, title, lead, components, children }: SectionProps) {
  return (
    <section className="cat-section" id={id} data-component={components}>
      <div className="cat-section-head">
        <span className="cat-index">{index}</span>
        <div>
          <h2 className="cat-section-title">{title}</h2>
          <p className="cat-section-lead">{lead}</p>
        </div>
      </div>
      <div className="cat-section-body">{children}</div>
    </section>
  );
}

function ThemeControls() {
  const { theme, setTheme, canChangeTheme } = useTheme();

  return (
    <Inline gap={2} justify="end">
      <VisuallyHidden>Tema do catálogo</VisuallyHidden>
      <Button
        label="Escuro"
        size="sm"
        variant={theme === 'dark' ? 'secondary' : 'ghost'}
        disabled={!canChangeTheme}
        onClick={() => setTheme('dark')}
      />
      <Button
        label="Claro"
        size="sm"
        variant={theme === 'light' ? 'secondary' : 'ghost'}
        disabled={!canChangeTheme}
        onClick={() => setTheme('light')}
      />
    </Inline>
  );
}

function ToastDemo() {
  const { show } = useToast();

  return (
    <div className="cat-row">
      <Button
        label="Abrir aviso"
        variant="secondary"
        onClick={() =>
          show({
            title: 'Rascunho atualizado',
            description: 'As alterações ficam salvas até a próxima edição.',
            tone: 'success',
          })
        }
      />
      <Button
        label="Abrir erro"
        variant="outline"
        onClick={() =>
          show({
            title: 'Não foi possível salvar',
            description: 'Tente de novo em instantes.',
            tone: 'danger',
          })
        }
      />
    </div>
  );
}

export function App() {
  const [theme, setTheme] = useState<PrismTheme>('dark');
  const [email, setEmail] = useState('pessoa@exemplo.dev');
  const [domain, setDomain] = useState('');
  const [notes, setNotes] = useState('');
  const [project, setProject] = useState('alt');
  const [notify, setNotify] = useState(true);
  const [terms, setTerms] = useState(true);
  const [plan, setPlan] = useState('mensal');
  const [tab, setTab] = useState('resumo');
  const reducedMotion = useReducedMotion();

  return (
    <DesignSystemProvider theme={theme} onThemeChange={setTheme}>
      <div className="cat-shell" data-component="DesignSystemProvider Container">
        <header className="cat-header">
          <Container>
            <div className="cat-masthead">
              <div>
                <p className="cat-kicker">Axolotl BR · sistema visual</p>
                <h1 className="cat-wordmark">PRISM</h1>
                <p className="cat-intro">
                  Tokens, primitivas e componentes React. Uma linguagem só para site, painel, bot e
                  documentação.
                </p>
              </div>
              <div className="cat-meta">
                <span>versão 1.0</span>
                <span>tema {theme}</span>
                <span>movimento reduzido: {reducedMotion ? 'sim' : 'não'}</span>
                <ThemeControls />
              </div>
            </div>
          </Container>
        </header>

        <main>
          <Container>
            <div className="cat-layout">
              <aside className="cat-rail" aria-label="Seções do catálogo">
                <ol>
                  <li><a href="#fundamentos">01 Fundamentos</a></li>
                  <li><a href="#acoes">02 Ações</a></li>
                  <li><a href="#formulario">03 Formulário</a></li>
                  <li><a href="#dados">04 Dados</a></li>
                  <li><a href="#superficie">05 Superfície</a></li>
                  <li><a href="#navegacao">06 Navegação</a></li>
                  <li><a href="#feedback">07 Feedback</a></li>
                  <li><a href="#avisos">08 Avisos</a></li>
                </ol>
              </aside>

              <div className="cat-content">
                <Section
                  id="fundamentos"
                  index="01"
                  title="Fundamentos"
                  lead="A escala tipográfica, o espaçamento e as primitivas de layout. Tudo aqui lê os mesmos tokens do pacote."
                  components="Text VisuallyHidden Stack Inline Grid"
                >
                  <div className="cat-panel">
                    <p className="cat-label">Text · escala</p>
                    <Stack gap={3}>
                      <Text as="p" size="display">Display 56</Text>
                      <Text as="p" size="h1">H1 40</Text>
                      <Text as="p" size="h2">H2 32</Text>
                      <Text as="p" size="h3">H3 24</Text>
                      <Text as="p" size="h4">H4 20</Text>
                      <Text as="p" size="body-lg">Corpo grande 18. Leitura confortável em bloco.</Text>
                      <Text as="p" size="body">Corpo 16. O texto padrão de interface e documento.</Text>
                      <Text as="p" size="body-sm" tone="secondary">Corpo pequeno 14. Metadado e apoio.</Text>
                      <Text as="p" size="caption" tone="muted">Legenda 12. Informação de segunda ordem.</Text>
                      <Text as="p" size="overline" tone="brand">Overline 11</Text>
                      <Text as="p" size="body-sm" mono>prism run build --manifest</Text>
                    </Stack>
                    <VisuallyHidden>Este parágrafo existe só para leitores de tela.</VisuallyHidden>
                  </div>

                  <div className="cat-grid" data-cols="3">
                    <div className="cat-panel">
                      <p className="cat-label">Stack · gap 4</p>
                      <Stack gap={4}>
                        <div className="cat-block" />
                        <div className="cat-block" />
                        <div className="cat-block" />
                      </Stack>
                    </div>
                    <div className="cat-panel">
                      <p className="cat-label">Inline · gap 3</p>
                      <Inline gap={3}>
                        <div className="cat-chip" />
                        <div className="cat-chip" />
                        <div className="cat-chip" />
                      </Inline>
                    </div>
                    <div className="cat-panel">
                      <p className="cat-label">Grid · 2 colunas</p>
                      <Grid columns={2} gap={2}>
                        <div className="cat-block" />
                        <div className="cat-block" />
                        <div className="cat-block" />
                        <div className="cat-block" />
                      </Grid>
                    </div>
                  </div>
                </Section>

                <Section
                  id="acoes"
                  index="02"
                  title="Ações"
                  lead="Um CTA focal por tela. As outras ações usam peso menor. O ícone acompanha o rótulo, nunca ocupa o lugar dele."
                  components="Button IconButton Tooltip"
                >
                  <div className="cat-panel">
                    <p className="cat-label">Button · variantes</p>
                    <div className="cat-row">
                      <Button label="Salvar" icon={Check} />
                      <Button label="Continuar" variant="secondary" icon={ArrowRight} iconPosition="end" />
                      <Button label="Copiar link" variant="outline" icon={Copy} />
                      <Button label="Cancelar" variant="ghost" />
                      <Button label="Excluir" variant="destructive" icon={Trash2} />
                    </div>
                  </div>

                  <div className="cat-grid" data-cols="2">
                    <div className="cat-panel">
                      <p className="cat-label">Button · tamanho e estado</p>
                      <div className="cat-row">
                        <Button label="Pequeno" size="sm" variant="secondary" />
                        <Button label="Médio" size="md" variant="secondary" />
                        <Button label="Grande" size="lg" variant="secondary" />
                        <Button label="Salvando" loading />
                        <Button label="Bloqueado" disabled />
                      </div>
                    </div>
                    <div className="cat-panel">
                      <p className="cat-label">IconButton · com Tooltip</p>
                      <div className="cat-row">
                        <IconButton label="Pesquisar" icon={Search} />
                        <IconButton label="Configurações" icon={Settings} variant="outline" />
                        <IconButton label="Notificações" icon={Bell} variant="secondary" />
                        <Tooltip label="Adicionar projeto">
                          <IconButton label="Adicionar projeto" icon={Plus} variant="outline" />
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                </Section>

                <Section
                  id="formulario"
                  index="03"
                  title="Formulário"
                  lead="Rótulo visível em todo campo. Dica explica, erro corrige. O estado nunca depende só de cor."
                  components="Input Textarea Select Checkbox RadioGroup Switch"
                >
                  <div className="cat-grid" data-cols="2">
                    <div className="cat-panel">
                      <p className="cat-label">Input</p>
                      <Stack gap={4}>
                        <Input
                          label="E-mail"
                          type="email"
                          value={email}
                          onChange={setEmail}
                          hint="Usado só para contato do projeto."
                          autoComplete="email"
                        />
                        <Input
                          label="Domínio"
                          value={domain}
                          onChange={setDomain}
                          placeholder="projeto"
                          prefix="prism.design/"
                          error={domain.length > 0 && domain.includes(' ') ? 'Sem espaço no domínio.' : undefined}
                        />
                      </Stack>
                    </div>

                    <div className="cat-panel">
                      <p className="cat-label">Textarea</p>
                      <Textarea
                        label="Notas de revisão"
                        value={notes}
                        onChange={setNotes}
                        placeholder="O que precisa mudar nesta tela?"
                        hint="Texto livre, até 280 caracteres."
                        maxLength={280}
                      />
                    </div>

                    <div className="cat-panel">
                      <p className="cat-label">Select</p>
                      <Select
                        label="Projeto"
                        value={project}
                        onChange={setProject}
                        options={PROJECTS}
                        hint="O componente lê a mesma lista em qualquer tela."
                      />
                    </div>

                    <div className="cat-panel">
                      <p className="cat-label">Checkbox e Switch</p>
                      <Stack gap={4}>
                        <Checkbox
                          label="Aceito publicar o rascunho"
                          checked={terms}
                          onChange={setTerms}
                          hint="O rascunho fica visível para a equipe."
                        />
                        <Switch
                          label="Avisar por e-mail"
                          checked={notify}
                          onChange={setNotify}
                          hint="Só quando a revisão terminar."
                        />
                      </Stack>
                    </div>

                    <div className="cat-panel">
                      <p className="cat-label">RadioGroup</p>
                      <RadioGroup
                        label="Periodicidade"
                        value={plan}
                        onChange={setPlan}
                        options={PLANS}
                        inline
                      />
                    </div>

                    <div className="cat-panel">
                      <p className="cat-label">Erro e estado desabilitado</p>
                      <Stack gap={4}>
                        <Input
                          label="Identificador"
                          value="prism design"
                          onChange={() => undefined}
                          error="Use apenas letras minúsculas e hífen."
                        />
                        <Input label="Chave de acesso" value="••••••••" onChange={() => undefined} disabled />
                      </Stack>
                    </div>
                  </div>
                </Section>

                <Section
                  id="dados"
                  index="04"
                  title="Dados"
                  lead="Avatar, rótulo e progresso. Nome e número vêm do dado real; o catálogo usa só exemplos."
                  components="Avatar Badge Progress"
                >
                  <div className="cat-grid" data-cols="2">
                    <div className="cat-panel">
                      <p className="cat-label">Avatar · tamanho e status</p>
                      <div className="cat-row">
                        <Avatar name="Equipe Norte" size="xs" status="online" />
                        <Avatar name="Pessoa Exemplo" size="sm" status="away" />
                        <Avatar name="Axolotl BR" size="md" status="busy" />
                        <Avatar name="Projeto exemplo" size="lg" />
                      </div>
                    </div>

                    <div className="cat-panel">
                      <p className="cat-label">Badge · tom</p>
                      <div className="cat-row">
                        <Badge label="estável" tone="success" dot />
                        <Badge label="em teste" tone="warning" dot />
                        <Badge label="falha" tone="danger" dot />
                        <Badge label="novo" tone="brand" />
                        <Badge label="nota" tone="info" />
                        <Badge label="arquivado" tone="neutral" />
                      </div>
                    </div>

                    <div className="cat-panel">
                      <p className="cat-label">Progress</p>
                      <Stack gap={5}>
                        <Progress label="Revisão de conteúdo" value={68} showValue />
                        <Progress label="Componentes cobertos" value={100} tone="success" showValue />
                        <Progress label="Pendências" value={24} tone="warning" showValue />
                      </Stack>
                    </div>

                    <div className="cat-panel">
                      <p className="cat-label">Progress · sem valor visível</p>
                      <Stack gap={5}>
                        <Progress label="Sincronização" value={42} />
                        <Progress label="Falha na publicação" value={12} tone="danger" />
                      </Stack>
                    </div>
                  </div>
                </Section>

                <Section
                  id="superficie"
                  index="05"
                  title="Superfície"
                  lead="Card agrupa conteúdo, não cria página. Cabeçalho, corpo e rodapé mantêm a mesma ordem em qualquer projeto."
                  components="Card CardHeader CardBody CardFooter"
                >
                  <div className="cat-grid" data-cols="2">
                    <Card>
                      <CardHeader
                        title="Projeto exemplo"
                        description="Página de perfil com dados sintéticos."
                        meta={<Badge label="rascunho" tone="warning" dot />}
                      />
                      <CardBody>
                        <Text size="body-sm" tone="secondary">
                          Nome, função e links do projeto. O card não decide a navegação da página.
                        </Text>
                      </CardBody>
                      <CardFooter>
                        <Inline justify="between" wrap>
                          <Button label="Abrir" size="sm" variant="secondary" />
                          <Button label="Arquivar" size="sm" variant="ghost" />
                        </Inline>
                      </CardFooter>
                    </Card>

                    <Stack gap={4}>
                      <Card variant="featured">
                        <CardHeader title="Destaque" description="Uma ênfase por seção." />
                        <CardBody>
                          <Text size="body-sm" tone="secondary">
                            A variante featured muda peso, não o layout.
                          </Text>
                        </CardBody>
                      </Card>
                      <Card variant="outlined">
                        <CardHeader title="Contorno" description="Para conteúdo secundário." />
                      </Card>
                      <Card variant="compact">
                        <Inline justify="between" wrap>
                          <Text size="body-sm">Compacto</Text>
                          <Badge label="sm" size="sm" />
                        </Inline>
                      </Card>
                    </Stack>
                  </div>
                </Section>

                <Section
                  id="navegacao"
                  index="06"
                  title="Navegação"
                  lead="Trilha mostra onde a pessoa está. Abas trocam o painel com setas, Home e End."
                  components="Breadcrumbs Tabs"
                >
                  <div className="cat-panel">
                    <p className="cat-label">Breadcrumbs</p>
                    <Breadcrumbs
                      items={[
                        { label: 'Início', href: '#' },
                        { label: 'Projetos', href: '#' },
                        { label: 'ALT' },
                      ]}
                    />
                  </div>

                  <div className="cat-panel">
                    <p className="cat-label">Tabs</p>
                    <Tabs label="Detalhe do projeto" items={TABS} value={tab} onChange={setTab}>
                      <Stack gap={3}>
                        <Text as="h3" size="h4">{tab}</Text>
                        <Text size="body-sm" tone="secondary">
                          O painel acompanha a aba ativa. Use as setas para trocar sem sair do teclado.
                        </Text>
                      </Stack>
                    </Tabs>
                  </div>
                </Section>

                <Section
                  id="feedback"
                  index="07"
                  title="Feedback"
                  lead="Mensagem persistente fica na página. Aviso temporário usa toast. Carregamento nunca inventa conteúdo."
                  components="Alert Spinner Skeleton"
                >
                  <div className="cat-grid" data-cols="2">
                    <div className="cat-panel">
                      <p className="cat-label">Alert</p>
                      <Stack gap={3}>
                        <Alert title="Revisão aberta" description="Três blocos aguardam leitura." tone="info" />
                        <Alert title="Tudo salvo" description="O rascunho está atualizado." tone="success" />
                        <Alert title="Fonte pendente" description="A versão display ainda não foi aprovada." tone="warning" />
                        <Alert title="Falha ao publicar" description="O domínio não respondeu." tone="danger" />
                      </Stack>
                    </div>

                    <div className="cat-panel">
                      <p className="cat-label">Spinner e Skeleton</p>
                      <Stack gap={6}>
                        <Inline gap={4}>
                          <Spinner size="sm" label="Carregando versão pequena" />
                          <Spinner label="Carregando" />
                          <Spinner size="lg" label="Carregando versão grande" />
                        </Inline>
                        <div>
                          <Skeleton shape="title" />
                          <Skeleton lines={3} />
                        </div>
                        <Skeleton shape="avatar" />
                        <Skeleton shape="block" />
                      </Stack>
                    </div>
                  </div>
                </Section>

                <Section
                  id="avisos"
                  index="08"
                  title="Avisos"
                  lead="Toast some sozinho, fecha no botão e respeita movimento reduzido. O provider fica uma vez no topo do app."
                  components="ToastProvider"
                >
                  <ToastProvider>
                    <div className="cat-panel">
                      <p className="cat-label">ToastProvider + useToast</p>
                      <ToastDemo />
                    </div>
                  </ToastProvider>
                </Section>
              </div>
            </div>
          </Container>
        </main>

        <footer className="cat-footer">
          <Container>
            <Inline justify="between" wrap>
              <span>PRISM · Axolotl BR</span>
              <span>tokens, primitivas e componentes</span>
            </Inline>
          </Container>
        </footer>
      </div>
    </DesignSystemProvider>
  );
}
