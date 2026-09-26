# Backend — NestJS + Clean Architecture

Cada capa es un paquete npm independiente con su propio `tsconfig.json` (TypeScript project references).
Eso hace explícitas las dependencias entre capas, como los proyectos de una solución .NET.

```
backend/
├── src/
│   ├── domain/            @app/domain          (sin dependencias)
│   │   ├── entities/
│   │   ├── value-objects/
│   │   ├── repositories/  interfaces, no implementaciones
│   │   └── errors/
│   ├── application/       @app/application     -> domain
│   │   ├── common/        errores de aplicación, tokens de DI
│   │   ├── ports/         interfaces de servicios externos
│   │   └── <feature>/
│   │       ├── dtos/
│   │       └── use-cases/
│   ├── infrastructure/    @app/infrastructure  -> application, domain
│   │   ├── config/
│   │   ├── persistence/   implementaciones de repositorios
│   │   ├── services/      implementaciones de puertos
│   │   └── infrastructure.module.ts
│   └── presentation/      @app/presentation    -> todas
│       ├── main.ts
│       ├── app.module.ts
│       ├── setup-app.ts   prefijo, pipes y filtros compartidos con los tests
│       ├── common/        filtros, guards, interceptors
│       └── modules/<feature>/
│           ├── <feature>.module.ts      wiring de casos de uso con useFactory
│           ├── <feature>.controller.ts
│           └── requests/                DTOs HTTP con class-validator
└── tests/
    ├── unit/              @app/unit-tests        domain + application, con fakes
    └── integration/       @app/integration-tests HTTP con Supertest
```

## Convenciones clave

- `domain` y `application` son TypeScript puro: **sin imports de `@nestjs/*`**.
- Los casos de uso reciben dependencias por constructor (interfaces). Nest los instancia en `presentation` con `useFactory` + tokens (`USER_REPOSITORY`, etc.).
- Cada capa expone su API pública desde su `index.ts`. Importar siempre `@app/<capa>`, nunca rutas internas de otra capa.
- Mapeo de errores a HTTP centralizado en `presentation/common/filters/error.filter.ts`.
- Los tests importan el código fuente vía `paths`/`moduleNameMapper`, no el `dist`.

## Comandos

```bash
npm run build:back          # tsc -b backend (respeta el orden de capas)
npm run dev:back
npm run test:unit
npm run test:integration
```
