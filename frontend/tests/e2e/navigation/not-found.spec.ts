import { expect, test } from '@playwright/test';

test('unknown routes show the not found page with a way back home', async ({ page }) => {
  await page.goto('/does-not-exist');

  await expect(page.getByRole('heading', { name: 'Página no encontrada' })).toBeVisible();
  await page.getByRole('link', { name: 'Volver al inicio' }).click();

  await expect(page.getByRole('heading', { name: 'Crear usuario' })).toBeVisible();
});
