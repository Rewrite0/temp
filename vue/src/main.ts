import Aura from '@primevue/themes/aura'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import { createApp } from 'vue'

import App from './App.vue'
import { i18n } from './i18n'
import router from './router'
import '@unocss/reset/tailwind-compat.css'

import 'virtual:uno.css'
import 'primeicons/primeicons.css'
import './styles/main.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(PrimeVue, {
  ripple: true,
  theme: {
    preset: Aura,
  },
})

app.mount('#app')
