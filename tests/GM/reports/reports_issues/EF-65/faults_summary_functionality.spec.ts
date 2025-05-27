import { test, expect } from "@playwright/test";
import { URLs, screenSize } from "../../../../../constants/links";
import { Selectors } from "./Selectors";

test("EF-65__faults_summary_functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);
  await page.goto(URLs.dashboard);

  await page
    .locator("div")
    .filter({ hasText: /^Reports$/ })
    .click();
  await page.getByText("Issues2").click();
  await page.getByText(Selectors.navigation_issues).click();

  await expect(page.locator(Selectors.search_bar)).toBeVisible();
  await expect(
    page
      .locator("div")
      .filter({ hasText: /^Issue Status$/ })
      .nth(1)
  ).toBeVisible();

  await expect(
    page
      .locator("div")
      .filter({ hasText: /^Issue Status$/ })
      .nth(3)
  ).toBeVisible();

  await page
    .locator("div")
    .filter({ hasText: /^Issue Status$/ })
    .nth(1)
    .click();

  await page
    .locator("div")
    .filter({ hasText: /^Open$/ })
    .click();

  await page.getByRole("button", { name: "Apply" }).click();

  for (const bottom_header of Selectors.bottom_header) {
    await expect(
      page.getByRole("columnheader", { name: bottom_header })
    ).toBeVisible();
  }
  await page.locator(Selectors.search_bar).fill("sdfsf");
  await page.locator(Selectors.search_bar).fill("");
});

// FIX
