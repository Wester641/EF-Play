import { test, expect } from "@playwright/test";
import { BASE_URL, screenSize, URLs } from "../../../../constants/links";

test("EF-112__Switching between tabs ", async ({ page }) => {
  await page.setViewportSize(screenSize);
  await page.goto(URLs.samsaraDevices);
  const requests: string[] = [];

  page.on("request", (request) => {
    if (request.url().includes("/api/v1/vehicles/telematics-devices/")) {
      requests.push(request.url());
    }
  });

  await page.getByRole("tab", { name: "Assigned", exact: true }).click();
  await page.waitForTimeout(2000);

  await page.getByRole("tab", { name: "Unassigned" }).click();
  await page.waitForTimeout(2000);

  await page.getByRole("tab", { name: "Archived" }).click();
  await page.waitForTimeout(2000);
  
  await page.getByRole("tab", { name: "All" }).click();
  await page.waitForTimeout(2000);

  const baseUrl = BASE_URL;
  const expectedUrls = [
    `${baseUrl}/api/v1/vehicles/telematics-devices/?offset=0&limit=10&assigned=true`,
    `${baseUrl}/api/v1/vehicles/telematics-devices/?offset=0&limit=10&unassigned=true`,
    `${baseUrl}/api/v1/vehicles/telematics-devices/?offset=0&limit=10&archived=true`,
    `${baseUrl}/api/v1/vehicles/telematics-devices/?offset=0&limit=10`,
  ];

  expect(requests.sort()).toEqual(expectedUrls.sort());

  expectedUrls.forEach((expectedUrl) => {
    expect(requests).toContain(expectedUrl);
  });
});
