// import { test, expect } from "@playwright/test";
// import { screenSize, URLs } from "../../../../../constants/links";
// import { Selectors, today } from "./Selectors";

// test("EF-247__Add Work Order Functionality", async ({ page }) => {
//   await page.setViewportSize(screenSize);
//   await page.goto(URLs.workOrders);

//   await page.waitForTimeout(3000);

//   await page.locator(Selectors.addButton).click();

//   await page.waitForTimeout(2000);

//   await page.locator(Selectors.inputField).nth(0).click();

//   await page.waitForTimeout(1000);

//   const allVehicles = await page.getByRole("option").all();

//   const randomVehicle =
//     allVehicles[Math.floor(Math.random() * allVehicles.length)];

//   const randomVehicleText = await randomVehicle.innerText();
//   const parts = randomVehicleText.split(" - ");
//   const vehicleName = parts[0];

//   await randomVehicle.click();

//   await page.waitForTimeout(2000);

//   await expect(page.getByText("Nearest vendors").first()).toBeVisible();

//   const allVendors = await page.locator(Selectors.vendor).all();

//   const randomVendor = await allVendors[
//     Math.floor(Math.random() * allVendors.length)
//   ];

//   await randomVendor.click();

//   await page.waitForTimeout(1000);

//   await page.locator(Selectors.inputField).nth(1).click();

//   await page.waitForTimeout(1000);

//   const allStatuses = await page.getByRole("option").all();

//   const randomStatus =
//     allStatuses[Math.floor(Math.random() * allStatuses.length)];

//   const statusName = await randomStatus.innerText();

//   await randomStatus.click();

//   await page.waitForTimeout(1000);

//   await page.locator(Selectors.inputField).nth(2).click();

//   await page.waitForTimeout(1000);

//   const allPriorityClasses = await page.getByRole("option").all();

//   const randomClass =
//     allPriorityClasses[Math.floor(Math.random() * allPriorityClasses.length)];

//   const className = await randomClass.innerText();

//   await randomClass.click();

//   await page.waitForTimeout(1000);

//   await page.getByText("Save Work Order").first().click();

//   await page.waitForTimeout(1000);

//   await expect(
//     page.getByText("Work order successfully created!").first()
//   ).toBeVisible();

//   await page.waitForTimeout(2000);

//   const firstRow = page.locator(Selectors.dataRow).first();

//   await expect(firstRow.locator("td").nth(0)).toHaveText(vehicleName);
//   await expect(firstRow.locator("td").nth(2)).toHaveText(statusName);
//   await expect(firstRow.locator("td").nth(3)).toHaveText(
//     className.toLowerCase()
//   );
// });
import { expect, test } from "@playwright/test";
import { Selectors } from "./Selectors";
import { screenSize, URLs } from "../../../../../constants/links";

// Helper functions
const clickNearestVendorIcon = async (page) => {
  await page
    .locator("div")
    .filter({ hasText: /^Nearest Vendor$/ })
    .getByRole("img")
    .click();
};
const odometerReadingMsg = async (page) => {
  await page
    .getByText("There is no odometer reading for this vehicle")
    .waitFor({ state: "hidden" });
};

const randomOption = Math.floor(Math.random() * 3);

test("EF-247__Add work order functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);
  await page.goto(URLs.workOrders);

  await page.getByText("Add Work order").click();

  await page.locator(Selectors.select_value).nth(0).click();
  await page.getByRole("option").nth(randomOption).click();
  await odometerReadingMsg(page);
  await clickNearestVendorIcon(page);

  for (let i = 1; i < 5; i++) {
    await page.locator(Selectors.select_value).nth(i).click();
    await page.waitForTimeout(2000);
    await page.getByRole("option").nth(randomOption).click();
  }

  await page.locator(Selectors.select_value).nth(8).click();
  await page.getByRole("option").nth(randomOption).click();

  await page.getByRole("button", { name: "Save Work Order" }).click();
  await expect(
    page.getByText("Work order successfully created!")
  ).toBeVisible();
  await page.getByRole("cell").nth(7).click();
});
