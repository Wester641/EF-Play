import { test, expect } from "@playwright/test";
import { screenSize, URLs } from "../../../../../constants/links";
// import { Selectors } from "./Selectors";

const randomNumber = Math.floor(Math.random() * 10000);

test("EF-256__verify_list_fields_display_for_parts.spec", async ({ page }) => {
  await page.setViewportSize(screenSize);
  await page.goto(URLs.partsPage);
  await expect(page.locator(".Table_tableWrapper__ePlzX")).toBeVisible();
});
