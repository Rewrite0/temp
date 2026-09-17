<script lang="ts" setup>
import type { IconName } from '@/components/ui/UnoIcon.vue'
import type { ToastSeverity } from '@/libs/hooks/useToast'
import { useSafeArea } from '@/libs/hooks/useSafeArea'
import { toastQueue, useToast, visibleToasts } from '@/libs/hooks/useToast'

const toast = useToast()
const { top } = useSafeArea()

// 获取胶囊位置
const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
const toastTop = computed(() => {
  // 胶囊底部位置 + 额外间距
  const menuBottom = menuButtonInfo.bottom
  // 如果胶囊位置有效，使用胶囊底部 + 8px，否则使用安全区 + 16rpx
  return menuBottom > 0 ? `${menuBottom + 8}px` : `${top + 16}rpx`
})

// 计算队列中待显示的 Toast 数量
const pendingCount = computed(() => toastQueue.value.length)

// Severity 对应的样式配置
const severityConfig: Record<
  ToastSeverity,
  { icon: IconName, borderColor: string, iconColor: string }
> = {
  success: {
    icon: 'checkmark',
    borderColor: '#10b981',
    iconColor: '#10b981',
  },
  info: {
    icon: 'alertCircle',
    borderColor: 'var(--color-primary, #3b82f6)',
    iconColor: 'var(--color-primary, #3b82f6)',
  },
  warn: {
    icon: 'warning',
    borderColor: '#f59e0b',
    iconColor: '#f59e0b',
  },
  error: {
    icon: 'error',
    borderColor: '#ef4444',
    iconColor: '#ef4444',
  },
}

function getSeverityConfig(severity: ToastSeverity) {
  return severityConfig[severity]
}

function handleClose(id: string) {
  toast.remove(id)
}
</script>

<template>
  <view class="global-toast-container" :style="{ paddingTop: toastTop }">
    <view
      v-for="item in visibleToasts"
      :key="item.id"
      class="toast-item"
      :class="{ 'toast-enter': item._entering, 'toast-leave': item._leaving }"
      :style="{
        borderLeftColor: getSeverityConfig(item.severity).borderColor,
      }"
    >
      <!-- 左侧图标 -->
      <view class="toast-icon">
        <UnoIcon
          :name="getSeverityConfig(item.severity).icon"
          :style="{ color: getSeverityConfig(item.severity).iconColor }"
          class="icon"
        />
      </view>

      <!-- 内容区 -->
      <view class="toast-content">
        <text v-if="item.summary" class="toast-summary">{{ item.summary }}</text>
        <text class="toast-detail">{{ item.detail }}</text>
      </view>

      <!-- 关闭按钮 -->
      <view v-if="item.closable" class="toast-close" @click="handleClose(item.id)">
        <UnoIcon name="close" />
      </view>
    </view>

    <!-- 队列提示 -->
    <view v-if="pendingCount > 0" class="toast-pending-badge">
      +{{ pendingCount }}
    </view>
  </view>
</template>

<style lang="scss" scoped>
// Toast 动画配置
$toast-animation-duration-in: 300ms;
$toast-animation-duration-out: 200ms;

// Toast 尺寸配置
$toast-width: 90vw;
$toast-padding: 24rpx 32rpx;
$toast-border-radius: 12rpx;
$toast-border-left-width: 6rpx;
$toast-gap: 16rpx;
$toast-margin-bottom: 8rpx;

// Toast 图标配置
$toast-icon-size: 32rpx;

// Toast 文字配置
$toast-summary-font-size: 28rpx;
$toast-detail-font-size: 26rpx;
$toast-close-icon-size: 28rpx;

// Toast z-index
$toast-z-index: 9999;

.global-toast-container {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: $toast-z-index;
  display: flex;
  flex-direction: column;
  gap: $toast-gap;
  pointer-events: none;
}

.toast-item {
  pointer-events: auto;
  display: flex;
  align-items: flex-start;
  gap: $toast-gap;
  width: $toast-width;
  padding: $toast-padding;
  background: #ffffff;
  border-radius: $toast-border-radius;
  border-left: $toast-border-left-width solid;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.15);
  margin-bottom: $toast-margin-bottom;
}

.toast-icon {
  flex-shrink: 0;
  font-size: $toast-icon-size;
  line-height: 0;
  margin-top: 2rpx;
}

.toast-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4rpx;
  min-width: 0;
}

.toast-summary {
  font-size: $toast-summary-font-size;
  font-weight: 600;
  color: #1a1a1a;
  word-break: break-word;
}

.toast-detail {
  font-size: $toast-detail-font-size;
  color: #4a4a4a;
  word-break: break-word;
}

.toast-close {
  flex-shrink: 0;
  font-size: $toast-close-icon-size;
  color: #999999;
  line-height: 1;
  padding: 4rpx;
  cursor: pointer;
  transition: color 0.2s;

  &:active {
    color: #666666;
  }
}

/* 队列提示 */
.toast-pending-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90vw;
  padding: 12rpx 24rpx;
  background: #ffffff;
  color: #666666;
  font-size: 24rpx;
  border-radius: 12rpx;
  margin-top: 8rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
  border: 1rpx solid #f0f0f0;
}

/* 动画 */
.toast-item {
  transition: all $toast-animation-duration-in ease-out;
}

.toast-enter {
  animation: toast-in $toast-animation-duration-in ease-out;
}

.toast-leave {
  /* 离开动画期间保持在文档流中，但逐渐缩小高度 */
  animation: toast-out-smooth $toast-animation-duration-out ease-in;
}

@keyframes toast-in {
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes toast-out-smooth {
  0% {
    opacity: 1;
    transform: translateY(0) scale(1);
    max-height: 500rpx;
    margin-bottom: $toast-margin-bottom;
  }
  50% {
    opacity: 0.5;
    transform: translateY(-20%) scale(0.95);
  }
  100% {
    opacity: 0;
    transform: translateY(-100%) scale(0.9);
    max-height: 0;
    margin-bottom: 0;
    padding-top: 0;
    padding-bottom: 0;
  }
}
</style>
