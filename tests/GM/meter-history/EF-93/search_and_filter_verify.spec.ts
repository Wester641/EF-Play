import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs, screenSize } from "../../../../constants/links";

test("EF-93__Verify Search Field and Vehicle Filter", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.meterHistory);

  await page.waitForTimeout(2000);

  // Add styling
  await page.addStyleTag({
    content: `
      ${Selectors.searchField},
      ${Selectors.vehicleFilter} {
        background-color: #7d9ec087 !important; 
        border: 1px solid #7d9ec087 !important;      
      }`,
  });

  await page.waitForTimeout(500);

  // Remove styling
  await page.addStyleTag({
    content: `
      ${Selectors.searchField},
      ${Selectors.vehicleFilter} {
        background-color: transparent !important;
        border: none !important;
      }`,
  });

  await page.waitForTimeout(2000);

  const allRows = await page.locator(Selectors.dataRow).all();

  const allCellNames: string[] = [];

  const allMeterValues: string[] = [];

  for (const row of allRows) {
    const nameCell = row.locator(Selectors.dataCell).first();

    const meterCell = row.locator(Selectors.dataCell).nth(2);

    const cellText = await nameCell.innerText();

    const cellMeter = await meterCell.innerText();

    allCellNames.push(cellText);

    allMeterValues.push(cellMeter);
  }

  expect(allCellNames.length).toBe(10);

  expect(allMeterValues.length).toBe(10);

  const randomName =
    allCellNames[Math.floor(Math.random() * allCellNames.length)];

  const randomMeterValue =
    allMeterValues[Math.floor(Math.random() * allMeterValues.length)];

  await expect(page.locator(Selectors.searchField)).toBeVisible();

  await page.locator(Selectors.searchField).fill(String(randomMeterValue));

  await expect(
    page.getByRole("cell", { name: randomMeterValue, exact: true }).first()
  ).toHaveText(String(randomMeterValue));

  await page.locator(Selectors.searchField).fill("");

  await page.waitForTimeout(3000);

  await page.locator(Selectors.vehicleFilter).click();

  await page.locator(Selectors.searchVehicleField).fill(randomName);

  await page.waitForTimeout(3000);

  const allVehicleResults = await page
    .locator(Selectors.vehicleFilterResult)
    .all();

  for (const currentRow of allVehicleResults) {
    const text = await currentRow.innerText();
    if (text === String(randomName)) {
      await currentRow.click();
      break;
    }
  }

  await page.getByRole("button", { name: "Apply" }).click();

  await page.waitForTimeout(3000);

  await expect(
    page.getByRole("cell", { name: randomName, exact: true }).first()
  ).toHaveText(randomName);
});
