import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs, screenSize } from "../../../../constants/links";

test("EF-121__Verify Video Playback Functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.trainingPage, { waitUntil: 'networkidle' });

  await page.waitForTimeout(3000);
    
  await page.locator(Selectors.watchButton).nth(0).click();

  await page.waitForTimeout(3000);

  expect(page.locator(Selectors.playButton).nth(3)).toBeVisible;

  await page.locator(Selectors.closeButton).nth(1).click();
});