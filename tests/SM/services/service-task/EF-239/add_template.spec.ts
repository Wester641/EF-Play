import { test, expect } from "@playwright/test";
import { screenSize, URLs } from "../../../../../constants/links";
import { Selectors, time, today } from "./Selectors";

const random = Math.floor(Math.random() * 3);
test("EF-239__Add template", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.serviceTask);

  await page.locator(Selectors.add_service_task).nth(1).click();

  expect(
    page.locator(Selectors.create_service_task_form).first()
  ).toBeVisible();
  expect(page).toHaveURL(URLs.service_task_create);

  await page
    .locator(Selectors.input)
    .fill(`Template has been created on ${today} at ${time}`);

  await page
    .locator(Selectors.description)
    .first()
    .fill(`Description has been added on ${today} at ${time}`);

  await page.locator(Selectors.category_code).nth(2).click();
  await page.getByRole("option").nth(random).click();
  await page.locator(Selectors.category_code).last().click();
  await page.getByRole("option").nth(random).click();

  // await page.locator(Selectors.system_code).nth(3).click();
  // await page.getByRole("option").nth(random).click();

  await page.getByRole("button", { name: "Save" }).click();

  await page.waitForTimeout(3000);

  expect(page.getByText("Service Task successfully created!")).toBeVisible();
});
