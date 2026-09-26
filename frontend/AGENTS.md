# Frontend — React + Vite

Feature-based organization. The `@/` alias points to `src/`.

```
frontend/
├── src/
│   ├── main.tsx
│   ├── app/                 app composition
│   │   ├── App.tsx
│   │   ├── router.tsx
│   │   ├── layouts/
│   │   └── providers/       QueryClient and other global providers
│   ├── pages/               one per route; only compose features, no logic
│   ├── features/<feature>/  self-contained vertical module
│   │   ├── api/             HTTP calls + query keys
│   │   ├── hooks/           useQuery / useMutation
│   │   ├── components/
│   │   ├── types.ts
│   │   └── index.ts         public API of the feature
│   ├── shared/              reusable, business-agnostic code
│   │   ├── api/             http-client
│   │   ├── components/ui/
│   │   ├── config/
│   │   ├── hooks/
│   │   └── lib/
│   └── styles/
└── tests/
    ├── setup.ts
    ├── utils/               render with providers
    ├── unit/                isolated components and utilities (Vitest)
    ├── integration/         full features with mocked fetch (Vitest)
    └── e2e/                 real browser flows against the backend (Playwright)
        ├── support/         test data and helpers
        └── <flow>/*.spec.ts
```

`playwright.config.ts` starts its own backend (`:3100`) and frontend (`:5174`), separate from the dev ports; if something is already running on those ports, it reuses it.

## Key conventions

- `pages` import from `features/<x>` only through its `index.ts`. A feature never imports from another feature; shared code goes to `shared/`.
- Server state with React Query (never `useEffect` + `fetch`). Local state with `useState`.
- All HTTP access goes through `shared/api/http-client.ts`.
- Frontend types mirror the DTOs in `@app/application` (the contract with the backend).

## Commands

```bash
npm run dev:front
npm run test:front
npm run test:e2e            # headless
# from frontend/: test:e2e:ui (interactive), test:e2e:headed (visible browser; SLOW_MO=500 to slow it down), test:e2e:debug (step-by-step inspector)
npm run build:front
```
