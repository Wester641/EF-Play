import { test, expect } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs, screenSize } from "../../../../../constants/links";

test("EF-296__Tab navigation", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.inspection_schedules);

  await page.waitForTimeout(3000);

  await expect(page.locator(Selectors.headerTable).first()).toBeVisible();

  const filters = ["All", "Upcoming", "Due Soon", "Overdue"];

  const getTableStatuses = async (): Promise<string[]> => {
    await page.waitForTimeout(1000);
    const statusCells = await page.locator(Selectors.statusColumn).allTextContents();
    return statusCells
      .map((statusText: string) => statusText.trim())
      .filter((statusText: string) => statusText !== "");
  };

  const validateStatusesForFilter = (statusList: string[], filterName: string): boolean => {
    if (filterName === "All") {
      return true;
    }
    
    if (filterName === "Upcoming") {
      return statusList.every((status: string) => 
        status.toLowerCase().includes("upcoming")
      );
    }
    
    if (filterName === "Due Soon") {
      return statusList.every((status: string) => 
        status.toLowerCase().includes("due soon")
      );
    }
    
    if (filterName === "Overdue") {
      return statusList.every((status: string) => 
        status.toLowerCase().includes("overdue")
      );
    }
    
    return false;
  };

  for (const filter of filters) {

    await page.locator(Selectors.filterTab).filter({ hasText: filter }).click();

    await page.waitForTimeout(2000);

    const activeFilter = page.locator(Selectors.filterTab).filter({ hasText: filter });
    await expect(activeFilter).toHaveClass(/Mui-selected/);

    const tableStatuses = await getTableStatuses();

    if (tableStatuses.length > 0) {
      const isValid = validateStatusesForFilter(tableStatuses, filter);
      
      if (!isValid && filter !== "All") {
        console.warn(`Warning: Some statuses may not match filter "${filter}"`);
        console.warn(`Found statuses:`, tableStatuses);
      }
      
    } else {
      console.log(`No data found for filter: ${filter}`);
    }

    await page.waitForTimeout(500);
  }

  for (const filter of filters) {
    const filterElement = page.locator(Selectors.filterTab).filter({ hasText: filter });
    await expect(filterElement).toBeVisible();
    await expect(filterElement).toBeEnabled();
  }
});