# Test automatici con Vitest: Validazione

L'intervento può essere unito quando **ogni** voce qui sotto è spuntata.

## Automatica
- [x] `npm test` termina con codice 0 ed esegue `tests/app.test.ts` (7 test) e `tests/components.test.tsx` (9 test).
- [x] Rompere di proposito una route (es. cambiare il testo dell'`<h1>`) fa fallire `npm test`.
- [x] Rompere di proposito un componente (es. l'anno nel `Footer`) fa fallire `tests/components.test.tsx`.

## Manuale
- [x] `package.json` elenca `vitest` in `devDependencies` e contiene gli script `test` e `test:watch`.
- [x] `src/app.tsx` esporta `app` e non chiama `serve()`; `src/index.tsx` contiene solo l'avvio del server.
- [x] Durante `npm test` non viene aperta la porta 3000.
- [x] `npm run build` termina senza errori di tipo; `dist/` contiene `app.js` e `index.js`, ma nessun file di test.
- [x] `npm start` stampa `AgentClinic running at http://localhost:3000` e serve `/` e `/static/styles.css` come prima.
- [x] `npm run dev` si avvia e ricarica su una modifica a `src/app.tsx`.
- [x] `README.md` e [tech-stack.md](../tech-stack.md) documentano i test.
