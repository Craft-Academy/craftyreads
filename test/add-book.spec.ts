import { test, expect } from '@playwright/test';

test.describe('Feature: Adding a book', () => {
  test('Example: User can add a book', async ({ page }) => {
    await page.goto('http://localhost:3000');

    await page.getByLabel(/title/i).fill('Clean Code');
    await page.getByText(/add book/i).click();

    await expect(page.getByText(/book added/i)).toBeVisible();
  });
});
