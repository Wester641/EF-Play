import { expect, test } from "@playwright/test";
import { screenSize, URLs } from "../../../../../constants/links";
import { Selectors } from "./Selectors";

test("EF-261__Verify Search Functionality on Purchase Orders Page", async ({ page }) => {
  await page.setViewportSize(screenSize);
  await page.goto(URLs.purchaseOrders);

  await page.waitForSelector(Selectors.data_row, {
    state: "visible",
    timeout: 10000,
  });

  const rows = await page.locator(Selectors.data_row).all();
  const names: string[] = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const name = await row.locator("td").nth(3).innerText().catch(() => null);
    if (name) {
      names.push(name.trim());
    }
  }

  const randomName = names[Math.floor(Math.random() * names.length)];
  
  await page.locator(Selectors.search_input).fill(randomName);
  await page.waitForTimeout(3000);

  const rowAmount = await page.locator(Selectors.data_row).count();

  if (rowAmount > 0) {
    for (let i = 0; i < rowAmount; i++) {
      const currentRow = await page.locator(Selectors.data_row).nth(i);

      const type = await currentRow.locator("td").nth(3).innerText();
      expect(type).toContain(randomName);
    }
  }

  // ADD SEARCH BY PO NUMBER AFTER BUG FIX
});