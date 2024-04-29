import { createI18n } from 'vue-i18n';
import en from './langs/en.json';
import zh from './langs/zh-CN.json';
import { usePreferredLanguages } from '@vueuse/core';

const LANGS = {
  en,
  'zh-CN': zh,
};

const languages = usePreferredLanguages();

const userFirstLanguage = languages.value[0];

export const i18n = createI18n({
  legacy: false,
  locale: userFirstLanguage,
  fallbackLocale: 'en',
  messages: LANGS,
});
