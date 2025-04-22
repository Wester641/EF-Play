import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs, screenSize } from "../../../../constants/links";

test("EF-130__Roles Section", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.settings);

  await page.waitForTimeout(3000);

  await page.locator(Selectors.tabNavigation).nth(0).click();

  await page.waitForTimeout(3000);

  const num = Math.floor(Math.random() * 1000);

  const itemsAmount = await page.locator(Selectors.amountOfItems).innerText();

  await expect(page.locator(Selectors.searchInput)).toBeVisible();

  if (await page.locator(Selectors.dataResult).count() == 0) {
    await expect(page.locator(Selectors.infoBlock).nth(0)).toContainText("No records found");
  }

  await expect(page.locator(Selectors.settingsButton).nth(0)).toBeVisible();

  await expect(page.locator(Selectors.settingsButton).nth(1)).toBeVisible();

  await expect(page.locator(Selectors.addButton).nth(0)).toBeVisible();

  await page.locator(Selectors.addButton).nth(0).click();

  await page.waitForTimeout(3000);

  await expect(page.locator(Selectors.createRoleModal)).toBeVisible();

  const inputFieldCount = await page.locator(Selectors.inputField).count();
  const tickHeaderCount = await page.locator(Selectors.tickHeader).count();
  const tickRowCount = await page.locator(Selectors.tickRow).count();

  expect(inputFieldCount).toBe(2);
  expect(tickHeaderCount).toBe(1);
  expect(tickRowCount).toBe(29);

  await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();

  await expect(page.getByRole('button', { name: 'Save' })).toBeVisible();

  await page.locator('input[name="name"]').fill(`Role number: ${num}`);

  for (let i = 0; i < 29; i++) {

    const currentTickRow = page.locator(Selectors.permSelect).nth(i)

    const checkboxes = currentTickRow.locator('label span .css-1m9pwf3');

    const randomIndex = Math.floor(Math.random() * 3);

    await checkboxes.nth(randomIndex).check();
  }

  await page.getByRole('button', { name: 'Save' }).click(); 

  await page.waitForTimeout(3000);

  const itemsAmountAfter = await page.locator(Selectors.amountOfItems).innerText();

  expect(itemsAmount).not.toEqual(itemsAmountAfter);
});