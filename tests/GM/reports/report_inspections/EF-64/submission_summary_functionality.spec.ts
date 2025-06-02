import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs, screenSize } from "../../../../../constants/links";

test("EF-64__submission_summary_functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);
  await page.goto(URLs.dashboard);
  await page
    .locator("div")
    .filter({ hasText: /^Reports$/ })
    .first()
    .click();
  await page.getByText("Inspections3").click();
  await page.getByText(Selectors.submission_summarya).click();

  await expect(page.locator(Selectors.search_fields)).toBeVisible();

  await expect(
    page
      .locator("div")
      .filter({ hasText: /^Select range$/ })
      .nth(1)
  ).toBeVisible();

  await expect(
    page
      .locator("div")
      .filter({ hasText: /^Inspection Form$/ })
      .nth(1)
  ).toBeVisible();

  await page
    .locator("div")
    .filter({ hasText: /^Select range$/ })
    .nth(1)
    .click();

  await page.getByText("Today").click();

  await page.getByRole("checkbox").click();
  await page.getByRole("checkbox").click();

  await expect(page.getByRole("columnheader", { name: "Name" })).toBeVisible();
  await expect(
    page.getByRole("columnheader", { name: "Submission Count" })
  ).toBeVisible();
  await expect(
    page.getByRole("columnheader", { name: "Forms Count" })
  ).toBeVisible();
  await expect(
    page.getByRole("columnheader", { name: "Average Duration" })
  ).toBeVisible();
});
