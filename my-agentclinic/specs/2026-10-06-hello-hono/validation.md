# Fase 1 — Hello Hono: Validazione

Il branch `phase-1-hello-hono` può essere unito quando **ogni** voce qui sotto è spuntata.
Tutte le verifiche sono manuali; in questa fase non c'è un framework di test.

## Setup
- [x] `npm install` termina senza errori su un checkout pulito.
- [x] `package.json` contiene `"type": "module"`, elenca `hono` e `@hono/node-server` in `dependencies`,
      ed elenca `tsx` e `typescript` in `devDependencies`.
- [x] `tsconfig.json` usa `ES2022` / `NodeNext` con `jsxImportSource: "hono/jsx"`, e `strict` è ancora `true`.
- [x] `src/index.ts` non esiste più, e `src/index.tsx` è l'unico file sorgente.

## Server di sviluppo
- [x] `npm run dev` si avvia e stampa `AgentClinic running at http://localhost:3000`.
- [x] Modificare la tagline in `src/index.tsx` provoca un riavvio automatico (il watch mode funziona).
- [x] Un percorso sconosciuto (es. `/nope`) restituisce `404`. È il comportamento predefinito di Hono; non serve una pagina personalizzata.

## Home page
- [x] `curl -i http://localhost:3000/` restituisce `200` con `Content-Type: text/html; charset=UTF-8`.
- [x] Il corpo della risposta inizia con `<!DOCTYPE html>` e contiene `<html lang="en">`,
      `<meta charset="utf-8">`, il meta tag viewport e `<title>AgentClinic</title>`.
- [x] Il corpo contiene `<h1>Welcome to AgentClinic</h1>` e una tagline giocosa.
- [x] Nel browser, il titolo della scheda è "AgentClinic", e titolo e tagline vengono mostrati senza
      errori in console.
- [x] Non sono stati aggiunti CSS, file statici o cartelle `components/`/`pages/` (sono rimandati alla Fase 2).

## Build e avvio in produzione
- [x] `npm run build` termina con codice 0 e senza errori di tipo.
- [x] `dist/index.js` esiste ed è output ES module (`import`, non `require`).
- [x] `npm start` serve su `/` la stessa home page del server di sviluppo.

## Tracciabilità e ordine
- [x] Ogni task in [plan.md](./plan.md) è completato o esplicitamente segnato come rimandato.
- [x] `README.md` spiega come avviare l'app.
- [x] Nessun file fuori dal perimetro di [requirements.md](./requirements.md) è stato modificato.
- [x] `dist/` non è committato, e `.gitignore` contiene `/dist`.
