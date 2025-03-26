import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";

import { URLs, screenSize } from "../../../../constants/links";

test("EF-43__Search and Filtering Functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.units);

  const value = await page.locator(Selectors.name).nth(0).textContent();

  await expect(page.locator(Selectors.searchInput)).toBeVisible();

  await page.locator(Selectors.searchInput).fill(value || "Unit #269");

  await page.keyboard.press("Enter");

  await page.waitForTimeout(2000);

  const unitCell = page
    .locator(`${Selectors.name}:has-text("${value}")`)
    .first();

  await unitCell.scrollIntoViewIfNeeded();

  await page.addStyleTag({
    content: `
    ${Selectors.name}:nth-child(1) {
      background-color: lightblue; 

      border: 1px solid #ccc;      
    }
  `,
  });
  await expect(unitCell).toHaveText(value || /Unit #269/);
});
