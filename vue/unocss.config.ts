import presetRemToPx from '@unocss/preset-rem-to-px'
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetWind4,
  transformerDirectives,
} from 'unocss'
import presetAutoprefixer from 'unocss-preset-autoprefixer'
import { presetFluid } from 'unocss-preset-fluid'

export default defineConfig({
  presets: [
    presetWind4(),
    presetAutoprefixer(),
    presetRemToPx({
      baseFontSize: 4,
    }),
    presetAttributify(),
    presetIcons({
      // 可禁用cdn安装 @iconify/json, 避免网络问题
      cdn: 'https://esm.sh/',
    }),
    presetFluid({
      remBase: 4,
      minWidth: 1024,
      maxWidth: 1920,
    }),
  ],
  transformers: [transformerDirectives()],
  theme: {
    breakpoints: {
      'xs': '320px',
      'sm': '480px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1600px',
    },
    colors: {},
  },
  shortcuts: [
    [/^wh-(.*)$/, ([, t]) => `w-${t} h-${t}`],
    [/^text-limit-(\d*)$/, ([, n]) => `line-clamp-${n}`],
    [/^dot-(\d*)$/, ([, n]) => `rounded-full w-${n} h-${n}`],

    // position
    {
      rel: 'relative',
      abs: 'absolute',
    },

    // flex
    {
      'fx-cer': 'flex items-center',
      'f-cer': 'flex items-center justify-center',
    },
  ],
})
