import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs, screenSize } from "../../../../constants/links";

test("EF-117__Verify the Training Videos Page Opens Correctly", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.trainingPage);

  await page.addStyleTag({
          content: `
          ${Selectors.tabButtons},
          ${Selectors.tabNavigation},
          ${Selectors.searchInput},
          ${Selectors.infoBlock} {
            background-color: #7d9ec087 !important; 
            border: 1px solid #7d9ec087 !important;      
          }`,
        });
      
  await page.waitForTimeout(500);
      
        // Remove styling
  await page.addStyleTag({
        content: `
          ${Selectors.tabButtons},
          ${Selectors.tabNavigation},
          ${Selectors.searchInput},
          ${Selectors.infoBlock} {
            background-color: transparent !important;
            border: none !important;
          }`,
    });
    
  await page.waitForTimeout(3000);

  await expect(page.locator(Selectors.searchInput).first()).toBeVisible();

  for (let i = 0; i < 3; i++) {
    await expect(page.locator(Selectors.tabButtons).nth(i)).toBeVisible();
  };

  await expect(page.locator(Selectors.infoBlock).first()).toBeVisible();

  for (let i = 0; i < 4; i++) {
    await expect(page.locator(Selectors.tabNavigation).nth(i)).toBeVisible();
  };

});