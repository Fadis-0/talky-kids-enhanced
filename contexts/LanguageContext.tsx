import React, { createContext, useContext, useEffect, useState } from 'react';
import { I18nManager } from 'react-native';
import i18n from '../lib/i18n';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('ar');

  // Initialize language on mount
  useEffect(() => {
    const initLanguage = async () => {
      try {
        let savedLanguage: Language = 'ar';
        // For web, check localStorage
        if (typeof window !== 'undefined' && window.localStorage) {
          const stored = window.localStorage.getItem('appLanguage') as Language | null;
          if (stored && (stored === 'en' || stored === 'ar')) {
            savedLanguage = stored;
          }
        }
        
        await i18n.changeLanguage(savedLanguage);
        setLanguageState(savedLanguage);
        
        // Handle native RTL settings
        const isRtl = savedLanguage === 'ar';
        if (I18nManager.isRTL !== isRtl) {
          I18nManager.allowRTL(isRtl);
          I18nManager.forceRTL(isRtl);
        }
      } catch (error) {
        console.error('Failed to load language preference:', error);
        setLanguageState('ar');
      }
    };

    initLanguage();
  }, []);

  const setLanguage = (lang: Language) => {
    try {
      i18n.changeLanguage(lang);
      setLanguageState(lang);
      
      // Save to localStorage for web
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem('appLanguage', lang);
      }
      
      // Handle native RTL settings
      const isRtl = lang === 'ar';
      if (I18nManager.isRTL !== isRtl) {
        I18nManager.allowRTL(isRtl);
        I18nManager.forceRTL(isRtl);
      }
    } catch (error) {
      console.error('Failed to change language:', error);
    }
  };

  // Update HTML lang and dir attributes when language changes
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      const htmlElement = document.documentElement;
      htmlElement.lang = language;
      htmlElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    }
  }, [language]);

  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

