import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs, screenSize } from "../../../../constants/links";
import { format } from "path";

test("EF-97__Verify 'Add Meter Entry' Button and Widget Functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);
  
  await page.goto(URLs.meterHistory);

  const apiResponse = await page.waitForResponse(
    (response) =>
      response.url().includes("https://app.easyfleet.ai/api/v1/vehicles/meter-entity/?offset=0&limit=10") &&
      response.status() === 200
  );

  const apiResponseData = await apiResponse.json();

  const vehicles = apiResponseData.results.map(item => item.vehicle?.name).filter(Boolean);

  const filteredVehicles = vehicles.filter(vehicle => !vehicle.includes("Truck", "User")); // Except "Truck..." vehicles due to Bug with filter

  const randomVehicle = filteredVehicles[Math.floor(Math.random() * filteredVehicles.length)];

  await page.waitForTimeout(500);

  // Add styling
  await page.addStyleTag({
    content: `
      ${Selectors.searchInput},
      ${Selectors.dataCells},
      ${Selectors.addButton} {
        background-color: #7d9ec087 !important; 
        border: 1px solid #7d9ec087 !important;      
      }`,
  });

  await page.waitForTimeout(500);

  // Remove styling
  await page.addStyleTag({
    content: `
      ${Selectors.searchInput},
      ${Selectors.dataCells},
      ${Selectors.addButton} {
        background-color: transparent !important;
        border: none !important;
      }`,
  });

  await page.waitForTimeout(3000);

  await page.locator(Selectors.searchInput).fill(randomVehicle);

  await page.waitForTimeout(500);

  await expect(page.locator(Selectors.dataCells).nth(0)).toContainText(randomVehicle);

  await page.locator(Selectors.addButton).nth(1).click();

  await page.waitForTimeout(3000);

  await expect(page.locator(Selectors.addMenu)).toBeVisible();  

  await page.click(Selectors.vehicleInput);

  await page.waitForTimeout(3000);

  const options = await page.locator(Selectors.dropdownOptions).all();

  const randomIndex = Math.floor(Math.random() * options.length);

  await options[randomIndex].click();

  const randomMeter = Math.floor(Math.random() * (50000 - 10000 + 1)) + 10000;

  await expect(async () => {
    await page.locator(Selectors.valueInput).nth(0).fill("text");
  }).rejects.toThrow(/Cannot type text into input\[type=number\]/);

  await page.locator(Selectors.valueInput).nth(0).fill(String(randomMeter));

  await expect(page.locator(Selectors.valueInput).nth(0)).toHaveValue(String(randomMeter));

  await page.click(Selectors.voidInput);

  const today = new Date();

  const year = today.getFullYear();

  const month = String(today.getMonth() + 1).padStart(2, '0');

  const day = String(today.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;

  await page.locator(Selectors.valueInput).nth(1).fill(formattedDate);

  await page.waitForTimeout(500);

  await expect(page.locator(Selectors.valueInput).nth(1)).toHaveValue(formattedDate);

  await page.click(Selectors.saveButton);

  await page.waitForTimeout(1000);

  await expect(page.locator(Selectors.successAlert)).toBeVisible();

  await expect(page.locator(Selectors.successAlert)).toContainText("Meter Entry is added!");


  await page.locator(Selectors.addButton).nth(1).click();

  await page.waitForTimeout(3000);

  await page.click(Selectors.vehicleInput);

  await options[randomIndex].click();

  await page.waitForTimeout(1000);

  await page.locator(Selectors.valueInput).nth(0).fill(String(randomMeter));

  await page.click(Selectors.voidInput);

  await page.locator(Selectors.valueInput).nth(1).fill(formattedDate);

  await page.waitForTimeout(500);

  await page.click(Selectors.cancelButton);

  await page.waitForTimeout(1000);

  await expect(page.locator(Selectors.successAlert)).not.toBeVisible();
});