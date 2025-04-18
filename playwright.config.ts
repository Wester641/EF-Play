import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  timeout: 90000,
  expect: {
    timeout: 10000,
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  // workers: process.env.CI ? 1 : undefined,
  workers: process.env.CI ? 1 : 10,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [["list"], ["html"]],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    // Используйте headless: true для CI и false для локальной разработки
    headless: process.env.CI ? true : false,
    // headless: false,
    launchOptions: {
      args: ["--start-maximized"],
      slowMo: 500,
    },
    screenshot: "on",
    video: "on",
    trace: "on",
    baseURL: "https://app.easyfleet.ai",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "setup",
      use: { ...devices["Desktop Chrome"] },
      testMatch: /.*\.setup\.ts/,
    },

    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], storageState: ".auth/login.json" },
      dependencies: ["setup"],
    },

    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"], storageState: ".auth/login.json" },
    // },

    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"], storageState: ".auth/login.json" },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
