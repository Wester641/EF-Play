import { test } from "@playwright/test";
import { URLs, screenSize } from "../../../../constants/links";
import { Selectors } from "./Selectors";

test("EF-65__faults_summary_functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);
  await page.goto(URLs.dashboard);

  //   navigation
  await page
    .locator("div")
    .filter({ hasText: /^Reports$/ })
    .click();
  await page.getByText("Issues2").click();
  await page.getByText(Selectors.navigation_issues).click();

  // check search fields
  await page.locator('input[type="text"]');

  //   testing two widgets
  await page.getByText(Selectors.navigation_status);
  await page.getByText(Selectors.navigation_vehicles);

  // Check dropdown menu options
  // 1
  await page
    .locator("div")
    .filter({ hasText: /^Issue Status$/ })
    .nth(1)
    .click();
  await page.getByText("Issue Status").first().click();
  await page
    .locator("div")
    .filter({ hasText: /^Open$/ })
    .click();

  await page.getByRole("button", { name: "Apply" }).click();
  // 2
  await page.locator("img").nth(1).click();
  await page
    .locator("div")
    .filter({ hasText: /^Ignored$/ })
    .click();
  await page.getByRole("button", { name: "Apply" }).click();
  //3
  await page
    .locator("div")
    .filter({ hasText: /^Ignored$/ })
    .nth(1)
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^Pending$/ })
    .click();
  await page.getByRole("button", { name: "Apply" }).click();
  //4
  await page
    .locator("div")
    .filter({ hasText: /^Pending$/ })
    .nth(1)
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^Resolved$/ })
    .click();
  await page.getByRole("button", { name: "Apply" }).click();

  await page.locator('input[type="text"]').fill("sdfsdf");
  await page.waitForTimeout(2000);
  await page.locator('input[type="text"]').fill("");
});

// FIX
