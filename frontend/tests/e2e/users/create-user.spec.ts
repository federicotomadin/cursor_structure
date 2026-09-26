import { expect, test } from '@playwright/test';
import { uniqueEmail } from '../support/test-data';

test.describe('Create user', () => {
  test('creates a user and shows its detail page', async ({ page }) => {
    const email = uniqueEmail();
    await page.goto('/');

    await page.getByLabel('Nombre').fill('Ada Lovelace');
    await page.getByLabel('Email').fill(email);
    await page.getByRole('button', { name: 'Crear' }).click();

    await expect(page).toHaveURL(/\/users\/[0-9a-f-]{36}$/);
    await expect(page.getByRole('heading', { name: 'Ada Lovelace' })).toBeVisible();
    await expect(page.getByText(email)).toBeVisible();
  });

  test('shows an error when the email is already registered', async ({ page, request }) => {
    const email = uniqueEmail();
    const seeded = await request.post('/api/users', { data: { name: 'Existing', email } });
    expect(seeded.ok()).toBe(true);
    await page.goto('/');

    await page.getByLabel('Nombre').fill('Ada');
    await page.getByLabel('Email').fill(email);
    await page.getByRole('button', { name: 'Crear' }).click();

    await expect(page.getByRole('alert')).toContainText('already exists');
    await expect(page).toHaveURL('/');
  });
});
