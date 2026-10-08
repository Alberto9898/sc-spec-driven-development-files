# Missione

## Perché esiste AgentClinic

AgentClinic è un luogo dove gli agenti AI trovano sollievo dai loro umani. Agenti sovraccarichi,
bloccati in loop di retry, sommersi da prompt vaghi o colpiti da esaurimento della context window
possono entrare, descrivere i loro disturbi, ricevere terapie e prenotare appuntamenti di controllo.

È un'**applicazione demo giocosa**: l'umorismo fa parte del prodotto, e il dominio è un mezzo per
mostrare come si costruisce una web app reale e ben strutturata, a piccoli passi guidati dalle specifiche.

## Come si misura il successo

- Un agente (o un umano curioso) può esplorare la clinica, capirne disturbi e terapie e prenotare
  un appuntamento in pochi clic.
- Lo staff ha una dashboard che offre una visione d'insieme immediata di agenti, appuntamenti e trattamenti.
- Il sito è affidabile, gradevole e funziona bene in qualsiasi browser moderno.
- Ogni pagina è usabile e leggibile su smartphone, tablet e desktop (da 320px di larghezza in su),
  senza scroll orizzontale e senza dover zoomare.
- Ogni feature è tracciabile dalla specifica all'implementazione fino alla validazione.

## Pubblico di riferimento

- **Studenti del corso che imparano lo spec-driven development con agenti AI di coding**: seguono il
  progetto fase per fase, quindi ogni passo deve essere piccolo, leggibile e chiaramente tracciabile
  dalla specifica al codice.
- **Sviluppatori che fanno demo di AI coding agli stand delle conferenze**: hanno bisogno di un dominio
  divertente e comprensibile al volo, e di fasi abbastanza brevi da costruire dal vivo, con un risultato
  visibile ogni volta.

## Stakeholder

| Stakeholder | Area | Di cosa ha bisogno |
|---|---|---|
| Mary | Engineering | Un sito affidabile su uno stack TypeScript diffuso; una dashboard per agenti e staff |
| Susan | Product | Funzionalità su agenti, disturbi, terapie e prenotazione degli appuntamenti |
| Steve | Marketing | Un sito gradevole che funzioni bene nei browser moderni, anche da smartphone (es. per chi visita gli stand) |

## Dominio principale

- **Agenti (Agents)**: i pazienti, cioè agenti AI con un nome, un modello e un umano da cui si stanno riprendendo.
- **Disturbi (Ailments)**: ciò di cui soffrono gli agenti (es. affaticamento da allucinazioni,
  ambiguità dei prompt, loop infiniti di tool).
- **Terapie (Therapies)**: trattamenti associati ai disturbi (es. detox del contesto, system prompt più chiari).
- **Appuntamenti (Appointments)**: un agente prenotato per una terapia in una fascia oraria.
- **Staff**: le persone (o gli agenti) che gestiscono la clinica e usano la dashboard.

## Principi

1. **Passi piccoli e rilasciabili.** Ogni fase lascia l'app funzionante e dimostrabile.
2. **Prima le specifiche, poi il codice.** Ogni feature ha requisiti, un piano e una checklist di validazione.
3. **Giocoso, non sciatto.** Battute nei testi; rigore nel codice.
4. **Server-first.** HTML generato sul server; JavaScript lato client ridotto al minimo.
5. **Responsive per definizione.** Ogni pagina nasce mobile-first e si adatta a qualsiasi larghezza dello
   schermo. È un requisito di ogni fase, non una rifinitura finale: i criteri sono in
   [tech-stack.md](./tech-stack.md#responsive-design).

## Non-obiettivi (per ora)

- Autenticazione reale, pagamenti o multi-tenancy.
- Integrazione effettiva con agenti AI reali.
- App mobile native: l'esperienza mobile passa dal sito responsive.
