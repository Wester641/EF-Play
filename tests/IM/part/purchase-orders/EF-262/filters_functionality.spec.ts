import { expect, test } from "@playwright/test";
import { screenSize, URLs } from "../../../../../constants/links";
import { Selectors } from "./Selectors";

test("EF-262__Verify Filters Functionality on Purchase Orders Page", async ({ page }) => {
  await page.setViewportSize(screenSize);
  await page.goto(URLs.purchaseOrders);

  await page.waitForSelector(Selectors.data_row, {
    state: "visible",
    timeout: 10000,
  });

  const rowsParts = await page.locator(Selectors.data_row).all();
  const parts: string[] = [];

  for (let i = 0; i < rowsParts.length; i++) {
    const row = rowsParts[i];
    const name = await row.locator("td").nth(4).innerText().catch(() => null);
    if (name) {
      parts.push(name.trim());
    }
  }

  const randomPart = parts[Math.floor(Math.random() * parts.length)];
  
  await page.locator(Selectors.filter_button).nth(0).click();
  await page.waitForTimeout(2000);

  await page.locator(Selectors.filter_option).filter({ hasText: randomPart }).first().click();
  await page.waitForTimeout(2000);

  await page.getByText('Apply').first().click();
  await page.waitForTimeout(2000);
  
  const rowAmountParts = await page.locator(Selectors.data_row).count();

  if (rowAmountParts > 0) {
    for (let i = 0; i < rowAmountParts; i++) {
      const currentRow = page.locator(Selectors.data_row).nth(i);

      const type = await currentRow.locator("td").nth(4).innerText();
      expect(type).toContain(randomPart);
    }
  }

  await page.locator(Selectors.reset_button).first().click();
  await page.waitForTimeout(3000);


  const rowsVendor = await page.locator(Selectors.data_row).all();
  const vendors: string[] = [];

  for (let i = 0; i < rowsVendor.length; i++) {
    const row = rowsVendor[i];
    const name = await row.locator("td").nth(3).innerText().catch(() => null);
    if (name) {
      vendors.push(name.trim());
    }
  }

  const randomVendor = vendors[Math.floor(Math.random() * vendors.length)];

  await page.locator(Selectors.filter_button).nth(1).click();
  await page.waitForTimeout(2000);

  await page.locator(Selectors.filter_option).filter({ hasText: randomVendor }).first().click();
  await page.waitForTimeout(2000);

  await page.getByText('Apply').first().click();
  await page.waitForTimeout(2000);
  
  const rowAmountVendor = await page.locator(Selectors.data_row).count();

  if (rowAmountVendor > 0) {
    for (let i = 0; i < rowAmountVendor; i++) {
      const currentRow = page.locator(Selectors.data_row).nth(i);

      const type = await currentRow.locator("td").nth(3).innerText();
      expect(type).toContain(randomVendor);
    }
  }

  await page.locator(Selectors.reset_button).first().click();
});