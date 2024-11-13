import { resolve } from 'node:path'
import Uni from '@dcloudio/vite-plugin-uni'
import UniHelperComponents from '@uni-helper/vite-plugin-uni-components'
import UniHelperLayouts from '@uni-helper/vite-plugin-uni-layouts'
import UniHelperManifest from '@uni-helper/vite-plugin-uni-manifest'
import UniHelperPages from '@uni-helper/vite-plugin-uni-pages'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(async () => {
  const UnoCSS = await import('unocss/vite').then(i => i.default)

  return {
    plugins: [
      // https://github.com/uni-helper/vite-plugin-uni-manifest
      UniHelperManifest(),
      // https://github.com/uni-helper/vite-plugin-uni-pages
      UniHelperPages(),
      // https://github.com/uni-helper/vite-plugin-uni-layouts
      UniHelperLayouts(),
      // https://github.com/uni-helper/vite-plugin-uni-components
      UniHelperComponents({
        dts: 'src/components.d.ts',
        directoryAsNamespace: true,
      }),
      Uni(),
      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        imports: ['vue', 'pinia', 'uni-app'],
        dts: 'src/auto-imports.d.ts',
        dirs: ['src/apis', 'src/hooks', 'src/stores', 'src/utils'],
        vueTemplate: true,
      }),
      // https://github.com/antfu/unocss
      // see unocss.config.ts for config
      UnoCSS(),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    css: {
      // 配置`scss`全局变量
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          additionalData: '@use "@/styles/_mixins.scss" as *;',
        },
      },
    },
  }
})
