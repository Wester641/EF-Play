import { test } from "@playwright/test";
import { screenSize, URLs } from "../../../../../constants/links";
import { Selectors } from "./Selectors";

const randomNumber = Math.floor(Math.random() * 10000);

test("EF-255__verify_add_par_functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);
  await page.goto(URLs.partsPage);
  const randomOption = Math.floor(Math.random() * 3);

  await page.locator(Selectors.addPartButton).click();
  await page
    .locator(Selectors.partNumberInput)
    .fill(`part number: ${randomNumber}`);
  await page.locator(Selectors.descriptionInput).fill("rfrf");

  await page.locator(Selectors.firstDropdown).first().click();
  await page.getByRole("option").nth(randomOption).click();

  await page.locator(Selectors.fifthDropdown).click();
  await page.getByRole("option").nth(randomOption).click();

  await page.locator(Selectors.manufacturerPartNumberInput).fill("1212");
  await page.locator(Selectors.upcInput).fill("dfdf");
  await page.locator(Selectors.unitCostInput).fill("1212");

  await page.locator(Selectors.manufacturerDetailsDropdown).click();
  await page.getByRole("option").nth(0).click();

  await page.locator(Selectors.secondFormDropdown).click();
  await page.getByRole("option").nth(0).click();

  await page.locator(Selectors.locationAisleInput).fill("12");
  await page.locator(Selectors.locationRowInput).fill("12");
  await page.locator(Selectors.locationBinInput).fill("12");

  await page
    .locator("div")
    .filter({ hasText: Selectors.addVendorButton.text })
    .click();

  await page.locator(Selectors.purchaseVendorDropdown).click();
  await page.getByRole("option").nth(randomOption).click();

  await page.getByRole("textbox", { name: "0" }).fill("12");
  await page.getByRole("button", { name: "Choose date" }).click();
  await page.getByRole("gridcell", { name: "20" }).click();
  await page.getByRole("button", { name: "Save" }).click();
});
