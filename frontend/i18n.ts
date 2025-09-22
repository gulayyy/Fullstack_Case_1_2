import { getRequestConfig } from 'next-intl/server';

export const locales = ['en', 'tr'] as const;

export default getRequestConfig(async ({ locale }) => {
  return {
    locale: locale!,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
