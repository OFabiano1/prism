# Prism — camada visual do Axolotl BR

Design system de todos os projetos do Axolotl BR: componentes React, tokens e regras
de UI/UX que qualquer agente ou pessoa segue para produzir tela coerente com a marca.

Status: **em design**. Nada de código de produto foi escrito ainda.

## Por que existe

O Axolotl BR já tem identidade visual (violeta `#8F00FF`, fundo escuro, Space Grotesk
+ JetBrains Mono), mas ela vive espalhada em cada projeto. Prism concentra isso em um
pacote instalável e em uma camada de instrução para IA: a IA recebe a tarefa e já sabe
qual componente usar, quais regras de layout aplicar e o que nunca fazer.

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

## Documento de design

[`docs/superpowers/specs/2026-11-01-prism-design.md`](docs/superpowers/specs/2026-11-01-prism-design.md)

## Referência

A engenharia vem do [BEDS](https://github.com/meunomeebero/beds) do bero: componentes
semânticos, sem escape de estilo, uma geometria só, guardas automáticos. A identidade,
o escopo e o idioma são do Axolotl BR.

## Licença

MIT — ver [LICENSE](LICENSE).
