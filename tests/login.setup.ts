import { test as setup } from "@playwright/test";
import {
  devCredentials,
  prodCredentials,
  URLs,
  screenSize,
} from "../constants/links";

setup("Login and save session", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.login);
  await page.waitForLoadState("domcontentloaded");

  await page.getByRole("textbox", { name: "Email" }).fill(devCredentials.email); // if you work on production change to "prodCredentials"

  await page
    .getByRole("textbox", { name: "Password" })
    .fill(devCredentials.password); // here also change the credentials to simple "prodCredentials" instead "devCredentials"
  await page.getByRole("button", { name: "Login" }).click();

  await page.waitForSelector("text=Dashboard");

  await page.context().storageState({ path: ".auth/login.json" });
});

// change the URLs.dashboard to URLs.onboarding_form if you configuring on production
// go to auth folder and login.json "origins": ["origin": "https://dev-app.easyfleet.ai"] change to "https://app.easyfleet.ai"
