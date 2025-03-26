import { test, expect, Locator } from "@playwright/test";
import { Selectors } from "./Selectors";
import { URLs } from "../../../../constants/links";

test("EF-55__Filter Functionality", async ({ page }) => {
  await page.goto(URLs.fuelHistory);

  const tabs = page.locator(Selectors.filter_tab);
  const count = await tabs.count();

  for (let i = 0; i < count; i++) {
    await highlightTab(tabs.nth(i));
  }

  // Select Range
  await selectDropdownOption(page, 0, 2);
  await page.locator(Selectors.clear_icon).click();

  //Select Vehicle
  await selectDropdownOption(page, 1, 0, true);
  await page.locator(Selectors.filter_tab).nth(1).click();
  await page.locator(Selectors.clear_icon).click();

  //Select Vehicle Group
  await selectDropdownOption(page, 2, 1, true);
  await page.locator(Selectors.filter_tab).last().click();

  //Select Vendor
  await selectDropdownOption(page, 3, 1, true);
  await page.locator(Selectors.filter_tab).nth(3).click();
  await page.locator(Selectors.clear_icon).click();

  await page.locator(Selectors.filter_tab).nth(2).waitFor({ state: "visible" });
  await page.locator(Selectors.clear_icon).click();
});

//
async function highlightTab(tab: Locator) {
  await tab.evaluate((el) => {
    el.style.backgroundColor = "#7d9ec087";
    el.style.border = "1px solid #7d9ec087";
  });
  await tab.page().waitForTimeout(500);

  await tab.evaluate((el) => {
    el.style.backgroundColor = "transparent";
    el.style.border = "none";
  });
  await tab.page().waitForTimeout(300);
}

async function selectDropdownOption(
  page,
  tabIndex: number,
  optionIndex: number,
  apply: boolean = false
) {
  await page.locator(Selectors.filter_tab).nth(tabIndex).click();

  const highlightStyle = `
    ${Selectors.drdown_option}:nth-of-type(${optionIndex + 1}) {
      background-color: lightblue !important;
      border: 1px solid #ccc !important;
    }
  `;
  const clearStyle = `
    ${Selectors.drdown_option}:nth-of-type(${optionIndex + 1}) {
      background-color: transparent !important;
      border: none !important;
    }
  `;

  await page.addStyleTag({ content: highlightStyle });
  await page.locator(Selectors.drdown_option).nth(optionIndex).click();
  await page.addStyleTag({ content: clearStyle });
  await page.waitForTimeout(300);

  if (apply) {
    const applyBtn = page.locator(Selectors.apply_btn).nth(1);
    await applyBtn.scrollIntoViewIfNeeded();
    await applyBtn.click();
  }
}
