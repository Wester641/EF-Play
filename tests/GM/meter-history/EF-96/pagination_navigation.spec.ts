import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs, screenSize } from "../../../../constants/links";

test("EF-96__Verify Pagination Navigation", async ({ page }) => {
  await page.setViewportSize(screenSize);
  
  await page.goto(URLs.meterHistory);

  await page.waitForTimeout(500);

  // Add styling
  await page.addStyleTag({
    content: `
      ${Selectors.nextPage},
      ${Selectors.previousPage},
      ${Selectors.dataRow} {
        background-color: #7d9ec087 !important; 
        border: 1px solid #7d9ec087 !important;      
      }`,
  });

  await page.waitForTimeout(500);

  // Remove styling
  await page.addStyleTag({
    content: `
      ${Selectors.nextPage},
      ${Selectors.previousPage},
      ${Selectors.dataRow} {
        background-color: transparent !important;
        border: none !important;
      }`,
  });

  await page.waitForTimeout(3000);

  const firstRowBefore = await page.locator(Selectors.dataRow).nth(0).textContent();

  const lastRowBefore = await page.locator(Selectors.dataRow).nth(9).textContent();

  await page.locator(Selectors.nextPage).click();

  await page.waitForTimeout(2000);

  const firstRowSecondPage = await page.locator(Selectors.dataRow).nth(0).textContent();

  const lastRowSecondPage = await page.locator(Selectors.dataRow).nth(9).textContent();

  expect(firstRowBefore).not.toBe(firstRowSecondPage);

  expect(lastRowBefore).not.toBe(lastRowSecondPage);

  await page.locator(Selectors.previousPage).click();

  await page.waitForTimeout(2000);

  const firstRowAfter = await page.locator(Selectors.dataRow).nth(0).textContent();

  const lastRowAfter = await page.locator(Selectors.dataRow).nth(9).textContent();

  expect(firstRowBefore).toBe(firstRowAfter);

  expect(lastRowBefore).toBe(lastRowAfter);

  await page.goto(URLs.dashboard);

  await page.waitForTimeout(3000); 

  await page.goto(URLs.meterHistory);

  await page.waitForTimeout(3000); 

  const firstRowReset = await page.locator(Selectors.dataRow).nth(0).textContent();

  const lastRowReset = await page.locator(Selectors.dataRow).nth(9).textContent();

  expect(firstRowBefore).toBe(firstRowReset);

  expect(lastRowBefore).toBe(lastRowReset);

  console.log(firstRowBefore, lastRowAfter)

  console.log(firstRowSecondPage, lastRowSecondPage)

});