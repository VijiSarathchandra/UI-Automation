import { expect } from '@playwright/test';

// Helper function to login
export async function loginToApp(page: any) {
  // Navigate to the login page
  await page.goto('https://app.qa.classveew.com/login');

  // Wait for the page to load completely
  await page.waitForLoadState('networkidle');

  // Verify the page loaded with the login form
  await expect(page).toHaveTitle('Classveew');
  await expect(page.getByRole('heading', { name: 'Welcome Back' })).toBeVisible();

  await page.getByRole('textbox', { name: 'Enter your email or ClassVeew' })
    .fill('maheejaf+y1@gmail.com');

  // Fill in the password field
  await page.getByRole('textbox', { name: 'Enter your password' })
    .fill('Test20#$');

  // Click the Sign In button
  await page.getByRole('button', { name: 'Sign In' }).click();

  // Wait for navigation and verify successful login
  await page.waitForURL('**/home');
  await expect(page).toHaveURL(/home/);

}

