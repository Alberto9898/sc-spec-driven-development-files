# Stack tecnologico

## Linguaggio e runtime

- **TypeScript** (strict mode), lato server.
- **Node.js** LTS come runtime.
- ES modules (`"type": "module"`), `target` moderno (ES2022): sostituisce l'attuale `tsconfig.json` CommonJS/ES2016.

## Framework web: Hono (consigliato)

**Perché Hono**
- TypeScript-first, con un'ottima inferenza dei tipi per route e handler.
- **JSX integrato per il rendering lato server**: le pagine sono componenti tipizzati, senza un linguaggio di template separato.
- Piccolo e veloce, con pochissima "magia": ogni fase resta facile da specificare, revisionare e validare.
- Diffuso e mantenuto attivamente; gira su Node tramite `@hono/node-server` ed è portabile su altri runtime.

**Alternative valutate**
- *Express*: il più diffuso, ma con un'ergonomia TypeScript più debole e un modello di middleware più datato.
- *Fastify*: ben tipizzato e veloce, ma richiede più boilerplate per un sito SSR.
- *Next.js*: diffuso, ma pesante e molto opinionated; troppa superficie per una piccola demo a fasi.

## Rendering e UI

- HTML generato sul server tramite componenti Hono JSX (`Layout`, `Header`, `Footer`, pagine).
- CSS semplice e moderno servito come file statici (custom properties CSS, flexbox/grid), senza framework CSS.
- Progressive enhancement: il sito funziona senza JavaScript lato client; si aggiungono piccoli
  ritocchi solo quando aiutano davvero.
- Target: browser evergreen attuali (Chrome, Edge, Firefox, Safari).

## Dati

- **SQLite** come livello di persistenza: un singolo file, zero gestione operativa, ideale per una demo.
- Accesso tramite `better-sqlite3` (sincrono, semplice, veloce).
- Schema gestito con semplici file di migrazione SQL, applicati all'avvio; dati di seed per le demo.

## Strumenti

- `tsx` per eseguire TypeScript in sviluppo (watch mode).
- `tsc` per il type-checking e le build di produzione.
- **Vitest** per i test automatici (vedi sotto).
- Script npm: `dev`, `build`, `start`, `test`, `test:watch`.

## Test e validazione

- **Vitest** è il framework di test: nativo ESM e TypeScript (usa esbuild, quindi rispetta `jsx` e
  `jsxImportSource` di `tsconfig.json`), API compatibile con Jest, nessuna configurazione richiesta per iniziare.
- `npm test` (`vitest run`) esegue la suite una volta ed è il comando usato nelle checklist di validazione;
  `npm run test:watch` (`vitest`) è pensato per lo sviluppo.
- Le route si testano **senza avviare il server**, con `app.request('/percorso')` di Hono, verificando status,
  header e HTML restituito.
- Per renderlo possibile, l'istanza `app` va definita ed esportata in un modulo separato (es. `src/app.tsx`),
  mentre `src/index.tsx` si limita ad avviare il server con `serve()`: importare un modulo che chiama `serve()`
  aprirebbe la porta durante i test.
- I file di test stanno in `tests/` con suffisso `.test.ts` / `.test.tsx`: `app.test.ts` per le route,
  `components.test.tsx` per i componenti JSX, renderizzati in stringa con `.toString()`.
- I file di test con JSX iniziano con il pragma `/** @jsxImportSource hono/jsx */`: `tsconfig.json`
  include solo `src/`, quindi senza pragma Vitest userebbe il runtime JSX di React.
- Vitest **non** fa type-checking: la correttezza dei tipi resta affidata a `tsc` (`npm run build`).
- I test automatici affiancano le verifiche manuali (es. controllo visivo nel browser), non le sostituiscono:
  ogni `validation.md` indica quali voci sono coperte da `npm test` e quali restano manuali.

## Struttura del progetto (obiettivo)

```
src/
  app.tsx          # istanza Hono e route (importabile dai test)
  index.tsx        # entry point: avvia il server con serve()
  components/      # Layout, Header, Footer, UI condivisa
  pages/           # un componente per pagina
  db/              # connessione, migrazioni, query
tests/             # test Vitest (*.test.ts / *.test.tsx)
static/            # CSS, immagini
specs/             # costituzione del progetto + specifiche per feature
```

### Convenzione: un componente per file

- Ogni componente JSX (in `components/` e in `pages/`) sta in un file separato con lo stesso nome del
  componente (es. `Header.tsx` → `Header`) ed esporta un solo componente.
- I componenti composti (es. `Layout`) importano i sottocomponenti dai rispettivi file e non li ridefiniscono
  inline; nessun componente viene definito dentro `index.tsx`.
- Gli import relativi usano l'estensione `.js` (es. `./Header.js`), come richiesto da `NodeNext`.
- Motivazione: ogni file ha una sola responsabilità ed è facile da trovare, rivedere e modificare in
  isolamento; le fasi successive possono riusare o sostituire un componente senza toccare gli altri.
