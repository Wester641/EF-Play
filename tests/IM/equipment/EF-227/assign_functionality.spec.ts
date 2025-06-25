import { expect, test } from "@playwright/test";
import { screenSize } from "../../../../constants/links";
import { Selectors } from "./Selectors";

test("EF-227__Verify Assign/Unassign Button Functionality", async ({
  page,
}) => {
  await page.setViewportSize(screenSize);

  await page.goto("/equipments", { waitUntil: "networkidle" });
  expect(page.url()).toContain("/equipments");

  await page.waitForTimeout(3000);

  await page
    .getByRole("button", { name: "Assign", exact: true })
    .first()
    .click();
  await page.waitForTimeout(1000);

  await page.locator(Selectors.assignField).nth(0).click();
  await page.waitForTimeout(25000);

  // const randomLinkVehicle =
  //   allLinkVehicle[Math.floor(Math.random() * allLinkVehicle.length)];
  // await randomLinkVehicle.click();

  //   await page.waitForTimeout(1000);

  //   await page.locator(Selectors.assignField).nth(1).click();
  //   await page.waitForTimeout(1000);

  //   const allAssigned = await page.getByRole("option").all();
  //   const randomAssigned = allAssigned[Math.floor(Math.random() * allAssigned.length)];
  //   await randomAssigned.click();

  //   await page.waitForTimeout(1000);

  //   await page.getByRole('button', { name: 'Assign', exact: true }).first().click();
  //   await page.waitForTimeout(1000);

  //   await expect(page.getByText('Success').first()).toBeVisible();

  //   await page.getByRole('button', { name: 'Unassign', exact: true }).first().click();
  //   await page.waitForTimeout(1000);

  //   const randomSalary = String(Math.floor(Math.random() * 1000) * 10);
  //   await page.locator(Selectors.unassignField).first().fill(randomSalary);

  //   const today = new Date();
  //   const tomorrow = new Date(today);
  //   tomorrow.setDate(today.getDate() + 1);

  //   await page.locator(Selectors.unassignField).nth(1).fill(today.toLocaleDateString('en-CA'));
  //   await page.locator(Selectors.unassignField).nth(2).fill(tomorrow.toLocaleDateString('en-CA'));

  //   await page.getByRole('button', { name: 'Unassign', exact: true }).first().click();
  //   await page.waitForTimeout(1000);

  //   await expect(page.getByText('Success').first()).toBeVisible();
});
