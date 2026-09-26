# cursor_structure

Plantilla de monorepo fullstack preparada para trabajar con Cursor: React en el frontend, NestJS con Clean Architecture en el backend, y la configuración de agentes (`AGENTS.md`, rules, skills y MCPs) incluida.

## Arranque

```bash
nvm use            # Node 22+
npm install
npm run dev:back   # http://localhost:3000/api
npm run dev:front  # http://localhost:5173
```

## Estructura

```
.
├── AGENTS.md                  instrucciones para agentes (raíz)
├── .cursor/
│   ├── mcp.json               context7, playwright, github
│   ├── rules/                 convenciones aplicadas por glob
│   └── skills/                flujos: backend feature, frontend feature, commits
├── frontend/                  @app/frontend  (React + Vite)
│   ├── AGENTS.md
│   ├── src/{app,pages,features,shared,styles}
│   └── tests/{unit,integration,e2e}
└── backend/
    ├── AGENTS.md
    ├── src/
    │   ├── domain/            @app/domain
    │   ├── application/       @app/application
    │   ├── infrastructure/    @app/infrastructure
    │   └── presentation/      @app/presentation  (app NestJS)
    └── tests/
        ├── unit/              @app/unit-tests
        └── integration/       @app/integration-tests
```

Cada capa del backend y cada proyecto de tests es un paquete del workspace con su propio `package.json` y `tsconfig.json`, al estilo de los proyectos de una solución .NET. La regla de dependencias entre capas la valida ESLint (`npm run lint`).

## MCP de GitHub

Requiere la variable de entorno `GITHUB_PERSONAL_ACCESS_TOKEN` disponible para Cursor.

## Comandos

| Comando             | Qué hace                                |
| ------------------- | --------------------------------------- |
| `npm run build`     | Compila backend y frontend              |
| `npm run typecheck` | Chequeo de tipos de todos los proyectos |
| `npm run lint`      | ESLint (incluye regla de capas)         |
| `npm test`          | Unit + integration + frontend           |
| `npm run test:e2e`  | E2E con Playwright (levanta back+front) |
