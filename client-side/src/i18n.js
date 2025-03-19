// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import en from "../public/locales/en/translation.json";
import bn from "../public/locales/bn/translation.json";
i18n
  .use(Backend)
  .use(initReactI18next) 
  .init({
    resources: {
      en: { translation: en },
      bn: { translation: bn },
    },
    lng: "bn",
    fallbackLng: "bn",
    interpolation: { escapeValue: false },
  
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', 
    },
  });

export default i18n;