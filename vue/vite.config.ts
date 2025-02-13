import { fileURLToPath, URL } from 'node:url'

import { PrimeVueResolver } from '@primevue/auto-import-resolver'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'
import VueLayouts from 'vite-plugin-vue-layouts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({
      routesFolder: 'src/pages',
      dts: 'types/dts/vue-router.d.ts',
    }),
    vue(),
    vueJsx(),
    VueLayouts(),
    AutoImport({
      imports: ['vue', 'vitest', VueRouterAutoImports],
      dts: 'types/dts/auto-imports.d.ts',
    }),
    Components({
      dts: 'types/dts/components.d.ts',
      dirs: ['src/components'],
      resolvers: [
        PrimeVueResolver({
          components: {
            prefix: 'P',
          },
        }),
      ],
    }),
    UnoCSS(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '#': fileURLToPath(new URL('./types', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/mixins" as *;`,
      },
    },
  },
})
