import { test, expect, Locator } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs } from "../../../../constants/links";

test("EF-56__Widgets Display Functionality", async ({ page }) => {
  await page.goto(URLs.fuelHistory);

  //Total Fuel Cost
  await expect(page.locator(Selectors.widget_text).nth(0)).toBeVisible();

  const widgetText = await page
    .locator(Selectors.widget_text)
    .nth(0)
    .textContent();
  const totalFuelCost = parseFloat(widgetText?.replace(/[$,]/g, "") || "0");

  let tableTotal = 0;
  do {
    const fuelCellAmount = page.locator(Selectors.fuel_cell);
    const count = await fuelCellAmount.count();

    for (let i = 0; i < count; i++) {
      const cellText = await fuelCellAmount.nth(i).textContent();
      const amount = parseFloat(cellText?.replace(/[$,]/g, "") || "0");
      tableTotal += amount;
    }

    const nextButton = page.locator(Selectors.next_page_btn);
    if (await nextButton.isEnabled()) {
      await nextButton.click();
      await page.waitForLoadState("networkidle");
    } else {
      break;
    }
  } while (true);
  const wholeWidgetTotal = Math.floor(totalFuelCost);
  const wholeTableTotal = Math.floor(tableTotal);
  // expect(wholeTableTotal).toBe(wholeWidgetTotal);   FIX REQUIRED

  //Total Volume
  await expect(page.locator(Selectors.widget_text).nth(1)).toBeVisible();

  const widgetText_2 = await page
    .locator(Selectors.widget_text)
    .nth(1)
    .textContent();
  const volumeTotal = parseFloat(widgetText_2?.replace(/[$,]/g, "") || "0");

  let tableVolumeTotal = 0;
  do {
    const volumeCells = page.locator(Selectors.volume_cell);
    const count = await volumeCells.count();

    for (let i = 0; i < count; i++) {
      const cellText = await volumeCells.nth(i).textContent();
      const value = parseFloat(cellText?.replace(/[$,]/g, "") || "0");
      tableVolumeTotal += value;
    }

    const previousButton = page.locator(Selectors.previous_page_btn);
    if (await previousButton.isEnabled()) {
      await previousButton.click();
      await page.waitForLoadState("networkidle");
    } else {
      break;
    }
  } while (true);

  const wholeWidgetVolume = Math.floor(volumeTotal);
  const wholeTableVolume = Math.floor(tableVolumeTotal);
  expect(wholeTableVolume).toBe(wholeWidgetVolume);

  //Avg Fuel Economy(distance/hours)
  await expect(page.locator(Selectors.widget_text).nth(2)).toBeVisible();
  await expect(page.locator(Selectors.widget_text).nth(3)).toBeVisible();

  const widgetText_3 = await page
    .locator(Selectors.widget_text)
    .nth(2)
    .textContent();
  const fuelEconomyTotal = parseFloat(
    widgetText_3?.replace(/[$,]/g, "") || "0"
  );

  let fuelEconomyTableTotal = 0;
  do {
    const fuelEconomyCells = page.locator(Selectors.fuel_economy_cell);
    const count = await fuelEconomyCells.count();

    for (let i = 0; i < count; i++) {
      const cellText = await fuelEconomyCells.nth(i).textContent();
      const value = parseFloat(cellText?.replace(/[$,]/g, "") || "0");
      fuelEconomyTableTotal += value;
    }

    const nextButton = page.locator(Selectors.next_page_btn);
    if (await nextButton.isEnabled()) {
      await nextButton.click();
      await page.waitForLoadState("networkidle");
    } else {
      break;
    }
  } while (true);

  const fuelEcWidgetTotal = Math.floor(fuelEconomyTotal);
  const fuelEcTableTotal = Math.floor(fuelEconomyTableTotal);

  // expect(fuelEcTableTotal).toBe(fuelEcWidgetTotal);   FIX REQUIRED
});
