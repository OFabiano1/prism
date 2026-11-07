# Acessibilidade

Acessibilidade é requisito de componente, não camada opcional do app.

## Regras gerais

- Todo interativo tem foco visível. O anel usa `--focus-ring` e não é removido.
- Todo campo tem rótulo visível. `hideLabel` mantém o nome acessível, mas é exceção.
- Estado nunca depende só de cor. Ícone, texto ou posição acompanham o tom.
- Alvo de toque tem pelo menos 32px; o padrão é 40px e o grande é 48px.
- Texto corrido respeita `--layout-measure` de 68ch.
- Contraste é conferido no fundo real dos dois temas.

## Teclado

| Componente | Teclado |
| --- | --- |
| Button e IconButton | Enter e Space acionam; Tab entra e sai |
| Input, Textarea e Select | comportamento nativo; Tab percorre |
| Checkbox | Space alterna |
| RadioGroup | setas mudam a opção; Tab entra e sai do grupo |
| Switch | Enter e Space alternam |
| Tabs | setas esquerda e direita, Home e End; Tab entra no tablist e no painel |
| Tooltip | abre em foco e fecha em Esc |
| Toast | botão de fechar por teclado; live region anuncia |

## ARIA

- `Alert` usa `role="status"` e `role="alert"` no tom `danger`.
- `Progress` usa `<progress>` com `aria-label`.
- `Spinner` usa `role="status"` e nome acessível.
- `Switch` usa `role="switch"` e `aria-checked`.
- `Tabs` usa `tablist`, `tab`, `tabpanel`, `aria-selected` e `aria-controls`.
- `Tooltip` liga o gatilho por `aria-describedby`.
- `ToastProvider` usa live region `polite`.
- `Avatar` sem imagem usa `role="img"` e `aria-label` com o nome.
- `Badge` e ícones decorativos usam `aria-hidden`.

## Foco

O foco vai para o primeiro elemento útil quando uma camada abre e volta ao gatilho
quando fecha. O provider mantém os portais dentro da raiz visual, então o foco não
escapa do tema.

Nenhum componente prende o foco sem saída. `useFocusTrap` existe para sobreposição
modal, mas a v0.1 não entrega Dialog.

## Movimento

`prefers-reduced-motion: reduce` reduz animação e transição a quase zero dentro de
`.prism-root`. `useReducedMotion` permite ao app tomar a mesma decisão em JavaScript.

Movimento não pode atrasar leitura nem esconder conteúdo. Se a peça só funciona
animada, refaça.

## Contraste

- Texto pequeno não usa `--prism-primary` no fundo escuro. Use
  `--prism-primary-hover` ou `--text-primary`.
- Texto muted é para informação de terceiro nível, não para corpo de leitura.
- Borda de foco precisa contrastar com a superfície e com o fundo.
- O tema claro troca os papéis, não a lógica.

## Conteúdo

- Nome acessível de `IconButton` é obrigatório.
- Mensagem de erro diz o que corrigir.
- Estado vazio diz o que falta, sem dado falso.
- Texto alternativo de imagem descreve a função, não a aparência.

## Teste mínimo

1. Percorra a tela só com Tab. Todo controle recebe foco e mostra o anel.
2. Acione cada controle com Enter ou Space.
3. Rode a tela com zoom de 200% e a 320px de largura.
4. Ative movimento reduzido no sistema e confirme que nada quebra.
5. Confira os dois temas com contraste e com leitor de tela.
