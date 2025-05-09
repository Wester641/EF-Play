export const Selectors = {
  list_of_purchase_orders: ".Table_tableWrapper__ePlzX",
  data_row: ".css-1liixou",
  search_input: 'input[type="text"]',
};

export const today = new Date().toDateString();
export const time = new Date().toLocaleTimeString();

export const headers = [
  "PO Number",
  "Status",
  "Part Location",
  "Vendor",
  "Parts",
  "Description",
  "Labels",
  "Created By",
  "Created On",
  "Total",
];
