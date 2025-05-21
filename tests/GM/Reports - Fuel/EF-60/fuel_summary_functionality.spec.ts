import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs, screenSize } from "../../../../constants/links";

test("EF-60__fuel_summary_functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);
  await page.goto(URLs.dashboard);

  await page
    .locator("div")
    .filter({ hasText: /^Reports$/ })
    .click();
  await page.getByText("Fuel3").click();
  await page.getByText(Selectors.fuel_summary).click();

  await expect(page.getByText("Transactions0.00")).toBeVisible();
  await expect(page.getByText("Total Gallons (US)17248.00")).toBeVisible();
  await expect(page.getByText("Total Fuel Cost152145619.40")).toBeVisible();
  await expect(page.getByText("Average Cost per Gallon8821.06")).toBeVisible();
  await page.locator('input[type="text"]').fill("LOVES #114");

  await page.waitForTimeout(5000);
});
