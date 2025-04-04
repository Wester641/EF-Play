import { test, expect } from "@playwright/test";
import { screenSize, URLs } from "../../../../../constants/links";
import { Selectors, today } from "./Selectors";

test("EF-246__Editing 'Work Order' Functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);
  await page.goto(URLs.workOrders);

  await page.waitForTimeout(500);

  await page.locator(Selectors.work_order).first().click();

  await page.waitForTimeout(500);

  expect(await page.locator(Selectors.detailsBlock).count()).toEqual(4);

  await page.getByText("Edit").nth(0).click();

  await page.waitForTimeout(2000);

  await page.locator(Selectors.inputField).nth(0).click();

  await page.waitForTimeout(1000);

  const allVehicles = await page.getByRole('option').all();

  const randomVehicle = allVehicles[Math.floor(Math.random() * allVehicles.length)];

  await randomVehicle.click();

  await page.waitForTimeout(2000);

  await expect(page.getByText("Nearest vendors").first()).toBeVisible();

  const allVendors = await page.locator(Selectors.vendor).all();

  const randomVendor = await allVendors[Math.floor(Math.random() * allVendors.length)]

  const vendorName = await randomVendor.innerText();

  const vendorNameParts = vendorName.split('\n');

  const firstVendorText = vendorNameParts[0];

  await randomVendor.click(); 

  await page.waitForTimeout(1000);

  await page.locator(Selectors.inputField).nth(2).click();

  await page.waitForTimeout(1000);

  const allPriorityClasses = await page.getByRole('option').all();

  const randomClass = allPriorityClasses[Math.floor(Math.random() * allPriorityClasses.length)]

  const className = await randomClass.innerText();

  await randomClass.click();

  await page.waitForTimeout(1000);

  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  const formattedDate = `${year}-${month}-${day}`;
  
  const minutes = String(today.getMinutes()).padStart(2, "0");
  const hours = String(today.getHours()).padStart(2, "0");
  const formattedTime = `${hours}:${minutes}`;
  
  await page.locator(Selectors.dateInput).nth(5).fill(formattedDate);

  await page.locator(Selectors.dateInput).nth(6).fill(formattedTime);

  await page.getByText("Edit Work Order").first().click();

  await page.waitForTimeout(1000);

  await expect(page.getByText("Work order successfully updated!").first()).toBeVisible();

  await page.waitForTimeout(2000);

  // Add vehicle name expect as soon as possible !!!

  // const vehicleText = await randomVehicle.innerText();
  // await expect(page.getByText(vehicleText).first()).toBeVisible();

  await expect(page.getByText(className).first()).toBeVisible();
  
  await expect(page.getByText(firstVendorText).first()).toBeVisible();
});
