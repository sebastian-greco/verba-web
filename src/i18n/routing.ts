import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'es', 'it', 'fr', 'de', 'nl'],
  defaultLocale: 'en',
  localePrefix: 'always',
});
