import { expect, test } from "@playwright/test";
import { BASE_URL, screenSize, URLs } from "../../../../../constants/links";
import { Selectors, today, time } from "./Selectors";

export const randomNumber = Math.floor(Math.random() * 100000000);

test("EF-265__verify adding a new purchase order", async ({ page }) => {
  await page.setViewportSize(screenSize);
  await page.goto(BASE_URL + URLs.purchaseOrders);

  await page.waitForTimeout(2000);

  await page.goto(BASE_URL + URLs.addPurchaseOrder);

  expect(page.url()).toBe(BASE_URL + URLs.addPurchaseOrder);
  expect(page.locator(Selectors.new_purchase_order_form)).toBeVisible();
  await page.waitForTimeout(2000);

  await page.locator(Selectors.select_fields).nth(0).click();
  await page.getByRole("option").nth(0).click();

  await page.locator(Selectors.select_field_2).nth(1).click();
  const options = page.getByRole("option");
  await options.first().click();

  await page.getByPlaceholder("12345").fill(`${randomNumber}`);

  await page.getByText("+ Add Line Item").click();

  await page.locator(Selectors.select_fields).nth(3).click();
  await page.getByRole("option").nth(0).click();

  await page
    .locator(Selectors.description_input)
    .fill(`Description was added on ${today} at ${time} by Autotest`);

  await page.locator(Selectors.quantity_input).fill("100");
  await page.locator(Selectors.unit_cost_input).fill("5");

  await page.locator(Selectors.discount_input).fill("10");
  await page.locator(Selectors.shipping_input).fill("500");
  await page.locator(Selectors.tax_input).fill("50");

  await page.getByRole("button", { name: "Save" }).click();

  await page.waitForTimeout(5000);

  expect(page.getByText("Purchase order successfully created!")).toBeVisible();
  await page.waitForTimeout(5000);
});
