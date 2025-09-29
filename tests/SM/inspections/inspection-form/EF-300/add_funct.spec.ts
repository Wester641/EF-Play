import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { screenSize, URLs } from "../../../../../constants/links";

test("EF-300__Add Schedules Functionality", async ({ page }) => {
  await page.setViewportSize(screenSize);
  
  await page.goto(URLs.inspectionForms);
  
  await page.waitForTimeout(500);
  
  await expect(page.locator(Selectors.headerTable).first()).toBeVisible();
  
  await page.locator(Selectors.dataRow).nth(0).click();
  await page.waitForTimeout(3000);
  
  await expect(page.getByText("Inspection Details")).toBeVisible();
  
  const applyButton = page.locator("button:has-text('Schedules')");
  await expect(applyButton).toBeVisible();
  await applyButton.click();
  await page.waitForTimeout(3000);
  
  const radioButtonAll = page.locator(Selectors.radioButtonAll);
  await expect(radioButtonAll).toBeVisible();
  await radioButtonAll.click();
  await page.waitForTimeout(1000);
  
  const setScheduleCheckbox = page.locator(Selectors.checkbox).nth(4);
  await expect(setScheduleCheckbox).toBeVisible();
  await setScheduleCheckbox.click();
  await page.waitForTimeout(1000);
  
  const firstSelect = page.locator(Selectors.selectControl);
  await firstSelect.first().click();
  await page.waitForTimeout(500);
  
  const dailyOption = page.locator(Selectors.selectOption).first();
  await expect(dailyOption).toBeVisible();
  await dailyOption.click();
  await page.waitForTimeout(1000);
  
  const sixthCheckbox = page.locator(Selectors.checkbox).nth(5);
  await expect(sixthCheckbox).toBeVisible();
  await sixthCheckbox.click();
  await page.waitForTimeout(1000);

  const intervalInput = page.locator(Selectors.intervalInput);
  await expect(intervalInput).toBeVisible();
  await intervalInput.fill('1');
  await page.waitForTimeout(1000);

  const SecondSelect = page.locator(Selectors.selectControl);
  await SecondSelect.nth(1).click();
  await page.waitForTimeout(500);

  const menuContainer = page.locator(Selectors.menuContainer);
  await expect(menuContainer).toBeVisible();

  const option = page.locator(Selectors.menuOption).first();
  await expect(option).toBeVisible();
  await option.click();
  await page.waitForTimeout(1000)
  
  const saveButton = page.locator("button:has-text('Save')");
  await expect(saveButton).toBeVisible();
  await saveButton.click();
  await page.waitForTimeout(2000);

  const successMessage = page.getByText("Rule successfully created!");
  await expect(successMessage).toBeVisible();
  await page.waitForTimeout(1000);

  await expect(page.getByText("Inspection Details")).toBeVisible();
});