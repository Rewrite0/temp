<script lang="ts" setup>
import { usePageScroll } from '@/libs/hooks/usePageScroll'

const props = withDefaults(
  defineProps<{
    title?: string
    back?: boolean
    transparent?: boolean
    dark?: boolean
    noFixed?: boolean
  }>(),
  {
    title: '',
  },
)

function back() {
  uni.navigateBack().catch(() => {
    uni.reLaunch({
      url: '/pages/tabbar/index',
    })
  })
}

const { isScrolling } = usePageScroll()

const backgroundColor = computed(() => {
  if (isScrolling.value) {
    return '#fff'
  }

  if (props.transparent) {
    return 'transparent'
  }

  return void 0
})

const color = computed(() => {
  if (isScrolling.value) {
    return '#333'
  }

  return void 0
})
</script>

<template>
  <uni-nav-bar
    :title="props.title"
    :left-icon="props.back ? 'left' : void 0"
    :background-color="backgroundColor"
    :color="color"
    :dark="props.dark"
    status-bar
    :fixed="!props.noFixed"
    :border="false"
    @click-left="back"
  />
</template>

<style lang="scss" scoped></style>
