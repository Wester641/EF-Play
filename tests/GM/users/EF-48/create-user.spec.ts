import { test } from "@playwright/test";
import { Selectors, time } from "./Selectors";
import { URLs, screenSize } from "../../../../constants/links";

// CREATE USER

test("create user test", async ({ page }) => {
  await page.setViewportSize(screenSize);
  
  await page.goto(URLs.users + "/create");

  await page
    .locator(Selectors.input)
    .nth(0)
    .fill(`User #${Math.floor(Math.random() * 10000).toFixed()} ${time}`);
  await page
    .locator(Selectors.input)
    .nth(3)
    .fill(`example${Math.floor(Math.random() * 1000)}@example.com`);

  await page.locator(Selectors.adminRole).nth(1).click();

  await page.click(Selectors.submitButton);
  await page.waitForSelector(Selectors.toastMessage, { state: "visible" });
});

// DELETE USER

// test("delete user test", async ({ page }) => {
//   await page.goto(URLs.users);
//   await page.locator(Selectors.threeDotsMenu).nth(2).click();
//   await page.locator(Selectors.deleteButton).nth(1).click();
//   await page.locator(Selectors.deleteConfirm).nth(1).click();
// });
