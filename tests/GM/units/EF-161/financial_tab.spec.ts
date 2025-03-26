import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs, timeout, screenSize } from "../../../../constants/links";

test("EF-161__Financial Tabs - Widgets Verifications", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.units);

  await page.locator(Selectors.firstRowInTable).first().click();

  await page.waitForURL(URLs.unitsPage, timeout);

  await page.getByRole("tab", { name: "Financial" }).click();

  await page.waitForTimeout(500);

  await page
    .locator("div")
    .filter({ hasText: /^Lifecycle Details$/ })
    .locator("div")
    .click();
  // await expect(page).toHaveURL(
  //   URLs.updateFinance
  // );
  await expect(page).toHaveURL(URLs.unitsUpdatePage);

  await page.waitForTimeout(2000);

  await page.goBack();

  await page.waitForTimeout(2000);
});
