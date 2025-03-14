import { test, expect } from "@playwright/test";
import { Selectors, loginSelectors } from "./Selectors";
import { URLs, Credentials } from "../../../../constants/links";

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto(URLs.login);
  await page.waitForSelector(loginSelectors.email);
  await page.fill(loginSelectors.email, Credentials.email);
  await page.fill(loginSelectors.password, Credentials.password);
  await page.click(loginSelectors.submitButton);
  await page.waitForURL(URLs.units, { timeout: 30000 });
});

test("EF-152_linked_assets_display", async ({ page }) => {
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
