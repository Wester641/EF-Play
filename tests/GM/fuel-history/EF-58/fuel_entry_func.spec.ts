import { test, expect, Locator } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs, screenSize } from "../../../../constants/links";


test("EF-58__Fuel Entry Functionality", async ({ page }) => {
  await page.goto(URLs.fuelHistory);
  await page.setViewportSize(screenSize);

  await page.waitForTimeout(3000);

  await page.locator(Selectors.add_fuel_entry_btn).click();

  await page.waitForTimeout(3000);

  await expect(page.getByRole("heading", { name: "Detail" })).toBeVisible();

  await page.locator(Selectors.select_input).nth(0).click();

  await page.waitForTimeout(3000);
  const allVehicles = await page.getByRole("option").all();
  const randomVehicle = allVehicles[Math.floor(Math.random() * allVehicles.length)];
  await randomVehicle.click();

  await page.locator(Selectors.select_input).nth(1).click();

  await page.waitForTimeout(3000);
  const allVendors = await page.getByRole("option").all();
  const randomVendor = allVendors[Math.floor(Math.random() * allVendors.length)];
  await randomVendor.click();

  const randomOdometer = String(Math.floor(Math.random() * 5000));
  await page.locator(Selectors.odometer_input).fill(randomOdometer);
  
  const randomGallons = String(Math.floor(Math.random() * 500));
  await page.locator(Selectors.gallons_input).fill(randomGallons);

  const randomPrice = String(Math.floor(Math.random() * 50));
  await page.locator(Selectors.gallon_price_input).fill(randomPrice);

  const randomFuelType = "diesel";
  await page.locator(Selectors.fuel_type_input).fill(randomFuelType);

  await page.locator(Selectors.submit_btn).click();

  await page.waitForTimeout(1000);

  await expect(page.locator(Selectors.toast_msg)).toBeVisible();

  await expect(page.getByText(/fuel history successfully/i)).toBeVisible();


  await page.waitForTimeout(3000);

  await page.locator(Selectors.add_fuel_entry_btn).click();

  await expect(page.getByRole("heading", { name: "Detail" })).toBeVisible();

  //Future date for fuel entry
  // await page.locator(Selectors.vehicle_input).nth(0).click();
  // const options = page.locator(Selectors.vehicle_option);
  // await expect(options.first()).toBeVisible();
  // await options.filter({ hasText: "Vehicle 14" }).first().click();
  // await page.locator(Selectors.fuel_entry_date).fill("2025-08-20");

  //Error message
  await page.locator(Selectors.select_input).nth(1).click();

  await page.waitForTimeout(3000);
  await randomVendor.click();

  await page.locator(Selectors.submit_btn).click();

  await page.waitForTimeout(1000);

  await expect(page.locator(Selectors.error_msg).nth(1)).toBeVisible();
  await expect(page.locator(Selectors.error_msg).nth(1)).toHaveText(
    "Vehicle is required!"
  );
});
