import { test, expect } from '@playwright/test';
import { loginToApp } from './login.spec.js';

test('Verify subject case insensitivity', async ({ page }) => {

    // Login to the application
    await loginToApp(page);

    // Verify dashboard page
    await page.locator('div').filter({ hasText: /^Dashboard$/ }).click();

    await expect(page.getByText('Dashboard', { exact: true })).toBeVisible();

    // Navigate to Subject Management
    await page.locator('div').filter({ hasText: /^Master Data$/ }).click();
    await page.getByText('Subject Management').click();
   
    await page.getByRole('button', { name: 'New Subject' }).click();
    await page.getByRole('textbox', { name: 'Enter subject name' }).fill('JAVASCRIPT');
    await page.getByLabel('Add Subject').locator('span').filter({ hasText: 'Active' }).click();
    await page.getByRole('option', { name: 'Active', exact: true }).click();
    await page.getByRole('textbox', { name: 'Enter description' }).fill('Already existing subject with different case');
    await page.getByRole('button', { name: 'Save' }).click();
    
    const toast = page.getByRole('alert');
    await expect(toast.getByText("Subject with name 'JAVASCRIPT' already exists in your organization.")).toBeVisible();
    await expect(toast.getByText('Error', { exact: true })).toBeVisible();

     // Close error message
    await page.getByRole('alert').getByRole('button').click();

    // Wait for subject management page to load after subject creation
    await page.waitForURL('**/subject-management');
    await expect(page).toHaveURL(/subject-management/);

})
