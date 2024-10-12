import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite';
import VueRouter from 'unplugin-vue-router/vite';
import { VueRouterAutoImports } from 'unplugin-vue-router';
import VueLayouts from 'vite-plugin-vue-layouts';
import Components from 'unplugin-vue-components/vite';
import UnoCSS from 'unocss/vite';

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
        api: 'modern-compiler',
        additionalData: `@import "${fileURLToPath(new URL('./src/styles/mixins.scss', import.meta.url))}";`,
      },
    },
  },
});
