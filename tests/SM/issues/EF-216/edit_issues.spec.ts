import { expect, test } from "@playwright/test";
import { screenSize } from "../../../../constants/links";
import { Selectors, time, today } from "./Selectors";

const randomOption = Math.floor(Math.random() * 3);

test("EF-216__Edit issue functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto("/issues");
  await page.getByRole("cell").nth(0).click();
  await page.getByRole("button").nth(2).click();
  await page.locator(Selectors.inputContainer).first().click();
  await page.getByRole("option").nth(randomOption).click();
  await page.locator(Selectors.input).fill(`${today} filled this summary`);
  await page.getByRole("button", { name: "Save" }).click();
  await page.waitForTimeout(5000);
  await expect(page.locator(Selectors.successToats)).toContainText(
    "Successfully edited!"
  );
});
