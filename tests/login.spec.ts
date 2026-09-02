import { test, expect } from '@playwright/test';

// Helper function to login
export async function loginToApp(page: any) {
  // Navigate to the login page
  await page.goto('https://app.qa.classveew.com/login');

  // Verify the page loaded with the login form
  await expect(page).toHaveTitle('Classveew');
  await expect(page.getByRole('heading', { name: 'Welcome Back' })).toBeVisible();

  await page.getByRole('textbox', { name: 'Enter your email or ClassVeew' })
    .fill('vijini@sanlabz.com');

  // Fill in the password field
  await page.getByRole('textbox', { name: 'Enter your password' })
    .fill('1qaz2WSX@');

  // Click the Sign In button
  await page.getByRole('button', { name: 'Sign In' }).click();

  // Wait for navigation and verify successful login
  await page.waitForURL('**/home');
  await expect(page).toHaveURL(/home/);

}

