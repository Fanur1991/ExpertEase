import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Localisation
i18n
  .use(Backend)
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    lng: localStorage.getItem('lang') || 'en',
    backend: {
      loadPath: '/assets/locales/{{lng}}/translation.json',
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'ru', 'es'],
    debug: true,
    react: {
      useSuspense: true,
    },
    detection: {
      order: [
        'localStorage',
        'cookie',
        'sessionStorage',
        'navigator',
        'htmlTag',
      ],
      lookupLocalStorage: 'lang',
      lookupCookie: 'i18next',
      lookupSessionStorage: 'i18nextLng',
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
