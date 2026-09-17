<script lang="ts" setup>
/**
 * Skeleton 骨架屏组件
 *
 * 意图：在数据加载期间展示占位动画，提升用户感知性能。
 * 约束：仅在 uni-app (mp) 端使用，单位默认 rpx。
 * 使用方式：将实际内容放入 slot，通过 loading 控制骨架/内容切换。
 */
const props = withDefaults(
  defineProps<{
    /** 是否处于加载态，true 时显示骨架动画 */
    loading?: boolean
    /** 形状：circle 自动 50% 圆角，rect 默认直角 */
    shape?: 'circle' | 'rect'
    /** 宽高相等的快捷设置，数字自动拼 rpx */
    size?: string | number
    /** 宽度，优先级高于 size */
    width?: string | number
    /** 高度，优先级高于 size */
    height?: string | number
    /** 圆角，shape=circle 时自动 50%，rect 默认 0 */
    borderRadius?: string | number
  }>(),
  {
    loading: true,
    borderRadius: 12,
    shape: 'rect',
    width: '100%',
    height: '1.2em',
  },
)

/** 将数字值转换为 rpx 字符串，字符串值原样返回 */
function toUnit(val: string | number | undefined): string | undefined {
  if (val === undefined)
    return undefined
  return typeof val === 'number' ? `${val}rpx` : val
}

/** 计算骨架元素的内联样式 */
const skeletonStyle = computed(() => {
  const style: Record<string, string> = {}

  const w = toUnit(props.size ?? props.width)
  const h = toUnit(props.size ?? props.height)
  if (w)
    style.width = w
  if (h)
    style.height = h

  // 圆角：circle 自动 50%，否则取 borderRadius prop
  if (props.shape === 'circle') {
    style.borderRadius = '50%'
  }
  else if (props.borderRadius !== undefined) {
    style.borderRadius = toUnit(props.borderRadius)!
  }

  return style
})
</script>

<template>
  <view
    v-if="props.loading"
    class="skeleton"
    :class="[`skeleton--${props.shape}`]"
    :style="skeletonStyle"
  >
    <view class="skeleton__shimmer" />
  </view>
  <slot v-else />
</template>

<style lang="scss" scoped>
.skeleton {
  position: relative;
  overflow: hidden;
  background-color: #ebeef5;

  &--circle {
    border-radius: 50%;
  }

  &__shimmer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent 0%, #f5f7fa 40%, #f5f7fa 60%, transparent 100%);
    animation: skeleton-shimmer 1.2s ease-in-out infinite;
    transform: translateX(-100%);
  }
}

@keyframes skeleton-shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>
