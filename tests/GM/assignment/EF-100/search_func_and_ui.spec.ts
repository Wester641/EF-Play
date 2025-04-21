import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs, screenSize } from "../../../../constants/links";

test("EF-100__Verify Search Functionality and UI", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.assigments);

  const apiResponse = await page.waitForResponse(
    (response) =>
      response.url().includes("https://app.easyfleet.ai/api/v1/vehicles/?limit=1500") &&
      response.status() === 200
  );
  
  const apiResponseData = await apiResponse.json();
  
  const vehicleNamesAPI = apiResponseData.results
    .map(vehicle => vehicle.name)
    .filter(name => name !== "Truck");
  
  if (vehicleNamesAPI.length === 0) {
    throw new Error("No vehicles available after filtering out 'Truck'");
  }
  
  const randomVehicleFull = vehicleNamesAPI[Math.floor(Math.random() * vehicleNamesAPI.length)];
  
  const randomVehicleShort = randomVehicleFull.slice(0, Math.floor(randomVehicleFull.length / 2));
  
  const allVehiclesBefore = await page.locator(Selectors.vehicleNameRow).allTextContents();
  
  await page.waitForTimeout(3000);

  expect(vehicleNamesAPI).toEqual(expect.arrayContaining(allVehiclesBefore));
  
  await page.locator(Selectors.searchInput).click();

  await page.locator(Selectors.searchInput).fill(randomVehicleShort);

  await page.waitForTimeout(3000);
    
  // Check results on containing vehicleShortName | Will be added after bug fix

  await page.locator(Selectors.searchInput).fill(randomVehicleFull);

  await page.waitForTimeout(3000);

  await expect(page.locator(Selectors.vehicleCell).first()).toHaveText(randomVehicleFull);

  await page.locator(Selectors.searchInput).fill("");

  await page.waitForTimeout(5000);

  // const allVehiclesAfter = await page.locator(Selectors.vehicleNameRow).allTextContents();

  // console.log("All vehicles after", await page.locator(Selectors.vehicleNameRow).allTextContents());

  // Check allVehiclesAfter toBe vehicleNamesAPI | allVehiclesAfter contain randomVehicleFull

  // 123

});
