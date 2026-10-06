# Phase 1 — Hello Hono: Validation

The branch `phase-1-hello-hono` can be merged when **every** item below is checked.
All checks are manual; there is no test framework in this phase.

## Setup
- [ ] `npm install` finishes with no errors on a clean checkout.
- [ ] `package.json` has `"type": "module"`, lists `hono` and `@hono/node-server` in `dependencies`,
      and lists `tsx` and `typescript` in `devDependencies`.
- [ ] `tsconfig.json` uses `ES2022` / `NodeNext` with `jsxImportSource: "hono/jsx"`, and `strict` is still `true`.
- [ ] `src/index.ts` no longer exists, and `src/index.tsx` is the only source file.

## Dev server
- [ ] `npm run dev` starts and logs `AgentClinic running at http://localhost:3000`.
- [ ] Editing the tagline in `src/index.tsx` triggers an automatic restart (watch mode works).
- [ ] An unknown path (e.g. `/nope`) returns `404`. This is Hono's default; no custom page is needed.

## Home page
- [ ] `curl -i http://localhost:3000/` returns `200` with `Content-Type: text/html; charset=UTF-8`.
- [ ] The response body starts with `<!DOCTYPE html>` and contains `<html lang="en">`,
      `<meta charset="utf-8">`, the viewport meta tag, and `<title>AgentClinic</title>`.
- [ ] The body contains `<h1>Welcome to AgentClinic</h1>` and one playful tagline.
- [ ] In a browser, the tab title reads "AgentClinic", and the heading and tagline render with no
      console errors.
- [ ] No CSS, static files, or `components/`/`pages/` folders were added (those wait for Phase 2).

## Build & production start
- [ ] `npm run build` exits with code 0 and no type errors.
- [ ] `dist/index.js` exists and is ES module output (`import`, not `require`).
- [ ] `npm start` serves the same home page on `/` as the dev server.

## Traceability & hygiene
- [ ] Every task in [plan.md](./plan.md) is done or explicitly marked as deferred.
- [ ] `README.md` explains how to run the app.
- [ ] No files outside the scope in [requirements.md](./requirements.md) were changed.
- [ ] `dist/` is not committed. This needs a decision, because `.gitignore` doesn't cover it yet
      (see the Open points in requirements.md).
