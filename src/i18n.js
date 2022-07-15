import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import languageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

const options = {
  order: ['path','cookie','htmlTage','querystring', 'navigator', 'localStorage', 'subdomain'],
  lookupQuerystring: 'lng',
  caches: ['cookie'],
  
}


i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(languageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ['en', 'ar'],
    fallbackLng: "en",

    detection:options,
    backend:{
      loadPath: '/assets/locales/{{lng}}/translation.json',
    },

  });


export default i18n;