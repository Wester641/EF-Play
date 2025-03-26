import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { screenSize, URLs } from "../../../../constants/links";

test("EF-110__Verify Filtering by Vehicle Status ", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.samsaraDevices);

  await page.locator(Selectors.vehicleStatusFilter).first().click();

  await page
    .locator("div")
    .filter({ hasText: /^Out of Service$/ })
    .click();

  await page.getByRole("button", { name: "Apply" }).click();

  await page.waitForTimeout(3000);

  await page.locator(Selectors.vehicleStatusFilter).first().click();

  await page.getByTestId("ClearIcon").click();

  await page.getByRole("button", { name: "Apply" }).click();

  // Add to expected failures
});
