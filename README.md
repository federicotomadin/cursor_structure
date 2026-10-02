# cursor_structure

Fullstack monorepo template ready for working with Cursor: React on the frontend, NestJS with Clean Architecture on the backend, and the agent setup (`AGENTS.md`, rules, skills and MCPs) included.

## Getting started

```bash
nvm use            # Node 22+
npm install
npm run dev:back   # http://localhost:3000/api
npm run dev:front  # http://localhost:5173
```

## Structure

```
.
├── AGENTS.md                  agent instructions (root)
├── .cursor/
│   ├── mcp.json               context7, playwright, github
│   ├── rules/                 conventions applied by glob
│   ├── skills/                workflows: backend feature, frontend feature, commits
│   └── commands/              slash commands: /review, /commit, /pr, /verify
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
    │   └── presentation/      @app/presentation  (NestJS app)
    └── tests/
        ├── unit/              @app/unit-tests
        └── integration/       @app/integration-tests
```

Each backend layer and each test project is a workspace package with its own `package.json` and `tsconfig.json`, in the style of the projects in a .NET solution. The dependency rule between layers is enforced by ESLint (`npm run lint`).

## GitHub MCP

Requires the `GITHUB_PERSONAL_ACCESS_TOKEN` environment variable to be available to Cursor.

## Commands

| Command             | What it does                               |
| ------------------- | ------------------------------------------ |
| `npm run build`     | Builds backend and frontend                |
| `npm run typecheck` | Type-checks every project                  |
| `npm run lint`      | ESLint (includes the layer rule)           |
| `npm test`          | Unit + integration + frontend              |
| `npm run test:e2e`  | Playwright E2E (starts backend + frontend) |

In Cursor chat, type `/` to run agent shortcuts: `/review`, `/commit`, `/pr`, `/verify`.
