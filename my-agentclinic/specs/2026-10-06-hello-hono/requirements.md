# Phase 1 — Hello Hono: Requirements

Branch: `phase-1-hello-hono`
References: [mission](../mission.md), [tech stack](../tech-stack.md), [roadmap](../roadmap.md) (Phase 1)

## Context

The project is currently a CommonJS TypeScript stub (`target: es2016`, `module: commonjs`) whose
only source file is `src/index.ts`, which logs a message. Phase 1 turns it into the smallest runnable
Hono web app, with a minimal AgentClinic home page. That gives every later phase a running server to
build on, in line with the "small, shippable steps" principle, and gives demos something to open in a
browser from the very first phase.

## Scope

### In scope
- Switch the project to ES modules (`"type": "module"` in `package.json`).
- Update `tsconfig.json` to the target from the tech stack: `target: ES2022`, Node ESM module
  resolution (`NodeNext`), strict mode kept.
- Configure JSX for Hono (`jsx: react-jsx`, `jsxImportSource: hono/jsx`).
- Rename `src/index.ts` → `src/index.tsx`.
- Add runtime dependencies `hono` and `@hono/node-server`, and the dev dependency `tsx`.
- One route, `GET /`, that serves a **minimal AgentClinic home page**:
  - a complete HTML document: `<!DOCTYPE html>`, `<html lang="en">`, `<meta charset="utf-8">`,
    a viewport meta tag, and `<title>AgentClinic</title>`
  - an `<h1>` with the text **"Welcome to AgentClinic"**
  - one short, playful tagline in a `<p>` (e.g. "Where overworked AI agents come to recover from their humans.")
  - rendered on the server with Hono JSX (`c.html(...)`), written inline in `src/index.tsx`
- npm scripts:
  - `dev` — `tsx watch src/index.tsx`
  - `build` — `tsc`
  - `start` — `node dist/index.js`
- The server listens on port **3000** and logs its URL on startup.

### Out of scope (later phases)
- Reusable components (`Layout`, `Header`, `Main`, `Footer`), a `pages/` folder, CSS, static
  files, branding and color palette, and the hero section (Phase 2).
- Database, migrations, seed data (Phase 3).
- A test framework or automated tests.
- A configurable `PORT` env var, and adding `dist/` to `.gitignore` (see Open points).

## Decisions

| Decision | Rationale |
|---|---|
| Hono + `@hono/node-server` | Chosen in tech-stack.md: TS-first, built-in JSX SSR, little magic. |
| `tsx` for dev, `tsc` for build | Fast watch mode in dev; `tsc` keeps type-checking strict and is the single build step. |
| `module`/`moduleResolution: NodeNext` | Matches Node's real ESM resolution. Consequence: relative imports must use a `.js` extension (e.g. `./components/Layout.js`) from Phase 2 onward. |
| JSX configured in Phase 1 | The home page already uses JSX, and Phase 2 then only adds UI without touching the tooling. |
| Minimal HTML home page instead of plain text | Gives a visible, browser-friendly result in the first phase. It goes beyond the roadmap's literal "returning text", but the `<h1>` keeps the same "Welcome to AgentClinic" message. |
| Home page markup inline in `src/index.tsx` | Keeps Phase 1 to a single source file. Splitting it into `Layout` and `pages/Home` is exactly what Phase 2 is for. |
| No CSS | Unstyled browser defaults are fine here; styling belongs to Phase 2. |
| Fixed port 3000 | Simplest option for a demo; making it configurable is deferred. |

## Open points / risks
- **`dist/` is not in `.gitignore`.** Once `npm run build` runs, the compiled output can be
  committed by mistake. This is a one-line fix, deliberately left out of scope here. Reconsider it
  before merging.
- **Overlap with Phase 2.** The roadmap's Phase 2 bullet "Home page with a playful hero section"
  will now build on this minimal page instead of creating it. Phase 2's spec should say that it
  refactors the inline markup into `Layout` + `pages/Home` and adds the hero.
- `tsx` and `tsc` handle JSX through different paths (esbuild vs. the TS compiler). Both read
  `tsconfig.json`, but validation checks both `dev` and `build`/`start` so that drift is caught.
