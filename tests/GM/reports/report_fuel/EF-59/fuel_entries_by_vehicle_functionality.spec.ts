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
  await page
    .locator("div")
    .filter({ hasText: /^Fuel$/ })
    .first()
    .click();
  await page.getByText(Selectors.fuel_entries).click();

  for (const header of Selectors.columnHeaders) {
    await expect(
      page.getByRole("columnheader", { name: header })
    ).toBeVisible();
  }

  const firstCell = await page.getByRole("cell").nth(9).textContent();

  await page.locator(Selectors.search_fields).fill(firstCell || "Vehicle");
  await page.waitForTimeout(5000);
});
