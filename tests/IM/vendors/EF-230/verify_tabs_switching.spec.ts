import { test } from "@playwright/test";
import { screenSize, URLs } from "../../../../constants/links";

test("EF-229__verify_tabs_switching ", async ({ page }) => {
  await page.setViewportSize(screenSize);
  await page.goto(URLs.dashboard);

  await page.getByText("Inventory management", { exact: true }).click();
  await page.getByText("Vendors", { exact: true }).click();

  await page.getByRole("listitem").filter({ hasText: "Vehicle" }).click();
  await page.getByRole("listitem").filter({ hasText: "Service" }).click();
  await page.getByRole("listitem").filter({ hasText: "Fuel" }).click();
  await page.getByRole("listitem").filter({ hasText: "Service" }).click();
  await page.waitForTimeout(2000);
});
