// import { test, expect } from "@playwright/test";
// import { Selectors } from "./Selectors";
// import { screenSize } from "../../../../../constants/links";

// const randomOption = Math.floor(Math.random() * 3);

// test("EF-236__Individual Service History Functionality", async ({ page }) => {
//   await page.setViewportSize(screenSize);
//   await page.goto("/service-history");

//   await page.locator(Selectors.three_dots_menu).nth(2).click();
//   await page.locator(Selectors.edit_btn).nth(1).click();

//   await page.locator(Selectors.select_container).first().click();
//   await page.getByRole("option").nth(randomOption).click();

//   await page.locator(Selectors.nearest_vendors_close).first().click();

//   await page.locator(Selectors.select_field2).click();
//   await page.getByRole("option").nth(randomOption).click();

//   await expect(page.locator(Selectors.modal_window)).toBeVisible();

//   const vendors = page.locator(Selectors.vendors);
//   const count = await vendors.count();

//   if (count > 0) {
//     const randomIndex = Math.floor(Math.random() * count);
//     const randomVendor = vendors.nth(randomIndex);

//     const selectedVendorName = await randomVendor.innerText();

//     await randomVendor.scrollIntoViewIfNeeded();
//     await expect(randomVendor).toBeVisible();
//     await randomVendor.click();
//   }

//   await page.locator(Selectors.completion_date).fill("2025-04-21");
//   await page.locator(Selectors.completion_time).fill("12:15");
//   const dropdown = page.locator(Selectors.payment_type);

//   await dropdown.scrollIntoViewIfNeeded();
//   await dropdown.click();

//   await page.getByRole("option", { name: "cash" }).click();
//   await page.locator(Selectors.save_button).click();
//   await page.waitForTimeout(1000);
//   // await expect(page.locator('tr:has-text("2025-04-21")').first()).toBeVisible();
//   await page.locator(Selectors.three_dots_menu).nth(1).click();
//   await page.locator(Selectors.delete_btn).nth(0).click();
//   await page.locator(Selectors.delete_form_btn).nth(1).click();
//   await expect(page.locator(Selectors.toast_msg)).toHaveText(
//     "Service history successfully deleted"
//   );
// });

import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { screenSize, URLs } from "../../../../../constants/links";

const randomOption = Math.floor(Math.random() * 3);

test("EF-236__Individual Service History Functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);
  await page.goto(URLs.serviceHistory);

  await page.locator(Selectors.three_dots_menu).nth(2).click();
  await page.getByRole("menuitem", { name: "Delete" }).click();
  await page.getByRole("button", { name: "Delete" }).click();
  await page
    .getByText("Service History successfully deleted")
    .waitFor({ state: "visible" });
  //await page.locator(Selectors.edit_btn).nth(1).click();
  // await page.waitForTimeout(1000);

  // await page.locator(Selectors.select_value).nth(0).click();
  // await page.getByRole("option").nth(randomOption).click();
  // await page
  //   .locator("div")
  //   .filter({ hasText: /^Nearest vendors$/ })
  //   .locator("div")
  //   .click();

  // for (let i = 1; i < 5; i++) {
  //   await page.locator(Selectors.select_value).nth(i).click();
  //   await page.waitForTimeout(300);
  //   await page.getByRole("option").nth(randomOption).click();
  // }

  // await page.locator(Selectors.select_value).nth(7).click();
  // await page.getByRole("option").nth(0).click();

  // await page.locator(Selectors.select_value).nth(8).click();
  // await page.getByRole("option").nth(randomOption).click();
  // await page
  //   .getByRole("button", { name: "Save Service Entry" })
  //   .scrollIntoViewIfNeeded();
  // await page.getByRole("button", { name: "Save Service Entry" }).click();
  // await page.getByRole("cell").nth(7).click();
});
