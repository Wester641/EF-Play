import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs, screenSize } from "../../../../constants/links";

test("EF-200__Inspections Form Page Navigation", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.inspectionForms);

  await page.waitForTimeout(500);

  await page.addStyleTag({
    content: `
      ${Selectors.managementTab} {
        background-color: #7d9ec087 !important; 
        border: 1px solid #7d9ec087 !important;      
      }`,
  });

  await page.waitForTimeout(500);

  // Remove styling
  await page.addStyleTag({
    content: `
      ${Selectors.managementTab} {
        background-color: transparent !important;
        border: none !important;
      }`,
  });

  await page.waitForTimeout(3000);

  await page.locator(Selectors.managementTab).nth(1).click();

  await page.waitForTimeout(1000);

  await page.locator('div').filter({ hasText: /^Inspections$/ }).click();

  await expect(page.locator(Selectors.selectDropdown)).toBeVisible();

  await page.waitForTimeout(500);

  await page.locator(Selectors.inspectionsTab).nth(1).click();

  await page.waitForTimeout(3000);

  await expect(page.locator(Selectors.headerTable).first()).toBeVisible();

  const headerNames = await page.locator(Selectors.headerTable).first().allInnerTexts();

  await expect(headerNames).toStrictEqual(['Title\tDescription\tItem\tSubmissions\t'])

});