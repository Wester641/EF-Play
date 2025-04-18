import { test as base, expect } from "@playwright/test";
import { screenSize, URLs } from "./../../../../../constants/links";
import { Selectors } from "./Selectors";
const test = base.extend({
  storageState: ".auth/login.json",
});

test("EF-258__Verify Search Functionality on Parts Page", async ({ page }) => {
  await page.setViewportSize(screenSize);
  await page.goto(URLs.partsPage);

  await expect(page.locator(Selectors.partsPage_text)).toBeVisible();
  const searchText = "part 1";
  await page.locator(Selectors.search_input).click();
  await page.locator(Selectors.search_input).fill(searchText);
  await page.waitForLoadState("networkidle");
  const tableMatch = page.locator(`table >> text=${searchText}`);
  await expect(tableMatch.first()).toBeVisible();
});
