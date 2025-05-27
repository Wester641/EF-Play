import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs, screenSize } from "../../../../../constants/links";

test("EF-60__fuel_summary_functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);
  await page.goto(URLs.dashboard);

  await page
    .locator("div")
    .filter({ hasText: /^Reports$/ })
    .click();
  await page.getByRole("heading", { name: "Fuel", exact: true }).click();
  await page.getByText(Selectors.fuel_summary).click();
  await expect(
    page.getByRole("columnheader", { name: "Name" }).first()
  ).toBeVisible();
  await page.waitForTimeout(5000);
});
