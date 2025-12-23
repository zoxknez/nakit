import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

export const locales = ['sr', 'ru', 'en'] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  sr: 'Srpski',
  ru: 'Русский',
  en: 'English',
};

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // If no locale from URL, check cookie
  if (!locale || !locales.includes(locale as Locale)) {
    const cookieStore = await cookies();
    const savedLocale = cookieStore.get('NEXT_LOCALE')?.value;
    locale = savedLocale && locales.includes(savedLocale as Locale) ? savedLocale : 'sr';
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
