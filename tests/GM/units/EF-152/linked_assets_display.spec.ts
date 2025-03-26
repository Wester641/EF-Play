import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs, screenSize } from "../../../../constants/links";

test("EF-152_linked_assets_display", async ({ page }) => {
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

  await page.locator(Selectors.linkedAssetsBlock).nth(1).waitFor({
    state: "visible",
  });
  await page.locator(Selectors.linkAssetBtn).nth(3).click();
  await expect(
    page.locator(Selectors.widgetContainer).locator(Selectors.widgetBtn)
  ).toContainText(["Cancel", "Save"]);
});
