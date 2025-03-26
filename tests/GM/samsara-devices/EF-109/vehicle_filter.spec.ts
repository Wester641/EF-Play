import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { screenSize, URLs } from "../../../../constants/links";

test("EF-109__Verify Filtering by Vehicle", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.samsaraDevices);

  await page.locator(Selectors.vehicleFilter).nth(1).click();

  await page.waitForSelector(Selectors.listVehicleFilter);

  const items = await page.locator(Selectors.listVehicleFilter).all();

  const randomItems = Math.random() * 3;

  await page.locator(Selectors.listVehicleFilter).nth(randomItems).click();

  await page.locator(Selectors.applyVehicleFilter).nth(1).click();

  await page.waitForTimeout(3000);

  await page.locator(Selectors.vehicleFilter).nth(1).click();

  await page.locator(Selectors.resetVehicleFilter).click();

  await page.locator(Selectors.applyVehicleFilter).nth(1).click();

  // Add to expected failures
});