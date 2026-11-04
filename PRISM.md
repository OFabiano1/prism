# Prism — estética Axolotl BR

Brief para qualquer IA: recebeu tarefa de UI no universo Axolotl BR? Siga este brief antes de escrever tela ou componente.

## Essência

Universo **escuro, sólido e tech**: fundo quase-preto azulado, superfícies planas em
camadas sutis, um único acento violeta elétrico, tipografia grande e apertada,
bordas discretas como separador. Elegância vem do contraste, do espaço e da
hierarquia — nunca de efeito decorativo.

**Proibido:** glassmorphism, gradiente decorativo, glow roxo, neon em excesso,
card dentro de card, dashboard genérico, emoji decorativo, número/dado inventado.

## Tokens (prefixo `--prism-*`, camada `.prism-root`)

- **Marca:** violeta Axolotl `#8f00ff` (`--prism-primary`; hover `#a34aff`, active
  `#7a00db`). Fixa, não é configurável pelo consumidor.
- **Fundo:** `#09090d` background, `#101015` surface, `#15151c` elevated,
  `#1c1c25` hover. Escuro é padrão; claro derivado da mesma paleta.
- **Texto:** `#f0f0f4` primary; secundário e muted em cinzas da mesma rampa.
- **Bordas:** `#20202a` subtle, `#292933` default, `#41414d` strong.
- **Semânticas:** success `#22c55e`, warning `#f59e0b`, danger `#ef4444`, info
  `#3b82f6` — sempre com versão soft (14%) e borda (42%).
- **Foco:** anel violeta `#a34aff`; foco sempre visível.
- **Espaço:** base 4px, escala `--space-1` (4) até `--space-24` (96).
- **Raio:** xs 4, sm 6, md 10, lg 14, xl 20, full 9999px.
- **Sombra:** preta discreta (`--shadow-1` a `--shadow-4`), nunca colorida.
- **Movimento:** 100–300ms; `prefers-reduced-motion` sempre respeitado.

## Tipografia

- Interface: **Inter** (variável), pesos 400/500/600/700.
- Código e identificadores: **JetBrains Mono**.
- Escala: display 56 / h1 40 / h2 32 / h3 24 / h4 20 / body 16 / sm 14 /
  caption 12 / overline 11 (caixa alta, tracking 0.12em).
- Títulos com tracking negativo (-0.02em a -0.03em); corpo com line-height 1.6.

## Regras de design (não negociáveis)

1. Hierarquia por tipo e espaço, não por caixa; máx. 3 níveis por seção.
2. **Violeta é acento, não preenchimento**: foco, seleção, progresso e marca.
   Botão primário é exceção proposital; secundários usam superfície.
3. Um CTA focal por tela; demais ações em variante secundária.
4. Espaço em múltiplos de 4; ritmo entre seções maior que dentro da seção.
5. Uma geometria só: input 40px de altura, sm 32, lg 48; raio md 10 compartilhado.
6. Estado nunca depende só de cor: ícone/texto junto do verde/vermelho.
7. Rótulo visível em todo campo; teclado e foco devolvido em todo overlay.
8. Sem `className`/`style` em componente Prism; sem redeclarar `--prism-*`.
9. Sem dado inventado. Sem dado real → estado vazio verdadeiro.
10. Texto em **português brasileiro natural**, sem jargão corporativo.

## Checklist final

- [ ] Usa os tokens `--prism-*`; zero hex fora de `tokens/colors.css`.
- [ ] Contraste OK nos dois temas; foco visível em todo interativo.
- [ ] Movimento curto com caminho reduzido.
- [ ] Estados vazio, carregando e erro tratados com dados sintéticos.
- [ ] Soaria como tela do Axolotl BR? Senão, refaça.
