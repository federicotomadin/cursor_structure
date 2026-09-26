# AGENTS.md

Guía para agentes de IA (Cursor, Claude, Codex) que trabajan en este repo.
Hay `AGENTS.md` específicos en [`frontend/`](frontend/AGENTS.md) y [`backend/`](backend/AGENTS.md).

## Qué es

Monorepo TypeScript con npm workspaces:

| Workspace                    | Paquete                  | Rol                                                          |
| ---------------------------- | ------------------------ | ------------------------------------------------------------ |
| `frontend/`                  | `@app/frontend`          | SPA React 19 + Vite + React Query + React Router             |
| `backend/src/domain`         | `@app/domain`            | Entidades, value objects, contratos de repositorio           |
| `backend/src/application`    | `@app/application`       | Casos de uso, puertos, DTOs, errores de aplicación           |
| `backend/src/infrastructure` | `@app/infrastructure`    | Implementaciones de repositorios, servicios externos, config |
| `backend/src/presentation`   | `@app/presentation`      | App NestJS: controllers, requests, filtros, wiring de DI     |
| `backend/tests/unit`         | `@app/unit-tests`        | Tests unitarios de domain + application (Jest)               |
| `backend/tests/integration`  | `@app/integration-tests` | Tests HTTP contra la app Nest (Jest + Supertest)             |

## Comandos (desde la raíz)

```bash
npm install
npm run dev:back          # API en http://localhost:3000/api
npm run dev:front         # SPA en http://localhost:5173 (proxy /api -> :3000)
npm run build             # backend (tsc -b) + frontend (vite build)
npm run typecheck
npm run lint
npm test                  # unit + integration + frontend (rápidos, sin navegador)
npm run test:unit | test:integration | test:front
npm run test:e2e          # Playwright: levanta back + front y prueba en Chromium
```

## Reglas no negociables

1. **Regla de dependencias del backend**: `presentation -> infrastructure -> application -> domain`. Nunca al revés. ESLint lo valida.
2. Toda lógica de negocio vive en `domain` o `application`, nunca en controllers ni componentes React.
3. Todo cambio de comportamiento viene con tests en el proyecto correspondiente.
4. Antes de terminar una tarea: `npm run typecheck && npm run lint && npm test` en verde.
5. No commitear secretos. Variables de entorno en `.env` (ver `.env.example` en cada app).

## Dónde está cada cosa para Cursor

- `.cursor/rules/` — convenciones que se aplican automáticamente según los archivos que se tocan.
- `.cursor/skills/` — flujos paso a paso (crear feature de backend, de frontend, commits).
- `.cursor/mcp.json` — servidores MCP del proyecto (docs, browser, GitHub).
