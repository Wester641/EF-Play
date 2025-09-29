import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { screenSize, URLs } from "../../../../../constants/links";

test("EF-295__Search field functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.inspection_schedules);
  
  await page.waitForLoadState("domcontentloaded");

  const cellLocator = page.getByRole("cell").first();
  await expect(cellLocator).toBeVisible();

  const cellText = await cellLocator.innerText();
  if (!cellText) {
    throw new Error("Cell text is empty or null");
  }

  const allRowsBeforeSearch = await page.getByRole("row").count();

  await page.locator(Selectors.searchInput).fill(cellText);
  
  await page.waitForTimeout(500);

  const visibleRowsAfterSearch = await page.getByRole("row").count();
  
  expect(visibleRowsAfterSearch).toBeGreaterThan(0);

  const allCells = await page.getByRole("cell").all();
  const cellTexts = await Promise.all(
    allCells.map(cell => cell.innerText().catch(() => ""))
  );

  const hasMatchingCell = cellTexts.some(text => 
    text.toLowerCase().includes(cellText.toLowerCase())
  );
  
  expect(hasMatchingCell).toBeTruthy();

  await expect(cellLocator).toContainText(cellText);

  await page.locator(Selectors.searchInput).clear();
  await page.waitForTimeout(500);
  
  const rowsAfterClear = await page.getByRole("row").count();
  expect(rowsAfterClear).toBe(allRowsBeforeSearch);
});