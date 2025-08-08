import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Speech-to-Text Component/);
});

test('displays vite + react heading', async ({ page }) => {
  await page.goto('/');

  // Expect the main heading to be visible
  await expect(page.getByRole('heading', { name: 'Vite + React' })).toBeVisible();
});

test('count button works', async ({ page }) => {
  await page.goto('/');

  // Click the count button
  const button = page.getByRole('button', { name: /count is \d+/ });
  await expect(button).toBeVisible();
  
  // Initial count should be 0
  await expect(button).toHaveText('count is 0');
  
  // Click the button and verify count increases
  await button.click();
  await expect(button).toHaveText('count is 1');
});