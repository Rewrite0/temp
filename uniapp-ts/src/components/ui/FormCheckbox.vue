<script lang="ts" setup>
interface Props {
  /** 复选框文本（当使用默认 slot 时被忽略） */
  label?: string
}

const props = defineProps<Props>()

const model = defineModel<boolean>({ default: false })

function handleChange(e: any) {
  model.value = e.detail.value.includes('checked')
}
</script>

<template>
  <div class="form-checkbox" @click.stop="">
    <checkbox-group @change="handleChange">
      <label class="checkbox-label">
        <checkbox :checked="model" value="checked" />
        <text v-if="props.label" class="checkbox-text">
          <slot>{{ props.label }}</slot>
        </text>
      </label>
    </checkbox-group>
  </div>
</template>

<style lang="scss" scoped>
.form-checkbox {
  .checkbox-label {
    display: flex;
    align-items: center;

    .checkbox-text {
      font-size: 28rpx;
      color: #333;
      margin-left: 8rpx;
    }
  }
}
</style>
