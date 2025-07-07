import { test, expect } from "@playwright/test";
import { screenSize, URLs } from "../../../../../constants/links";
import { Selectors, today } from "./Selectors";

// Helper functions
const clickNearestVendorIcon = async (page) => {
  await page
    .locator("div")
    .filter({ hasText: /^Nearest Vendor$/ })
    .getByRole("img")
    .click();
};

const selectRandomOptionFromInput = async (page, inputIndex: number) => {
  await page.locator(Selectors.inputField).nth(inputIndex).click();
  await page.waitForSelector('[role="option"]');
  const options = await page.getByRole("option").all();
  const random = options[Math.floor(Math.random() * options.length)];
  await random.click();
};
const odometerReadingMsg = async (page) => {
  await page
    .getByText("There is no odometer reading for this vehicle")
    .waitFor({ state: "hidden" });
};

test("EF-246__Editing_Work Order_Functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);
  await page.goto(URLs.workOrders);
  await page.waitForTimeout(500);

  await page.locator(Selectors.work_order).first().click();
  await page.waitForTimeout(500);

  await page.getByText("Edit").nth(0).click();
  await odometerReadingMsg(page);
  await clickNearestVendorIcon(page);

  // Vehicle
  await selectRandomOptionFromInput(page, 0);
  await clickNearestVendorIcon(page);
  // Status
  await selectRandomOptionFromInput(page, 1);
  // Priority
  await selectRandomOptionFromInput(page, 2);
  await page.waitForTimeout(1000);

  // Date and Time
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  const formattedDate = `${year}-${month}-${day}`;

  const minutes = String(today.getMinutes()).padStart(2, "0");
  const hours = String(today.getHours()).padStart(2, "0");
  const formattedTime = `${hours}:${minutes}`;

  await page.locator(Selectors.dateInput).nth(5).fill(formattedDate);
  await page.locator(Selectors.dateInput).nth(6).fill(formattedTime);

  // Submit button
  await page.getByText("Edit Work Order").first().click();

  // await page
  //   .getByText("Work order successfully updated!")
  //   .waitFor({ state: "visible" });

  // await expect(
  //   page.getByText("Work order successfully updated!").first()
  // ).toBeVisible();

  // Add vehicle name expect as soon as possible !!!

  // const vehicleText = await randomVehicle.innerText();
  // await expect(page.getByText(vehicleText).first()).toBeVisible();

  // await expect(page.getByText(className).first()).toBeVisible();

  // await expect(page.getByText(firstVendorText).first()).toBeVisible();
});
