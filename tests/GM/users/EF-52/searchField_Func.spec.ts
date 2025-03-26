import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs, screenSize } from "../../../../constants/links";

test("EF-52_Search Field Functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);
  await page.goto(URLs.users);

  await expect(page.locator(Selectors.searchInput).nth(0)).toBeVisible();
  await page.locator(Selectors.searchInput).nth(0).click();
  await page.locator(Selectors.searchInput).nth(0).fill("Bakyt");
  await page.waitForTimeout(2000);
  await page.locator(Selectors.searchInput).nth(0).clear();
  await page
    .locator(Selectors.searchInput)
    .nth(0)
    .fill("example105@example.com");
  await page.waitForTimeout(2000);
  await page.locator(Selectors.searchInput).nth(0).clear();
  await page.locator(Selectors.searchInput).nth(0).fill("Ben");
  await page.waitForTimeout(2000);
  await page.locator(Selectors.searchInput).nth(0).clear();
  await page.locator(Selectors.searchInput).nth(0).fill("xyz123");
  await page.waitForTimeout(2000);
});
