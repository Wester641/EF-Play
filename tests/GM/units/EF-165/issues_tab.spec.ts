import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs, timeout, screenSize } from "../../../../constants/links";

test("EF-165__Issues Tab - Entries Verification", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.units);  
  page.on("response", async (response) => {
    if (response.url().match(URLs.api.ISSUES_TAB)) {
      try {
        const issueResponse = await response.json();
        const issueParse = JSON.stringify(issueResponse);
        issueParse.length === 0
          ? console.log(`This request is empty! lenght = ${issueParse.length}`)
          : console.log(`Result: ${issueParse}`);
      } catch (error) {
        console.log("Error parsing JSON:", error);
      }
    }
  });
  await page.locator(Selectors.firstRowInTable).first().click();

  await page.waitForURL(URLs.unitsPage, timeout);

  await page.locator(Selectors.specsTabs).nth(3).click();
  await page.waitForTimeout(500);
  expect(page).toHaveURL(URLs.unitsPage);
});
