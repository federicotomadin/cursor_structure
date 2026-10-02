Run this repo's definition of done and fix anything that fails.

From the repo root:

```bash
npm run typecheck && npm run lint && npm test
```

If the user mentioned E2E, UI, or Playwright, also run `npm run test:e2e`.

If a command fails:

1. Read the error.
2. Fix the smallest change that makes it pass.
3. Re-run the failing command, then the full gate again.
4. Do not finish while typecheck, lint, or tests are red.

When green, report which commands ran and the test counts. Do not commit.
