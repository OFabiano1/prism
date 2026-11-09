# Contrato do consumidor

O app consome `prism` como pacote. O pacote manda no visual; o app manda no conteúdo e
no layout de página.

## Instalação

Distribuição por `.tgz` (`npm pack`) ou workspace local. Não há publicação no npm
registry.

```bash
npm install ./prism-1.0.0.tgz
```

## Importação

```tsx
import { DesignSystemProvider, Button, Text } from 'prism';
import 'prism/styles.css';
```

`prism/styles.css` traz tokens, primitivas e componentes. `prism/tokens.css` traz só a
camada visual, para quem não usa React.

As fontes ficam em `fonts/` dentro do pacote e são carregadas por `@font-face`. Não é
preciso baixar fonte do Google em runtime.

## Provider

```tsx
<DesignSystemProvider theme={theme} onThemeChange={setTheme}>
  <App />
</DesignSystemProvider>
```

O provider renderiza o wrapper `.prism-root`. Ele não escreve em `:root` nem em
`document.documentElement`. Um app com mais de um tema controlado usa um provider por
raiz visual.

`onThemeChange` é opcional. Sem ele, `useTheme().canChangeTheme` é `false` e o controle
de troca deve ficar desabilitado ou ausente.

## Proibições

1. Não passe `className` ou `style` para componente Prism.
2. Não redeclare `--prism-*` no app.
3. Não mire `.prism-*` no CSS do app.
4. Não invente componente, prop ou valor fora do manifesto.
5. Não importe caminho interno do pacote (`prism/dist/...`, `src/components/...`).
6. Não use CSS do app para corrigir componente. Se falta variante, a mudança é no
   pacote.
7. Não use dado inventado para preencher tela.

O escape de estilo é proibido porque ele quebra a garantia do sistema. Um `className`
hoje vira exceção permanente amanhã.

## Guardas

| Comando | Verifica |
| --- | --- |
| `npm run check:tokens` | hex só em `tokens/colors.css`, `--prism-*` só em `tokens/`, `var()` resolvido |
| `npm run check:manifest` | export público coberto pelo manifesto, doc existente, props obrigatórias |
| `npm run check:docs` | docs canônicas, âncoras e catálogo completo |
| `npm run check:consumer` | `className`/`style`, token redeclarado e seletor `.prism-*` no consumidor |
| `npm run check:artifact` | `dist` completo, CSS sem `@import`, fontes e arquivos do pacote |
| `npm run verify` | build, typecheck, guardas, testes e artefato |

`check:consumer` varre `examples/` por padrão. Para varrer outro diretório:

```bash
node scripts/check-consumer.mjs caminho/do/app
```

## Manifesto

`dist/manifest.json` lista nome, tipo, resumo, doc e props de cada entrada. É a fonte
que impede inventar prop. Consulte o manifesto antes de escrever tela.

```json
{
  "name": "Button",
  "kind": "component",
  "props": [
    { "name": "variant", "type": "ButtonVariant", "required": false, "values": ["primary", "secondary"] }
  ]
}
```

## Versão e compatibilidade

React 18.3 e 19 são peer. A suíte roda em React 18.3. TypeScript 5.6 ou maior.
`dist/` não é commitado; o consumidor recebe o pacote construído.

## Erros comuns

- `useToast precisa estar dentro de <ToastProvider>.` O provider está faltando ou está
  em outra árvore.
- Tema não muda: o provider não recebeu `onThemeChange`.
- Fonte errada: o app importou `prism/tokens.css` sem o restante ou o bundler não
  copiou `fonts/`.
- Estilo não aplica: falta `import 'prism/styles.css'`.
