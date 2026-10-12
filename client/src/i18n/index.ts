import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,
    defaultNS: 'common',
    ns: ['common', 'home', 'pricing', 'mission', 'legal', 'automation', 'hyperpersonalization', 'compliance', 'roleBased', 'softwareTraining', 'instructionalDesigner'],
    
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    
    detection: {
      order: ['querystring', 'path', 'localStorage', 'navigator', 'htmlTag'],
      lookupQuerystring: 'lang',
      lookupFromPathIndex: 0,
      lookupFromSubdomainIndex: 0,
      caches: ['localStorage'],
      excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)
      
      // optional htmlTag with lang attribute, the default is:
      htmlTag: document.documentElement,
      
      // optional set cookie options, reference:[MDN Set-Cookie docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie)
      cookieOptions: { path: '/', sameSite: 'strict' }
    },
    
    supportedLngs: ['en', 'es'],
    nonExplicitSupportedLngs: true,
    
    react: {
      useSuspense: true,
    },
  });

export default i18n;