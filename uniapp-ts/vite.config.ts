import { existsSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import Uni from '@uni-helper/plugin-uni'
import Components from '@uni-helper/vite-plugin-uni-components'
import { UniUIResolver } from '@uni-helper/vite-plugin-uni-components/resolvers'
import UniManifest from '@uni-helper/vite-plugin-uni-manifest'
import UniPages from '@uni-helper/vite-plugin-uni-pages'
import Optimization from '@uni-ku/bundle-optimizer'
import UniRoot from '@uni-ku/root'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
import UniPolyfill from 'vite-plugin-uni-polyfill'

export default defineConfig(() => {
  const pkgsPath = resolve(__dirname, 'src/pkgs')
  let subPackages: string[] = []
  if (existsSync(pkgsPath)) {
    subPackages = readdirSync(pkgsPath).map(dir => `src/pkgs/${dir}`)
    console.log('subPackages: ', subPackages)
  }

  return {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/mixins.scss" as *;`,
        },
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    plugins: [
    // https://uni-helper.js.org/vite-plugin-uni-components
      Components({
        dts: '.uni/components.d.ts',
        resolvers: [UniUIResolver({ exclude: /^UniKuAppRoot$/ })],
      }),
      // https://uni-helper.js.org/vite-plugin-uni-pages
      UniPages({
        dts: '.uni/uni-pages.d.ts',
        homePage: 'pages/tabbar/index',
        subPackages,
        exclude: ['**/_**/**', '**/**/_**.vue'],
      }),
      // https://uni-helper.js.org/vite-plugin-uni-manifest
      UniManifest(),
      // https://github.com/uni-ku/root
      UniRoot(),
      // https://uni-helper.js.org/plugin-uni
      Uni(),
      UnoCSS(),
      UniPolyfill(),
      Optimization(),
      AutoImport({
        dts: '.uni/auto-imports.d.ts',
        imports: ['vue', 'uni-app'],
      }),
    ],
    build: {
      target: 'es6',
      cssTarget: 'chrome61',
    },
    optimizeDeps: {
      exclude: ['vue-demi'],
    },
  }
})
