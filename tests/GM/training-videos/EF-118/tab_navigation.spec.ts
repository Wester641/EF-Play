import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs, screenSize } from "../../../../constants/links";

test("EF-118__Verify Tab Navigation on the 'Training Videos' Page", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.trainingPage);

  await page.addStyleTag({
          content: `
          ${Selectors.tabButtons} {
            background-color: #7d9ec087 !important; 
            border: 1px solid #7d9ec087 !important;      
          }`,
        });
      
  await page.waitForTimeout(500);
      
        // Remove styling
  await page.addStyleTag({
        content: `
          ${Selectors.tabButtons} {
            background-color: transparent !important;
            border: none !important;
          }`,
    });
    
  await page.waitForTimeout(3000);

  await page.locator(Selectors.tabButtons).nth(0).click();

  const tabGeneralList = await page.locator(Selectors.tabBlock);

  await expect(tabGeneralList).toContainText(["AssignmentsSamsara DeviceUnitsUsers"]);

  await page.locator(Selectors.tabButtons).nth(1).click();

  const tabInventoryList = await page.locator(Selectors.tabBlock);

  await expect(tabInventoryList).toContainText(["EquipmentsPartsVendors"]);

  await page.locator(Selectors.tabButtons).nth(2).click();

  const tabServiceList = await page.locator(Selectors.tabBlock);

  await expect(tabServiceList).toContainText(["InspectionIssueService"]);

});