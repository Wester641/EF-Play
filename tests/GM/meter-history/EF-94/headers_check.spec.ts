import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs, screenSize } from "../../../../constants/links";

test("EF-94__Verify Table Data and Column Headers", async ({ page }) => {
  await page.setViewportSize(screenSize);
  
  await page.goto(URLs.meterHistory);

  await page.waitForTimeout(500);

  // Add styling
  await page.addStyleTag({
    content: `
      ${Selectors.table},
      ${Selectors.headerRow}, 
      ${Selectors.dataRow} {
        background-color: #7d9ec087 !important; 
        border: 1px solid #7d9ec087 !important;      
      }`,
  });

  await page.waitForTimeout(500);

  // Remove styling
  await page.addStyleTag({
    content: `
      ${Selectors.table},
      ${Selectors.headerRow}, 
      ${Selectors.dataRow} {
        background-color: transparent !important;
        border: none !important;
      }`,
  });

  await page.waitForTimeout(3000);

  await expect(page.locator(Selectors.table)).toBeVisible();

  const expectedHeaders = ["VehicleMeter DateMeter ValueVoidSource"];

  const tableHeaders = await page.locator(Selectors.headerRow).allTextContents();

  expect(tableHeaders).toEqual(expectedHeaders);

  const rowCount = await page.locator(Selectors.dataRow).count();

  expect(rowCount).toBeGreaterThan(0);

  for (let i = 0; i < rowCount; i++) {

    const columns = await page.locator(Selectors.dataRow).nth(i).locator("td").count();

    expect(columns).toBe(5);
    
  }
});