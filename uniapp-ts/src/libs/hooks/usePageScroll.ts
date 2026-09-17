import { onPageScroll } from '@dcloudio/uni-app'

/**
 * 监听页面滚动事件，返回当前页面的 scrollTop 值。
 * @description 在页面上使用时需传入参数，以启用页面滚动监听功能。
 */
export function usePageScroll(_opts?: { onPageScroll: true }) {
  const { statusBarHeight } = uni.getWindowInfo()
  const navBarHeight = computed(() => 44 + statusBarHeight)

  const scrollTop = ref(0)
  const isScrolling = computed(() => scrollTop.value > 0)

  onPageScroll((e) => {
    scrollTop.value = e.scrollTop
  })

  return {
    scrollTop,
    navBarHeight,
    isScrolling,
  }
}
