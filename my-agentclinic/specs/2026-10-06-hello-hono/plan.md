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
4.2. ~~Mantenere il markup inline in `src/index.tsx`: niente componenti, CSS o file statici (sono della Fase 2).~~
     **Superato dal gruppo 5:** il perimetro della Fase 1 è stato esteso al layout a componenti e al CSS statico.
4.3. Seguire [validation.md](./validation.md) e spuntare ogni voce.

## 5. Layout a componenti e CSS statico (estensione del perimetro)
5.1. Creare `src/components/` con tre sottocomponenti, ciascuno in un file separato secondo la convenzione
     "un componente per file" di [tech-stack.md](../tech-stack.md#convenzione-un-componente-per-file):
   - `Header.tsx`: `<header class="site-header">` con il nome "AgentClinic" come link a `/`
   - `Main.tsx`: `<main class="site-main">` che renderizza i `children`
   - `Footer.tsx`: `<footer class="site-footer">` con `© <anno corrente> AgentClinic`
5.2. Creare `src/components/Layout.tsx`, che riceve `title` e `children` e produce il documento completo:
   - doctype (`raw` da `hono/html`), `<html lang="en">`, `<head>` con charset, viewport, `<title>{title}</title>`
     e `<link rel="stylesheet" href="/static/styles.css">`
   - `<body>` composto da `<Header />`, `<Main>{children}</Main>`, `<Footer />`
   - import relativi con estensione `.js` (requisito di `NodeNext`)
5.3. Creare `static/styles.css`: reset `box-sizing`, `body` in colonna flex con footer in fondo alla pagina,
     stili strutturali per `.site-header`, `.site-main` (larghezza massima, centrato) e `.site-footer`.
     Niente palette né branding (restano alla Fase 2).
5.4. In `src/index.tsx`:
   - servire i file statici con `app.use('/static/*', serveStatic({ root: './' }))`
     (`serveStatic` da `@hono/node-server/serve-static`; `root` è relativo alla cartella da cui si avvia il server)
   - sostituire il markup inline di `/` con `<Layout title="AgentClinic">`, mantenendo `<h1>` e tagline come `children`
5.5. Nota: il CSS non viene "importato" in TypeScript (`import './styles.css'` richiede un bundler, che qui non c'è).
     Viene servito come file statico e collegato con `<link>` nel `Layout`.
5.6. Verificare con [validation.md](./validation.md), sezione "Layout e CSS".

