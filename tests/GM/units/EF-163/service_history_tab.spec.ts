import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs, timeout, screenSize } from "../../../../constants/links";

test("EF-163__Service History Tab - Entries Verification", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.units);
  page.on("response", async (response) => {
    if (response.url().match(URLs.api.SERVICES_TAB)) {
      try {
        const jsonResponse = await response.json();
        const parsedJson = JSON.stringify(jsonResponse);
        parsedJson.length === 0
          ? console.log(`This request is empty! lenght = ${parsedJson.length}`)
          : console.log(`Result: ${parsedJson}`);
      } catch (error) {
        console.log("Error parsing JSON:", error);
      }
    }
  });
  await page.locator(Selectors.firstRowInTable).first().click();

  await page.waitForURL(URLs.unitsPage, timeout);

  await page.locator(Selectors.specsTabs).nth(5).click();
  await page.waitForTimeout(500);
  expect(page).toHaveURL(URLs.unitsPage);
});
