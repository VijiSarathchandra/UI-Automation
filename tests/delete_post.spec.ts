import { test, expect } from '@playwright/test';
import { loginToApp } from './login.spec';

test('Delete post', async ({ page }) => {

  // Login
  await loginToApp(page);

  // Verify dashboard page
  await page.locator('div').filter({ hasText: /^Dashboard$/ }).click();

  await expect(
    page.getByText('Dashboard', { exact: true })
  ).toBeVisible();

  await page.locator('.p-0.p-button').first().click();
  await page.getByRole('menuitem', { name: 'Delete' }).getByLabel('Delete').click();
  await page.getByRole('button', { name: 'Yes, Delete' }).click();

  // Verify successful delete
  const toast = page.getByRole('alert');
  await expect(toast.getByText('Success', { exact: true })).toBeVisible();
  await expect(toast.getByText('Post deleted successfully', { exact: true })).toBeVisible();

  // Close success message
  await page.getByRole('alert').getByRole('button').click();

  // Wait for dashboard page to load after post creation
  await page.waitForURL('**/dashboard');
  await expect(page).toHaveURL(/dashboard/);

});