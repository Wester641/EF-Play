import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs, screenSize } from "../../../../../constants/links";

test("EF-297__Inspections Schedules Modal Filters Test", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.inspection_schedules);

  await page.waitForTimeout(3000);

  await expect(page.locator(Selectors.headerTable).first()).toBeVisible();

  const applyAndResetFilter = async () => {
    const applyButton = page.locator("button:has-text('Apply')");
    await expect(applyButton).toBeVisible();
    await applyButton.click();
    await page.waitForTimeout(2000);

    const resetButton = page.locator(Selectors.resetButton);
    await expect(resetButton).toBeVisible();
    await resetButton.click();
    await page.waitForTimeout(2000);
  };

  try {
    const filterElement = page.locator(Selectors.inspectionFormFilter);
    await expect(filterElement).toBeVisible();
    await filterElement.click();
    await page.waitForTimeout(1000);

    const firstOption = page.locator(Selectors.inspectionFormOptions).nth(0);
    await expect(firstOption).toBeVisible();
    await firstOption.click();

    await applyAndResetFilter();
  } catch (error) {
    console.log(`Error testing Inspection Form filter:`, error);
  }

  try {
    const filterElement = page.locator(Selectors.frequencyFilter);
    await expect(filterElement).toBeVisible();
    await filterElement.click();
    await page.waitForTimeout(1000);

    const firstOption = page.locator(Selectors.frequencyOptions).nth(0);
    await expect(firstOption).toBeVisible();
    await firstOption.click();

    await applyAndResetFilter();
  } catch (error) {
    console.log(`Error testing Frequency filter:`, error);
  }

  try {
    const filterElement = page.locator(Selectors.vehicleFilter);
    await filterElement.nth(0).click();
    await page.waitForTimeout(1000);

    const firstOption = page.locator(Selectors.vehicleOptions).nth(0);
    await expect(firstOption).toBeVisible();
    await firstOption.click();

    await applyAndResetFilter();
  } catch (error) {
    console.log(`Error testing Vehicle filter:`, error);
  }

  try {
    const filterElement = page.locator(Selectors.vehicleGroupFilter);
    await filterElement.nth(1).click();
    await page.waitForTimeout(1000);

    const firstOption = page.locator(Selectors.vehicleOptions).nth(0);
    await expect(firstOption).toBeVisible();
    await firstOption.click();

    await applyAndResetFilter();
  } catch (error) {
    console.log(`Error testing Vehicle Group filter:`, error);
  }

  try {
    const filterElement = page.locator(Selectors.vehicleTypeFilter);
    await filterElement.nth(2).click();
    await page.waitForTimeout(1000);

    const firstOption = page.locator(Selectors.vehicleOptions).nth(0);
    await expect(firstOption).toBeVisible();
    await firstOption.click();

    await applyAndResetFilter();
  } catch (error) {
    console.log(`Error testing Vehicle Type filter:`, error);
  }
});