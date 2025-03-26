import { expect, test } from "@playwright/test";
import { URLs, screenSize } from "../../../../constants/links";
import { Selectors } from "./Selectors";

test("EF-103__Verify Vehicle Operator Toggle in Dropdown", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.assigments);
  await page
    .locator("div")
    .filter({ hasText: /^Vehicle$/ })
    .getByRole("paragraph")
    .click();

  await expect(page.getByText("VehicleOperator")).toBeVisible();

  await page.getByText("Operator").click();

  await expect(page.getByText("Operator")).toBeVisible();
});
