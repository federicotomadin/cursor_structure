---
name: create-frontend-feature
description: Creates a new feature in the React frontend (API, React Query hooks, components, page and tests) following the project's feature-based structure. Use when asked for a screen, form, list, or to connect the frontend to a backend endpoint.
---

# Create a frontend feature

Use `frontend/src/features/users` as the reference.

## Checklist

```
- [ ] 1. Contract
- [ ] 2. API
- [ ] 3. Hooks
- [ ] 4. Components
- [ ] 5. Page and route
- [ ] 6. Tests
- [ ] 7. Verification
```

**1. Contract** — Read the DTO in `backend/src/application/<feature>/dtos/` and mirror it in `features/<feature>/types.ts`.

**2. API** — `features/<feature>/api/<feature>.api.ts`:

- Functions that use `httpClient` from `@/shared/api/http-client`.
- A `<feature>Keys` object with the query keys.

**3. Hooks** — `features/<feature>/hooks/`:

- Reads with `useQuery`, writes with `useMutation`.
- In `onSuccess`, update or invalidate the cache using the keys from step 2.

**4. Components** — `features/<feature>/components/`:

- Loading, error (`role="alert"`) and empty states.
- Reuse `@/shared/components/ui`. If something generic is missing, create it in `shared`, not in the feature.
- Export the public API from `features/<feature>/index.ts`.

**5. Page and route** — `src/pages/<Name>Page.tsx` that only composes the feature; register the route in `src/app/router.tsx`.

**6. Tests**

- `frontend/tests/unit/features/<feature>/` for presentational components.
- `frontend/tests/integration/features/<feature>/` for the full flow with `renderWithProviders` and mocked `fetch` (success and error).
- For critical user flows: `frontend/tests/e2e/<flow>/*.spec.ts` with Playwright against the real backend.

**7. Verification**

```bash
npm run typecheck -w @app/frontend && npm run test:front && npm run lint
npm run test:e2e   # when E2E specs were added or changed
```

Optional: with the Playwright MCP, start `npm run dev:back` and `npm run dev:front` and walk through the flow in the browser.
