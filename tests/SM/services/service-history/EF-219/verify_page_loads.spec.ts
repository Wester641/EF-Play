import { test, expect } from "@playwright/test";
import { screenSize } from "../../../../../constants/links";

test("EF-219 verify page ;oads ", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto("/service-history");
  await expect(
    page.getByRole("columnheader", { name: "Vehicle", exact: true })
  ).toBeVisible();

  await expect(
    page.getByRole("columnheader", { name: "Completed" })
  ).toBeVisible();

  await expect(
    page.getByRole("columnheader", { name: "Repair Priority Class" })
  ).toBeVisible();

  await expect(page.getByRole("columnheader", { name: "Meter" })).toBeVisible();

  await expect(
    page.getByRole("columnheader", { name: "Service Tasks" })
  ).toBeVisible();
  await expect(
    page.getByRole("columnheader", { name: "Issues" })
  ).toBeVisible();
  await expect(
    page.getByRole("columnheader", { name: "Vendor", exact: true })
  ).toBeVisible();
  await expect(
    page.getByRole("columnheader", { name: "Vehicle Vendor" })
  ).toBeVisible();
  await expect(
    page.getByRole("columnheader", { name: "Assigned To" })
  ).toBeVisible();
  await expect(
    page.getByRole("columnheader", { name: "Driver" })
  ).toBeVisible();
  await expect(page.getByRole("columnheader", { name: "Total" })).toBeVisible();
  await expect(
    page.getByRole("columnheader", { name: "Work Order" })
  ).toBeVisible();
  await expect(
    page.getByRole("columnheader", { name: "Labels" })
  ).toBeVisible();
});
