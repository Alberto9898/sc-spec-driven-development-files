# Tech Stack

## Language & runtime

- **TypeScript** (strict mode), server-side.
- **Node.js** LTS as the runtime.
- ES modules (`"type": "module"`), modern `target` (ES2022) — replaces the current CommonJS/ES2016 `tsconfig.json`.

## Web framework: Hono (recommended)

**Why Hono**
- TypeScript-first, with excellent type inference for routes and handlers.
- Built-in **JSX for server-side rendering** — pages are typed components, no separate template language.
- Small and fast with very little magic, which keeps each phase easy to spec, review, and validate.
- Popular and actively maintained; runs on Node via `@hono/node-server` and is portable to other runtimes.

**Alternatives considered**
- *Express* — the most popular, but weaker TypeScript ergonomics and an older middleware model.
- *Fastify* — well-typed and fast, but more boilerplate for an SSR site.
- *Next.js* — popular, but heavy and opinionated; too much surface for a small, phased demo.

## Rendering & UI

- Server-rendered HTML via Hono JSX components (`Layout`, `Header`, `Footer`, pages).
- Plain, modern CSS served as static files (CSS custom properties, flexbox/grid) — no CSS framework.
- Progressive enhancement: the site works without client-side JavaScript; add small sprinkles only when they clearly help.
- Target: current evergreen browsers (Chrome, Edge, Firefox, Safari).

## Data

- **SQLite** as the persistence layer — a single file, zero ops, ideal for a demo.
- Access via `better-sqlite3` (synchronous, simple, fast).
- Schema managed through plain SQL migration files, applied at startup; seed data for demos.

## Tooling

- `tsx` for running TypeScript in development (watch mode).
- `tsc` for type-checking and production builds.
- npm scripts: `dev`, `build`, `start`.

## Project layout (target)

```
src/
  index.tsx        # app entry, routes
  components/      # Layout, Header, Footer, shared UI
  pages/           # one component per page
  db/              # connection, migrations, queries
static/            # CSS, images
specs/             # constitution + per-feature specs
```
