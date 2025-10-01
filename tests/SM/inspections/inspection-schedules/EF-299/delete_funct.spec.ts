import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs, screenSize } from "../../../../../constants/links";

test("EF-299__Delete functionality test", async ({ page }) => {
  await page.setViewportSize(screenSize);
  await page.goto(URLs.inspection_schedules);
  await page.waitForTimeout(3000);
  
  await expect(page.locator(Selectors.headerTable).first()).toBeVisible();
  
  const clickMoreButton = async () => {
    await page.locator(Selectors.moreButton).nth(1).click();
    await page.waitForTimeout(1000);
  };
  
  const clickDeleteButton = async () => {
    const deleteButton = page.getByText('Delete');
    await deleteButton.click();
    await page.waitForTimeout(1000);
  };
  
  const checkModalWindow = async () => {
    await page.waitForTimeout(1000);
    
    const cancelButton = page.getByRole('button', { name: 'Cancel' });
    const deleteModalButton = page.getByRole('button', { name: 'Delete' });
    
    await expect(cancelButton).toBeVisible();
    await expect(deleteModalButton).toBeVisible();
    
    return { cancelButton, deleteModalButton };
  };
  
  await clickMoreButton();
  await clickDeleteButton();
  
  const { deleteModalButton: firstDeleteButton } = await checkModalWindow();
  await firstDeleteButton.click();
  
  const successMessage = page.getByText('Successfully deleted!');
  await expect(successMessage).toBeVisible({ timeout: 5000 });
  
  await expect(page.getByRole('button', { name: 'Cancel' })).not.toBeVisible();
  
  await expect(successMessage).not.toBeVisible({ timeout: 10000 });
});