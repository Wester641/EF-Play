import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs, screenSize } from "../../../../constants/links";

test("EF-98__Verify 'Export' Functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);
  
  await page.goto(URLs.meterHistory);

  await page.waitForTimeout(500);

  // Add styling
  await page.addStyleTag({
    content: `
      ${Selectors.moreButton} {
        background-color: #7d9ec087 !important; 
        border: 1px solid #7d9ec087 !important;      
      }`,
  });

  await page.waitForTimeout(500);

  // Remove styling
  await page.addStyleTag({
    content: `
      ${Selectors.moreButton} {
        background-color: transparent !important;
        border: none !important;
      }`,
  });

  await page.waitForTimeout(3000);

  await page.locator(Selectors.moreButton).nth(1).click();

  await page.locator(Selectors.exportImportButton).nth(0).click();

  await expect(page.locator(Selectors.exportPopUp)).toBeVisible();

  await page.locator(Selectors.switchInput).nth(0).click();

  await page.locator(Selectors.exportButton).click();

  await page.waitForTimeout(3000);

  await expect(page.locator(Selectors.completeMessage)).toBeVisible();

  await expect(page.locator(Selectors.completeText)).toContainText("Completed: The Meter History has been exported");

  await page.locator(Selectors.closeCompleteMessage).click();

  await page.locator(Selectors.moreButton).nth(1).click();

  await page.locator(Selectors.exportImportButton).nth(0).click();

  await expect(page.locator(Selectors.exportPopUp)).toBeVisible();

  await page.locator(Selectors.switchInput).nth(1).click();

  await page.locator(Selectors.exportButton).click();

  await page.waitForTimeout(3000);

  await expect(page.locator(Selectors.completeMessage)).toBeVisible();

  await expect(page.locator(Selectors.completeText)).toContainText("Completed: The Meter History has been exported");

});