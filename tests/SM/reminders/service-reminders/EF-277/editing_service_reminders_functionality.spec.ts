import { test } from "@playwright/test";
import { screenSize, URLs } from "../../../../../constants/links";
import { Selectors } from "./Selectors";

test("EF-277__editing_service_reminders_functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);
  await page.goto(URLs.serviceRemindersPage);
  const random = Math.floor(Math.random() * 3);

  await page.waitForTimeout(10000);

  const cell = await page.getByRole("cell").first().isVisible();
  if (cell) {
    await page.getByRole("cell").nth(3).click();
  } else {
    console.log("The records not visible!!!");
  }

  await page.locator(Selectors.service_modal_icon).click();
  await page.waitForTimeout(10000);

  await page.locator(Selectors.first_dropdown).first().click();
  await page.getByRole("option").nth(random).click();

  await page.locator(Selectors.second_dropdown).click();
  await page.getByRole("option").nth(random).click();

  await page.locator(Selectors.placeholder_input).click();
  await page.locator(Selectors.placeholder_input).fill("232323");

  await page.locator(Selectors.save_button).click();
});
