import { test } from "@playwright/test";
import { screenSize } from "../../../../constants/links";

import { Selectors } from "./Selectors";

test("EF-128__Verify Table Row Interaction on 'Papers' Page", async ({
  page,
}) => {
  await page.setViewportSize(screenSize);
  await page.goto("/papers");

  await page.waitForTimeout(3000);

  await page.locator(Selectors.click_first_cell).click();

  await page.waitForTimeout(2000);

  await page.locator(Selectors.cursor_pointer).click();
  await page.getByRole("button", { name: "Delete" }).click();
  await page.locator(Selectors.click_first_cell).click();
  await page.locator(Selectors.svg_third_child).click();

  await page.getByRole("button", { name: "Cancel" }).click();
  await page.locator(Selectors.click_first_cell).click();

  await page.locator(Selectors.svg_fourth_child).click();
});
