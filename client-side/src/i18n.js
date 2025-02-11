// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import en from "./locales/en/translation.json";
import bn from "./locales/bn/translation.json";
i18n
  .use(Backend) // Load translations from your backend
  .use(initReactI18next) // Pass i18n down to react-i18next
  .init({
    resources: {
      en: { translation: en },
      bn: { translation: bn },
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // Path to translation files
    },
  });

export default i18n;