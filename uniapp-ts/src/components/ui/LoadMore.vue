<script lang="ts" setup>
import type { UniLoadMoreStatus } from '@uni-helper/uni-types'

const props = withDefaults(
  defineProps<{
    page: number
    isLastPage?: boolean
    loading?: boolean
  }>(),
  {},
)

const emit = defineEmits<{
  loadMore: []
}>()

const contentText = {
  contentdown: '点击加载更多',
  contentrefresh: '正在加载...',
  contentnomore: '没有更多数据了',
}

const status = computed<UniLoadMoreStatus>(() => {
  if (props.loading)
    return 'loading'
  if (props.isLastPage)
    return 'noMore'
  return 'more'
})

function handleLoadMore() {
  if (props.loading || props.isLastPage)
    return
  emit('loadMore')
}
</script>

<template>
  <div class="py-40">
    <uni-load-more :status="status" :content-text="contentText" @click-load-more="handleLoadMore" />
  </div>
</template>

<style lang="scss" scoped></style>
