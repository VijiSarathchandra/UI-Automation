import { test, expect } from '@playwright/test';
import { loginToApp } from './login.spec';

test('Verify attempting to publish post with only spaces in title/description with no files uploaded', async ({ page }) => {

    // Login
    await loginToApp(page);

    // Verify dashboard page
    await page.locator('div').filter({ hasText: /^Dashboard$/ }).click();

    await expect(
        page.getByText('Dashboard', { exact: true })
    ).toBeVisible();

    // Wait until Create Post button is visible
    await expect(page.getByRole('button', { name: 'Create Post' })).toBeVisible();

    // Open Create Post modal/page
    await page.getByRole('button', { name: 'Create Post' }).click();

    // Fill post title with only spaces
    await page
        .getByRole('textbox', { name: 'e.g., My First Post' })
        .fill('   ');

    // Fill description with only spaces
    await page
        .getByRole('textbox', { name: 'Enter post description' })
        .fill('   ');

    // Attempt to publish without selecting classroom or uploading a file
    await page.getByRole('button', { name: 'Publish' }).click();

    // Verify validation errors are shown and post is NOT created
    await expect(page.getByText('Please provide at least a title, description, or upload a file')).toBeVisible();

    // Confirm no success toast appears
    await expect(page.getByText('Success')).not.toBeVisible();
    await expect(page.getByText('Created')).not.toBeVisible();

    // Close success message
    await page.getByRole('alert').getByRole('button').click();

    // Wait for dashboard page to load after post creation
    await page.waitForURL('**/dashboard');
    await expect(page).toHaveURL(/dashboard/);

});