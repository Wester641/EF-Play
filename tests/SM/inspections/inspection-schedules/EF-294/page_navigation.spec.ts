import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs, screenSize } from "../../../../../constants/links";

test("EF-294__Inspections Schedules Page Navigation", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.inspection_schedules);

  await page.waitForTimeout(3000);

  await expect(page.locator(Selectors.headerTable).first()).toBeVisible();

  const headerText = await page
    .locator(Selectors.headerTable)
    .first()
    .innerText();

  expect(headerText).toContain("Vehicle");
  expect(headerText).toContain("Status");
  expect(headerText).toContain("Inspection Form");
  expect(headerText).toContain("Next Due");
  expect(headerText).toContain("Frequency");
});