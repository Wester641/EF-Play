import { test, expect } from "@playwright/test";
import { Selectors, time } from "./Selectors";
import { URLs, screenSize } from "../../../../constants/links";

test("EF-51_Individiual User Actions", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.users);

  await page.locator(Selectors.threeDotsBtn).nth(1).click();

  const menuItem = await page
    .locator(Selectors.threeDotsMenuItem)
    .elementHandles();
  for (let i = 0; i < menuItem.length; i++) {
    if (i < menuItem.length) {
      await page.addStyleTag({
        content: `
                ${Selectors.threeDotsMenuItem}:nth-of-type(${i + 1}) {
                    background-color: lightblue !important;
                    border: 1px solid #ccc !important;
                }`,
      });

      await page.waitForTimeout(100);

      // Remove styling
      await page.addStyleTag({
        content: `
        ${Selectors.threeDotsMenuItem}}:nth-of-type(${i + 1}) {
                    background-color: transparent !important;
                    border: none !important;
                }`,
      });
    }
  }
  //Edit User
  await page.locator(Selectors.threeDotsMenuItem).nth(0).click();
  await expect(page.locator(Selectors.basicDetailsText).nth(0)).toHaveText(
    "Basic Details"
  );
  await page
    .locator(Selectors.input)
    .nth(0)
    .fill(`User #${Math.floor(Math.random() * 10000).toFixed()} ${time}`);
  await page
    .locator(Selectors.input)
    .nth(3)
    .fill(`example${Math.floor(Math.random() * 1000)}@example.com`);
  await page.locator(Selectors.submitBtn).scrollIntoViewIfNeeded();
  await page.locator(Selectors.submitBtn).click();
  await expect(page.locator(Selectors.toastMsg)).toHaveText(
    "User is updated!",
    {
      timeout: 5000,
    }
  );
  await page.goto(URLs.users);
  // await page.setViewportSize(screenSize);

  //Delete User
  // await page.locator(Selectors.threeDotsBtn).nth(1).click();
  // await page.locator(Selectors.threeDotsMenuItem).nth(1).click();
  // await expect(page.locator(Selectors.confirmDelText)).toHaveText(
  //   "Are you sure you want to delete?"
  // );
  // await page.locator(Selectors.deleteBtn).click();
  // await expect(page.locator(Selectors.toastMsg)).toHaveText("Success deleted", {
  //   timeout: 5000,
  // });

  // Resend Invitation
  await page.locator(Selectors.threeDotsBtn).nth(1).click();
  await page.locator(Selectors.threeDotsMenuItem).nth(2).click();
  await expect(page.locator(Selectors.toastMsg).nth(1)).toHaveText(
    "Successfully resent invitation!",
    {
      timeout: 5000,
    }
  );
  await page.waitForTimeout(2000);
  //Archive
  // await page.locator(Selectors.threeDotsBtn).nth(1).click();
  // await page.locator(Selectors.threeDotsMenuItem).nth(3).click();
  // await expect(
  //   page
  //     .locator(Selectors.toastMsg)
  //     .filter({ hasText: /Success archived|Error archived/ })
  // ).toBeVisible();
});
