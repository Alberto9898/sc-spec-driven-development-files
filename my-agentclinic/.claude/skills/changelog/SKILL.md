---
name: changelog
description: Aggiorna CHANGELOG.md nella root del progetto a partire dalla cronologia git, con un titolo per data e punti elenco in italiano. Crea il file se non esiste. Da invocare manualmente con /changelog prima di ogni merge.
disable-model-invocation: true
---

# Changelog

Mantiene `CHANGELOG.md` nella root del progetto (la cartella con `package.json`, non la root del
repository git, che contiene anche il materiale del corso).

## Procedura

1. **Raccogli i commit.** Dalla root del progetto esegui:

   ```bash
   python .claude/skills/changelog/scripts/changelog_commits.py
   ```

   Lo script non modifica file. Stampa un JSON con i commit non ancora registrati, raggruppati per data
   (dal più recente). Ha già escluso i merge commit, i commit che non toccano il progetto e quelli che
   modificano solo `CHANGELOG.md`.

2. **Controlla il JSON prima di scrivere.**
   - `uncommitted_changes` non vuoto: il changelog si basa solo sui commit, quindi quelle modifiche
     resterebbero fuori. Fermati, elencale all'utente e chiedi se vuole fare commit prima di proseguire.
   - `warnings` non vuoto: riportali all'utente e segui le indicazioni (es. confrontare i commit con le
     voci già presenti per evitare duplicati).
   - `commits_by_date` vuoto: il changelog è già aggiornato. Dillo e fermati senza toccare il file.

3. **Scrivi le voci.** Per ogni data in `commits_by_date`:
   - Se in cima al file c'è già un titolo `## <stessa data>` (es. un secondo merge nello stesso giorno),
     aggiungi i nuovi punti in quella sezione invece di creare un titolo duplicato.
   - Altrimenti crea una nuova sezione `## YYYY-MM-DD` sotto il marcatore, sopra le sezioni esistenti.
   - Le date vanno dalla più recente alla meno recente.

4. **Aggiorna il marcatore** `<!-- changelog:last-commit <sha> -->` con il valore di `head` (SHA completo).
   Deve esserci un solo marcatore, subito sotto il titolo `# Changelog`.

5. **Mostra il risultato** all'utente (le sezioni aggiunte o modificate). Non fare commit: lo decide l'utente,
   di solito includendo `CHANGELOG.md` nel branch prima del merge.

## Come scrivere i punti elenco

- **In italiano**, come le specifiche del progetto. Nomi di file, comandi, codice e testi della UI restano come sono.
- **Uno per modifica significativa, non per commit.** Usa `subject`, `body` e `files` per capire cosa è
  cambiato. Unisci più commit che descrivono la stessa modifica (es. implementazione + "complete validation
  checklist") e dividi un commit che contiene modifiche indipendenti.
- **Descrivi l'effetto**, non l'attività git: "Aggiunta la home page con layout a componenti", non
  "Merge branch phase-1" o "Fix typo".
- **Inizia con il verbo al participio** (Aggiunto/a, Aggiornato/a, Rimosso/a, Corretto/a, Spostato/a),
  mettendo per prima la modifica più importante della giornata.
- **Collega le specifiche** quando un punto riguarda una fase o un intervento con una cartella in `specs/`,
  con un link relativo, es. `([specifiche](specs/2026-10-08-vitest/))`.
- Ometti le modifiche senza effetto per chi legge (formattazione, refusi), a meno che quel giorno non ci sia altro.

## Formato

```markdown
# Changelog

<!-- changelog:last-commit 60f66c9e0c2f4b1a8d7e6f5a4b3c2d1e0f9a8b7c -->

## 2026-10-08

- Aggiunti i test automatici con Vitest (`npm test`) per route e componenti ([specifiche](specs/2026-10-08-vitest/)).
- Reso il responsive design un requisito di prodotto, con CSS mobile-first ([specifiche](specs/2026-10-08-responsive/)).

## 2026-10-07

- Aggiunta la home page con layout a componenti e CSS statico ([specifiche](specs/2026-10-06-hello-hono/)).
```

Lo SHA nell'esempio è fittizio: usa sempre quello reale di `head`.
