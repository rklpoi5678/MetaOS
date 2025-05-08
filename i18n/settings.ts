export const locales = ['en', 'ko'] as const;
export const defaultLocale = 'ko' as const;

export type Locale = (typeof locales)[number];
