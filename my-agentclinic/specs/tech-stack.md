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
- Script npm: `dev`, `build`, `start`.

## Struttura del progetto (obiettivo)

```
src/
  index.tsx        # entry point dell'app, route
  components/      # Layout, Header, Footer, UI condivisa
  pages/           # un componente per pagina
  db/              # connessione, migrazioni, query
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
