# Phase 1 — Hello Hono: Plan

See [requirements.md](./requirements.md) for scope and decisions, and [validation.md](./validation.md)
for the merge criteria.

## 1. Switch to ESM and modern TypeScript config
1.1. In `package.json`, add `"type": "module"`. Remove the obsolete `"main"` field, or point it at `dist/index.js`.
1.2. Update `tsconfig.json`:
   - `target: "ES2022"`, `module: "NodeNext"`, `moduleResolution: "NodeNext"`
   - `jsx: "react-jsx"`, `jsxImportSource: "hono/jsx"`
   - keep `strict: true`, `skipLibCheck: true`, `forceConsistentCasingInFileNames: true`, `outDir: "dist"`
   - add `rootDir: "src"`; `include: ["src"]`
1.3. Rename `src/index.ts` → `src/index.tsx`.

## 2. Add Hono and serve `/`
2.1. `npm install hono @hono/node-server`
2.2. `npm install -D tsx`
2.3. Write `src/index.tsx`:
   - create a `Hono` app
   - `app.get('/', (c) => c.text('Welcome to AgentClinic'))`. This is a temporary plain-text
     response; task group 4 replaces it with the home page.
   - `serve({ fetch: app.fetch, port: 3000 })` from `@hono/node-server`, logging
     `AgentClinic running at http://localhost:3000` once it is listening

## 3. Scripts and README
3.1. Set the npm scripts: `dev` (`tsx watch src/index.tsx`), `build` (`tsc`), `start` (`node dist/index.js`).
3.2. Update `README.md` with how to run the app (`npm install`, `npm run dev`, then open http://localhost:3000).
3.3. Quick check: run `npm run dev`, and `curl http://localhost:3000/` returns the plain text.

## 4. Minimal AgentClinic home page
4.1. In `src/index.tsx`, replace the `/` handler with `c.html(...)`, rendering a complete HTML
     document with Hono JSX:
   - `<!DOCTYPE html>` prepended (e.g. via `raw` from `hono/html`, because JSX cannot emit a doctype)
   - `<html lang="en">` with a `<head>` that holds `<meta charset="utf-8">`,
     `<meta name="viewport" content="width=device-width, initial-scale=1">`, and `<title>AgentClinic</title>`
   - a `<body>` with `<h1>Welcome to AgentClinic</h1>` and one playful tagline in a `<p>`
4.2. Keep the markup inline in `src/index.tsx`: no components, CSS, or static files (those are Phase 2).
4.3. Work through [validation.md](./validation.md) and tick every item.
