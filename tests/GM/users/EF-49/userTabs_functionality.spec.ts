import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs, screenSize } from "../../../../constants/links";

test("EF-49__User Tabs Functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.users);

  await page.waitForTimeout(10000);
  // await expect(page.locator(Selectors.searchInput)).toBeVisible();

  await page.waitForTimeout(500);

  const tabs = await page.locator(Selectors.userTabs).elementHandles();
  for (let i = 0; i < tabs.length; i++) {
    if (i < tabs.length) {
      await page.addStyleTag({
        content: `
          ${Selectors.userTabs}:nth-of-type(${i + 1}) {
                      background-color: #7d9ec087 !important;
                      border: 1px solid #7d9ec087 !important;
                  }`,
      });

      await page.waitForTimeout(100);

      // Remove styling
      await page.addStyleTag({
        content: `
          ${Selectors.userTabs}}:nth-of-type(${i + 1}) {
                      background-color: transparent !important;
                      border: none !important;
                  }`,
      });
    }
  }
  await page.waitForTimeout(1000);

  //Go to Active tab
  await expect(page.locator(Selectors.activeTab).nth(1)).toBeVisible();
  await page.locator(Selectors.activeTab).nth(1).click();
  await expect(page).toHaveURL(/users\?page=1&status=active&tab=1/);

  //Go to Invited tab
  await expect(page.locator(Selectors.activeTab).nth(2)).toBeVisible();
  await page.locator(Selectors.activeTab).nth(2).click();
  await expect(page).toHaveURL(/users\?page=1&status=invited&tab=2/);

  //Go to Archived tab
  await expect(page.locator(Selectors.activeTab).nth(3)).toBeVisible();
  await page.locator(Selectors.activeTab).nth(3).click();
  await expect(page).toHaveURL(/users\?page=1&status=archived&tab=3/);

  //Go back to All tab
  await page.locator(Selectors.activeTab).nth(0).click();
  await expect(page).toHaveURL(/users\?page=1&status=&tab=0/);
  await page.waitForTimeout(1000);
});
