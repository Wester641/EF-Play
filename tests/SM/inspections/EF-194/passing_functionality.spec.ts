import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { Styles, URLs, screenSize } from "../../../../constants/links";
const randomItem = Math.floor(Math.random() * 3);

test("EF-194__Passing inspection functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);
  await page.goto(URLs.inspection_history);
  // await page.waitForTimeout(500);

  const start_button = await page.getByRole("button", {
    name: "Start Inspection",
  });

  expect(start_button).toBeVisible();

  await page.waitForTimeout(3000);
  await start_button.first().click();
  await page.waitForTimeout(1000);
  expect(page.locator(Selectors.selectModal).first()).toBeVisible();

  await page.getByRole("listitem").nth(randomItem).click();

  expect(page.getByText(Selectors.chooseVehicle)).toBeVisible();
  await page.locator(Selectors.selectInput).click();

  await page.waitForTimeout(3000);

  await page.getByRole("option").nth(randomItem).click();

  await page.getByRole("button", { name: "Save" }).click();
});
