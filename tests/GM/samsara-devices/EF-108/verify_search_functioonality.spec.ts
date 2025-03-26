import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { screenSize, URLs } from "../../../../constants/links";

test("EF-108__Verify Search Functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);
  await page.goto(URLs.samsaraDevices);

  const searched_value = await page
    .locator(Selectors.unit_cell)
    .nth(0)
    .textContent();
  await page.locator('input[type="text"]').click();
  if (searched_value) {
    await page.locator('input[type="text"]').fill(searched_value);
    await expect(page.getByRole("table")).toContainText(searched_value);
  }
});
