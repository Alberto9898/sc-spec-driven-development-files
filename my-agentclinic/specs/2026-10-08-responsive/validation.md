# Base responsive: Validazione

L'intervento può essere unito quando **ogni** voce qui sotto è spuntata.

## Automatica
- [x] `npm test` termina con codice 0 e include il test sul viewport meta di `Layout`.

## Specifiche
- [x] [mission.md](../mission.md), [tech-stack.md](../tech-stack.md#responsive-design) e [roadmap.md](../roadmap.md)
      riportano il responsive come requisito trasversale, con criteri verificabili.
- [x] La Fase 9 (oggi Fase 6) della roadmap non contiene più "Layout responsive" come lavoro da fare.

## Manuale (DevTools, modalità dispositivo, pagina `/`)

Verifica del 2026-10-08 su `npm start`, in Chrome, misurando la pagina in iframe larghi 320, 768 e 1280px
(`scrollWidth` contro `clientWidth`, elementi oltre il bordo destro, dimensioni di link e titolo).

- [x] **320px:** nessuno scroll orizzontale; header, titolo, tagline e footer leggibili senza zoom; il footer è in fondo.
      *(scrollWidth 320 = clientWidth; nessun elemento sborda; `<h1>` 28px; footer a filo del fondo)*
- [x] **768px:** stessa verifica; il contenuto non supera `--content-max`. *(nessuno scroll; `<h1>` 38,4px)*
- [x] **1280px:** il `main` è centrato con larghezza massima di 60rem; struttura invariata rispetto alla Fase 1
      (cambiano solo `<h1>`, da 32 a 40px, e le spaziature laterali). *(main 960px, 160px per lato)*
- [x] Il link "AgentClinic" nell'header ha un'area cliccabile alta almeno 44px. *(44px)*
- [x] Testo al 200% a 320px: il testo cresce e la pagina non scorre in orizzontale. *(simulato raddoppiando
      il font-size della radice, non con lo zoom del browser; nessuno scroll orizzontale)*
- [x] `npm run build` e `npm start` servono il nuovo CSS (`/static/styles.css` → 200, `text/css`).
