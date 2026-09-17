import { presetUni } from '@uni-helper/unocss-preset-uni'

import {
  defineConfig,
  presetIcons,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  presets: [
    presetUni({
      remRpx: { screenWidth: 750, baseFontSize: 4 },
      attributify: false,
    }),
    presetIcons({
      scale: 1.2,
      warn: true,
      cdn: 'https://esm.sh/',
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  theme: {
    colors: {
      primary: '#007AFF',
    },
  },
  shortcuts: [
    [/^dot-(.+)$/, ([, n]) => `rounded-full size-${n}`],
    [/^circle-(.+)$/, ([, n]) => `dot-${n} f-cer`],
    {
      'rel': 'relative',
      'abs': 'absolute',
      'pos-y-center': 'inset-y-0 my-auto',
      'pos-x-center': 'inset-x-0 mx-auto',
      'pos-center': 'inset-0 m-auto',
    },
    {
      'fx-cer': 'flex items-center',
      'f-cer': 'flex items-center justify-center',
    },
    {
      'is-icon': 'size-1em object-contain',
      'imgbg': 'bg-center bg-no-repeat bg-cover',
    },
  ],
})
