import { test, expect } from "@playwright/test";
import { screenSize, URLs } from "../../../../../constants/links";

test("EF-254__verify_tabs_switching_on_parts_page", async ({ page }) => {
  await page.setViewportSize(screenSize);
  await page.goto(URLs.partsPage);
  for (let i = 1; i < 4; i++) {
    await page.getByRole("tab").nth(i).click();
    await expect(page.locator(".css-1owb465")).toBeVisible();
  }
});
