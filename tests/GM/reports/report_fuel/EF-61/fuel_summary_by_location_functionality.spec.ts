import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs, screenSize } from "../../../../constants/links";

test("EF-61__fuel_summary_by_location_functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);
  await page.goto(URLs.dashboard);
  await page
    .locator("div")
    .filter({ hasText: /^Reports$/ })
    .click();
  await page.getByRole("heading", { name: "Fuel", exact: true }).click();
  await page.getByText(Selectors.fuel_summary).click();

  await expect(page.locator(".Block_block__U3GqW")).toBeVisible();
});
