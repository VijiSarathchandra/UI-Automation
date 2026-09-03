import { test, expect } from '@playwright/test';
import { loginToApp } from './login.spec';

test('edit post description only', async ({ page }) => {

  await loginToApp(page);

  await page.locator('div').filter({ hasText: /^Dashboard$/ }).click();
  await page.locator('.p-0.p-button').first().click();
  await page.getByRole('menuitem', { name: 'Edit' }).getByLabel('Edit').click();

  await page.getByRole('textbox', { name: 'Enter post description' }).click();
  await page.getByRole('textbox', { name: 'Enter post description' }).fill('editing description only 2');

  await page.getByRole('button', { name: 'Update' }).click();
  await page.getByText('Updated successfully').click();
  await page.getByText('Success', { exact: true }).click();
  await page.locator('svg').first().click();
  await page.getByRole('alert').getByRole('button').click();

    // Wait for dashboard page to load after post update
    await page.waitForURL('**/dashboard');
    await expect(page).toHaveURL(/dashboard/);
});