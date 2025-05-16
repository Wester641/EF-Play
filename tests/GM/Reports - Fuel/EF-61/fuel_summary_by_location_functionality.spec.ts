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
  await page.getByText("Fuel3").click();
  await page.getByText(Selectors.fuel_summary).click();

  await expect(page.getByText(Selectors.distance_based)).toBeVisible();
  await expect(page.getByText(Selectors.Hour_based)).toBeVisible();
  await expect(page.getByText(Selectors.simplified)).toBeVisible();

  await page
    .getByRole("navigation", { name: "pagination navigation" })
    .getByRole("listitem")
    .nth(2)
    .click();
  await page
    .getByRole("navigation", { name: "pagination navigation" })
    .getByRole("listitem")
    .first()
    .click();

  await page.waitForTimeout(5000);
});
