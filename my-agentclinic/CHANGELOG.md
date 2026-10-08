# Changelog

<!-- changelog:last-commit 2a2307e9d3d64cf32cfc3a0f496a7005c7a4616b -->

## 2026-10-08

- Aggiunti i test automatici con Vitest (`npm test`, `npm run test:watch`): test delle route tramite
  `app.request()` e dei componenti `Header`, `Main`, `Footer` e `Layout`; l'app Hono è stata spostata in
  `src/app.tsx` e `src/index.tsx` avvia solo il server ([specifiche](specs/2026-10-08-vitest/)).
- Reso il responsive design un requisito di prodotto: criteri in `mission.md` e `tech-stack.md`
  (da 320px in su, zoom sempre consentito, target touch da 44px) e CSS riscritto mobile-first, verificato a
  320, 768 e 1280px ([specifiche](specs/2026-10-08-responsive/)).
- Riorganizzata la roadmap: le vecchie fasi 2–5 sono confluite in una nuova Fase 2 (layout, database, agenti
  e disturbi) divisa in quattro tappe, e le fasi successive sono state rinumerate da 3 a 6
  ([roadmap](specs/roadmap.md)).
- Aggiunta la skill `/changelog`, che aggiorna questo file a partire dai commit, da usare prima di ogni merge.

## 2026-10-07

- Aggiunta la home page AgentClinic con Hono: progetto passato a ES modules con JSX di Hono, script `dev`,
  `build` e `start`, server sulla porta 3000 ([specifiche](specs/2026-10-06-hello-hono/)).
- Aggiunto il layout a componenti (`Layout`, `Header`, `Main`, `Footer`, un componente per file) con CSS
  statico strutturale servito da `/static/*`.
- Completata e spuntata la checklist di validazione della Fase 1; fase segnata come completata nella roadmap.
- Tradotte in italiano le specifiche del progetto (missione, roadmap, stack tecnologico, Fase 1).

## 2026-10-06

- Scritte le prime specifiche del progetto: missione, stack tecnologico, roadmap e specifiche della Fase 1
  (Hello Hono) ([specifiche](specs/2026-10-06-hello-hono/)).
