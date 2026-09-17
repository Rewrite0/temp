<script lang="ts" setup>
// @ts-expect-error mp-html 组件在 uni-app 中没有类型定义，暂时使用 any 类型。
import MpHtml from 'mp-html/dist/uni-app/components/mp-html/mp-html'

const props = withDefaults(
  defineProps<{
    content: string
  }>(),
  {},
)

const content = computed(() => {
  return props.content || ''
})
</script>

<template>
  <MpHtml :content="content" />
</template>

<style lang="scss" scoped></style>
