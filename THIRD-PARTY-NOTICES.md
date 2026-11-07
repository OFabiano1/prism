# Avisos de terceiros

O Prism inclui os ativos e dependências abaixo. Cada um mantém a licença original.

## Fontes

| Ativo | Origem | Licença |
| --- | --- | --- |
| Inter Variable (`fonts/InterVariable.woff2`) | Inter, Rasmus Andersson | SIL Open Font License 1.1 |
| JetBrains Mono Variable (`fonts/JetBrainsMonoVariable.woff2`) | JetBrains Mono, JetBrains | SIL Open Font License 1.1 |

As duas fontes foram obtidas pelo pacote `fontsource` e são servidas localmente pelo
pacote. O texto da SIL OFL 1.1 acompanha a distribuição original em
https://scripts.sil.org/OFL.

## Dependência de runtime

| Pacote | Uso | Licença |
| --- | --- | --- |
| `lucide-react` | ícones dos componentes | ISC |

`lucide-react` é declarado em `dependencies` e não é copiado para dentro do código do
Prism. A instalação resolve a versão pela árvore do consumidor.

## Ícones

Os ícones vêm de Lucide. A licença ISC permite uso comercial e modificação, desde que
o aviso de copyright seja preservado na distribuição do pacote.

## Código do Prism

O código do Prism é MIT. A identidade visual, o nome Axolotl BR e os ativos de marca
não são MIT e ficam em `brand/`, fora da distribuição pública.
