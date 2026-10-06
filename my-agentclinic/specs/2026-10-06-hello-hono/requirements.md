# Fase 1 — Hello Hono: Requisiti

Branch: `phase-1-hello-hono`
Riferimenti: [missione](../mission.md), [stack tecnologico](../tech-stack.md), [roadmap](../roadmap.md) (Fase 1)

## Contesto

Il progetto è oggi uno stub TypeScript CommonJS (`target: es2016`, `module: commonjs`) il cui unico
file sorgente è `src/index.ts`, che stampa un messaggio. La Fase 1 lo trasforma nella più piccola web
app Hono eseguibile, con una home page AgentClinic minimale. In questo modo ogni fase successiva ha un
server funzionante su cui costruire, in linea con il principio dei "passi piccoli e rilasciabili", e le
demo hanno qualcosa da aprire nel browser fin dalla prima fase.

## Perimetro

### Incluso
- Passare il progetto a ES modules (`"type": "module"` in `package.json`).
- Aggiornare `tsconfig.json` al target indicato nello stack tecnologico: `target: ES2022`, risoluzione
  dei moduli Node ESM (`NodeNext`), strict mode mantenuto.
- Configurare JSX per Hono (`jsx: react-jsx`, `jsxImportSource: hono/jsx`).
- Rinominare `src/index.ts` → `src/index.tsx`.
- Aggiungere le dipendenze runtime `hono` e `@hono/node-server`, e la dipendenza di sviluppo `tsx`.
- Un'unica route, `GET /`, che serve una **home page AgentClinic minimale**:
  - un documento HTML completo: `<!DOCTYPE html>`, `<html lang="en">`, `<meta charset="utf-8">`,
    un meta tag viewport e `<title>AgentClinic</title>`
  - un `<h1>` con il testo **"Welcome to AgentClinic"**
  - una breve tagline giocosa in un `<p>` (es. "Where overworked AI agents come to recover from their humans.")
  - renderizzata sul server con Hono JSX (`c.html(...)`), scritta inline in `src/index.tsx`
- Script npm:
  - `dev` — `tsx watch src/index.tsx`
  - `build` — `tsc`
  - `start` — `node dist/index.js`
- Il server ascolta sulla porta **3000** e stampa il suo URL all'avvio.
- Aggiungere `/dist` a `.gitignore`, così l'output di `npm run build` non viene committato.

### Escluso (fasi successive)
- Componenti riutilizzabili (`Layout`, `Header`, `Main`, `Footer`), una cartella `pages/`, CSS,
  file statici, branding e palette di colori, e la sezione hero (Fase 2).
- Database, migrazioni, dati di seed (Fase 3).
- Un framework di test o test automatici.
- Una variabile d'ambiente `PORT` configurabile.

## Decisioni

| Decisione | Motivazione |
|---|---|
| Hono + `@hono/node-server` | Scelto in tech-stack.md: TS-first, JSX SSR integrato, poca "magia". |
| `tsx` in sviluppo, `tsc` per la build | Watch mode veloce in sviluppo; `tsc` mantiene un type-checking rigoroso ed è l'unico passo di build. |
| `module`/`moduleResolution: NodeNext` | Rispecchia la reale risoluzione ESM di Node. Conseguenza: dalla Fase 2 in poi gli import relativi devono usare l'estensione `.js` (es. `./components/Layout.js`). |
| JSX configurato nella Fase 1 | La home page usa già JSX, così la Fase 2 aggiunge solo UI senza toccare gli strumenti. |
| Home page HTML minimale invece di testo semplice | Dà un risultato visibile e adatto al browser già nella prima fase. La roadmap in origine diceva "restituire testo" ed è stata aggiornata di conseguenza. L'`<h1>` mantiene lo stesso messaggio "Welcome to AgentClinic". |
| Markup della home page inline in `src/index.tsx` | Mantiene la Fase 1 a un solo file sorgente. Suddividerlo in `Layout` e `pages/Home` è esattamente lo scopo della Fase 2. |
| Nessun CSS | Gli stili predefiniti del browser vanno bene qui; lo styling appartiene alla Fase 2. |
| Porta fissa 3000 | L'opzione più semplice per una demo; renderla configurabile è rimandato. |
| `/dist` in `.gitignore` | Inizialmente esclusa dal perimetro; inclusa durante l'implementazione, perché il primo `npm run build` ha reso concreto il rischio di committare l'output compilato. È una riga e non ha effetti sul resto. |

## Punti aperti / rischi
- **`dist/` non era in `.gitignore` (risolto).** Dopo il primo `npm run build` l'output compilato
  poteva essere committato per errore. Decisione: `/dist` è stato aggiunto a `.gitignore` in questa
  fase (vedi Decisioni).
- **Sovrapposizione con la Fase 2 (risolta in roadmap.md).** La roadmap ora dice che la Fase 2
  sposta questa home page inline in `Layout` + `pages/Home` e la fa crescere nella sezione hero,
  invece di creare la pagina da zero.
- `tsx` e `tsc` gestiscono JSX con percorsi diversi (esbuild contro il compilatore TS). Entrambi
  leggono `tsconfig.json`, ma la validazione verifica sia `dev` sia `build`/`start` per intercettare
  eventuali divergenze.
