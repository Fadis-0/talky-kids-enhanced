import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ar from '../locales/ar.json';
import en from '../locales/en.json';

const resources = {
  en: { translation: en },
  ar: { translation: ar },
};

// Initialize i18n
i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ar', // Arabic as default language
    lng: 'ar',
    interpolation: {
      escapeValue: false, // React already protects against XSS
    },
    react: {
      useSuspense: false, // Disable suspense for now
    },
  });

export default i18n;
