import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import { i18n } from './i18n'
import router from './router'

import '@unocss/reset/tailwind-compat.css'
import 'virtual:uno.css'
import './styles/main.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')
