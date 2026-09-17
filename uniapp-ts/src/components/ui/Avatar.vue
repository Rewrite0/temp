<script lang="ts" setup>
import { resource } from '@/utils/url'

const props = withDefaults(
  defineProps<{
    src?: string
    authed?: boolean
  }>(),
  {},
)

const isError = ref(false)
const src = computed(() =>
  props.src && !isError.value ? resource(props.src) : resource('/default-avatar.png'),
)

watch(
  () => props.src,
  () => {
    isError.value = false
  },
)
</script>

<template>
  <AspectRatio wrapper-class="rounded-full overflow-hidden bg-black">
    <image :src="src" mode="aspectFit" class="size-full" @error="isError = true" />
  </AspectRatio>
</template>

<style lang="scss" scoped>
.flag {
  position: absolute;
}
</style>
