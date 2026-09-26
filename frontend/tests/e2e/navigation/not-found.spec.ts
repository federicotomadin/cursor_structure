import { expect, test } from '@playwright/test';

test('unknown routes show the not found page with a way back home', async ({ page }) => {
  await page.goto('/does-not-exist');

  await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible();
  await page.getByRole('link', { name: 'Back to home' }).click();

  await expect(page.getByRole('heading', { name: 'Create user' })).toBeVisible();
});
