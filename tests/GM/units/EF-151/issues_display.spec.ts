import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs, screenSize } from "../../../../constants/links";

test("EF-151__issues_display", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.units);
  
  await page.waitForSelector(Selectors.unitsBlock, {
    state: "attached",
    timeout: 10000,
  });

  const visibleRowCount = await page
    .locator(Selectors.trUnitsBlock)
    .filter({ has: page.locator(":visible") })
    .count();
  console.log(`Visible Rows: ${visibleRowCount}`);

  const randomIndex = Math.floor(Math.random() * visibleRowCount);

  const visibleRow = page
    .locator(Selectors.trUnitsBlock)
    .filter({ has: page.locator(":visible") })
    .nth(randomIndex);

  await visibleRow.scrollIntoViewIfNeeded();
  await visibleRow.click();

  const unitUrl = await page.url();
  const unitId = unitUrl.match(/units\/([0-9a-fA-F-]+)$/)?.[1];

  console.log(`Extracted Unit ID: ${unitId}`);
  console.log(`Clicked on visible row index: ${randomIndex}`);

  await page.waitForSelector(Selectors.openIssuesBlock, { state: "visible" });
  await page.locator(Selectors.viewAllBtn).nth(1).click();

  await expect(page.locator(Selectors.issueTab).nth(3)).toHaveText("Issues");

  await expect(page).toHaveURL(new RegExp(`/units/${unitId}($|\\?)`));
});
