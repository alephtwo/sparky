const langs = ["en", "jp"] as const;

export default langs;
export type SupportedLanguage = (typeof langs)[number];
