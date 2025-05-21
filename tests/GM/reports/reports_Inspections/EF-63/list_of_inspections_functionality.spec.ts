import { test, expect } from "@playwright/test";
import { URLs, screenSize } from "../../../../../constants/links";
// import { Selectors } from "./Selectors";

test("EF-63__list_of_inspections_functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);
  await page.goto(URLs.dashboard);

  //   location;
  await page
    .locator("div")
    .filter({ hasText: /^Reports$/ })
    .click();
  await page.getByText("Inspections3").click();
  await page
    .getByText(
      "List of InspectionsA list of all inspections registered.Inspections"
    )
    .click();

  // Verify the presence of a search field at the top left
  await expect(page.locator('input[type="text"]')).toBeVisible();

  //   Verify the dropdown filters: Vehicle, All Submission, Inspection Form, Date Range
  // 1
  await page
    .locator("div")
    .filter({ hasText: /^Vehicle$/ })
    .nth(1)
    .click();
  await page.getByText("83", { exact: true }).click();
  await page.getByRole("button", { name: "Apply" }).click();

  //   2
  await page
    .locator("div")
    .filter({ hasText: /^All Submission$/ })
    .nth(1)
    .click();
  await page
    .locator(
      ".ModalFiltersStaticOptions_blockFiltering__trueModal_inModal_paddingModal_flexElement__wsEA4"
    )
    .first()
    .click();
  await page.getByRole("button", { name: "Apply" }).click();
  // 3

  await page
    .locator("div")
    .filter({ hasText: /^Inspection Form$/ })
    .nth(1)
    .click();
  await page.getByText("fs").click();
  await page.getByRole("button", { name: "Apply" }).click();

  //   www
  await page.waitForTimeout(10000);
});

// FIX
