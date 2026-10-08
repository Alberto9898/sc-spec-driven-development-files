# Roadmap

Ordine di implementazione ad alto livello. Ogni fase è volutamente piccola, lascia l'app funzionante
e ha una propria cartella di specifiche (`specs/YYYY-MM-DD-<feature>/` con requisiti, piano e validazione).

**Requisito trasversale: responsive design.** Dalla Fase 2 in poi, ogni pagina nuova o modificata rispetta i
[criteri responsive](./tech-stack.md#responsive-design), e la sua `validation.md` li verifica a 320px, 768px e 1280px.

## Fase 1 — Hello Hono ✅ Completata (2026-10-07)
- Passare il progetto a ESM, aggiungere Hono + `@hono/node-server` + `tsx`; JSX configurato.
- Un'unica route `/` che serve una home page AgentClinic minimale (titolo
  "Welcome to AgentClinic" + tagline giocosa), renderizzata inline con Hono JSX.
- `npm run dev`, `build` e `start` funzionano.
- (Esteso) `Layout` JSX con i componenti `Header`, `Main`, `Footer`; CSS statico strutturale servito da `/static/*`.

## Intervento — Test automatici con Vitest ✅ Completato (2026-10-08)
- Vitest + `npm test`; `app` separata dall'avvio del server (`src/app.tsx`).
- Le verifiche HTTP della Fase 1 diventano test automatici. Specifiche in `specs/2026-10-08-vitest/`.
- Da qui in poi, ogni fase indica nel proprio `validation.md` quali voci sono coperte da `npm test`.

## Intervento — Base responsive ✅ Completato (2026-10-08)
- CSS mobile-first per il layout esistente (gutter fluidi, titoli con `clamp()`, target touch, media fluidi).
- Criteri responsive in tech-stack.md; test sul viewport meta. Specifiche in `specs/2026-10-08-responsive/`.

## Fase 2 — Struttura del layout
- Branding di base e palette di colori, sul CSS statico introdotto nella Fase 1.
- Spostare la home page della Fase 1 in `pages/Home` e farla crescere in una sezione hero giocosa.
- La hero è mobile-first: testo e immagine impilati su mobile, affiancati da `40rem` in su.
- Se l'header guadagna voci di navigazione, vanno a capo su schermi stretti, senza menu JavaScript.

## Fase 3 — Fondamenta del database
- Aggiungere SQLite (`better-sqlite3`), un runner di migrazioni e uno script di seed.
- Nessuna modifica alla UI oltre a un indicatore di stato/salute.

## Fase 4 — Agenti
- Tabella `agents` + dati di seed.
- Pagina elenco e pagina di dettaglio degli agenti.
- Elenco come griglia di schede (`auto-fit`): una colonna su mobile, più colonne su schermi larghi.

## Fase 5 — Disturbi
- Tabella `ailments`, collegata agli agenti.
- Pagina catalogo dei disturbi; disturbi mostrati nel dettaglio dell'agente.

## Fase 6 — Terapie
- Tabella `therapies`, associata ai disturbi.
- Catalogo delle terapie; "terapie consigliate" nelle pagine dei disturbi.

## Fase 7 — Appuntamenti
- Tabella `appointments`.
- Form di prenotazione (validazione lato server, nessun JS richiesto) e pagina di conferma.
- Form usabile da smartphone: campi a tutta larghezza, tipi di input corretti, pulsanti da almeno 44px.
- Prossimi appuntamenti mostrati nel dettaglio dell'agente.

## Fase 8 — Dashboard dello staff
- Pagina dashboard: conteggi, appuntamenti di oggi, disturbi più comuni.
- Riquadri impilati su mobile e in griglia su desktop; tabelle con scroll orizzontale nel proprio contenitore.

## Fase 9 — Rifinitura
- Verifica finale responsive e di accessibilità su tutte le pagine (il responsive si fa in ogni fase,
  qui si controlla solo l'insieme), stati vuoti/di errore, pagina 404.
- Testi di marketing e rifinitura visiva.

## In futuro / idee
- Login dello staff, riprogrammazione/cancellazione degli appuntamenti, form di auto-accettazione per gli agenti.
