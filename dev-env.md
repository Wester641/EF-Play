`How EF-Play to configure to the dev enviroment?`

1. navigate to the playwright.config.ts file
2. Change the Base url in the use: {
   baseURL: "https://dev-app.easyfleet.ai",
   },
   `3. navigate to the links.ts file and change the const BASE_URL = "https://dev-app.easyfleet.ai"; to the dev link.`
   `4. and navigate to the .auth/login.json file and change the url in the "origin": "https://dev-app.easyfleet.ai",`
   `5. Save the file`
   `6. Run the tests`
