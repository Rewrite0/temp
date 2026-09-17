export function useQueryBoundingClientRect(
  selector: string,
  onReady?: (rects: UniApp.NodeInfo[]) => void,
) {
  const rects = ref<UniApp.NodeInfo[]>([])

  const query = uni.createSelectorQuery().in(getCurrentInstance())
  query
    .select(selector)
    .boundingClientRect((res) => {
      if (Array.isArray(res)) {
        rects.value = res
      }
      else {
        rects.value = [res]
      }
      onReady?.(rects.value)
    })
    .exec()

  return rects
}
