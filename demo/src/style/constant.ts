export const THEMES = ["white", "black", "red"] as const;
export type THEME = (typeof THEMES)[number];
