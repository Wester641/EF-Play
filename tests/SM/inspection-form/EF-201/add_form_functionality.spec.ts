import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs, screenSize } from "../../../../constants/links";

test("EF-201__Add Form Functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.inspectionForms);

  await page.waitForTimeout(500);

  await page.addStyleTag({
    content: `
      ${Selectors.managementTab} {
        background-color: #7d9ec087 !important; 
        border: 1px solid #7d9ec087 !important;      
      }`,
  });

  await page.waitForTimeout(500);

  // Remove styling
  await page.addStyleTag({
    content: `
      ${Selectors.managementTab} {
        background-color: transparent !important;
        border: none !important;
      }`,
  });

  await page.waitForTimeout(3000);

  await page.locator(Selectors.managementTab).nth(1).click();

  await page.waitForTimeout(1000);

  await page.locator('div').filter({ hasText: /^Inspections$/ }).click();

  await expect(page.locator(Selectors.selectDropdown)).toBeVisible();

  await page.waitForTimeout(500);

  await page.locator(Selectors.inspectionsTab).nth(1).click();

  await page.waitForTimeout(3000);

  await expect(page.locator(Selectors.headerTable).first()).toBeVisible();

  const currentCellBefore = await page.locator(Selectors.cellTitle).nth(2).innerText();
  console.log(`Cell 2 text before: ${currentCellBefore}`);

  await page.locator(Selectors.settingsButton).nth(1).click();

  await page.waitForTimeout(1000);

  const randomNum = Math.floor(Math.random() * 100);
  const expectedText = `Test Form number: ${randomNum}`;

  await page.locator(Selectors.titleField).fill(`Test Form number: ${randomNum}`);

  await page.locator('textarea[name="description"]').fill(`Test Description number: ${randomNum}`);

  await page.locator(Selectors.tickInput).nth(0).click();

  await page.locator(Selectors.tickInput).nth(1).click();

  await page.locator(Selectors.colorDropdown).first().click();

  const allColors = await page.locator(Selectors.color).all();

  await allColors[Math.floor(Math.random() * allColors.length)].click();

  await page.getByText("Continue").click();

  await page.waitForTimeout(3000);

  await expect(page.locator(Selectors.dataBlock).first()).toBeVisible();

  await page.locator(Selectors.dataBlock).first().click();

  await page.waitForTimeout(3000);

  await expect(page.locator(Selectors.dataBlock).first()).toBeVisible();

  await page.locator(Selectors.titleField).nth(0).fill("Data Label Test");

  await page.locator(Selectors.titleField).nth(1).fill("Label Test");

  await page.locator('textarea[name="items\\.0\\.instructions"]').nth(0).fill("Test");

  await page.getByText("Save").click();

  await page.waitForTimeout(3000);

  await expect(page.locator(Selectors.headerTable).first()).toBeVisible();

  let found = false;

  const amountOfPages = (await page.locator(".css-13zgp8s").count()) - 2;

  for (let i = 0; i < amountOfPages; i++) {
    for (let j = 0; j < 10; j++) {
      const currentCell = page.locator(Selectors.cellTitle).nth(j);
      const cellText = await currentCell.innerText();
      console.log(`Cell ${j} text: ${cellText}`);

      if (cellText.includes(expectedText)) {
        found = true;
        break;
      }
    }
    if (found) break; 
    await page.getByRole('button', { name: 'Go to next page' }).click();
    await page.waitForTimeout(3000);
  }

  expect(found).toBe(true);
});