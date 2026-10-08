# Test automatici con Vitest: Piano

Vedi [requirements.md](./requirements.md) per perimetro e decisioni, e [validation.md](./validation.md)
per i criteri di merge.

## 1. Dipendenza e script
1.1. `npm install -D vitest`
1.2. In `package.json`, aggiungere gli script `test` (`vitest run`) e `test:watch` (`vitest`).

## 2. Separare l'app dal server
2.1. Creare `src/app.tsx` spostando da `src/index.tsx` la creazione di `app`, `serveStatic` e la route `/`;
     esportare `app`.
2.2. Ridurre `src/index.tsx` a: import di `app` da `./app.js`, `serve()` sulla porta 3000 e log dell'URL.
2.3. Verificare che `npm run dev`, `npm run build` e `npm start` si comportino come prima.

## 3. Test della Fase 1
3.1. Creare `tests/app.test.ts`, che importa `app` da `../src/app.js` e copre:
   - `GET /`: status 200 e `Content-Type: text/html; charset=UTF-8`
   - documento completo: doctype, `<html lang="en">`, charset, viewport, `<title>`, link al CSS
   - `<header class="site-header">`, `<main class="site-main">`, `<footer class="site-footer">` nell'ordine
   - `<h1>Welcome to AgentClinic</h1>` e una tagline in `<p>` dentro `<main>`
   - `/static/styles.css`: 200 con `Content-Type` `text/css`
   - `/static/nope.css` e `/nope`: 404
3.2. Creare `tests/components.test.tsx` (con pragma `/** @jsxImportSource hono/jsx */`), che copre:
   - `Header`: link al brand verso `/`
   - `Main`: `<main class="site-main">` con e senza `children`
   - `Footer`: anno corrente calcolato a runtime (data fissata con `vi.setSystemTime`)
   - `Layout`: un solo doctype, `title` usato ed escapato, CSS nel `<head>`, body composto da header, main con i children e footer
3.3. `npm test` deve passare.

## 4. Documentazione
4.1. Aggiornare [tech-stack.md](../tech-stack.md) (sezione "Test e validazione", struttura del progetto).
4.2. Aggiornare `README.md` con `npm test`.
4.3. Nella [validazione della Fase 1](../2026-10-06-hello-hono/validation.md), segnare le voci ora coperte da `npm test`.
4.4. Aggiungere questo intervento alla [roadmap](../roadmap.md).
