import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { screenSize, URLs } from "../../../../constants/links";

test("EF-111__Verify Filtering by Vehicle Group", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.samsaraDevices);

  await page
    .locator("div")
    .filter({ hasText: /^Vehicle Group$/ })
    .nth(1)
    .click();

  await page.waitForSelector(Selectors.listVehicleFilter);

  const items = await page.locator(Selectors.listVehicleFilter).all();

  const randomItems = Math.random() * 5;

  await page.locator(Selectors.listVehicleFilter).nth(randomItems).click();

  await page.locator(Selectors.applyVehicleFilter).nth(1).click();

  await page.waitForTimeout(3000);

  await page.locator(Selectors.widgetsFilter).nth(2).click();

  await page.locator(Selectors.resetVehicleFilter).click();

  await page.locator(Selectors.applyVehicleFilter).nth(1).click();

  // Add to expected failures
});
