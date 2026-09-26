# AGENTS.md

Guide for AI agents (Cursor, Claude, Codex) working in this repo.
There are app-specific `AGENTS.md` files in [`frontend/`](frontend/AGENTS.md) and [`backend/`](backend/AGENTS.md).

## What this is

TypeScript monorepo with npm workspaces:

| Workspace                    | Package                  | Role                                                  |
| ---------------------------- | ------------------------ | ----------------------------------------------------- |
| `frontend/`                  | `@app/frontend`          | React 19 SPA + Vite + React Query + React Router      |
| `backend/src/domain`         | `@app/domain`            | Entities, value objects, repository contracts         |
| `backend/src/application`    | `@app/application`       | Use cases, ports, DTOs, application errors            |
| `backend/src/infrastructure` | `@app/infrastructure`    | Repository implementations, external services, config |
| `backend/src/presentation`   | `@app/presentation`      | NestJS app: controllers, requests, filters, DI wiring |
| `backend/tests/unit`         | `@app/unit-tests`        | Unit tests for domain + application (Jest)            |
| `backend/tests/integration`  | `@app/integration-tests` | HTTP tests against the Nest app (Jest + Supertest)    |

## Commands (from the root)

```bash
npm install
npm run dev:back          # API at http://localhost:3000/api
npm run dev:front         # SPA at http://localhost:5173 (proxies /api -> :3000)
npm run build             # backend (tsc -b) + frontend (vite build)
npm run typecheck
npm run lint
npm test                  # unit + integration + frontend (fast, no browser)
npm run test:unit | test:integration | test:front
npm run test:e2e          # Playwright: starts backend + frontend and tests in Chromium
```

## Non-negotiable rules

1. **Backend dependency rule**: `presentation -> infrastructure -> application -> domain`. Never the other way around. ESLint enforces it.
2. All business logic lives in `domain` or `application`, never in controllers or React components.
3. Every behavior change ships with tests in the matching project.
4. Before finishing a task: `npm run typecheck && npm run lint && npm test` must be green.
5. Never commit secrets. Environment variables go in `.env` (see `.env.example` in each app).

## Where Cursor config lives

- `.cursor/rules/` — conventions applied automatically based on the files being edited.
- `.cursor/skills/` — step-by-step workflows (backend feature, frontend feature, commits).
- `.cursor/mcp.json` — project MCP servers (docs, browser, GitHub).
