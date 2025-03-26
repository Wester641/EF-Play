import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { screenSize, URLs } from "../../../../constants/links";

test("EF-53__Users Page Pagination", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.users);

  await page.locator(Selectors.perPageDrdown).scrollIntoViewIfNeeded();
  await page.locator(Selectors.perPageDrdown).click();
  const totalOptions = 3;
  for (let i = 0; i < totalOptions; i++) {
    await page.locator(Selectors.perPageValue).nth(i).click();
    if (i < totalOptions - 1) {
      await page.locator(Selectors.perPageDrdown).click();
    }
  }
  await page.locator(Selectors.perPageDrdown).click();
  await page.locator(Selectors.perPageValue).nth(0).click();
  await page.locator(Selectors.rightArrowBtn).last().click();
  await page.locator(Selectors.rightArrowBtn).first().click();

  const rowCount = await page
    .locator(Selectors.usersTableRow)
    .filter({ has: page.locator(":visible") })
    .count();
  console.log("Numbers of rows:", rowCount);

  const perPageText = await page
    .locator(Selectors.perPageValue1)

    .textContent();
  const perPageValue = parseInt(perPageText?.replace(/\D/g, "") ?? "", 10);

  expect(rowCount).toBe(perPageValue);
});
