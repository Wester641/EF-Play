export const prodCredentials = {
  email: "shakirowww099@gmail.com",
  password: "admin2025",
};
export const devCredentials = {
  email: "zafarzhon77@gmail.com",
  password: "zafarzhon77",
};

export const loginSelectors = {
  email: 'input[type="text"]',
  password: 'input[type="password"]',
  submitButton: 'button[type="submit"]',
};

export const screenSize = { width: 1920, height: 1080 };
export const timeout = { timeout: 10000 };
export const BASE_URL = "https://dev-app.easyfleet.ai"; // After changing BASE_URL in playwright.config.ts and here go to the login.setup.ts and change the url.pathname

export const URLs = {
  login: "/login",
  dashboard: "/dashboard",
  units: "/units",
  unitsFirstPage: "/units?page=1",
  unitCreate: "/units/create",
  users: "/users",
  fuelHistory: "/fuel-history",
  createFuelHistory: "/fuel-history/create",
  assigments: "/assignments",
  meterHistory: "/meter-history",
  papers: "/papers",
  createUnit: "/create-unit",
  updateUnit: "/units/update/",
  subPage: "/units?page=1&filter=",
  usersPage: "/users",
  userEditPage: "/users/update/",
  inspection_history: "/inspections/history/",
  inspectionForms: "/inspections/forms/",
  inspection_schedules: "/schedules",
  issueCreatePage: "/issues/add",
  issues: "/issues",
  criticalFaults: "/faults",
  samsaraDevices: "/samsara-devices",
  serviceHistory: "/service-history",
  serviceTaskCreate: "/services/service-task/create",
  service_task_create: "/services/service-task/create/",
  serviceTask: "/services/service-task/",
  settings: "/settings/",
  settingsRoles: "/settings/roles/",
  trainingPage: "/training-videos/",
  workOrders: "/work-orders",
  workOrdersCreate: "/work-orders/add",
  serviceRemindersPage: "/reminders/services",
  vehicleRemindersPage: "/reminders/vehicles",
  contactRemindersPage: "/reminders/contacts",
  addServiceReminders: "/reminders/services/add",
  addVehicleReminders: "/reminders/vehicles/create",
  addContactReminders: "/reminders/contacts/add",
  addEquipments: "/equipments/create",
  equipmentsPage: "/equipments",
  addVendors: "/vendor/add",
  vendorsPage: "/vendor",
  addParts: "/parts/create",
  partsPage: "/parts",
  purchaseOrders: "/purchase-orders",
  addPurchaseOrder: "/purchase-orders/create",
  onboarding_form: "/onboarding-form",
  addServiseHistoryFromUnitPage:
    /service-history\/create\/\?vehicle_id=[a-z0-9-]+/,
  addIssueFromUnitPage: /issues\/add\/\?vehicle_id=[a-z0-9-]+/,
  addWorkOrderFromUnitPage: /work-orders\/add\/\?vehicle_id=[a-z0-9-]+/,
  addMeterHistoryFromUnitPage: /meter-history\/\?vehicle_id=[a-z0-9-]+/,

  unitsPage: /\/units\/[0-9a-fA-F-]+$/,
  unitsUpdatePage: /\/units\/update\/[0-9a-fA-F-]+$/,
  updateSpecs: /\/units\/update\/[0-9a-fA-F-]+\/specifications$/,
  updateFinance: /\/units\/update\/[0-9a-fA-F-]+\/financial$/,

  api: {
    VEHICLES_LIST: new RegExp(
      `^${BASE_URL}/api\/v1\/vehicles\/[0-9a-fA-F-]+\/$`
    ),
    METER_ENTRIES_TAB: new RegExp(
      `^${BASE_URL}/api/v1/vehicles/[0-9a-fA-F-]+/meter-entries/`
    ),
    SERVICES_TAB: new RegExp(
      `^${BASE_URL}/api/v1/vehicles/[0-9a-fA-F-]+/services/`
    ),
    EQUIPMENTS_TAB: new RegExp(
      `^${BASE_URL}/api/v1/vehicles/[0-9a-fA-F-]+/equipments/`
    ),
    ISSUES_TAB: new RegExp(
      `^${BASE_URL}/api/v1/vehicles/[0-9a-fA-F-]+/issues/`
    ),
  },
};
// ISSUES_TAB:
// /https:\/\/app\.easyfleet\.ai\/api\/v1\/vehicles\/[0-9a-fA-F-]+\/issues\//,
// /https:\/\/app\.easyfleet\.ai\/api\/v1\/vehicles\/[0-9a-fA-F-]+\/$/

export const Styles = {
  background_color: "#7d9ec087",
  border: "1px solid #7d9ec087",
  transparent: "transparent",
  none: "none",
};
