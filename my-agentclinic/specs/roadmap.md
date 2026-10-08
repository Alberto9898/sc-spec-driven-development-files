# Roadmap

Ordine di implementazione ad alto livello. Ogni fase è volutamente piccola, lascia l'app funzionante
e ha una propria cartella di specifiche (`specs/YYYY-MM-DD-<feature>/` con requisiti, piano e validazione).

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

## Fase 2 — Struttura del layout
- Branding di base e palette di colori, sul CSS statico introdotto nella Fase 1.
- Spostare la home page della Fase 1 in `pages/Home` e farla crescere in una sezione hero giocosa.

## Fase 3 — Fondamenta del database
- Aggiungere SQLite (`better-sqlite3`), un runner di migrazioni e uno script di seed.
- Nessuna modifica alla UI oltre a un indicatore di stato/salute.

## Fase 4 — Agenti
- Tabella `agents` + dati di seed.
- Pagina elenco e pagina di dettaglio degli agenti.

## Fase 5 — Disturbi
- Tabella `ailments`, collegata agli agenti.
- Pagina catalogo dei disturbi; disturbi mostrati nel dettaglio dell'agente.

## Fase 6 — Terapie
- Tabella `therapies`, associata ai disturbi.
- Catalogo delle terapie; "terapie consigliate" nelle pagine dei disturbi.

## Fase 7 — Appuntamenti
- Tabella `appointments`.
- Form di prenotazione (validazione lato server, nessun JS richiesto) e pagina di conferma.
- Prossimi appuntamenti mostrati nel dettaglio dell'agente.

## Fase 8 — Dashboard dello staff
- Pagina dashboard: conteggi, appuntamenti di oggi, disturbi più comuni.

## Fase 9 — Rifinitura
- Layout responsive, verifica di accessibilità, stati vuoti/di errore, pagina 404.
- Testi di marketing e rifinitura visiva.

## In futuro / idee
- Login dello staff, riprogrammazione/cancellazione degli appuntamenti, form di auto-accettazione per gli agenti.
