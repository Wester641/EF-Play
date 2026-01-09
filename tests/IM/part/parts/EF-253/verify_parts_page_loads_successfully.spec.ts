import { test, expect } from "@playwright/test";
import { screenSize, URLs } from "../../../../../constants/links";
import { Selectors } from "./Selectors";

test("EF-253__verify_parts_page_loads_successfully", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.units);

  await page.getByRole("heading", { name: "Inventory management" }).click();
  await page
    .locator("div")
    .filter({ hasText: /^Part$/ })
    .click();
  await page.getByText("Parts").click();
  await expect(page).toHaveURL(URLs.partsPage);
  await expect(page.locator(Selectors.mainContainer)).toBeVisible();
});
