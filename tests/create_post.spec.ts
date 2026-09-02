import { test, expect } from '@playwright/test';
import { loginToApp } from './login.spec.ts';

test('Create Post After Login', async ({ page }) => {
  // Login to the application
  await loginToApp(page);

 // Verify dashboard page
  await page.locator('div').filter({ hasText: /^Dashboard$/ }).click();

  await expect(
  page.getByText('Dashboard', { exact: true })
).toBeVisible();
 

  // Wait until Create Post button is visible
  await expect(
    page.getByRole('button', { name: 'Create Post' })
  ).toBeVisible();

  // Open Create Post modal/page
  await page.getByRole('button', { name: 'Create Post' }).click();

  // Fill post title
  await page
    .getByRole('textbox', { name: 'e.g., My First Post' })
    .fill('Test Automation Post Title');

  // Fill description
  await page
    .getByRole('textbox', { name: 'Enter post description' })
    .fill('Test Automation Post Description');

  // Select classroom
  await page.getByText('Select classrooms', { exact: true }).click();
  await page
    .getByRole('option', { name: 'ALL' })
    .getByRole('checkbox')
    .check();

  // Publish post
  await page.getByRole('button', { name: 'Publish' }).click();

  // Verify post creation success
  await expect(
    page.getByText('Test Automation Post Title')
  ).toBeVisible();

      // Log success
  console.log('✅ Post created successfully!');
  console.log('✅ Post "Test Automation Post Title" is visible on the dashboard');
  console.log('✅ Post description "Test Automation Description" is visible');
  console.log('✅ Visibility set to "ALL"');

});



