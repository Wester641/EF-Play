import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs, screenSize } from "../../../../constants/links";

test("EF-93__Verify Search Field and Vehicle Filter", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.meterHistory);
  await expect(page).toHaveURL("https://dev-app.easyfleet.ai/meter-history");

  const firstCellText = await page
    .locator(Selectors.tableRow)
    .first()
    .locator("td")
    .first()
    .innerText();

  await page.locator(Selectors.inputText).fill(firstCellText);

  await page
    .locator("div")
    .filter({ hasText: /^Vehicle$/ })
    .nth(1)
    .click();

  await page.locator(Selectors.modalListItem).first().click();

  await page.getByRole("button", { name: "Apply" }).click();

  await page.locator(Selectors.tbodyRows).count();
});
