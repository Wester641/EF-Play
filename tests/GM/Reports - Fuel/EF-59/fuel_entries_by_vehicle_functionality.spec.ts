import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs, screenSize } from "../../../../constants/links";

test("EF-59__fuel_entries_by_vehicle_functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);
  await page.goto(URLs.dashboard);

  await page
    .locator("div")
    .filter({ hasText: /^Reports$/ })
    .click();
  await page.getByText("Fuel3").click();
  await page.getByText(Selectors.fuel_entries).click();
  //   there were no widgets here

  await page.locator('input[type="text"]').fill("Vehicle 14");
  await expect(page.getByRole("cell", { name: "Vehicle" })).toBeVisible();

  await page.waitForTimeout(5000);
});
