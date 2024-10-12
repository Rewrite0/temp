import '@unocss/reset/tailwind-compat.css';
import 'virtual:uno.css';
import 'primeicons/primeicons.css';
import './styles/main.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

import App from './App.vue';
import router from './router';
import { i18n } from './i18n';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);
app.use(PrimeVue, {
  ripple: true,
  theme: {
    preset: Aura,
  },
});

app.mount('#app');
