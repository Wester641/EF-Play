import { test } from "@playwright/test";
import { Selectors } from "./Selectors";

import { URLs, screenSize } from "../../../../constants/links";

test("EF-44__Units Statistics Display", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.units);
  
  await page.addStyleTag({
    content: `
    ${Selectors.unitsDownTime}:nth-child(1) {
      background-color: lightblue; 
      border: 1px solid #ccc;      
    }
  `,
  });

  await page.waitForTimeout(2000);

  await page.addStyleTag({
    content: `
    ${Selectors.unitsDownTime}:nth-child(2) {
      background-color: lightblue; 
      border: 1px solid #ccc;      
    }
  `,
  });
  await page.waitForTimeout(2000);

  await page.addStyleTag({
    content: `
    ${Selectors.unitsCanvasSpider}{
      background-color: lightblue; 
      border: 1px solid #ccc;      
    }
  `,
  });
  await page.waitForTimeout(2000);
});
