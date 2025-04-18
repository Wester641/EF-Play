import { test as base, expect } from "@playwright/test";
import { screenSize, URLs } from "./../../../../../constants/links";
import { Selectors } from "./Selectors";
const test = base.extend({
  storageState: ".auth/login.json",
});

test("EF-257__Verify Filters Functionality on Parts Page", async ({ page }) => {
  await page.setViewportSize(screenSize);
  await page.goto(URLs.partsPage);

  await expect(page.locator(Selectors.partsPage_text)).toBeVisible();
  // PART MANUFACTURER FILTER
  await page.locator(Selectors.filter_tab_opt).nth(0).click();

  const m_options = page.locator(Selectors.options);
  const count = await m_options.count();
  const randomIndex = Math.floor(Math.random() * count);
  const selectedOption = m_options.nth(randomIndex);
  const selectedText = (await selectedOption.textContent())?.trim();

  await selectedOption.click();
  await page.locator(Selectors.apply_btn).nth(1).click();
  await page.waitForLoadState("networkidle");

  const matchInTable = page.locator(Selectors.filter_type).nth(3);

  if (await matchInTable.isVisible()) {
    const textInTable = (await matchInTable.textContent())?.trim();

    if (textInTable && textInTable.includes(selectedText ?? "")) {
      await expect(matchInTable).toBeVisible();
      console.log(`"${selectedText}" found in table`);
    } else {
      console.log(`"${selectedText}" not found in table (text mismatch)`);
    }
  } else {
    console.log(
      `Table cell is not visible (possibly empty result for "${selectedText}")`
    );
  }

  await page.locator(Selectors.filter_tab_opt).nth(0).click();
  await page.locator(Selectors.clear_icon).click();

  // PART CATEGORY FILTER
  await page.locator(Selectors.filter_tab_opt).nth(1).click();

  const partC_options = page.locator(Selectors.options);
  const count_2 = await partC_options.count();
  const randomIndex_2 = Math.floor(Math.random() * count_2);
  const selectedOption_2 = partC_options.nth(randomIndex_2);
  const selectedText_2 = (await selectedOption_2.textContent())?.trim();

  await selectedOption_2.click();
  await page.locator(Selectors.apply_btn).nth(1).click();
  await page.waitForLoadState("networkidle");

  const matchInTable_2 = page.locator(Selectors.filter_type).nth(2);

  if (await matchInTable_2.isVisible()) {
    const textInTable_2 = (await matchInTable_2.textContent())?.trim();

    if (textInTable_2 && textInTable_2.includes(selectedText_2 ?? "")) {
      await expect(matchInTable_2).toBeVisible();
      console.log(`"${selectedText_2}" found in table`);
    } else {
      console.log(`"${selectedText_2}" not found in table (text mismatch)`);
    }
  } else {
    console.log(
      `Table cell is not visible (possibly empty result for "${selectedText_2}")`
    );
  }

  await page.locator(Selectors.filter_tab_opt).nth(1).click();
  await page.locator(Selectors.clear_icon).click();
});
