import { expect, test } from "@playwright/test";
import { URLs, screenSize } from "../../../../../constants/links";

test("EF-271__verify_switch_tabs_between_statuses_due_soon_overdue_and_all", async ({
  page,
}) => {
  await page.setViewportSize(screenSize);
  await page.goto(URLs.serviceRemindersPage);

  await page.getByRole("tab", { name: "Due Soon" }).click();
  await page.getByRole("tab", { name: "Overdue" }).click();
  await page.getByRole("tab", { name: "All" }).click();
});
