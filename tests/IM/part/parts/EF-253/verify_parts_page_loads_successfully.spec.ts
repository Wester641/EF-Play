import { test, expect } from "@playwright/test";
import { screenSize, URLs } from "../../../../../constants/links";

test("EF-253__verify_parts_page_loads_successfully", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.units);

  await page.getByRole("heading", { name: "Inventory management" }).click();
  await page
    .locator("div")
    .filter({ hasText: /^Part$/ })
    .click();
  await page.getByText("Parts").click();
  await expect(page).toHaveURL("https://app.easyfleet.ai/parts?tab=0");
  await expect(page.locator(".css-1owb465")).toBeVisible();
});
