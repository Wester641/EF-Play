import { expect, test } from "@playwright/test";
import { screenSize, URLs } from "../../../../constants/links";
import { Selectors } from "./Selectors";

const randomOption = Math.floor(Math.random() * 3);

test("EF-213__a new Work Order is added to the list", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.issues);
  await page.getByRole("cell").nth(0).click();
  await page.locator(Selectors.first_cell).click();

  await page.locator(Selectors.status_solveItem).first().click();
  await page
    .locator("div")
    .filter({ hasText: /^Nearest vendors$/ })
    .locator("div")
    .click();

  await page.locator(Selectors.statusField).first().click();
  await page.getByRole("option").nth(randomOption).click();

  await page.locator(Selectors.select_field3).first().click();
  await page.getByRole("option").nth(randomOption).click();

  await page.locator(Selectors.select_field13).click();
  await page.getByRole("option").nth(randomOption).click();

  await page.locator(Selectors.select_field14).click();
  await page.getByRole("option").nth(randomOption).click();
  await page.locator(Selectors.select_field16).click();
  await page.getByRole("option").nth(randomOption).click();

  await page.getByRole("button", { name: "Save Work Order" }).click();
  await page.waitForTimeout(5000);
  await expect(page.locator(Selectors.successToats)).toContainText(
    "Successfully created!"
  );
  await page.waitForTimeout(5000);
});
