# As minhas despesas

Aplicação instalável (PWA) pronta para GitHub Pages.

## Ficheiros (todos na raiz do repositório, sem pastas)

`index.html`, `sw.js`, `manifest.webmanifest`, `logo.png`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png`

## Publicar

1. Cria um repositório novo no GitHub (ex.: `as-minhas-despesas`, **Public**).
2. **Add file → Upload files** e arrasta todos os ficheiros acima.
3. **Settings → Pages → Deploy from a branch → `main` / `(root)` → Save**.
4. Abre `https://O-TEU-UTILIZADOR.github.io/as-minhas-despesas/`.

## Pôr no ecrã inicial

- iPhone (Safari): Partilhar → Adicionar ao ecrã principal.
- Android (Chrome): menu ⋮ → Instalar aplicação / Adicionar ao ecrã principal.

## Importante

As despesas ficam guardadas apenas no dispositivo (localStorage). No iPhone, a app do ecrã inicial tem armazenamento separado do Safari, por isso começa vazia.

## Sincronização (PC e telemóvel)

Usa o Firebase (Authentication por email + Realtime Database, região Europa). Para funcionar na app publicada:

- Em Firebase → Authentication → Definições → Domínios autorizados, tem de estar `bruno-gh1.github.io`.
- Em Realtime Database → Regras, cada utilizador só lê e escreve em `users/<o seu id>`.
- Sem sessão iniciada, a app continua a funcionar só neste aparelho. Ao entrar pela primeira vez, as despesas já guardadas no aparelho são enviadas para a conta.
