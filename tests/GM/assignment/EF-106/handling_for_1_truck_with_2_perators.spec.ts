import { test } from "@playwright/test";
import { URLs, screenSize } from "../../../../constants/links";

test("EF-106_Verify Assignment Overlap Handling for 1 Truck with 2 Operators", async ({
  page,
}) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.assigments);

  const assigment = await page.waitForResponse((assigment) => {
    console.log("Checking:", assigment.url());
    return (
      assigment.url().includes("/api/v1/vehicles/assignments/") &&
      assigment.status() === 200
    );
  });

  const assigmentData = await assigment.json();
  console.log("API Vehicles:", assigmentData);
});
