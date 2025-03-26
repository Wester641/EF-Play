import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { screenSize, URLs } from "../../../../constants/links";

test("EF-113__Verify Add Samsara Integration", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.samsaraDevices);

  await page.locator(Selectors.addButton).nth(0).click();

  expect(page).toHaveURL(URLs.samsaraDevices + "/samsara-integration");

  await page.locator(Selectors.continueButton).click();
  expect(page).toHaveURL(
    URLs.samsaraDevices + "/samsara-integration/registration"
  );
});
