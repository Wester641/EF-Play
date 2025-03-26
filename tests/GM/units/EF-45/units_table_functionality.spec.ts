import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs, screenSize } from "../../../../constants/links";

test("EF-45__Units Table Functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);
  
  await page.goto(URLs.units);

  await expect(page.locator(Selectors.searchInput)).toBeVisible();
  
  await page.waitForTimeout(500);

  await page.locator(`${Selectors.firstUnit}`).first().scrollIntoViewIfNeeded();
  for (let i = 1; i <= 9; i++) {
    const tds = await page.$$("tr:nth-of-type(1) td");

    if (i <= tds.length) {
      await page.addStyleTag({
        content: `
            tr:nth-of-type(1) td:nth-of-type(${i}) {
                background-color: lightblue;
                border: 1px solid #ccc;
            }`,
      });

      await page.waitForTimeout(100);

      await page.addStyleTag({
        content: `
            tr:nth-of-type(1) td:nth-of-type(${i}) {
                background-color: transparent;
                border: none;
            }`,
      });
    }
  }

  await page.locator(Selectors.threeDotsMenu).nth(3).click();
  await expect(page.locator(Selectors.deleteAndArchive)).toBeVisible();
  await page.waitForTimeout(500);
  await page.locator(Selectors.archiveButton).nth(1).click();

  await page.locator(Selectors.firstUnit).first().click();
  await page.waitForTimeout(4000);
  await expect(page.locator(Selectors.detailBlockInDetailPage)).toBeVisible();
  await page.waitForTimeout(4000);
  await page.goBack();
  await expect(page).toHaveURL(URLs.units);

  await page.addStyleTag({
    content: `
            ${Selectors.deleteAndArchive} {
                background-color: lightblue;
                border: 1px solid #ccc;
            }`,
  });

  await page.waitForTimeout(500);
  await page.addStyleTag({
    content: `
          ${Selectors.totalAmountUnits} {
              background-color: lightblue;
              border: 1px solid #ccc;
          }`,
  });
  await page.addStyleTag({
    content: `
          ${Selectors.totalAmountUnits} {
              background-color: transparent;
              border: none;
          }`,
  });

  await page.waitForTimeout(3000);

  for (let k = 1; k <= 3; k++) {
    await page.locator(Selectors.tabPages).nth(k).click();
    await page.locator(`${Selectors.tabPages}`).nth(k).scrollIntoViewIfNeeded();
    await page.waitForTimeout(2000);
  }
  await page.locator(Selectors.tabPages).nth(0).click();
  await expect(page).toHaveURL(URLs.unitsFirstPage || "/units?limit=10&page=1");
});
