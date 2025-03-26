import { test, expect } from "@playwright/test";
import { screenSize, URLs } from "../../../../constants/links";

test("EF-107__Page load", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.samsaraDevices);

  await expect(page).toHaveURL(URLs.samsaraDevices);
});
