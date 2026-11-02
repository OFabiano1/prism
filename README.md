# Prism — Axolotl Design System

Biblioteca de design do Axolotl BR: componentes React, tokens e regras de UI/UX que
qualquer agente ou pessoa segue para produzir tela coerente com a marca.

Status: **em design**. Nada de código de produto foi escrito ainda.

## Por que existe

O Axolotl BR já tem identidade visual (violeta `#8F00FF`, fundo `#05060c`, Space Grotesk
+ JetBrains Mono), mas ela vive espalhada em cada projeto. Prism concentra isso em um
pacote instalável e em uma camada de instrução para IA: a IA recebe a tarefa e já sabe
qual componente usar, quais regras de layout aplicar e o que nunca fazer.

## Escopo da v0.1

- Pacote `prism` (React 18.3 e 19 como peer), CSS puro, sem Tailwind.
- ~20 componentes: ação, formulário, navegação, sobreposição, superfície, dados e layout.
- Tokens `--prism-*` com tema escuro padrão e claro derivado.
- Catálogo Vite com todos os componentes nos dois temas.
- Camada para IA: skill instalável, brief para colar, `manifest.json` e checklist de revisão.
- Docs em português.

## Documento de design

[`docs/superpowers/specs/2026-11-01-prism-design-design.md`](docs/superpowers/specs/2026-11-01-prism-design-design.md)

## Referência

A engenharia vem do [BEDS](https://github.com/meunomeebero/beds) do bero: componentes
semânticos, sem escape de estilo, uma geometria só, guardas automáticos. A identidade,
o escopo e o idioma são do Axolotl BR.

## Licença

MIT — ver [LICENSE](LICENSE).
