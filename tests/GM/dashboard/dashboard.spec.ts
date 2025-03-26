import { test } from "@playwright/test";

import { Selectors  } from "./Selectors";


import { URLs, screenSize } from "../../../constants/links";

test("dashboard testing from 135 to 143 test cases.", async ({ page }) => {
  await page.setViewportSize(screenSize);
  
  await page.goto(URLs.dashboard);

  await page.addStyleTag({
    content: `
    ${Selectors.blockInDashboard} {
      background-color: lightblue; 
      border: 1px solid #ccc;      
    }
  `,
  });

  for (let i = 0; i < 6; i++) {
    await page
      .locator(Selectors.blockInDashboard)
      .nth(i)
      .waitFor({ state: "visible" });
  }

  await page.locator(Selectors.reminderBlock).waitFor({ state: "visible" });
  await page.locator(Selectors.issuesBlock).waitFor({ state: "visible" });

  await page
    .locator(Selectors.dragnDropFilterBlock)
    .waitFor({ state: "visible" });

  for (let j = 0; j < 2; j++) {
    await page
      .locator(Selectors.workOrderDNDThreeBlocks)
      .nth(j)
      .waitFor({ state: "visible" });
  }
});
