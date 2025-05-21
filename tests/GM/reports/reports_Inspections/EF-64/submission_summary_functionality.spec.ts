import { test, expect } from "@playwright/test";
import { URLs, screenSize } from "../../../../../constants/links";
// import { Selectors } from "./Selectors";

test("EF-64__submission_summary_functionality", async ({ page }) => {
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
      "Submission SummaryA summary of submitted inspections.Inspections"
    )
    .click();

  // 2
  await page.locator('input[type="text"]');

  // Verify the dropdown filters: Select Range, Inspection Form and Date Range

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

  // Verify the chart Submission by Vehicle with an ON/OFF toggle
  await page.getByRole("checkbox").click();
  await page.getByRole("checkbox").click();

  // Verify the table below the chart with headers: Name, Submission Count, Forms Count, Average Duration

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

  await page.waitForTimeout(10000);
});

// FIX
