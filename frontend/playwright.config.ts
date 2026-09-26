import { defineConfig, devices } from '@playwright/test';

const isCI = Boolean(process.env.CI);

// Dedicated ports so E2E never reuses an unrelated dev server on 3000/5173.
const API_PORT = 3100;
const WEB_PORT = 5174;
const API_URL = `http://localhost:${API_PORT}`;
const WEB_URL = `http://localhost:${WEB_PORT}`;

export default defineConfig({
  testDir: './tests/e2e',
  testMatch: '**/*.spec.ts',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  reporter: isCI
    ? [['html', { open: 'never' }], ['github']]
    : [['html', { open: 'never' }], ['list']],
  use: {
    baseURL: WEB_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    launchOptions: { slowMo: Number(process.env.SLOW_MO ?? 0) },
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: [
    {
      command: 'npm run build:back && npm run start -w @app/presentation',
      cwd: '..',
      url: `${API_URL}/api/health`,
      env: { PORT: String(API_PORT) },
      reuseExistingServer: !isCI,
      timeout: 120_000,
    },
    {
      command: `npm run dev -- --port ${WEB_PORT} --strictPort`,
      url: WEB_URL,
      env: { API_PROXY_TARGET: API_URL },
      reuseExistingServer: !isCI,
    },
  ],
});
