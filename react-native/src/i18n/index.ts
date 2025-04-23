import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'expo-localization';

import en from './locales/en.json';
import zh from './locales/zh.json';

export const resources = {
  en: {
    translation: en,
  },
  zh: {
    translation: zh,
  },
} as const;

const deviceLanguage = getLocales()[0].languageCode ?? 'en';

i18n.use(initReactI18next).init({
  resources,
  /** 初始化时使用设备首选语言 */
  lng: deviceLanguage,
  /** 未找到时使用的语言 */
  fallbackLng: 'en',
});

export { i18n };
