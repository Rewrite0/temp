<script lang="ts" setup>
export type IconName = keyof typeof icons

const props = withDefaults(
  defineProps<{
    name: IconName
  }>(),
  {},
)

const emit = defineEmits<{
  click: []
}>()

const icons = {
  close: 'i-material-symbols:close',
  arrowLeft: 'i-material-symbols:arrow-left-alt',
  arrowRight: 'i-material-symbols:arrow-right-alt',
  angleRight: 'i-iconamoon:arrow-right-2',
  search: 'i-quill:search',
  plus: 'i-fa6-solid:plus',
  minus: 'i-fa6-solid:minus',
  alertCircle: 'i-ion:alert-circle',
  checkmark: 'i-wpf:checkmark',
  error: 'i-heroicons:x-mark-20-solid',
  lock: 'i-material-symbols:lock-outline',
  warning: 'i-ph:warning-bold',
  triangleDown: 'i-material-symbols:arrow-drop-down',
} as const

const className = computed(() => icons[props.name])
</script>

<template>
  <view :class="className" @click="emit('click')" />
</template>

<style lang="scss" scope></style>
