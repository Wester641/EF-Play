import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs, screenSize } from "../../../../constants/links";

test("EF-120__Verify Selecting a Page from the List Displays Related Videos", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.trainingPage, { waitUntil: 'networkidle' });

  await page.waitForTimeout(1000);

  const randomSectionFirst = page.locator(Selectors.tabNavigation).nth(Math.floor(Math.random() * 4));
  await expect(randomSectionFirst).toBeVisible();

  const randomSectionSecond = page.locator(Selectors.tabNavigation).nth(Math.floor(Math.random() * 4));
  await expect(randomSectionSecond).toBeVisible();

  const randomSectionSecondText = await randomSectionSecond.innerText();

  let found = false;

        // Add styling
  await page.addStyleTag({
          content: `
          ${Selectors.mainBlock},
          ${Selectors.tabNavigation},
          ${Selectors.searchInput} {
            background-color: #7d9ec087 !important; 
            border: 1px solid #7d9ec087 !important;      
          }`,
        });
      
  await page.waitForTimeout(500);
      
        // Remove styling
  await page.addStyleTag({
        content: `
          ${Selectors.mainBlock},
          ${Selectors.tabNavigation},
          ${Selectors.searchInput} {
            background-color: transparent !important;
            border: none !important;
          }`,
    });
    
  await page.waitForTimeout(1000);

  await randomSectionFirst.click();

  await page.waitForTimeout(1000);

  const mainBlocks = await page.locator(Selectors.mainBlock).all();

  for (const block of mainBlocks) {
    const hasTextBlock = await block.locator("div:nth-of-type(1)").count();
    const hasButtonBlock = await block.locator(Selectors.buttonBlock).count();

    expect(hasTextBlock).toBeGreaterThan(0);
    expect(hasButtonBlock).toBeGreaterThan(0);
  }

  await page.waitForTimeout(1000);

  await randomSectionFirst.click();

  await page.locator(Selectors.searchInput).first().fill(randomSectionSecondText);
  
  await page.waitForTimeout(3000);
  
  const mainBlocksCount = await page.locator(Selectors.mainBlock).count();
  
  for (let i = 0; i < mainBlocksCount; i++) {
  
    const block = page.locator(Selectors.mainBlock).nth(i);
  
    const blockText = await block.textContent();
  
    if (blockText && blockText.toLowerCase().includes(randomSectionSecondText.toLowerCase())) {
      found = true;
      await expect(page.locator(Selectors.mainBlock).nth(i)).toContainText(randomSectionSecondText, { ignoreCase: true });
      break;
    }
  }
  
  if (!found) {
    throw new Error(`No blocks with "${randomSectionSecondText}" text.`)
  }

});