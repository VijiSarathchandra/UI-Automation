import { test, expect } from '@playwright/test';
import { loginToApp } from './login.spec';

test('like a post, comment, delete comment, then unlike the post', async ({ page }) => {

  await loginToApp(page);

  await page.locator('div').filter({ hasText: /^Dashboard$/ }).click();
  await page.getByText('Recent Activities').waitFor({ state: 'visible' });

  await page.getByRole('button', { name: 'Like post' }).first().click();

  await page.getByRole('textbox', { name: 'Write a comment' }).first().click();
  await page.getByRole('textbox', { name: 'Write a comment' }).first().fill('Commenting on this post for testing purposes');
  await page.getByRole('img', { name: 'Send Icon' }).first().click();

  await page.getByRole('button', { name: 'Delete Comment?' }).click();
  await page.getByRole('button', { name: 'Yes, Delete' }).click();
  await page.getByText('Success', { exact: true }).click();
  await page.getByText('Comment deleted successfully').click();
  await page.getByRole('alert').filter({ hasText: 'Comment deleted successfully' }).getByRole('button').click();

});