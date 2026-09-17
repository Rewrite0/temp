<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    ratio?: number
    wrapperClass?: string
  }>(),
  {
    ratio: 1,
  },
)
</script>

<template>
  <div class="aspect-ratio" :style="{ '--_ratio': props.ratio }">
    <div class="wrap" :class="props.wrapperClass">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.aspect-ratio {
  position: relative;
  padding-bottom: calc(1 / (var(--_ratio)) * 100%);
  line-height: 1;

  .wrap {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>
