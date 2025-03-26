import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs, screenSize } from "../../../../constants/links";

test("EF-282__Location of the units", async ({ page }) => {
  await page.setViewportSize(screenSize);
  
  await page.goto(URLs.samsaraDevices);

  await page.addStyleTag({
      content: `
      ${Selectors.searchInput},
      ${Selectors.dropdownBlock},
      ${Selectors.vehicleStatusDropdown},
      ${Selectors.tabButton},
      ${Selectors.addButton},
      ${"table"} {
        background-color: #7d9ec087 !important; 
        border: 1px solid #7d9ec087 !important;      
      }`,
    });
  
    await page.waitForTimeout(1000);
  
    // Remove styling
    await page.addStyleTag({
      content: `
      ${Selectors.searchInput},
      ${Selectors.dropdownBlock},
      ${Selectors.vehicleStatusDropdown},
      ${Selectors.tabButton},
      ${Selectors.addButton},
      ${"table"} {
        background-color: transparent !important;
        border: none !important;
      }`,
    });

    await page.waitForTimeout(100);

    await expect(page.locator(Selectors.searchInput)).toBeVisible();

    for (let i = 0; i < 3; i++) {
      await expect(page.locator(Selectors.dropdownBlock).nth(i)).toBeVisible();
      }

    await expect(page.locator(Selectors.vehicleStatusDropdown)).toBeVisible();

    for (let i = 0; i < 4; i++) {
      await expect(page.locator(Selectors.tabButton).nth(i)).toBeVisible();
      }

    await expect(page.locator(Selectors.addButton)).toBeVisible();

    await expect(page.getByRole('table')).toBeVisible();

    await page.waitForTimeout(100);

    const deviceName = await page.locator(Selectors.deviceNameCell).nth(0).innerText();

    await page.goto(URLs.units);

    await page.waitForTimeout(500);

    await page.locator(Selectors.searchInput).click();

    await page.locator(Selectors.searchInput).fill(deviceName);

    await page.waitForTimeout(500);

    await page.getByText( deviceName, { exact: true }).nth(0).click();

    // Add styling
    await page.addStyleTag({
      content: `
      ${Selectors.unitDetails},
      ${Selectors.locationSection} {
        background-color: #7d9ec087 !important; 
        border: 1px solid #7d9ec087 !important;      
      }`,
    });
  
    await page.waitForTimeout(1000);
  
    // Remove styling
    await page.addStyleTag({
      content: `
      ${Selectors.unitDetails},
      ${Selectors.locationSection} {
        background-color: transparent !important;
        border: none !important;
      }`,
    });
    
  const unitDetails = page.locator(Selectors.unitDetails);

  await unitDetails.waitFor({ state: "visible", timeout: 20000 }); 

  await expect(unitDetails).toBeVisible();

  await page.waitForTimeout(1000);

  const locationSection = page.locator(Selectors.locationSection).nth(2);
  
  await locationSection.waitFor({ state: "visible", timeout: 20000 });

  await expect(page.locator(Selectors.locationSection).nth(2)).toBeVisible();
    
});