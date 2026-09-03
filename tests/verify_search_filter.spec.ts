import { test, expect } from '@playwright/test';
import { loginToApp } from './login.spec.js';

test('Verify Search/Filter Efficiency on Subject Management', async ({ page }) => {

  await loginToApp(page);

  // Verify dashboard page
  await page.locator('div').filter({ hasText: /^Dashboard$/ }).click();

  await expect(page.getByText('Dashboard', { exact: true })).toBeVisible();

  const masterDataToggle = page.getByText('Master Data', { exact: true });
  await expect(masterDataToggle).toBeVisible();
  await masterDataToggle.click();


  // --- Wait for submenu item to be visible, then click it ---
  const subjectManagementItem = page.getByRole('listitem').filter({ hasText: /^Subject Management$/ });
  await expect(subjectManagementItem).toBeVisible();
  await subjectManagementItem.click();

  const searchBox = page.getByRole('textbox', { name: 'Search by subject name' });
  const statusFilterBtn = page.getByRole('button', { name: 'Status' });
  const clearBtn = page.getByRole('button', { name: 'Clear' });

  // --- Confirm navigation succeeded before interacting further ---
  await expect(searchBox).toBeVisible({ timeout: 10000 });

  // --- Search by name: "JavaScript" ---
  await searchBox.fill('JavaScript');
  await page.getByRole('button', { name: 'Search' }).click();

  const jsRow = page.getByRole('row', { name: /^JavaScript / }); // anchor to avoid matching description-only rows
  await expect(jsRow).toBeVisible();
  await expect(page.getByText(/Showing 1-\d+ of 1/)).toBeVisible(); // count should shrink from 26

  // --- Combine with Status filter: Active ---
  await statusFilterBtn.click();
  await page.getByRole('option', { name: 'Active', exact: true }).click();
  await expect(jsRow).toBeVisible();
  await expect(jsRow).toContainText('Active');

  // --- Switch Status filter to Inactive while search term still applied ---
  await statusFilterBtn.click();
  await page.getByRole('option', { name: 'Inactive' }).click();
  // JavaScript is Active, so it should disappear under Inactive filter
  await expect(jsRow).not.toBeVisible();

  // --- Clear Status filter ---
  await page.getByLabel('Clear').first().click();
  await expect(statusFilterBtn).toHaveAccessibleName('Status');

  // --- New search term: partial match "Neu" ---
  await searchBox.fill('');
  await searchBox.fill('Neu');
  const neuroRow = page.getByRole('row', { name: /Neuro Science/ });
  await expect(neuroRow).toBeVisible();
  await expect(neuroRow).toContainText('Very good subject');

  // --- Clear search resets to full list ---
  await clearBtn.click();
  await expect(searchBox).toHaveValue('');

});