# Estados

Estado não é enfeite. Cada um responde a uma pergunta: o controle está disponível? O
dado chegou? A ação falhou? O conteúdo existe?

## Interação

| Estado | Como aparece |
| --- | --- |
| Padrão | superfície, borda e texto dos tokens |
| Hover | `--surface-hover` ou borda mais clara; nunca desloca layout |
| Foco | anel de `--focus-ring` com offset; sempre visível no teclado |
| Ativo | deslocamento de 1px no botão; sem mudança de tamanho |
| Selecionado | marca em `--prism-primary` mais texto ou ícone |
| Desabilitado | opacidade reduzida e cursor bloqueado; não responde a clique |
| Carregando | `aria-busy`, rótulo de progresso e controle bloqueado |
| Erro | borda e mensagem em `--danger`, com texto que explica a correção |

Foco nunca é removido. Se o anel atrapalha o desenho, o desenho está errado.

## Formulário

- Rótulo visível por padrão. `hideLabel` existe para busca e barra de ferramenta, não
  para economizar espaço em formulário.
- Dica explica o formato. Erro diz o que corrigir. Os dois não repetem o rótulo.
- `error` liga `aria-invalid` e `aria-describedby` automaticamente.
- Campo obrigatório é marcado no controle. O texto de apoio pode explicar a regra.
- Desabilitado não é validação. Se o campo não pode ser editado, diga por quê fora do
  controle.

## Vazio

Tela sem dado mostra o estado vazio verdadeiro. Não preencha com número, nome ou
depoimento inventado.

Um estado vazio bom responde três coisas:

1. O que ficaria aqui.
2. Por que está vazio.
3. Qual é o próximo passo, quando existe.

Sem dado real, escreva o que falta. `Nenhum projeto ainda` é melhor que uma lista
falsa.

## Carregando

- `Spinner` para espera curta e visível.
- `Skeleton` para conteúdo que já tem forma conhecida.
- `Progress` para operação determinada, com valor real.
- `Button loading` para ação que bloqueia o próprio botão.

Skeleton não inventa texto. Ele desenha a forma do bloco que vai chegar.

## Erro

Erro de campo fica no campo. Erro de operação fica em `Alert` quando precisa
permanecer, ou em `Toast` quando é temporário.

Mensagem de erro tem duas partes: o fato e o caminho. `Não foi possível salvar. Tente
de novo em instantes.` funciona. `Ops! Algo deu errado.` não diz nada.

## Aviso temporário

Toast fecha sozinho em 5 segundos por padrão. Use `durationMs: 0` quando a mensagem
precisa de leitura longa ou de uma decisão. O botão de fechar tem nome acessível.

## Movimento

Transição de interface fica entre 100 e 300ms. Com `prefers-reduced-motion: reduce`,
o sistema zera duração e animação dentro de `.prism-root`. O conteúdo continua
legível sem movimento.

## Dados sintéticos

Catálogo, doc e exemplo usam nomes como `Pessoa Exemplo`, `Equipe Norte` e
`pessoa@exemplo.dev`. Nada de número de membros, mensagem real ou métrica de
comunidade. Se a peça precisa de um número que não existe, o número não entra.
