import { createSSRApp } from 'vue'
import App from './App.vue'
import '@/styles/global.scss'
import 'uno.css'

export function createApp() {
  const app = createSSRApp(App)
  return {
    app,
  }
}
