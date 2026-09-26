# Frontend — React + Vite

Organización por features. Alias `@/` apunta a `src/`.

```
frontend/
├── src/
│   ├── main.tsx
│   ├── app/                 composición de la app
│   │   ├── App.tsx
│   │   ├── router.tsx
│   │   ├── layouts/
│   │   └── providers/       QueryClient y otros providers globales
│   ├── pages/               una por ruta; solo componen features, sin lógica
│   ├── features/<feature>/  módulo vertical autocontenido
│   │   ├── api/             llamadas HTTP + query keys
│   │   ├── hooks/           useQuery / useMutation
│   │   ├── components/
│   │   ├── types.ts
│   │   └── index.ts         API pública de la feature
│   ├── shared/              reutilizable y agnóstico de negocio
│   │   ├── api/             http-client
│   │   ├── components/ui/
│   │   ├── config/
│   │   ├── hooks/
│   │   └── lib/
│   └── styles/
└── tests/
    ├── setup.ts
    ├── utils/               render con providers
    ├── unit/                componentes y utilidades aisladas (Vitest)
    ├── integration/         features completas con fetch mockeado (Vitest)
    └── e2e/                 flujos reales en navegador contra el backend (Playwright)
        ├── support/         datos de prueba y helpers
        └── <flujo>/*.spec.ts
```

`playwright.config.ts` levanta su propio backend (`:3100`) y frontend (`:5174`), separados de los puertos de desarrollo; si ya están corriendo en esos puertos, los reutiliza.

## Convenciones clave

- `pages` importa de `features/<x>` solo vía su `index.ts`. Una feature no importa de otra feature; lo compartido va a `shared/`.
- Estado de servidor con React Query (nunca `useEffect` + `fetch`). Estado local con `useState`.
- Todo acceso HTTP pasa por `shared/api/http-client.ts`.
- Los tipos del frontend reflejan los DTOs de `@app/application` (contrato con el backend).

## Comandos

```bash
npm run dev:front
npm run test:front
npm run test:e2e            # headless
# desde frontend/: test:e2e:ui (interactivo), test:e2e:headed (navegador visible; SLOW_MO=500 para ralentizar), test:e2e:debug (inspector paso a paso)
npm run build:front
```
