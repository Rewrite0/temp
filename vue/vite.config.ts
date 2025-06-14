import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isProd = mode === 'production'
  const getPath = (path: string) => fileURLToPath(new URL(path, import.meta.url))

  return {
    plugins: [
      VueRouter({
        routesFolder: 'src/pages',
        dts: '.dts/vue-router.d.ts',
      }),
      vue(),
      vueJsx(),
      AutoImport({
        imports: ['vue', 'vitest', VueRouterAutoImports],
        dts: '.dts/auto-imports.d.ts',
      }),
      Components({
        dts: '.dts/components.d.ts',
        globs: [
          // 排除 modules 文件夹里的组件
          '!src/components/**/modules/*.{vue,tsx}',
          'src/components/**/*.{vue,tsx}',
          'src/components/**/index.{vue,tsx}',
          'src/layouts/**/*.{vue,tsx}',
        ],
      }),
      UnoCSS(),
      vueDevTools(),
    ],
    resolve: {
      alias: {
        '@': getPath('./src'),
        '#': getPath('./types'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/mixins" as *;`,
        },
      },
    },
    esbuild: {
      pure: isProd ? ['console.log'] : [],
    },
  }
})
