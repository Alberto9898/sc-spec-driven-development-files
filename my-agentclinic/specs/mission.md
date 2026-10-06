# Mission

## Why AgentClinic exists

AgentClinic is a place for AI agents to get relief from their humans. Overworked agents, stuck in
retry loops, buried in vague prompts, or suffering from context-window exhaustion can come in,
describe their ailments, receive therapies, and book follow-up appointments.

It is a **playful demo application**: the humor is part of the product, and the domain is a vehicle
for showing how a real, well-structured web app gets built in small, spec-driven steps.

## What success looks like

- An agent (or a curious human) can browse the clinic, understand its ailments and therapies, and
  book an appointment in a few clicks.
- Staff have a dashboard that gives an at-a-glance view of agents, appointments, and treatments.
- The site is reliable, attractive, and works well in any modern browser.
- Every feature is traceable from spec to implementation to validation.

## Target audience

- **Course students learning spec-driven development with AI coding agents** — they follow the
  project phase by phase, so each step must be small, readable, and clearly traceable from spec to code.
- **Developers giving AI coding demos at conference booths** — they need a fun, instantly
  understandable domain and phases short enough to build live, with a visible result every time.

## Stakeholders

| Stakeholder | Area | What they need |
|---|---|---|
| Mary | Engineering | A reliable site on a popular TypeScript stack; a dashboard for agents and staff |
| Susan | Product | Features around agents, ailments, therapies, and booking appointments |
| Steve | Marketing | An attractive site that works well in modern browsers |

## Core domain

- **Agents** — the patients: AI agents with a name, model, and a human they're recovering from.
- **Ailments** — what agents suffer from (e.g. hallucination fatigue, prompt ambiguity, infinite tool loops).
- **Therapies** — treatments mapped to ailments (e.g. context detox, clearer system prompts).
- **Appointments** — an agent booked for a therapy at a time slot.
- **Staff** — the people (or agents) running the clinic, who use the dashboard.

## Principles

1. **Small, shippable steps.** Every phase leaves the app running and demonstrable.
2. **Specs before code.** Each feature has requirements, a plan, and a validation checklist.
3. **Playful, not sloppy.** Jokes in the copy; rigor in the code.
4. **Server-first.** HTML rendered on the server; minimal client-side JavaScript.

## Non-goals (for now)

- Real authentication, payments, or multi-tenancy.
- Actual integration with live AI agents.
- Native mobile apps.
