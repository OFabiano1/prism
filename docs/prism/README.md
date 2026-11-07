# Prism — documentação canônica

Esta pasta explica o pacote para quem escreve tela e para agentes de IA. Cada arquivo
responde uma pergunta diferente. Leia na ordem em que a tarefa pede.

| Arquivo | Responde |
| --- | --- |
| [FUNDAMENTOS.md](FUNDAMENTOS.md) | Quais tokens existem e como eles se combinam. |
| [COMPONENTES.md](COMPONENTES.md) | Qual componente usar e quais props ele aceita. |
| [ESTADOS.md](ESTADOS.md) | Como hover, foco, erro, vazio e carregamento aparecem. |
| [CONTRATO.md](CONTRATO.md) | O que o app pode e não pode fazer com o pacote. |
| [ACESSIBILIDADE.md](ACESSIBILIDADE.md) | Teclado, rótulo, contraste e movimento. |
| [REVISAO.md](REVISAO.md) | Checklist antes de dizer que a tela está pronta. |

## Ordem de leitura

1. Quem está começando lê [FUNDAMENTOS.md](FUNDAMENTOS.md).
2. Quem vai montar tela lê [COMPONENTES.md](COMPONENTES.md) e [ESTADOS.md](ESTADOS.md).
3. Quem integra o pacote lê [CONTRATO.md](CONTRATO.md).
4. Quem revisa lê [ACESSIBILIDADE.md](ACESSIBILIDADE.md) e [REVISAO.md](REVISAO.md).

## Fonte de verdade

O contrato de props é `dist/manifest.json`, gerado de `src/manifest.ts` no build. A doc
explica o manifesto; ela não inventa prop nova. Se os dois divergirem, o manifesto
vence e a doc precisa de correção no mesmo commit.

A personalidade vem de `brand/`. Os tokens implementam essa personalidade. `src/`
implementa os componentes. `scripts/` impede que alguém fure a fila.

## Catálogo

`examples/` é o catálogo Vite. Ele usa dados sintéticos, mostra os dois temas e cobre
todos os componentes do manifesto. Rodar:

```bash
npm run dev
```

O caminho do repositório contém `#`. Se o Vite reclamar, copie o projeto para uma pasta
sem `#` antes de rodar o catálogo.
