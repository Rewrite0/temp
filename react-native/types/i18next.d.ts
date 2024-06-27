import { resources } from '~/i18n';

declare module 'i18next' {
  /** https://www.i18next.com/overview/typescript */
  interface CustomTypeOptions {
    resources: (typeof resources)['en'];
  }
}
