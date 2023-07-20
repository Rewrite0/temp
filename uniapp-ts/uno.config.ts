import type { Preset, SourceCodeTransformer } from "unocss";

import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";

import {
  presetApplet,
  presetRemRpx,
  transformerApplet,
  transformerAttributify,
} from "unocss-applet";

import { isH5, isMp } from "@uni-helper/uni-env";

const presets: Preset[] = [];
const transformers: SourceCodeTransformer[] = [];
const darkMode = isH5 ? "class" : "media";

if (isMp) {
  presets.push(presetApplet({ dark: darkMode }));
  presets.push(presetRemRpx());
  transformers.push(
    transformerAttributify({ ignoreAttributes: ["block", "fixed"] })
  );
  transformers.push(transformerApplet());
} else {
  presets.push(presetUno({ dark: darkMode }));
  presets.push(presetAttributify());
  presets.push(presetRemRpx({ mode: "rpx2rem" }));
}

export default defineConfig({
  presets: [
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        display: "inline-block",
        "vertical-align": "middle",
      },
    }),
    ...presets,
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
    ...transformers,
  ],
  theme: {
    preflightRoot: isMp ? ["page,::before,::after"] : undefined,
  },
  rules: [
    ["bg-x-full", { "background-size": "100% auto" }],
    ["bg-y-full", { "background-size": "auto 100%" }],
    ["bg-full", { "background-size": "100%" }],
  ],
  shortcuts: [
    {
      fcer: "flex items-center justify-center",
      rel: "relative",
      abs: "absolute",
      imgbg: "bg-cover bg-center bg-no-repeat",
      "btn-active": "active:opacity-80",
    },
    [/^wh-(\d+|[a-zA-Z]+|[a-zA-Z0-9]*[a-zA-Z])$/, ([, d]) => `w-${d} h-${d}`],
  ],
});
