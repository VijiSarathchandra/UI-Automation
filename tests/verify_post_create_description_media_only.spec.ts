import { test, expect } from '@playwright/test';
import { loginToApp } from './login.spec';

test('Verify post creation - Description and Media file only', async ({ page }) => {

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

    // Fill description
    await page
        .getByRole('textbox', { name: 'Enter post description' })
        .fill('Verify post creation - Description and Media file only');

    // Select classroom
    await page.getByText('Select classrooms', { exact: true }).click();

    await page
        .getByRole('option', { name: 'ALL' })
        .getByRole('checkbox')
        .check();

    // Upload image
    await page
        .locator('input[type="file"]')
        .setInputFiles('test-data/post_image.png');

    // Publish
    await page.getByRole('button', { name: 'Publish' }).click();

    // Verify successful creation
    await expect(page.getByText('Success')).toBeVisible();
    await expect(page.getByText('Created')).toBeVisible();

    // Close success message
    await page.getByRole('alert').getByRole('button').click();

    // Wait for dashboard page to load after post creation
    await page.waitForURL('**/dashboard');
    await expect(page).toHaveURL(/dashboard/);

});



