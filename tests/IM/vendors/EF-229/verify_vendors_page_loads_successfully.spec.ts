import { test } from "@playwright/test";
import { screenSize, URLs } from "../../../../constants/links";

test("EF-229__verify_vendors_page_loads_successfully", async ({ page }) => {
  await page.setViewportSize(screenSize);
  await page.goto(URLs.dashboard);

  await page
    .locator("div")
    .filter({ hasText: /^Inventory management$/ })
    .click();

  await page
    .locator("div")
    .filter({ hasText: /^Vendors$/ })
    .click();
  await page.waitForTimeout(2000);
});
