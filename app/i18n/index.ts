import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import be from './locales/be';
import en from './locales/en';
import pl from './locales/pl';
import ru from './locales/ru';

export const APP_LOCALES = [
  { code: 'pl', label: 'Polski' },
  { code: 'en', label: 'English' },
  { code: 'ru', label: 'Русский' },
  { code: 'be', label: 'Беларуская' },
] as const;

export type AppLocale = (typeof APP_LOCALES)[number]['code'];

/** BCP 47 tags for date formatting per app locale. */
export const LOCALE_TAGS: Record<AppLocale, string> = {
  ru: 'ru-RU',
  en: 'en-GB',
  pl: 'pl-PL',
  be: 'be-BY',
};

i18n.use(initReactI18next).init({
  resources: {
    ru: { translation: ru },
    en: { translation: en },
    pl: { translation: pl },
    be: { translation: be },
  },
  lng: 'pl',
  fallbackLng: 'pl',
  interpolation: { escapeValue: false },
});

export default i18n;
