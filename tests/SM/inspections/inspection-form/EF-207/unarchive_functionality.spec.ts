// import { test, expect } from "@playwright/test";
// import { Selectors } from "./Selectors";
// import { screenSize, URLs } from "../../../../../constants/links";

// test("EF-207__Unarchive Forms Functionality", async ({ page }) => {
//   await page.setViewportSize(screenSize);

//   await page.goto(URLs.inspectionForms);

//   await expect(page).toHaveURL(
//     "https://dev-app.easyfleet.ai/inspections/forms/"
//   );

//   await page.getByRole("tab", { name: "Archived" }).click();

//   await page
//     .locator("tbody tr")
//     .first()
//     .locator("td")
//     .last()
//     .locator("button.Meatballs_button__wNC2-")
//     .click();
//   await page.getByRole("menuitem", { name: "Unarchive" }).click();
//   await expect(page.getByText("Unarchived")).toBeVisible();
//   await page.getByRole("tab", { name: "Active" }).click();
// });

import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { screenSize, URLs } from "../../../../../constants/links";

test("EF-207__Unarchive Forms Functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(Selectors.formsURL);

  await expect(page).toHaveURL(Selectors.formsURL);

  await page.getByRole("tab", { name: "Archived" }).click();

  await page
    .locator("tbody tr")
    .first()
    .locator("td")
    .last()
    .locator(Selectors.unarchiveButton)
    .click();

  await page.getByRole("menuitem", { name: "Unarchive" }).click();

  await expect(page.getByText("Unarchived")).toBeVisible();

  await page.getByRole("tab", { name: "Active" }).click();
});
