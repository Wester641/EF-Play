import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs, screenSize } from "../../../../constants/links";

test("EF-133__Equipment Type Section", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.settings);

  await page.addStyleTag({
    content: `
      ${Selectors.tabNavigation} {
        background-color: #7d9ec087 !important; 
        border: 1px solid #7d9ec087 !important;      
      }`,
  });

  await page.waitForTimeout(500);

  // Remove styling
  await page.addStyleTag({
    content: `
      ${Selectors.tabNavigation} {
        background-color: transparent !important;
        border: none !important;
      }`,
  });

  await page.waitForTimeout(3000);

  await page.locator(Selectors.tabNavigation).nth(4).click();

  await page.waitForTimeout(3000);

  await page.addStyleTag({
    content: `
      ${Selectors.settingsButton},
      ${Selectors.infoBlock},
      ${Selectors.dataBlock},
      ${Selectors.nameRow} {
        background-color: #7d9ec087 !important; 
        border: 1px solid #7d9ec087 !important;      
      }`,
  });

  await page.waitForTimeout(500);

  // Remove styling
  await page.addStyleTag({
    content: `
      ${Selectors.settingsButton},
      ${Selectors.infoBlock},
      ${Selectors.dataBlock},
      ${Selectors.nameRow} {
        background-color: transparent !important;
        border: none !important;
      }`,
  });

  await page.waitForTimeout(500);

  await expect(page.locator(Selectors.dataBlock).first()).toBeVisible();

  await expect(page.locator(Selectors.nameRow).first()).toBeVisible();

  await expect(page.locator(Selectors.infoBlock).first()).toBeVisible();

  await expect(page.locator(Selectors.settingsButton).nth(0)).toBeVisible();

  await expect(page.locator(Selectors.settingsButton).nth(1)).toBeVisible();

  const rowName = await page.locator(Selectors.dataRow).nth(1).innerText();

  await page.locator(Selectors.deleteData).nth(0).click();

  await page.waitForTimeout(1000);

  await page.getByRole('button', { name: 'Delete' }).click(); 

  await page.waitForTimeout(3000);

  await page.locator(Selectors.tabNavigation).nth(0).click();
  
  await page.waitForTimeout(1000);
  
  await page.locator(Selectors.tabNavigation).nth(4).click();
  
  await page.waitForTimeout(3000);

  const allDataRow = await page.locator(Selectors.dataRow).allInnerTexts();

  await expect(allDataRow).not.toContain(rowName);
});