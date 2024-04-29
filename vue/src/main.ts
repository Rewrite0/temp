import '@unocss/reset/tailwind-compat.css';
import 'virtual:uno.css';
import 'primeicons/primeicons.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import { i18n } from './i18n';
import PrimeVueStyled from 'primevue/styled';
import PrimeVue from 'primevue/config';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);
app.use(PrimeVueStyled as any);
app.use(PrimeVue, {
  ripple: true,
});

app.mount('#app');
