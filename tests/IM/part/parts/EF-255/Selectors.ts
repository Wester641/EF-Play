export const Selectors = {
  addPartButton: ".IconButton_label_block__Ri\\+VB",
  partNumberInput: 'input[name="part_number"]',
  descriptionInput: 'textarea[name="description"]',
  manufacturerPartNumberInput: 'input[name="manufacturer_part_number"]',
  upcInput: 'input[name="upc"]',
  unitCostInput: 'input[name="unit_cost"]',

  firstDropdown: ".react-select__value-container",
  fifthDropdown:
    "div:nth-child(5) > .Select_select__input__6V5DK > .react-select__control > .react-select__value-container",
  manufacturerDetailsDropdown:
    ".Form_manufacturer_details__kz9Gj > .SelectField_select__nkrpi > .Select_select__input__6V5DK > .react-select__control > .react-select__value-container",
  secondFormDropdown:
    ".Form_form__0FC7z > div:nth-child(2) > .SelectField_select__nkrpi > .Select_select__input__6V5DK > .react-select__control > .react-select__value-container",

  locationAisleInput: 'input[name="locations\\[0\\]\\.aisle"]',
  locationRowInput: 'input[name="locations\\[0\\]\\.row"]',
  locationBinInput: 'input[name="locations\\[0\\]\\.bin"]',

  addVendorButton: { text: /^Add Vendor$/ },

  purchaseVendorDropdown:
    ".PurchaseHistory_purchaseHistoryInput__Efv4V > .SelectField_select__nkrpi > .Select_select__input__6V5DK > .react-select__control > .react-select__value-container",

  purchaseQuantityInput: { role: "textbox", name: "0" },
  chooseDateButton: { role: "button", name: "Choose date" },
  dateGridCell20: { role: "gridcell", name: "20" },

  saveButton: { role: "button", name: "Save" },
};
