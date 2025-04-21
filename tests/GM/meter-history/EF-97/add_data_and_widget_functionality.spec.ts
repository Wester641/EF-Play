import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs, screenSize } from "../../../../constants/links";

test("EF-97__Verify 'Add Meter Entry' Button and Widget Functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);
  
  await page.goto(URLs.meterHistory);

  await page.waitForTimeout(500);

  // Add styling
  await page.addStyleTag({
    content: `
      ${Selectors.searchInput},
      ${Selectors.dataCells},
      ${Selectors.addButton} {
        background-color: #7d9ec087 !important; 
        border: 1px solid #7d9ec087 !important;      
      }`,
  });

  await page.waitForTimeout(500);

  // Remove styling
  await page.addStyleTag({
    content: `
      ${Selectors.searchInput},
      ${Selectors.dataCells},
      ${Selectors.addButton} {
        background-color: transparent !important;
        border: none !important;
      }`,
  });

  await page.waitForTimeout(3000);

  const rows = await page.locator(Selectors.dataRow).all(); 

  const vehicleNames: string[] = [];
  
  for (const row of rows) {
    const firstTD = row.locator('td:first-child');
    const text = await firstTD.innerText();
    vehicleNames.push(text.trim());
  }

  const randomVehicle = vehicleNames[Math.floor(Math.random() * vehicleNames.length)];

  await page.locator(Selectors.searchInput).fill(String(randomVehicle))

  await page.waitForTimeout(500);

  await expect(page.locator(Selectors.dataCells).nth(0)).toContainText(String(randomVehicle))

  await page.getByText('Add Meter Entry').first().click();

  await page.waitForTimeout(3000);

  await expect(page.locator(Selectors.addMenu)).toBeVisible();  

  await page.click(Selectors.vehicleInput);

  await page.waitForTimeout(3000);

  const options = await page.locator(Selectors.dropdownOptions).all();

  const randomIndex = Math.floor(Math.random() * options.length);

  await options[randomIndex].click();

  const randomMeter = Math.floor(Math.random() * (50000 - 10000 + 1)) + 10000;

  await expect(async () => {
    await page.locator(Selectors.valueInput).nth(0).fill("text");
  }).rejects.toThrow(/Cannot type text into input\[type=number\]/);

  await page.locator(Selectors.valueInput).nth(0).fill(String(randomMeter));

  await expect(page.locator(Selectors.valueInput).nth(0)).toHaveValue(String(randomMeter));

  await page.click(Selectors.voidInput);

  const today = new Date();

  const year = today.getFullYear();

  const month = String(today.getMonth() + 1).padStart(2, '0');

  const day = String(today.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;

  await page.locator(Selectors.valueInput).nth(1).fill(formattedDate);

  await page.waitForTimeout(500);

  await expect(page.locator(Selectors.valueInput).nth(1)).toHaveValue(formattedDate);

  await page.click(Selectors.saveButton);

  await page.waitForTimeout(1000);

  await expect(page.locator(Selectors.successAlert)).toBeVisible();

  await expect(page.locator(Selectors.successAlert)).toContainText("Meter Entry is added!");


  await page.getByText('Add Meter Entry').first().click();

  await page.waitForTimeout(3000);

  await page.click(Selectors.vehicleInput);

  await options[randomIndex].click();

  await page.waitForTimeout(1000);

  await page.locator(Selectors.valueInput).nth(0).fill(String(randomMeter));

  await page.click(Selectors.voidInput);

  await page.locator(Selectors.valueInput).nth(1).fill(formattedDate);

  await page.waitForTimeout(500);

  await page.click(Selectors.cancelButton);

  await page.waitForTimeout(1000);

  await expect(page.locator(Selectors.successAlert)).not.toBeVisible();
});