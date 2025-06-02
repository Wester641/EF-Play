import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs, screenSize } from "../../../../../constants/links";

test("EF-63__list_of_inspections_functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);
  await page.goto(URLs.dashboard);
  await page
    .locator("div")
    .filter({ hasText: /^Reports$/ })
    .first()
    .click();
  await page.getByText("Inspections3").click();
  await page.getByText(Selectors.list_of_inspectionsa).click();

  await expect(page.locator(Selectors.search_fields)).toBeVisible();

  await expect(
    page
      .locator("div")
      .filter({ hasText: /^Vehicle$/ })
      .nth(1)
  ).toBeVisible();
  await expect(
    page
      .locator("div")
      .filter({ hasText: /^All Submission$/ })
      .nth(1)
  ).toBeVisible();
  await expect(
    page
      .locator("div")
      .filter({ hasText: /^Inspection Form$/ })
      .nth(1)
  ).toBeVisible();
  await expect(page.getByRole("button").nth(1)).toBeVisible();

  await page
    .locator("div")
    .filter({ hasText: /^All Submission$/ })
    .nth(1)
    .click();
  await page.getByText("All Submissions").click();
  await page.getByRole("button", { name: "Apply" }).click();

  for (const header of Selectors.headers) {
    await expect(
      page.getByRole("columnheader", { name: header })
    ).toBeVisible();
  }
});
