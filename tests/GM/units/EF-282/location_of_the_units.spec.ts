import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs, screenSize } from "../../../../constants/links";

test("EF-282__Location of the units", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.samsaraDevices);
  await page.waitForTimeout(1000);

  await page.getByRole('tab', { name: 'Assigned', exact: true }).click();
  await page.waitForTimeout(1000);

  const allDeviceElements = await page.locator(Selectors.deviceNameCell).all();
  const validDevices = [];
  const checkedDeviceNames = new Set();

  for (let i = 0; i < allDeviceElements.length; i++) {
    const deviceName = await allDeviceElements[i].innerText();
    const trimmedName = deviceName.trim();

    if (
      !trimmedName ||
      trimmedName === "-" ||
      checkedDeviceNames.has(trimmedName)
    ) {
      continue;
    }

    validDevices.push({
      name: trimmedName,
      index: i
    });
    checkedDeviceNames.add(trimmedName);
  }
  
  if (validDevices.length === 0) {
    throw new Error("Не найдено ни одного валидного устройства (все Unassigned)");
  }

  let deviceName = "";
  let foundWorkingDevice = false;

  for (let i = 0; i < validDevices.length; i++) {
    const device = validDevices[i];
    deviceName = device.name;
      
    await page.getByText("Units").click();
    await page.waitForTimeout(500);
    
    await page.locator(Selectors.searchInput).click();
    await page.locator(Selectors.searchInput).clear();
    await page.locator(Selectors.searchInput).fill(deviceName);
    await page.waitForTimeout(1000);
    
    const searchResults = page.getByText(deviceName, { exact: true });
    const resultCount = await searchResults.count();
    
    if (resultCount > 0) {
      await searchResults.nth(0).click();
      foundWorkingDevice = true;
      break;
    } else {
      await page.goto(URLs.samsaraDevices);
      await page.waitForTimeout(1000);
    }
  }

  if (!foundWorkingDevice) {
    throw new Error(`Не удалось найти ни одного рабочего устройства из ${validDevices.length} валидных`);
  }

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
