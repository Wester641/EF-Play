import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { screenSize, URLs } from "../../../../constants/links";

test("EF-50__Bulk Actions", async ({ page }) => {
  await page.goto(URLs.users);
  await page.setViewportSize(screenSize);
  await page.waitForTimeout(3000);

  await page.locator(Selectors.selectAllCheckbox).nth(0).click();
  expect(page.locator(Selectors.bulkButtons).nth(0)).toBeVisible();
  expect(page.locator(Selectors.bulkButtons).nth(1)).toBeVisible();
  expect(page.locator(Selectors.checkbox).nth(5)).toBeChecked();
  // FIX
});
