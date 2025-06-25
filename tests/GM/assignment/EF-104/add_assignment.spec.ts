import { test, expect } from "@playwright/test";
import { Selectors, today, time } from "./Selectors";
import { URLs, screenSize } from "../../../../constants/links";

test("EF-104__Verify Add Assignment From Appearance and Fields", async ({
  page,
}) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.assigments);

  await page.getByText("Add Assignments").first().click();

  await expect(
    page.getByRole("heading", { name: "Add Assignment" })
  ).toBeVisible();

  await page.locator(Selectors.selectField).first().click();
  await page.waitForTimeout(3000);

  const allVehicles = await page.getByRole("option").all();

  await allVehicles[Math.floor(Math.random() * allVehicles.length)].click();

  await page.locator(Selectors.selectField).nth(1).click();
  await page
    .locator(Selectors.option)
    .nth(Math.floor(Math.random() * 5))
    .click();

  await page
    .getByRole("textbox", { name: "Comment" })
    .fill(`This comment was added on ${today} at ${time}`);

  await page.getByRole("button", { name: "Save" }).click();

  await page.waitForTimeout(5000);
  await expect(page.locator(Selectors.successToats)).toContainText(
    "Successfully created assignment!"
  );
});
