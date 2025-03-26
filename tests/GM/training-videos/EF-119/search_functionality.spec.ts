import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs, screenSize } from "../../../../constants/links";

test("EF-119__Verify Search Functionality on the 'Training Videos' Page", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.trainingPage, { waitUntil: 'networkidle' });

  await page.waitForTimeout(1000);

  const tabList = await page.locator(Selectors.tabNavigation).allInnerTexts();

  const randomSection = tabList[Math.floor(Math.random() * tabList.length)];

  let found = false;

  await page.addStyleTag({
          content: `
          ${Selectors.searchInput},
          ${Selectors.infoBlock},
          ${Selectors.tabNavigation} {
            background-color: #7d9ec087 !important; 
            border: 1px solid #7d9ec087 !important;      
          }`,
        });
      
  await page.waitForTimeout(500);
      
        // Remove styling
  await page.addStyleTag({
        content: `
          ${Selectors.searchInput},
          ${Selectors.infoBlock},
          ${Selectors.tabNavigation} {
            background-color: transparent !important;
            border: none !important;
          }`,
    });
    
  await page.waitForTimeout(1000);

  const firstBlockBefore = await page.locator(Selectors.infoBlock).nth(0).textContent();

  await expect(page.locator(Selectors.searchInput).first()).toBeVisible();

  await page.locator(Selectors.searchInput).first().fill(randomSection);

  await page.waitForTimeout(3000);

  const infoBlocksCount = await page.locator(Selectors.infoBlock).count();

  for (let i = 0; i < infoBlocksCount; i++) {

    const block = page.locator(Selectors.infoBlock).nth(i);

    const blockText = await block.textContent();

    if (blockText && blockText.toLowerCase().includes(randomSection.toLowerCase())) {
      found = true;
      await expect(page.locator(Selectors.infoBlock).nth(i)).toContainText(randomSection, { ignoreCase: true });
      break;
    }
  }

  if (!found) {
    throw new Error(`No blocks with "${randomSection}" text.`)
  }

  await page.locator(Selectors.searchInput).first().fill("");

  const firstBlockAfter = await page.locator(Selectors.infoBlock).nth(0).textContent();

  await expect(firstBlockBefore).toEqual(firstBlockAfter);

  await page.locator(Selectors.searchInput).first().fill("abc123");

  await expect(page.locator(Selectors.infoBlock)).toHaveCount(0);
});