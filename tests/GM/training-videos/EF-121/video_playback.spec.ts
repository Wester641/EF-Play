import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs, screenSize } from "../../../../constants/links";

test("EF-121__Verify Video Playback Functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.trainingPage, { waitUntil: 'networkidle' });

  await page.waitForTimeout(1000);

        // Add styling
  await page.addStyleTag({
          content: `
          ${Selectors.watchButton} {
            background-color: #7d9ec087 !important; 
            border: 1px solid #7d9ec087 !important;      
          }`,
        });
      
  await page.waitForTimeout(500);
      
        // Remove styling
  await page.addStyleTag({
        content: `
          ${Selectors.watchButton} {
            background-color: transparent !important;
            border: none !important;
          }`,
    });
    
  await page.waitForTimeout(1000);

  await page.locator(Selectors.watchButton).nth(0).click();

  await page.waitForTimeout(3000);

  await expect(page.locator(Selectors.playButton).nth(3)).toBeVisible;

  await page.locator(Selectors.closeButton).click();
});