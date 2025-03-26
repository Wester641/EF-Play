import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs } from "../../../../constants/links";

test("EF-54__Search Field Functionality", async ({ page }) => {
  await page.goto(URLs.fuelHistory);

  await expect(page.locator(Selectors.search_input)).toBeVisible();
  await page.locator(Selectors.search_input).click();
  await page.locator(Selectors.search_input).fill("GS340");
  await page.locator(Selectors.search_input).clear();
  await page.locator(Selectors.search_input).fill("GS");
  await page.locator(Selectors.search_input).clear();
  await page.locator(Selectors.search_input).fill("XYZ123");
});
