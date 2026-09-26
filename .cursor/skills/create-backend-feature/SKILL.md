---
name: create-backend-feature
description: Creates a new feature or endpoint in the NestJS backend across the four layers (domain, application, infrastructure, presentation) with its unit and integration tests. Use when asked to add an entity, a use case, an endpoint or a REST resource to the backend.
---

# Create a backend feature

Use the `users` feature as the living reference: copy its shape, do not invent a new one.

## Checklist

```
- [ ] 1. Domain
- [ ] 2. Application
- [ ] 3. Infrastructure
- [ ] 4. Presentation
- [ ] 5. Unit tests
- [ ] 6. Integration tests
- [ ] 7. Verification
```

**1. Domain** (`backend/src/domain`)

- `entities/<entity>.ts` with `create()` (validates invariants, throws `InvalidArgumentError`) and `restore()`.
- Value objects in `value-objects/` when a field has its own rules.
- `repositories/<entity>.repository.ts` with the interface.
- Export everything from `index.ts`.

**2. Application** (`backend/src/application`)

- `<feature>/dtos/<entity>.dto.ts`: output DTO, input type and `to<Entity>Dto()`.
- `<feature>/use-cases/<verb>-<entity>.use-case.ts`: one class with `execute()`, dependencies via constructor.
- New token in `common/tokens.ts` for every new repository or port.
- Export from `index.ts`.

**3. Infrastructure** (`backend/src/infrastructure`)

- Implementation in `persistence/<driver>/<driver>-<entity>.repository.ts`.
- Register `{ provide: TOKEN, useClass: Impl }` in `infrastructure.module.ts` and add it to `exports`.

**4. Presentation** (`backend/src/presentation/modules/<feature>/`)

- `requests/*.request.ts` with `class-validator`.
- Thin `<feature>.controller.ts`, one use case per handler.
- `<feature>.module.ts` with `useFactory` + `inject` per use case.
- Register the module in `app.module.ts`.

**5. Unit tests** (`backend/tests/unit`)

- `domain/entities/<entity>.spec.ts`: valid and invalid invariants.
- `application/<feature>/<use-case>.spec.ts`: happy path and every error. Add fakes to `fakes/index.ts`.

**6. Integration tests** (`backend/tests/integration/<feature>/<feature>.int-spec.ts`)

- Use `createTestApp()`. Cover 2xx, 400, 404 and 409 where applicable.

**7. Verification**

```bash
npm run build:back && npm run test:unit && npm run test:integration && npm run lint
```

If anything fails, fix it and run again. Do not finish with errors.

At the end, if a frontend consumes the endpoint, point out that the `create-frontend-feature` skill applies.
