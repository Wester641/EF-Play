export const Selectors = {
  list_of_purchase_orders: ".Table_tableWrapper__ePlzX",
  data_row: ".css-1liixou",
  filter_button: ".ModalOptions_blockFiltering__jpAKN",
  reset_button: ".css-1rs06yn",
  filter_option: ".ModalOptions_blockFiltering__trueModal__inModal__paddingModal__listItem__\\-6JIk",
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