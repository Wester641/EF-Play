export function checkBlock(selector: string): string {
  return `
      ${selector} {
        background-color: transparent !important;
        border: none !important;
      }
    `;
}

export function checkBlockBGtransparent(selector: string): string {
  return `
      ${selector} {
        background-color: transparent !important;
        border: none !important;
      }
    `;
}
