import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { screenSize, URLs } from "../../../../constants/links";

test("EF-116__Refresh button", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.samsaraDevices);

  await page.locator(Selectors.refreshButton).nth(1).click();

  await page.waitForTimeout(2500);

  // Add the expected failures on toast message
});
