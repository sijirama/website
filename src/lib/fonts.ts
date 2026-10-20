type Font = { className: string };
const font = (className: string): Font => ({ className });

export const manrope = font("font-geist");
export const dmSans = font("font-dm-sans");
export const caveat = font("font-caveat");
