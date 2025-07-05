import { expect, test } from "@playwright/test";
test.use({ storageState: ".auth/login.json" });

import { Selectors } from "./Selectors";
import { screenSize, URLs } from "../../../../../constants/links";

// Helper function for dropdowns
async function selectRandomDropdnOpt(page, dropdownLocator) {
  await dropdownLocator.click();
  await page.waitForSelector('[role="option"]', { timeout: 3000 });

  const options = page.getByRole("option");
  const optionCount = await options.count();

  if (optionCount === 0) {
    throw new Error("No options found after opening dropdown");
  }

  const randomIndex = Math.floor(Math.random() * optionCount);
  await options.nth(randomIndex).click();
}

test("EF-220__Add service history functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);
  await page.goto(URLs.serviceHistory);

  await page.getByText("Add Service Entry").click();

  await selectRandomDropdnOpt(
    page,
    page.locator(Selectors.select_value).first()
  );

  await page
    .getByText("There is no odometer reading for this vehicle")
    .waitFor({ state: "hidden" });

  await page
    .locator("div")
    .filter({ hasText: /^Nearest Vendor$/ })
    .getByRole("img")
    .click();

  const dropdownGroup = page.locator(Selectors.select_value).nth(1);
  const groupCount = await dropdownGroup.count();

  for (let i = 0; i < groupCount; i++) {
    await selectRandomDropdnOpt(page, dropdownGroup.nth(i));
  }

  await selectRandomDropdnOpt(
    page,
    page.locator(Selectors.select_value).nth(8)
  );

  await page.getByRole("button", { name: "Save Service Entry" }).click();

  await page
    .getByText("Service History successfully created")
    .waitFor({ state: "visible" });
});
