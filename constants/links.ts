export const Credentials = {
  email: "pikoy25780@bitflirt.com",
  password: "zafarzhon77",
};

export const loginSelectors = {
  email: 'input[type="text"]',
  password: 'input[type="password"]',
  submitButton: 'button[type="submit"]',
};

export const screenSize = { width: 1920, height: 1080 };
export const timeout = { timeout: 10000 };
const BASE_URL = "https://app.easyfleet.ai";

export const URLs = {
  login: "/login",
  dashboard: "/dashboard",
  units: "/units",
  unitsFirstPage: "/units?page=1",
  users: "/users",
  fuelHistory: "/fuel-history",
  createFuelHistory: "/fuel-history/create",
  assigments: "/assignments",
  meterHistory: "/meter-history",
  papers: "/papers",
  createUnit: "/create-unit",
  updateUnit: "/units/update/",
  subPage: "/units?page=1&filter=",
  userEditPage: "/users/update/",
  inspectionForms: "/inspections/forms",
  issueCreatePage: "/issues/add",
  issues: "/issues",
  criticalFaults: "/faults",
  serviceHistory: "/service-history",
  serviceTaskCreate: "/services/service-task/create",
  serviceTask: "/services/service-task/",
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
  onboarding_form: "/onboarding-form",

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
