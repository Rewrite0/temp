import type { Preset, SourceCodeTransformer } from 'unocss'

import { isH5, isMp } from '@uni-helper/uni-env'

import {
  defineConfig,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

import {
  presetApplet,
  presetRemRpx,
  transformerApplet,
} from 'unocss-applet'

const darkMode = isH5 ? 'class' : 'media'

const presets: Preset[] = [
  isMp ? presetApplet({ dark: darkMode }) : presetUno({ dark: darkMode }),
  presetRemRpx(isMp ? { mode: 'rem2rpx', baseFontSize: 2 } : { mode: 'rpx2rem' }),
]

const transformers: SourceCodeTransformer[] = isMp ? [transformerApplet()] : []

export default defineConfig({
  presets: [
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
      cdn: 'https://esm.sh/',
    }),
    ...presets,
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
    ...transformers,
  ],
  theme: {
    preflightRoot: isMp ? ['page,::before,::after'] : void 0,
  },
  rules: [
    ['bg-x-full', { 'background-size': '100% auto' }],
    ['bg-y-full', { 'background-size': 'auto 100%' }],
    ['bg-full', { 'background-size': '100%' }],
  ],
  shortcuts: [
    {
      'rel': 'relative',
      'abs': 'absolute',
      'abs-y-center': 'absolute top-1/2 transform -translate-y-1/2',
      'abs-x-center': 'absolute left-1/2 transform -translate-x-1/2',
    },
    {
      'fcer': 'flex items-center justify-center',
      'imgbg': 'bg-cover bg-center bg-no-repeat',
      'btn-active': 'active:opacity-80',
    },
    [/^wh-(\d+|[a-zA-Z0-9]*[a-zA-Z])$/, ([, d]) => `w-${d} h-${d}`],
  ],
})
