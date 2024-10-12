import { test, expect } from '@playwright/test';

test.describe('Wb Ads Panel', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });

  test('should have metadata', async ({ page }) => {
    await expect(page).toHaveTitle(/Test Task - WB Ads Panel/);
  });

  test('should have heading and form', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'WB Advertisement Statistics' })
    ).toBeVisible();

    await expect(page.getByRole('form')).toBeVisible();

    await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();

    await expect(page.getByText('No WB ads data fetched')).toBeVisible();
  });
});
