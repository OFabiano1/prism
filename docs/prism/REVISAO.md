# Revisão

Use antes de dizer que a tela está pronta. Um item reprovado volta para a mesa.

## Conceito

- [ ] A tela tem um foco. Não tenta dizer três coisas.
- [ ] O próximo passo é óbvio sem texto explicando o óbvio.
- [ ] A mesma tela não poderia ser de outra marca.
- [ ] Não existe card dentro de card.
- [ ] Não existe efeito carregando a identidade.

## Tokens

- [ ] Zero hex fora de `tokens/colors.css`.
- [ ] Zero `--prism-*` redeclarado no app.
- [ ] Zero `className` ou `style` em componente Prism.
- [ ] Zero seletor `.prism-*` no CSS do app.
- [ ] Espaço em múltiplos de 4.
- [ ] Violeta em no máximo 10% da área, fora o botão primário.

## Hierarquia

- [ ] No máximo três níveis visíveis por seção.
- [ ] Um CTA focal. As demais ações têm peso menor.
- [ ] Título com tracking negativo; corpo com tracking zero.
- [ ] Largura de linha legível.
- [ ] Ritmo entre seções maior que dentro da seção.

## Estados

- [ ] Hover, foco, ativo e desabilitado existem onde fazem sentido.
- [ ] Foco visível em todo interativo.
- [ ] Erro diz o fato e o caminho.
- [ ] Vazio é verdadeiro, sem dado inventado.
- [ ] Carregando não inventa conteúdo.
- [ ] Movimento reduzido não quebra a tela.

## Acessibilidade

- [ ] Todo campo tem rótulo.
- [ ] Todo botão de ícone tem nome acessível.
- [ ] Teclado percorre a tela inteira.
- [ ] Estado não depende só de cor.
- [ ] Contraste conferido nos dois temas.
- [ ] Tela funciona a 320px e com zoom de 200%.

## Texto

- [ ] Português brasileiro natural.
- [ ] Voz ativa.
- [ ] Concreto no lugar de abstrato.
- [ ] Zero abertura de enrolação.
- [ ] Zero contraste binário, colon reveal, faux-insight e recapitulação final.
- [ ] Zero emoji decorativo.
- [ ] Zero dado, usuário, evento ou depoimento inventado.
- [ ] Passou pelo checklist de `ESCRITA.md`.

## Código

- [ ] Importa só de `prism`.
- [ ] Não importa caminho interno do pacote.
- [ ] Usa o componente do manifesto, não uma cópia local.
- [ ] `npm run typecheck` passa.
- [ ] `npm run check:consumer` passa.
- [ ] `npm run verify` passa.

## Teste final

Olhe a tela por cinco segundos. Se ela parece um template genérico, um dashboard de
banco ou um texto de robô, refaça. Se ela parece uma peça do Axolotl BR, publique.
