import { expect, test } from "@playwright/test";
import { screenSize } from "../../../../constants/links";
import { Selectors, headers } from "./Selectors";

test("EF-226__Verify List Fields Display", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto("/equipments", { waitUntil: "networkidle" });
  expect(page.url()).toContain("/equipments");

  await page.waitForSelector(Selectors.headerTable, { state: "visible" });

  const visibleHeaders = await page.locator(Selectors.headerCell).allInnerTexts();

  expect(visibleHeaders).toEqual(expect.arrayContaining(headers));
});