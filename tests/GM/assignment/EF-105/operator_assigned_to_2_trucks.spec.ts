import { test, expect } from "@playwright/test";
import { Selectors, today, time } from "./Selectors";
import { URLs, screenSize } from "../../../../constants/links";

test("EF-105__Verify Assignment Overlap Handling for 1 Operator Assigned to 2 Trucks", async ({
  page,
}) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.assigments);

  await page.getByText("Add Assignments").click();

  const apiResponse = await page.waitForResponse((response) => {
    console.log("Checking:", response.url());
    return (
      response.url().includes("/api/v1/vehicles/?limit=1000") &&
      response.status() === 200
    );
  });

  const apiResponseData = await apiResponse.json();
  console.log("API Vehicles:", apiResponseData);

  await expect(
    page.getByRole("heading", { name: "Add Assignment" })
  ).toBeVisible();

  await page.locator(Selectors.selectField).first().click();

  await page
    .getByRole("option", { name: apiResponseData.results[0].name })
    .click();

  await page.locator(Selectors.selectField).nth(1).click();
  await page
    .locator(Selectors.option)
    .nth(Math.floor(Math.random() * 5))
    .click();

  await page
    .getByRole("textbox", { name: "Comment" })
    .fill(`Repeat comment 105 ${today} at ${time}`);

  await page.getByRole("button", { name: "Save" }).click();

  await page.waitForTimeout(5000);
  await expect(page.locator(Selectors.successToats)).toContainText(
    "Successfully created assignment!"
  );
});
