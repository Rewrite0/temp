import {
  defineConfig,
  presetUno,
  presetAttributify,
  presetIcons,
} from "unocss";

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify({
      prefix: "un-",
      prefixedOnly: true,
    }),
    presetIcons({
      cdn: "https://esm.sh",
      extraProperties: {
        display: "inline-block",
        "vertical-align": "middle",
      },
    }),
  ],

  rules: [
    [/^fs-(\d+)$/, ([, d]) => ({ "font-size": `${d}rem` })],
    [/^lh-(\d+)$/, ([, d]) => ({ "line-height": `${Number(d) / 100}` })],
  ],
  shortcuts: [
    [
      /^(min-|max-)?wh-(.*)$/,
      ([, p = "", t]) => {
        return `${p}w-${t} ${p}h-${t}`;
      },
    ],
    ["fx", "flex items-center"],
    ["fcer", "fx justify-center"],
    ["fy", "flex flex-col"],
    ["is-btn", "cursor-pointer"],
    ["rel", "relative"],
    ["abs", "absolute"],
    ["abs-y-center", "top-0 bottom-0 my-auto h-max"],
    ["abs-x-center", "left-0 right-0 mx-auto w-max"],
    ["abs-full", "top-0 bottom-0 left-0 right-0 z-1"],
    ["bold", "font-bold"],
  ],
});
