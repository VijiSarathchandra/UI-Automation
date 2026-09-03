import { expect, test } from "@playwright/test";
import { loginToApp } from "./login.spec";

test('like a post and comment then delete comment', async ({ page }) => {

  await loginToApp(page);

  await page.locator('div').filter({ hasText: /^Dashboard$/ }).click();
  await page.getByRole('button', { name: 'Like post' }).first().click();

  await page.getByRole('textbox', { name: 'Write a comment' }).first().click();
  await page.getByRole('textbox', { name: 'Write a comment' }).first().fill('Commenting on this post for testing purposes');
  await page.getByRole('img', { name: 'Send Icon' }).first().click();

  await page.getByRole('button', { name: 'Delete Comment?' }).click();
  await page.getByRole('button', { name: 'Yes, Delete' }).click();

   const toast = page.getByRole('alert');
   await expect(toast.getByText('Success', { exact: true })).toBeVisible();
   await expect(toast.getByText('Comment deleted successfully', { exact: true })).toBeVisible();

   await page.getByRole('button', { name: 'Like post' }).first().click();

    // Close success message
    await page.getByRole('alert').getByRole('button').click();

    // Wait for dashboard page to load after post update
    await page.waitForURL('**/dashboard');
    await expect(page).toHaveURL(/dashboard/);

});