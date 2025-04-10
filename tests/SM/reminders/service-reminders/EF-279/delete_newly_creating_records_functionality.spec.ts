import { test } from "@playwright/test";
import { screenSize, URLs } from "../../../../../constants/links";

test("EF-279__delete_newly_creating_records_functionality.spec", async ({
  page,
}) => {
  await page.setViewportSize(screenSize);
  await page.goto(URLs.serviceRemindersPage);
  const random = Math.floor(Math.random() * 3);

  await page
    .getByRole("row", { name: "Unit #5119 5:46:08 AM" })
    .getByLabel("more")
    .click();

  await page.getByRole("menuitem", { name: "Delete" }).click();

  await page.getByRole("button", { name: "Delete" }).click();
});
