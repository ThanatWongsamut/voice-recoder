import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';

// import enTranslation from './locales/en/translation.json';
// import thTranslation from './locales/th/translation.json';

// Type helper for array translations
type WithArrayTranslation<T> = {
  [P in keyof T]: T[P] extends never[]
  ? string[]
  : T[P] extends object
  ? WithArrayTranslation<T[P]>
  : string;
};

// Instead of explicitly defining types, we can infer them from the translation files
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    // Infer the resources type from the translation files
    resources: {
      translation: WithArrayTranslation<typeof import('./locales/en/translation.json')>;
    };
    returnNull: false;
  }
}

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend((language: string, namespace: string) =>
      import(`./locales/${language}/${namespace}.json`)
    )
  )
  .init({
    fallbackLng: 'th',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false,
    },
    returnNull: false,
  });

export default i18n;