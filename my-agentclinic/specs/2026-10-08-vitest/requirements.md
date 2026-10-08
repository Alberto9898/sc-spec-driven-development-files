# Test automatici con Vitest: Requisiti

Branch: `replanning`
Riferimenti: [stack tecnologico](../tech-stack.md#test-e-validazione), [roadmap](../roadmap.md),
[Fase 1](../2026-10-06-hello-hono/requirements.md)

## Contesto

La Fase 1 è stata validata solo con verifiche manuali (`curl`, browser), e i test automatici erano
esplicitamente esclusi dal suo perimetro. Prima di costruire le fasi successive introduciamo Vitest,
così ogni fase può avere voci di validazione eseguibili con `npm test` e le regressioni sulle fasi
precedenti emergono subito, senza ripetere a mano le verifiche già fatte.

Non è una nuova funzionalità per l'utente: è un intervento sugli strumenti, che lascia invariato il
comportamento dell'app.

## Perimetro

### Incluso
- Aggiungere `vitest` come dipendenza di sviluppo.
- Script npm `test` (`vitest run`) e `test:watch` (`vitest`).
- Separare l'istanza Hono dall'avvio del server:
  - `src/app.tsx` crea ed esporta `app`, con il middleware statico e le route;
  - `src/index.tsx` importa `app` e chiama soltanto `serve()`.
- Una suite `tests/app.test.ts` che copre, tramite `app.request()`, le verifiche HTTP della Fase 1
  che prima si facevano con `curl`.
- Una suite `tests/components.test.tsx` che testa in isolamento `Header`, `Main`, `Footer` e `Layout`.
- Aggiornare `README.md` con il comando dei test.

### Escluso
- Test nel browser, test end-to-end, test visivi del CSS. Di conseguenza, il layout responsive si verifica
  a mano (vedi [tech-stack.md](../tech-stack.md#responsive-design)); Vitest controlla solo il viewport meta.
- Coverage e soglie minime di copertura.
- Type-checking dei file di test (vedi Punti aperti).
- CI.

## Decisioni

| Decisione | Motivazione |
|---|---|
| Vitest | Nativo ESM e TypeScript, legge `jsx`/`jsxImportSource` da `tsconfig.json`, nessuna configurazione necessaria. Vedi [tech-stack.md](../tech-stack.md#test-e-validazione). |
| `app.request()` invece di un server reale | Niente porte aperte, test veloci e deterministici; copre lo stesso stack di middleware e route di `npm start`. |
| `src/app.tsx` separato da `src/index.tsx` | Importare un modulo che chiama `serve()` aprirebbe la porta 3000 durante i test. |
| Test in `tests/`, fuori da `src/` | `tsc` compila solo `src/` (`rootDir: "src"`), quindi i test non finiscono in `dist/`. |
| Pragma `@jsxImportSource` nei test JSX invece di una config Vitest | `tsconfig.json` include solo `src/`, quindi i test non ereditano `jsxImportSource`. Il pragma è una riga per file ed evita un file di configurazione dipendente dalla versione di Vite. Se i file JSX di test aumentano, conviene passare a `vitest.config.ts`. |
| Nessun `--passWithNoTests` | Una suite vuota deve fallire: un `npm test` verde senza test sarebbe un falso segnale di validazione. |

## Punti aperti / rischi
- **I test non sono type-checked.** Vitest (esbuild) rimuove i tipi senza controllarli, e `tsc` non
  include `tests/`. Un errore di tipo nei test non viene segnalato. Se diventa un problema, si può
  aggiungere un `tsconfig` dedicato ai test con `noEmit` e uno script `typecheck`.
- **`serveStatic` dipende dalla cartella di avvio** (`root: './'`). I test sui file statici passano
  solo se Vitest viene lanciato dalla root del progetto, come già vale per `npm run dev`/`start`.
- **Asserzioni sul markup esatto.** I test confrontano stringhe HTML (es. `<meta charset="utf-8"/>`):
  un cambio di serializzazione in Hono li romperebbe pur senza un cambio visibile. È accettabile per
  ora; se diventano fragili, si passa a un parser HTML.
