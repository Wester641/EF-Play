import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs, screenSize } from "../../../../constants/links";

const randomOption = Math.floor(Math.random() * 3);

test("EF-97__Verify 'Add Meter Entry' Button and Widget Functionality", async ({
  page,
}) => {
  await page.setViewportSize(screenSize);
  await page.goto(URLs.meterHistory);
  await page.getByRole("button").nth(1).click();
  await expect(page).toHaveURL("https://dev-app.easyfleet.ai/meter-history");

  await page
    .locator("div")
    .filter({ hasText: /^Select\.\.\.$/ })
    .nth(2)
    .click();
  await page.getByRole("option").nth(randomOption).click();

  await page.getByRole("spinbutton").fill("123");

  await page.getByRole("checkbox", { name: "Void" }).click();

  await page.getByRole("textbox").click();

  await page.getByRole("button", { name: "Save" }).click();
  await page.waitForTimeout(2000);

  await expect(
    page
      .locator("div")
      .filter({ hasText: /^Meter Entry is added!$/ })
      .nth(1)
  ).toBeVisible();

  await page.getByRole("button").nth(2).click();

  await page
    .locator("div")
    .filter({ hasText: /^Select\.\.\.$/ })
    .nth(2)
    .click();
  await page.getByRole("option").nth(randomOption).click();

  await page.getByRole("spinbutton").fill("123");

  await page.getByRole("checkbox", { name: "Void" }).click();

  await page.getByRole("textbox").click();

  await page.getByRole("button", { name: "Cancel" }).click();
});
