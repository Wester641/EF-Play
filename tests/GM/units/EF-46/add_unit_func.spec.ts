import { test } from "@playwright/test";
import {
  Selectors,
  stateRegistration,
  time,
  trimTrucks,
  truckColors,
  truckMsrpRanges,
} from "./Selectors";

import { URLs, screenSize } from "../../../../constants/links";

test("EF-46__Add Unit Functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);
  
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
