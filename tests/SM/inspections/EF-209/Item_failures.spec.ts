import { test, expect } from "@playwright/test";
// import { Selectors } from "./Selectors";

test("  EF-209 item failurees  ", async ({ page }) => {
  await page.goto("https://app.easyfleet.ai");
  await page.locator("h4", { hasText: "Service management" }).click();
  await page.locator("p", { hasText: "Inspections" }).click();
  await page.locator("li", { hasText: "Item Failures" }).click();

  await expect(
    page
      .locator(
        'table.MuiTable-root.Table_table__bCgGT.css-1owb465 th:has-text("Date")'
      )
      .nth(0)
  ).toBeVisible();

  await expect(
    page
      .locator(
        'th.MuiTableCell-root.MuiTableCell-head.MuiTableCell-sizeMedium.css-1bigob2:has-text("Vehicle")'
      )
      .nth(0)
  ).toBeVisible();

  await expect(
    page
      .locator(
        'th.MuiTableCell-root.MuiTableCell-head.MuiTableCell-sizeMedium.css-1bigob2:has-text("Item")'
      )
      .nth(0)
  ).toBeVisible();

  await expect(
    page
      .locator(
        'th.MuiTableCell-root.MuiTableCell-head.MuiTableCell-sizeMedium.css-1bigob2:has-text("Remarks")'
      )
      .nth(0)
  ).toBeVisible();

  await expect(
    page
      .locator(
        'th.MuiTableCell-root.MuiTableCell-head.MuiTableCell-sizeMedium.css-1bigob2:has-text("Stage")'
      )
      .nth(0)
  ).toBeVisible();
});
