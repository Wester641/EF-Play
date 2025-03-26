import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs, screenSize } from "../../../../constants/links";

test("EF-99__Verify Page Load", async ({ page }) => {
  await page.setViewportSize(screenSize);
  
  await page.goto(URLs.assigments);

  await page.addStyleTag({
      content: `
      ${Selectors.mainTable},
      ${Selectors.vehiclesTable},
      ${Selectors.timelineTable},
      ${Selectors.schedulerMatrix} {
        background-color: #7d9ec087 !important; 
        border: 1px solid #7d9ec087 !important;      
      }`,
    });
  
    await page.waitForTimeout(500);
  
    // Remove styling
    await page.addStyleTag({
      content: `
      ${Selectors.mainTable},
      ${Selectors.vehiclesTable},
      ${Selectors.timelineTable},
      ${Selectors.schedulerMatrix} {
        background-color: transparent !important;
        border: none !important;
      }`,
    });

    await page.waitForTimeout(100);

    await expect(page.locator(Selectors.mainTable)).toBeVisible();

    await page.waitForSelector(Selectors.vehiclesTable, { state: "visible" });

    await expect(page.locator(Selectors.vehiclesTable)).toBeVisible();

    await expect(page.locator(Selectors.timelineTable)).toBeVisible();

    await expect(page.locator(Selectors.schedulerMatrix).nth(0)).toBeVisible();

});