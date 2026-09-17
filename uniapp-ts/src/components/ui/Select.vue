<script lang="ts" setup generic="T">
import type { SelectorPickerOnChangeEvent } from '@uni-helper/uni-types'
import UnoIcon from './UnoIcon.vue'

const props = withDefaults(
  defineProps<{
    items: readonly T[]
    rangeKey?: keyof T
    defaultItem?: T
  }>(),
  {},
)

const value = defineModel<T>()

const index = ref(0)

const items = computed(() => {
  if (!props.defaultItem)
    return props.items
  return [props.defaultItem, ...props.items]
})

const text = computed(() => {
  if (!props.rangeKey)
    return items.value[index.value]
  return items.value[index.value]?.[props.rangeKey]
})

function onChange(e: SelectorPickerOnChangeEvent) {
  index.value = e.detail.value
  value.value = items.value[index.value]
}

watch(value, (nv) => {
  if (!nv)
    return
  const idx = items.value.findIndex((i) => {
    if (props.rangeKey) {
      return i[props.rangeKey] === nv[props.rangeKey]
    }
    return i === nv
  })
  index.value = idx !== -1 ? idx : 0
})
</script>

<template>
  <picker
    mode="selector"
    :range="items"
    :range-key="props.rangeKey"
    :value="index"
    @change="onChange"
  >
    <div class="fx-cer gap-5">
      <text class="line-clamp-1">{{ text }}</text>
      <uno-icon name="triangleDown" />
    </div>
  </picker>
</template>

<style lang="scss" scoped></style>
