import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs, screenSize } from "../../../../constants/links";

test("EF-102__Verify Date Navigation by Scrolling", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.assigments);

  await page.locator(Selectors.timeline).click();

  await expect(page.locator(Selectors.addForm)).toBeVisible();
});
