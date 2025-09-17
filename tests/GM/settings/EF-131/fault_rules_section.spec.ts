import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs, screenSize } from "../../../../constants/links";

  // Not finished due to empty data in Code Field

test("EF-131__Fault Rules Section", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.settings);

  await page.addStyleTag({
    content: `
      ${Selectors.tabNavigation} {
        background-color: #7d9ec087 !important; 
        border: 1px solid #7d9ec087 !important;      
      }`,
  });

  await page.waitForTimeout(500);

  // Remove styling
  await page.addStyleTag({
    content: `
      ${Selectors.tabNavigation} {
        background-color: transparent !important;
        border: none !important;
      }`,
  });

  await page.waitForTimeout(3000);

  await page.locator(Selectors.tabNavigation).nth(1).click();

  await page.waitForTimeout(3000);

  await page.addStyleTag({
    content: `
      ${Selectors.searchInput},
      ${Selectors.settingsButton},
      ${Selectors.infoBlock},
      ${Selectors.dataResult},
      ${Selectors.addButton} {
        background-color: #7d9ec087 !important; 
        border: 1px solid #7d9ec087 !important;      
      }`,
  });

  await page.waitForTimeout(500);

  // Remove styling
  await page.addStyleTag({
    content: `
      ${Selectors.searchInput},
      ${Selectors.settingsButton},
      ${Selectors.infoBlock},
      ${Selectors.dataResult},
      ${Selectors.addButton} {
        background-color: transparent !important;
        border: none !important;
      }`,
  });

  await expect(page.locator(Selectors.searchInput)).toBeVisible();

  const dataCount = await page.locator(Selectors.dataResult).count();
  
  if (dataCount === 0) {
  } else {
    await expect(page.locator(Selectors.infoBlock).nth(0)).not.toContainText("No records found");
  }

  await expect(page.locator(Selectors.settingsButton).nth(0)).toBeVisible();

  await expect(page.locator(Selectors.settingsButton).nth(1)).toBeVisible();

  await expect(page.locator(Selectors.addButton).nth(0)).toBeVisible();

  await page.locator(Selectors.addButton).nth(0).click();

  await page.waitForTimeout(3000);

  await expect(page.locator(Selectors.createRoleModal)).toBeVisible();

  const inputFieldCount = await page.locator(Selectors.inputField).count();
  const permSelectCount = await page.locator(Selectors.permSelect).count();

  await expect(inputFieldCount).toBe(2);
  await expect(permSelectCount).toBe(3);

  await expect(page.locator(Selectors.tickHeader)).toBeVisible();
  await expect(page.locator(Selectors.codeField)).toBeVisible();

  await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();

  await expect(page.getByRole('button', { name: 'Save' })).toBeVisible();

  const num = await Math.floor(Math.random() * 100);

  await page.locator('input[name="name"]').fill(`Fault Rule number: ${num}`);

  const checkboxes = page.locator(Selectors.permSelect).locator('span .css-1m9pwf3');

  const randomIndex = Math.floor(Math.random() * 3);

  await checkboxes.nth(randomIndex).check();

  await expect(page.locator(Selectors.codeField)).toBeVisible();

  await page.getByRole('button', { name: 'Cancel' }).click(); 

});