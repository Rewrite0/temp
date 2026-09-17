export function useSafeArea() {
  const { safeAreaInsets } = uni.getWindowInfo()
  return safeAreaInsets
}
