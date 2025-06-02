import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs, screenSize } from "../../../../../constants/links";

test("EF-62__failed_inspections_functionality.", async ({ page }) => {
  await page.setViewportSize(screenSize);
  await page.goto(URLs.dashboard);

  await page
    .locator("div")
    .filter({ hasText: /^Reports$/ })
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

  await expect(
    page.getByRole("button").filter({ hasText: /^$/ }).nth(1)
  ).toBeVisible();

  await page
    .locator("div")
    .filter({ hasText: /^Select range$/ })
    .nth(1)
    .click();
  await page.getByText("Today").click();

  await page.getByRole("checkbox").click();
  await page.getByRole("checkbox").click();

  for (const check_lower_part of Selectors.header) {
    await expect(
      page.getByRole("columnheader", { name: check_lower_part })
    ).toBeVisible();
  }
});
