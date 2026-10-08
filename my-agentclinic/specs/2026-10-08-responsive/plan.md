# Base responsive: Piano

Vedi [requirements.md](./requirements.md) per perimetro e decisioni, e [validation.md](./validation.md)
per i criteri di merge.

## 1. Specifiche di prodotto
1.1. [mission.md](../mission.md): criterio di successo su mobile, principio 5 "Responsive per definizione",
     esigenza mobile di Steve, chiarimento sui non-obiettivi (niente app native).
1.2. [tech-stack.md](../tech-stack.md): sezione "Responsive design" con criteri, approccio e verifica.
1.3. [roadmap.md](../roadmap.md): requisito trasversale, questo intervento, indicazioni responsive per le
     fasi 2, 4, 7 e 8; la Fase 9 diventa solo verifica d'insieme.
1.4. Note di aggiornamento nelle specifiche della [Fase 1](../2026-10-06-hello-hono/requirements.md) e di
     [Vitest](../2026-10-08-vitest/requirements.md).

## 2. CSS mobile-first
2.1. Riscrivere `static/styles.css` come descritto in [requirements.md](./requirements.md#incluso),
     con un commento iniziale che rimanda ai criteri.
2.2. Nessuna modifica ai componenti: le classi esistenti bastano.

## 3. Test
3.1. In `tests/components.test.tsx`, test sul viewport meta di `Layout` (valore esatto, nessun blocco dello zoom).
3.2. `npm test` deve passare.

## 4. Verifica manuale
4.1. Controllare `/` a 320px, 768px e 1280px seguendo [validation.md](./validation.md).
