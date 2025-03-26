import { test, expect } from "@playwright/test";
import { screenSize, URLs } from "../../../../constants/links";

test("EF-114__Verify Pagination Functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.samsaraDevices);
  await page.waitForTimeout(2500);

  const pageNumber = Math.floor(Math.random() * 4 + 2).toFixed();
  console.log("Page Number:", pageNumber);
  await page.getByRole("button", { name: `Go to page ${pageNumber}` }).click();

  await page.waitForTimeout(2500);
  expect(page).toHaveURL(URLs.samsaraDevices + `?page=${pageNumber}`);
  await page.waitForTimeout(2500);
});
