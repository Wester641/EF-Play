import { test } from "@playwright/test";
import {
  Selectors,
  stateRegistration,
  time,
  loginSelectors,
  trimTrucks,
  truckColors,
  truckMsrpRanges,
} from "./Selectors";

import { URLs, Credentials } from "../../../../constants/links";

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto(URLs.login);
  await page.waitForSelector(loginSelectors.email);
  await page.fill(loginSelectors.email, Credentials.email);
  await page.fill(loginSelectors.password, Credentials.password);
  await page.click(loginSelectors.submitButton);
    await page.waitForURL(URLs.units, { timeout: 10000 });
});

test("EF-46__Add Unit Functionality", async ({ page }) => {
  await page.goto(URLs.createUnit);

  await page
    .locator(Selectors.input)
    .nth(0)
    .fill(`Unit #${Math.floor(Math.random() * 10000).toFixed()} ${time}`);
  await page
    .locator(Selectors.vinInput)
    .fill(`56789${Math.floor(Math.random() * 100000).toFixed()}`);

  for (let i = 0; i < 11; i++) {
    await page
      .locator(Selectors.selectContainer)
      .nth(i)
      .waitFor({ state: "visible" });
    await page.locator(Selectors.selectContainer).nth(i).click();

    await page
      .locator(Selectors.selectOption)
      .first()
      .waitFor({ state: "visible" });
    await page
      .locator(Selectors.selectOption)
      .nth(Math.floor(Math.random() * 4))
      .click();

    await page.waitForTimeout(500);
  }

  await page
    .locator(Selectors.licenseInput)
    .fill(`IL-TRK123${Math.floor(Math.random() * 10000).toFixed()}`);

  await page
    .locator(Selectors.yearInput)
    .fill(`${2000 + Math.floor(Math.random() * 26)}`);

  await page
    .locator(Selectors.input)
    .nth(4)
    .fill(trimTrucks[Math.floor(Math.random() * trimTrucks.length)]);

  await page
    .locator(Selectors.input)
    .nth(5)
    .fill(
      stateRegistration[Math.floor(Math.random() * stateRegistration.length)]
    );

  await page
    .locator(Selectors.input)
    .nth(6)
    .fill(truckColors[Math.floor(Math.random() * truckColors.length)]);

  await page
    .locator(Selectors.input)
    .nth(7)
    .fill(truckMsrpRanges[Math.floor(Math.random() * truckMsrpRanges.length)]);

  await page.click(Selectors.submitButton);
  await page.waitForSelector(Selectors.toastMessage, { state: "visible" });
});
