# Roadmap

High-level implementation order. Each phase is intentionally small, leaves the app runnable,
and gets its own spec folder (`specs/YYYY-MM-DD-<feature>/` with requirements, plan, validation).

## Phase 1 — Hello Hono
- Switch project to ESM, add Hono + `@hono/node-server` + `tsx`.
- Single route `/` returning "Welcome to AgentClinic".
- `npm run dev` works.

## Phase 2 — Layout shell
- JSX `Layout` with `Header`, `Main`, `Footer` components.
- Static CSS served; basic branding and color palette.
- Home page with a playful hero section.

## Phase 3 — Database foundation
- Add SQLite (`better-sqlite3`), migration runner, and seed script.
- No UI change beyond a health/status indicator.

## Phase 4 — Agents
- `agents` table + seed data.
- List page and detail page for agents.

## Phase 5 — Ailments
- `ailments` table, linked to agents.
- Ailments catalog page; ailments shown on agent detail.

## Phase 6 — Therapies
- `therapies` table, mapped to ailments.
- Therapies catalog; "recommended therapies" on ailment pages.

## Phase 7 — Appointments
- `appointments` table.
- Booking form (server-side validation, no JS required) and confirmation page.
- Upcoming appointments shown on agent detail.

## Phase 8 — Staff dashboard
- Dashboard page: counts, today's appointments, most common ailments.

## Phase 9 — Polish
- Responsive layout, accessibility pass, empty/error states, 404 page.
- Marketing copy and visual polish.

## Later / ideas
- Staff login, appointment rescheduling/cancellation, agent self-intake form.
