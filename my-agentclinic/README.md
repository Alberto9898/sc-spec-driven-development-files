# AgentClinic

## Input dagli stakeholder

- Mary, dell'engineering, vuole un sito affidabile basato su uno stack diffuso in TypeScript, con una dashboard di facile accesso per agenti e staff.
- Susan, del product, ha un insieme di funzionalità che riguardano gli agenti e i loro disturbi, le terapie e la prenotazione degli appuntamenti.
- Steve, del marketing, vuole un sito gradevole che funzioni bene con un browser moderno.

## Avvio dell'app

Requisiti: Node.js 20 o superiore.

```bash
npm install
npm run dev
```

Poi apri http://localhost:3000 nel browser.

Per la build di produzione:

```bash
npm run build   # compila in dist/
npm start       # avvia dist/index.js
```

Per i test (Vitest):

```bash
npm test             # esegue la suite una volta
npm run test:watch   # riesegue i test a ogni modifica
```
