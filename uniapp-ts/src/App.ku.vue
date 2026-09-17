<script setup lang="ts">
import GlobalDialog from './libs/components/GlobalDialog.vue'
import GlobalToast from './libs/components/GlobalToast.vue'
import { usePageScroll } from './libs/hooks/usePageScroll'
import { useSyncPageUrl } from './libs/hooks/useRouter'
import { useSafeArea } from './libs/hooks/useSafeArea'

useSyncPageUrl()

const { top, bottom, left, right } = useSafeArea()
const { navBarHeight } = usePageScroll()
const injectStyleVars = computed(() => {
  return {
    '--safe-area-top': `${top}px`,
    '--safe-area-bottom': `${bottom}px`,
    '--safe-area-left': `${left}px`,
    '--safe-area-right': `${right}px`,
    '--nav-bar-height': `${navBarHeight.value}px`,
  }
})
</script>

<template>
  <div :style="injectStyleVars">
    <KuRootView />
    <GlobalDialog />
    <GlobalToast />
  </div>
</template>

<style lang="scss"></style>
