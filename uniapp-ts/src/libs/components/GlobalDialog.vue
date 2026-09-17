<script lang="ts" setup>
import type { DialogInstance, DialogType } from '@/libs/hooks/useDialog'
import {
  dialogStack,
  getDialogMaskOpacity,
  getDialogZIndex,
  useDialog,
} from '@/libs/hooks/useDialog'

const dialog = useDialog()

// Dialog 类型对应的配置
const typeConfig: Record<DialogType, { icon: string, iconBgColor: string, defaultTitle: string }>
  = {
    info: {
      icon: 'alertCircle',
      iconBgColor: 'var(--color-primary, #313783)',
      defaultTitle: '提示',
    },
    success: {
      icon: 'checkmark',
      iconBgColor: '#10b981',
      defaultTitle: '成功',
    },
    error: {
      icon: 'error',
      iconBgColor: '#ef4444',
      defaultTitle: '失败',
    },
  }

function getTypeConfig(type: DialogType) {
  return typeConfig[type]
}

function handleMaskClick(instance: DialogInstance) {
  // loading 期间或 maskClosable 为 false 时不关闭
  if (instance.loading || !instance.maskClosable) {
    return
  }
  dialog.close(instance.id)
}

function handleButtonClick(instance: DialogInstance, buttonIndex: number) {
  const button = instance.buttons![buttonIndex]

  // 如果没有 onClick，直接关闭
  if (!button.onClick) {
    dialog.close(instance.id)
    return
  }

  // 执行 onClick，传入 close 和 setLoading 函数
  const close = () => dialog.close(instance.id)
  const setLoading = (loading: boolean) => dialog.setLoading(instance.id, loading, buttonIndex)

  button.onClick(close, setLoading)
}

function getButtonClass(type: 'primary' | 'danger' | 'cancel') {
  return `dialog-button dialog-button-${type}`
}
</script>

<template>
  <view class="global-dialog-wrapper">
    <view v-for="(instance, index) in dialogStack" :key="instance.id">
      <!-- 遮罩层 -->
      <view
        v-if="instance.visible"
        class="dialog-mask"
        :class="{ 'mask-enter': instance._entering, 'mask-leave': instance._leaving }"
        :style="{
          zIndex: getDialogZIndex(index).mask,
          backgroundColor: `rgba(0, 0, 0, ${getDialogMaskOpacity(index)})`,
        }"
        @click="handleMaskClick(instance)"
      />

      <!-- Dialog 内容 -->
      <view
        v-if="instance.visible"
        class="dialog-content-wrapper"
        :style="{ zIndex: getDialogZIndex(index).content }"
      >
        <view
          class="dialog-content"
          :class="{ 'content-enter': instance._entering, 'content-leave': instance._leaving }"
        >
          <!-- 图标 -->
          <view
            class="dialog-icon"
            :style="{
              backgroundColor: getTypeConfig(instance.type!).iconBgColor,
            }"
          >
            <UnoIcon :name="getTypeConfig(instance.type!).icon as any" />
          </view>

          <!-- 标题 -->
          <text v-if="instance.title" class="dialog-title">{{ instance.title }}</text>
          <text v-else class="dialog-title">
            {{ getTypeConfig(instance.type!).defaultTitle }}
          </text>

          <!-- 内容 -->
          <text class="dialog-text">{{ instance.content }}</text>

          <!-- 按钮组 -->
          <view v-if="instance.buttons && instance.buttons.length > 0" class="dialog-buttons">
            <button
              v-for="(button, btnIndex) in instance.buttons"
              :key="btnIndex"
              :class="getButtonClass(button.type)"
              :disabled="instance.loading"
              @click="handleButtonClick(instance, btnIndex)"
            >
              <!-- Loading 图标 -->
              <text
                v-if="instance.loading && instance.loadingButtonIndex === btnIndex"
                class="button-loading"
              />
              <text v-else>{{ button.text }}</text>
            </button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
// Dialog 动画配置
$dialog-animation-duration: 0.2s;
$dialog-mask-opacity-first: 0.5;
$dialog-mask-opacity-second: 0.3;
$dialog-mask-opacity-others: 0.2;

// Dialog 尺寸配置
$dialog-width: 80vw;
$dialog-border-radius: 24rpx;
$dialog-padding: 48rpx 40rpx;

// Dialog 图标配置
$dialog-icon-size: 110rpx;
$dialog-icon-font-size: 60rpx;
$dialog-icon-margin-bottom: 24rpx;

// Dialog 文字配置
$dialog-title-font-size: 36rpx;
$dialog-title-margin-bottom: 16rpx;
$dialog-text-font-size: 32rpx;
$dialog-text-margin-bottom: 40rpx;

// Dialog 按钮配置
$dialog-button-height: 80rpx;
$dialog-button-border-radius: 12rpx;
$dialog-button-font-size: 28rpx;
$dialog-button-gap: 24rpx;

.global-dialog-wrapper {
  position: relative;
  --color-primary: theme('colors.primary');
}

.dialog-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.dialog-content-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.dialog-content {
  pointer-events: auto;
  width: $dialog-width;
  background: #ffffff;
  border-radius: $dialog-border-radius;
  padding: $dialog-padding;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.dialog-icon {
  width: $dialog-icon-size;
  height: $dialog-icon-size;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: $dialog-icon-font-size;
  color: #ffffff;
  margin-bottom: $dialog-icon-margin-bottom;
  line-height: 0;
}

.dialog-title {
  font-size: $dialog-title-font-size;
  font-weight: bold;
  text-align: center;
  margin-bottom: $dialog-title-margin-bottom;
}

.dialog-text {
  font-size: $dialog-text-font-size;
  color: #333;
  text-align: center;
  line-height: 1.5;
  word-break: break-word;
  margin-bottom: $dialog-text-margin-bottom;
}

.dialog-buttons {
  width: 100%;
  display: flex;
  gap: $dialog-button-gap;
}

.dialog-button {
  flex: 1;
  height: $dialog-button-height;
  border-radius: $dialog-button-border-radius;
  font-size: $dialog-button-font-size;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s;

  &:disabled {
    opacity: 0.6;
  }

  &:active:not(:disabled) {
    opacity: 0.8;
  }
}

.dialog-button-primary {
  background: theme('colors.primary');
  color: #ffffff;
}

.dialog-button-danger {
  background: #ef4444;
  color: #ffffff;
}

.dialog-button-cancel {
  background: #f5f5f5;
  color: #666666;
}

.button-loading {
  display: inline-block;
  width: 28rpx;
  height: 28rpx;
  border: 3rpx solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: button-loading-spin 0.6s linear infinite;
}

@keyframes button-loading-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 遮罩层动画 */
.dialog-mask {
  transition: opacity $dialog-animation-duration;
}

.mask-enter {
  animation: mask-in $dialog-animation-duration;
}

.mask-leave {
  animation: mask-out $dialog-animation-duration;
}

@keyframes mask-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes mask-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

/* Dialog 内容动画 */
.dialog-content {
  transition: all $dialog-animation-duration;
}

.content-enter {
  animation: dialog-in $dialog-animation-duration ease-out;
}

.content-leave {
  animation: dialog-out $dialog-animation-duration ease-in;
}

@keyframes dialog-in {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes dialog-out {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.9);
  }
}
</style>
