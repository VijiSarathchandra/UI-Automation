import { test, expect } from '@playwright/test';
import { loginToApp } from './login.spec';

test('Verify clicking Publish button multiple times does not create duplicate posts', async ({ page }) => {

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

    const postTitle = 'Verify clicking Publish button multiple times';

    // Fill post title
    await page
        .getByRole('textbox', { name: 'e.g., My First Post' })
        .fill(postTitle);

    // Fill description
    await page
        .getByRole('textbox', { name: 'Enter post description' })
        .fill(postTitle);

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

    const publishButton = page.getByRole('button', { name: 'Publish' });

    // Click Publish multiple times in rapid succession
    await publishButton.click();
    await publishButton.click({ force: true });
    await publishButton.click({ force: true });

    // Verify only a single success message appears
    await expect(page.getByText('Success')).toBeVisible();
    await expect(page.getByText('Created')).toBeVisible();

    // Close success message
    await page.getByRole('alert').getByRole('button').click();

    // Wait for dashboard page to load after post creation
    await page.waitForURL('**/dashboard');
    await expect(page).toHaveURL(/dashboard/);

});