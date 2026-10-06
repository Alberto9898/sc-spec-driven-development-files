# Fase 1 — Hello Hono: Piano

Vedi [requirements.md](./requirements.md) per perimetro e decisioni, e [validation.md](./validation.md)
per i criteri di merge.

## 1. Passaggio a ESM e configurazione TypeScript moderna
1.1. In `package.json`, aggiungere `"type": "module"`. Rimuovere il campo obsoleto `"main"`, oppure farlo puntare a `dist/index.js`.
1.2. Aggiornare `tsconfig.json`:
   - `target: "ES2022"`, `module: "NodeNext"`, `moduleResolution: "NodeNext"`
   - `jsx: "react-jsx"`, `jsxImportSource: "hono/jsx"`
   - mantenere `strict: true`, `skipLibCheck: true`, `forceConsistentCasingInFileNames: true`, `outDir: "dist"`
   - aggiungere `rootDir: "src"`; `include: ["src"]`
1.3. Rinominare `src/index.ts` → `src/index.tsx`.

## 2. Aggiungere Hono e servire `/`
2.1. `npm install hono @hono/node-server`
2.2. `npm install -D tsx`
2.3. Scrivere `src/index.tsx`:
   - creare un'app `Hono`
   - `app.get('/', (c) => c.text('Welcome to AgentClinic'))`. È una risposta temporanea in testo
     semplice; il gruppo di task 4 la sostituisce con la home page.
   - `serve({ fetch: app.fetch, port: 3000 })` da `@hono/node-server`, stampando
     `AgentClinic running at http://localhost:3000` quando il server è in ascolto

## 3. Script e README
3.1. Impostare gli script npm: `dev` (`tsx watch src/index.tsx`), `build` (`tsc`), `start` (`node dist/index.js`).
3.2. Aggiornare `README.md` con le istruzioni per avviare l'app (`npm install`, `npm run dev`, poi aprire http://localhost:3000).
3.3. ~~Verifica rapida: eseguire `npm run dev`; `curl http://localhost:3000/` restituisce il testo semplice.~~
     **Superato dal gruppo 4:** la risposta in testo semplice non è stata implementata; si è passati
     direttamente alla home page HTML, verificata in [validation.md](./validation.md).

## 4. Home page AgentClinic minimale
4.1. In `src/index.tsx`, sostituire l'handler di `/` con `c.html(...)`, che renderizza un documento
     HTML completo con Hono JSX:
   - `<!DOCTYPE html>` anteposto (es. tramite `raw` da `hono/html`, perché JSX non può emettere un doctype)
   - `<html lang="en">` con un `<head>` che contiene `<meta charset="utf-8">`,
     `<meta name="viewport" content="width=device-width, initial-scale=1">` e `<title>AgentClinic</title>`
   - un `<body>` con `<h1>Welcome to AgentClinic</h1>` e una tagline giocosa in un `<p>`
4.2. Mantenere il markup inline in `src/index.tsx`: niente componenti, CSS o file statici (sono della Fase 2).
4.3. Seguire [validation.md](./validation.md) e spuntare ogni voce.
