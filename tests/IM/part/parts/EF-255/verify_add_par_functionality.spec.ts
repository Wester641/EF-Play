import { test, expect } from "@playwright/test";
import { screenSize, URLs } from "../../../../../constants/links";
import { Selectors, time, today, todayForFill } from "./Selectors";

const randomNumber = Math.floor(Math.random() * 10000);
const randomOption = Math.floor(Math.random() * 3);

test("EF-255__verify_add_par_functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);
  await page.goto(URLs.addParts);

  await page.locator(Selectors.part_number_input).fill(`PN: ${randomNumber}`);
  await page.getByText("Add Vendor").click();

  for (let p = 1; p < 5; p++) {
    await page.locator(Selectors.input).nth(p).fill("10");
  }
  await page
    .locator(Selectors.description_input)
    .fill(`This part was created in ${today} at ${time} by Autotest`);

  for (let i = 0; i < 3; i++) {
    await page.locator(Selectors.select_field).nth(i).click();
    await page.getByRole("option").nth(0).click();
  }
  for (let i = 0; i < 2; i++) {
  await page.locator(Selectors.select_field_2).nth(i).click();
  const options = page.getByRole("option");
  await options.first().click();
}

  await page
    .getByRole("textbox", { name: "DD.MM.YYYY" })
    .fill(`${todayForFill}`);
  await page.getByRole("button", { name: "Save" }).click();
  await page.waitForTimeout(5000);
  await expect(page.locator('[id="\\31 "]')).toBeVisible();
});
