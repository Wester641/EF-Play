import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs, screenSize } from "../../../../constants/links";

test("EF-95__Verify 'Per Page' Dropdown Functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);
  
  await page.goto(URLs.meterHistory);

  await page.waitForTimeout(500);

  // Add styling
  await page.addStyleTag({
    content: `
      ${Selectors.dataRow},
      ${Selectors.perPageDropdown} {
        background-color: #7d9ec087 !important; 
        border: 1px solid #7d9ec087 !important;      
      }`,
  });

  await page.waitForTimeout(500);

  // Remove styling
  await page.addStyleTag({
    content: `
      ${Selectors.dataRow},
      ${Selectors.perPageDropdown} {
        background-color: transparent !important;
        border: none !important;
      }`,
  });

  await page.waitForTimeout(3000);

  await expect(page.locator(Selectors.perPageDropdown)).toBeVisible();

  const dataCount10 = await page.locator(Selectors.dataRow).count();

  await expect(dataCount10).toBe(10);

  await page.locator(Selectors.perPageDropdown).click();

  await page.locator(Selectors.numbersPerPage).nth(1).click();

  await page.waitForTimeout(1000);

  const dataCount20 = await page.locator(Selectors.dataRow).count();

  await expect(dataCount20).toBe(20);

  await page.locator(Selectors.perPageDropdown).click();

  await page.locator(Selectors.numbersPerPage).nth(2).click();

  await page.waitForTimeout(1000);

  const dataCount50 = await page.locator(Selectors.dataRow).count();

  await expect(dataCount50).toBeGreaterThan(20);
  
});