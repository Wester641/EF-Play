import { test } from "@playwright/test";
import { screenSize } from "../../../../constants/links";

// delete this file if this unusual
test("exmaple-2", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto("/units");
});
