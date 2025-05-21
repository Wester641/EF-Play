import { test, expect } from "@playwright/test";
import { URLs, screenSize } from "../../../../../constants/links";

import { Selectors } from "./Selectors";

test("EF-62__failed_inspections_functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);
  await page.goto(URLs.dashboard);

  //   location;
  await page
    .locator("div")
    .filter({ hasText: /^Reports$/ })
    .click();
  await page.getByText("Inspections3").click();
  await page.getByText(Selectors.failed_inspectionsa).click();

  // Verify the presence of a search field at the top left
  await expect(page.locator(Selectors.search)).toBeVisible();

  await page
    .locator("div")
    .filter({ hasText: /^Inspector$/ })
    .nth(1)
    .click();
  await page.getByText(Selectors.location_name).first().click();
  await page.getByRole("button", { name: "Apply" }).click();
  await page
    .locator("div")
    .filter({ hasText: /^Inspection Form$/ })
    .nth(1)
    .click();
  await page.getByText("PTI").click();
  await page.getByRole("button", { name: "Apply" }).click();
  await page
    .locator("div")
    .filter({ hasText: /^Select range$/ })
    .nth(1)
    .click();
  await page.getByText("Today").click();

  // Verify the presence of two widgets: Most Failed Items and Most Failed Vehicles, with round charts and switch toggles

  await expect(
    page
      .locator("div")
      .filter({ hasText: /^Most Failed ItemsOFF\/ON$/ })
      .first()
  ).toBeVisible();

  await expect(page.locator(Selectors.reportsinspection)).toBeVisible();

  //   Verify the table below with headers: Date, Submission, Form, Item, Stage, Vehicle

  await expect(page.getByRole("columnheader", { name: "Date" })).toBeVisible();
  await expect(
    page.getByRole("columnheader", { name: "Submission" })
  ).toBeVisible();
  await expect(page.getByRole("columnheader", { name: "Form" })).toBeVisible();
  await expect(page.getByRole("columnheader", { name: "Item" })).toBeVisible();
  await expect(page.getByRole("columnheader", { name: "Stage" })).toBeVisible();
  await expect(
    page.getByRole("columnheader", { name: "Vehicle" })
  ).toBeVisible();

  await page.waitForTimeout(5000);
});

// FIX
