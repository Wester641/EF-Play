import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { screenSize, URLs } from "../../../../constants/links";

test("EF-115__Verify Per Page", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.samsaraDevices);
  await page.waitForTimeout(2500);

  await page.locator(Selectors.perPageButton).first().click();
  await page.getByRole("menuitem", { name: "20" }).click();
  expect(page).toHaveURL(URLs.samsaraDevices + `?limit=20&page=1`);

  await page.locator(Selectors.perPageButton).first().click();

  await page.getByRole("menuitem", { name: "50" }).click();
  expect(page).toHaveURL(URLs.samsaraDevices + `?limit=50&page=1`);

  await page.locator(Selectors.perPageButton).first().click();

  await page.getByRole("menuitem", { name: "10" }).click();
  expect(page).toHaveURL(URLs.samsaraDevices + `?limit=10&page=1`);
});
