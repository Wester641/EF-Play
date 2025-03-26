import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs, screenSize } from "../../../../constants/links";

test("EF-93__Verify Search Field and Vehicle Filter", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.meterHistory);

  const apiResponse = await page.waitForResponse(
    (response) =>
      response
        .url()
        .includes(
          "https://app.easyfleet.ai/api/v1/vehicles/meter-entity/?offset=0&limit=10"
        ) && response.status() === 200
  );

  const apiResponseData = await apiResponse.json();

  const meterValues = apiResponseData.results
    .map((item) => item.meter_value)
    .filter(Boolean);

  const randomMeterValue =
    meterValues[Math.floor(Math.random() * meterValues.length)];

  const vehicles = apiResponseData.results
    .map((item) => item.vehicle?.name)
    .filter(Boolean);

  const filteredVehicles = vehicles.filter(
    (vehicle) => !vehicle.includes("Truck")
  ); // Except "Truck..." vehicles due to Bug with filter

  const randomVehicle =
    filteredVehicles[Math.floor(Math.random() * filteredVehicles.length)];

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

  await page.waitForTimeout(3000);

  await expect(page.locator(Selectors.searchField)).toBeVisible();

  await page.locator(Selectors.searchField).fill(String(randomMeterValue));

  await expect(
    page.getByRole("cell", { name: randomMeterValue, exact: true }).first()
  ).toHaveText(String(randomMeterValue));

  await page.locator(Selectors.searchField).fill("");

  await page.waitForTimeout(3000);

  await page.locator(Selectors.vehicleFilter).click();

  await page.locator(Selectors.searchVehicleField).fill(randomVehicle);

  await page.waitForTimeout(3000);

  await page.locator(Selectors.vehicleFilterResult).first().click();

  await page.getByRole("button", { name: "Apply" }).click();

  await expect(
    page.getByRole("cell", { name: randomVehicle, exact: true }).first()
  ).toHaveText(randomVehicle);
});
