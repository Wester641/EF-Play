import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";

import { screenSize, URLs } from "../../../../constants/links";

test("EF-159__Select add meter entry", async ({ page }) => {
  await page.setViewportSize(screenSize);
  await page.goto(URLs.units);

  // waiting for unit list to load
  await page.waitForSelector(Selectors.unit_cell, {
    state: "attached",
    timeout: 10000,
  });

  // clicking on first unit
  await page.locator(Selectors.unit_cell).nth(0).click();
  await page.locator(Selectors.addButton).nth(1).click();
  await page.getByRole("link", { name: "Add Meter Entry" }).click();

  await expect(page).toHaveURL(URLs.addMeterHistoryFromUnitPage);
  await page.waitForTimeout(2000);
});
