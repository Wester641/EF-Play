import { test as setup } from "@playwright/test";
import { Credentials, URLs, screenSize } from "../constants/links";

setup("Login and save session", async ({ page }) => {
  await page.setViewportSize(screenSize);

  await page.goto(URLs.login);
  await page.waitForLoadState("domcontentloaded");

  await page.getByRole("textbox", { name: "Email" }).fill(Credentials.email);

  await page
    .getByRole("textbox", { name: "Password" })
    .fill(Credentials.password);
  await page.getByRole("button", { name: "Login" }).click();

  await page.waitForURL(
    (url) => url.pathname === "/dashboard" || url.pathname === URLs.units
  );

  await page.context().storageState({ path: ".auth/login.json" });
});
