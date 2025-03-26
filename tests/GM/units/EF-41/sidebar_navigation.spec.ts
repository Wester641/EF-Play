import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs, screenSize } from "../../../../constants/links";

test("EF-41__Sidebar Navigation", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.units);

  await expect(page.locator(Selectors.unitContainer)).toBeVisible();

  await page.addStyleTag({
    content: `
    ${Selectors.unitContainer} {
      background-color: lightblue; 
      border: 1px solid #ccc;      
    }
  `,
  });
});
