# Prism — camada visual e de escrita do Axolotl BR

Design system de todos os projetos do Axolotl BR: componentes React, tokens e regras
de UI/UX que qualquer agente ou pessoa segue para produzir tela coerente com a marca.
A mesma camada governa o texto publicado, sem clichê de IA.

Status: **base v1.0 implementada**. Tokens, 29 entradas públicas, catálogo, docs,
manifesto e guardas rodam com `npm run verify`.

## Camadas

| Camada | Documento | Cobre |
| --- | --- | --- |
| Visual | `PRISM.md`, `tokens/`, `src/` | cor, tipo, espaço, componente, motion |
| Escrita | `ESCRITA.md` | voz, edição, microcopy, anúncio, doc |

## Por que existe

O Axolotl BR já tem identidade visual (violeta `#8F00FF`, fundo escuro, Inter
+ JetBrains Mono), mas ela vive espalhada em cada projeto. Prism concentra isso em um
pacote instalável e em uma camada de instrução para IA: a IA recebe a tarefa e já sabe
qual componente usar, quais regras de layout aplicar, como escrever e o que nunca fazer.

## Projetos

Prism atende todos os projetos do Axolotl BR. A base é a mesma: tokens, componentes e
regras de layout. O que muda é o escopo de cada interface.

| Projeto | Interface |
| --- | --- |
| AXOLOTL BR | site, documentos e painéis |
| AXOLOTL SMP | site, loja e painéis do servidor |
| ALT | painéis de bots e automação |
| AXAPI | documentação e console |
| LAB | protótipos e registros |
| ARCADE | páginas de jogos |
| COMMUNITY | páginas de comunidade |
| RUNNER | minigames web |

O jogo dentro do Minecraft não usa Prism: usa a linguagem visual do servidor. Fora do
jogo, toda interface é Prism.

Projeto novo entra na tabela quando tiver interface real. Não crie pasta vazia.

## Escopo da v0.1

- Pacote `prism` (React 18.3 e 19 como peer), CSS puro, sem Tailwind.
- ~20 componentes: ação, formulário, navegação, sobreposição, superfície, dados e layout.
- Tokens `--prism-*` com tema escuro padrão e claro derivado.
- Catálogo Vite com todos os componentes nos dois temas.
- Camada para IA: skill instalável, brief para colar, `manifest.json` e checklist de revisão.
- Docs em português.

## Documentação

A doc canônica fica em [`docs/prism/`](docs/prism/README.md): fundamentos,
componentes, estados, contrato do consumidor, acessibilidade e revisão. O contrato de
props é `dist/manifest.json`, gerado no build.

O documento de design original fica em
[`docs/superpowers/specs/2026-11-01-prism-design.md`](docs/superpowers/specs/2026-11-01-prism-design.md).

## Comandos

```bash
npm run build          # dist/index.js, dist/styles.css, dist/tokens.css, dist/manifest.json
npm run dev            # catálogo em examples/
npm run typecheck
npm run check:tokens
npm run check:manifest
npm run check:docs
npm run check:consumer
npm run test
npm run verify         # roda tudo na ordem
```

O caminho do repositório contém `#`. Vite e Vitest podem falhar nele. Rode o catálogo e
os testes em uma cópia sem `#` quando isso acontecer.

## Licença

MIT — ver [LICENSE](LICENSE).
