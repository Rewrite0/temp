/** loading 超时显示loading动画 */
export function useTimeoutLoading(loading: Ref<boolean>, timeout = 500) {
  let timer: NodeJS.Timeout | null = null

  watch(loading, (v) => {
    if (!v && timer) {
      clearTimeout(timer)
      uni.hideLoading()
      return
    }

    timer = setTimeout(() => {
      uni.showLoading({
        mask: true,
        title: '加载中...',
      })
    }, timeout)
  })
}
