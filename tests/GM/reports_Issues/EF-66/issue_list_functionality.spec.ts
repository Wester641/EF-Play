import { test, expect } from "@playwright/test";
import { URLs, screenSize } from "../../../../constants/links";
import { Selectors } from "./Selectors";

test("EF-66__issue_list_functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);
  await page.goto(URLs.dashboard);
  //   location;
  await page
    .locator("div")
    .filter({ hasText: /^Reports$/ })
    .click();
  await page.getByText("Issues2").click();
  await page.getByText(Selectors.list_of_issuesA).click();

  // check search fields
  await expect(page.locator(Selectors.search_bar)).toBeVisible();

  //   Verify dropdown filter options: Open, Overdue, Resolved
  //   1
  await page
    .locator("div")
    .filter({ hasText: /^Issue Status$/ })
    .nth(3)
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^Open$/ })
    .click();
  await page.getByRole("button", { name: "Apply" }).click();

  //   2
  await page
    .locator("div")
    .filter({ hasText: /^Open$/ })
    .nth(3)
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^Overdue$/ })
    .click();
  await page.getByRole("button", { name: "Apply" }).click();
  await expect(
    page
      .locator("#root div")
      .filter({ hasText: "IssueStatusSummaryReported" })
      .nth(4)
  ).toBeVisible();
  // 3
  await page.locator(Selectors.blockText).click();
  await page
    .locator("div")
    .filter({ hasText: /^Resolved$/ })
    .click();
  await page.getByRole("button", { name: "Apply" }).click();
  await expect(
    page
      .locator("#root div")
      .filter({ hasText: "IssueStatusSummaryReported" })
      .nth(4)
  ).toBeVisible();
  // 4

  //   Verify the presence of widgets: Issues By Status and Top 5 Vehicles with Most Issues, with switch toggles and charts
  await expect(page.getByText(Selectors.issues)).toBeVisible();
  await expect(page.getByText(Selectors.vehicles)).toBeVisible();

  //   Verify the table below with headers: Issue, Status, Summary, Reported By, Assigned, Due Date, Vehicle
  await expect(
    page
      .locator("#root div")
      .filter({ hasText: "IssueStatusSummaryReported" })
      .nth(4)
  ).toBeVisible();
  await expect(page.getByRole("columnheader", { name: "Issue" })).toBeVisible();
  await expect(
    page.getByRole("columnheader", { name: "Status" })
  ).toBeVisible();
  await expect(
    page.getByRole("columnheader", { name: "Summary" })
  ).toBeVisible();
  await expect(
    page.getByRole("columnheader", { name: "Reported By" })
  ).toBeVisible();
  await expect(
    page.getByRole("columnheader", { name: "Assigned" })
  ).toBeVisible();
  await expect(
    page.getByRole("columnheader", { name: "Due Date" })
  ).toBeVisible();
  await expect(
    page.getByRole("columnheader", { name: "Vehicle" })
  ).toBeVisible();

  // Enter an invalid search term
  await page.locator(Selectors.search_bar).fill("sdfsdf");
  await page.waitForTimeout(2000);
  await page.locator(Selectors.search_bar).fill("");
});

// FIX
