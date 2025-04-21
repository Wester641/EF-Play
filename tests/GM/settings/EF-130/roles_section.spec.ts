import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs, screenSize } from "../../../../constants/links";

test.describe.serial("EF-130__Roles Section", () => {

  const num = Math.floor(Math.random() * 1000);

  test("EF-130__Roles Section Part 1", async ({ page }) => {
    await page.setViewportSize(screenSize);
  
    await page.goto(URLs.settings);
  
    await page.waitForTimeout(3000);
  
    await page.locator(Selectors.tabNavigation).nth(0).click();
  
    await page.waitForTimeout(3000);
  
    await expect(page.locator(Selectors.searchInput)).toBeVisible();
  
    if (await page.locator(Selectors.dataResult).count() == 0) {
      await expect(page.locator(Selectors.infoBlock).nth(0)).toContainText("No records found");
    }
  
    await expect(page.locator(Selectors.settingsButton).nth(0)).toBeVisible();
  
    await expect(page.locator(Selectors.settingsButton).nth(1)).toBeVisible();
  
    await expect(page.locator(Selectors.addButton).nth(0)).toBeVisible();
  
    await page.locator(Selectors.addButton).nth(0).click();
  
    await page.waitForTimeout(3000);
  
    await expect(page.locator(Selectors.createRoleModal)).toBeVisible();
  
    const inputFieldCount = await page.locator(Selectors.inputField).count();
    const tickHeaderCount = await page.locator(Selectors.tickHeader).count();
    const tickRowCount = await page.locator(Selectors.tickRow).count();
  
    await expect(inputFieldCount).toBe(2);
    await expect(tickHeaderCount).toBe(1);
    await expect(tickRowCount).toBe(29);
  
    await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
  
    await expect(page.getByRole('button', { name: 'Save' })).toBeVisible();
  
    await page.locator('input[name="name"]').fill(`Role number: ${num}`);
  
    for (let i = 0; i < 29; i++) {
  
      const currentTickRow = page.locator(Selectors.permSelect).nth(i)
  
      const checkboxes = currentTickRow.locator('label span .css-1m9pwf3');
  
      const randomIndex = Math.floor(Math.random() * 3);
  
      await checkboxes.nth(randomIndex).check();
    }
  
    await page.getByRole('button', { name: 'Save' }).click(); 
  
    await page.waitForTimeout(3000);
  
  });
  
    test("EF-130__Roles Section Part 2", async ({ page }) => {
  
    await page.goto(URLs.settingsRoles);
  
    await page.waitForTimeout(10000);
  
    let found = false;

    console.log(num);
  
    const expectedText = `Role number: ${num}`;
  
    while (true) {
  
      const countOfDataResults = await page.locator(Selectors.dataResult).count();
  
      const elementsToCheck = Math.min(countOfDataResults, 10);
  
      for (let i = 0; i < elementsToCheck; i++) {
  
        const currentDataResult = page.locator(Selectors.dataResult).nth(i);
  
        const text = await currentDataResult.innerText();
  
        if (text.includes(expectedText)) {
  
          found = true;
  
          break;
        }
      }
  
      if (found) break;
  
      const nextButton = page.getByRole('button', { name: 'next', exact: false });
  
      if (!(await nextButton.isEnabled())) break;
  
      await nextButton.click();
      
      await page.waitForLoadState('networkidle');
    }
  
    expect(found).toBe(true);
  });
});