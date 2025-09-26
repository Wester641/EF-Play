import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs, screenSize } from "../../../../../constants/links";

test("EF-294__Inspections Schedules Page Navigation", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.inspection_schedules);

  await page.waitForTimeout(3000);

  await expect(page.locator(Selectors.headerTable).first()).toBeVisible();

  const headerNames = await page
    .locator(Selectors.headerTable)
    .first()
    .allInnerTexts();

  await expect(headerNames).toStrictEqual([
    "Vehicle\tStatus\tInspection Form\tNext Due\tFrequency\t",
  ]);
});
