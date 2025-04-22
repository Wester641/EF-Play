import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs, screenSize } from "../../../../constants/links";

test("EF-132__Part Location Section", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.settings);

  await page.waitForTimeout(3000);

  await page.locator(Selectors.tabNavigation).nth(2).click();

  await page.waitForTimeout(3000);

  await expect(page.locator(Selectors.dataRow).nth(0)).toBeVisible();

  await expect(page.getByText("Add Part locations").first()).toBeVisible();

  await page.getByText("Add Part locations").first().click();

  await page.waitForTimeout(3000);
  
  await expect(page.locator(Selectors.createRoleModal)).toBeVisible();
  
  const inputFieldCount = await page.locator(Selectors.inputField).count();

  expect(inputFieldCount).toBe(2);

  await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();

  await expect(page.getByRole('button', { name: 'Save' })).toBeVisible();
});