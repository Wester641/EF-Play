import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs, screenSize } from "../../../../constants/links";

test("EF-101__Verify Assignment Display", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.assigments);

  await page.addStyleTag({
    content: `
      ${Selectors.assignment},
      ${Selectors.freeCellInRow} {
        background-color: #7d9ec087 !important; 
        border: 1px solid #7d9ec087 !important;      
      }`,
  });

  await page.waitForTimeout(500);

  // Remove styling
  await page.addStyleTag({
    content: `
      ${Selectors.assignment},
      ${Selectors.freeCellInRow} {
        background-color: transparent !important;
        border: none !important;
      }`,
  });

  await page.waitForTimeout(10000);

  for (let i = 0; i < (await page.locator(Selectors.assignment).count()); i++) {
    const assignment = page.locator(Selectors.assignment).nth(i);

    const assignmentText = await assignment.innerText();

    console.log("Checking assignment:", assignmentText);

    await assignment.click();

    await expect(page.locator(Selectors.detailInfoRow).nth(1)).toContainText(
      assignmentText
    );

    const dateTimeRegex = /\d{4}-\d{2}-\d{2} \d{1,2}:\d{2}(:\d{2})?\s?(AM|PM)?/;

    await expect(page.locator(Selectors.detailInfoRow).nth(2)).toContainText(
      dateTimeRegex
    );
    await expect(page.locator(Selectors.detailInfoRow).nth(3)).toContainText(
      dateTimeRegex
    );

    // Not for delete, just refactor this code
    // const boundingBox = await assignment.boundingBox();
    // expect(boundingBox).not.toBeNull();
  }

  // Check assignment dates by clicking on free cell on timeline | Will be added in optimization stage
});
