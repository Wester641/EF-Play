import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs, screenSize } from "../../../../constants/links";

test("EF-95__Verify 'Per Page' Dropdown Functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.meterHistory);

  await page.waitForTimeout(5000);

  await page.locator("button").filter({ hasText: "Per Page10" }).click();
  await page.getByRole("menuitem", { name: "20" }).click();
  await expect(page).toHaveURL(Selectors.urlLimit20);

  await page.locator("button").filter({ hasText: "Per Page20" }).click();
  await page.getByRole("menuitem", { name: "50" }).click();

  await expect(page).toHaveURL(Selectors.urlLimit50);
});
