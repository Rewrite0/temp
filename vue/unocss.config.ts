import { defineConfig, presetAttributify, presetUno } from 'unocss';
import presetRemToPx from '@unocss/preset-rem-to-px';

export default defineConfig({
  presets: [
    presetUno(),
    presetRemToPx({
      baseFontSize: 4,
    }),
    presetAttributify(),
  ],
  shortcuts: [
    [/^wh-(.*)$/, ([, t]) => `w-${t} h-${t}`],
    [/^text-limit-(\d{0,})$/, ([, n]) => `line-clamp-${n}`],

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
});
