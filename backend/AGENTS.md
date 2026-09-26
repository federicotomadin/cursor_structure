# Backend — NestJS + Clean Architecture

Each layer is an independent npm package with its own `tsconfig.json` (TypeScript project references).
This makes dependencies between layers explicit, like the projects in a .NET solution.

```
backend/
├── src/
│   ├── domain/            @app/domain          (no dependencies)
│   │   ├── entities/
│   │   ├── value-objects/
│   │   ├── repositories/  interfaces, not implementations
│   │   └── errors/
│   ├── application/       @app/application     -> domain
│   │   ├── common/        application errors, DI tokens
│   │   ├── ports/         interfaces for external services
│   │   └── <feature>/
│   │       ├── dtos/
│   │       └── use-cases/
│   ├── infrastructure/    @app/infrastructure  -> application, domain
│   │   ├── config/
│   │   ├── persistence/   repository implementations
│   │   ├── services/      port implementations
│   │   └── infrastructure.module.ts
│   └── presentation/      @app/presentation    -> all
│       ├── main.ts
│       ├── app.module.ts
│       ├── setup-app.ts   prefix, pipes and filters shared with the tests
│       ├── common/        filters, guards, interceptors
│       └── modules/<feature>/
│           ├── <feature>.module.ts      use case wiring with useFactory
│           ├── <feature>.controller.ts
│           └── requests/                HTTP DTOs with class-validator
└── tests/
    ├── unit/              @app/unit-tests        domain + application, with fakes
    └── integration/       @app/integration-tests HTTP with Supertest
```

## Key conventions

- `domain` and `application` are plain TypeScript: **no `@nestjs/*` imports**.
- Use cases receive dependencies through the constructor (interfaces). Nest instantiates them in `presentation` with `useFactory` + tokens (`USER_REPOSITORY`, etc.).
- Each layer exposes its public API from its `index.ts`. Always import `@app/<layer>`, never another layer's internal paths.
- Error-to-HTTP mapping is centralized in `presentation/common/filters/error.filter.ts`.
- Tests import source code via `paths`/`moduleNameMapper`, not `dist`.

## Commands

```bash
npm run build:back          # tsc -b backend (respects layer order)
npm run dev:back
npm run test:unit
npm run test:integration
```
