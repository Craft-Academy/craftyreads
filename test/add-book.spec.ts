import { test, expect } from '@playwright/test';

test.describe('Feature: Adding a book', () => {
  test('Example: User can add a book', async ({ page }) => {
    await page.goto('http://localhost:3000');
    const rand = Math.floor(Math.random() * 1000000);

    await page.getByLabel(/title/i).fill(`Clean Code ${rand}`);
    await page.getByText(/add book/i).click();

    await expect(page.getByText(/book added/i)).toBeVisible();
  });

  test('Example: User cannot add a book that already exists', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000');
    await page.getByLabel(/title/i).fill('The Pragmatic Programmer');
    await page.getByText(/add book/i).click();

    await page.getByLabel(/title/i).fill('The Pragmatic Programmer');
    await page.getByText(/add book/i).click();

    await expect(
      page.getByText(/the book the pragmatic programmer already exists/i),
    ).toBeVisible();
  });
});
