import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs, screenSize } from "../../../../constants/links";

test("EF-92__Meter History Page Functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.meterHistory);

  // Not for delete, go back this moment and refactor this code
  // await expect(page.locator(Selectors.pageLoader)).toBeVisible();

  await page.addStyleTag({
    content: `
      ${Selectors.activeSidebarItem} {
        background-color: #7d9ec087 !important; 
        border: 1px solid #7d9ec087 !important;      
      }`,
  });

  await page.waitForTimeout(500);

  // Remove styling
  await page.addStyleTag({
    content: `
      ${Selectors.activeSidebarItem} {
        background-color: transparent !important;
        border: none !important;
      }`,
  });

  await page.waitForTimeout(3000);

  await expect(page.locator(Selectors.pageLoader)).toHaveCount(0);

  await expect(
    page
      .locator(Selectors.activeSidebarItem)
      .filter({ hasText: "Meter History" })
  ).toHaveCount(1);
});
