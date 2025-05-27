import { test, expect } from "@playwright/test";
import { URLs, screenSize } from "../../../../../constants/links";
import { Selectors } from "./Selectors";

test("EF-66__issue_list_functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);
  await page.goto(URLs.dashboard);
  await page
    .locator("div")
    .filter({ hasText: /^Reports$/ })
    .click();
  await page.getByText("Issues2").click();
  await page.getByText(Selectors.list_of_issuesA).click();

  await expect(page.locator(Selectors.search_bar)).toBeVisible();

  await expect(page.locator('input[type="text"]')).toBeEditable();

  await expect(
    page
      .locator("div")
      .filter({ hasText: /^Issue Status$/ })
      .nth(3)
  ).toBeVisible();

  await page
    .locator("div")
    .filter({ hasText: /^Issue Status$/ })
    .nth(3)
    .click();

  await page
    .locator("div")
    .filter({ hasText: /^Open$/ })
    .first()
    .click();

  await page.getByRole("button", { name: "Apply" }).click();

  // await expect(page.locator(Selectors.tbody__1).first()).toBeVisible();

  await expect(
    page.getByRole("heading", { name: "Issues by Status" })
  ).toBeVisible();

  await expect(
    page.getByRole("heading", { name: "Top 5 Vehicles with Most" })
  ).toBeVisible();

  for (const bottom_header of Selectors.bottom_header) {
    await expect(
      page.getByRole("columnheader", { name: bottom_header })
    ).toBeVisible();
  }

  await page.locator(Selectors.search_bar).fill("sdsdf");
  await page.locator(Selectors.search_bar).fill("");
});

// FIX
