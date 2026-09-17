import { throttle } from 'es-toolkit'

type SwipeDirection = 'none' | 'up' | 'down' | 'left' | 'right'

interface Options {
  onSwipeStart?: (e: TouchEvent) => void
  onSwipe?: (e: TouchEvent) => void
  onSwipeEnd?: (e: TouchEvent, direction: SwipeDirection) => void
  /** touchMove 节流时间 */
  threshold?: number
}

export function useSwipe({ onSwipe, onSwipeStart, onSwipeEnd, threshold = 50 }: Options = {}) {
  const startX = ref(0)
  const startY = ref(0)
  const endX = ref(0)
  const endY = ref(0)
  const direction = ref<SwipeDirection>('none')
  // 实时计算滑动方向
  const liveDirection = ref<SwipeDirection>('none')
  const isSwiping = ref(false)

  const lengthX = computed(() => Math.abs(endX.value - startX.value))
  const lengthY = computed(() => Math.abs(endY.value - startY.value))

  // 用于实时计算滑动方向
  let moveLastX = 0
  let moveLastY = 0

  function resetStates() {
    startX.value = 0
    startY.value = 0
    endX.value = 0
    endY.value = 0
    direction.value = 'none'
    isSwiping.value = false
    moveLastX = 0
    moveLastY = 0
  }

  function handleTouchStart(e: TouchEvent) {
    resetStates()
    startX.value = e.touches[0].clientX
    startY.value = e.touches[0].clientY
    endX.value = startX.value
    endY.value = startY.value
    isSwiping.value = true

    moveLastX = startX.value
    moveLastY = startY.value

    onSwipeStart?.(e)
  }

  const handleTouchMove = throttle((e: TouchEvent) => {
    endX.value = e.changedTouches[0].clientX
    endY.value = e.changedTouches[0].clientY

    liveDirection.value = getDirection(moveLastX, moveLastY, endX.value, endY.value)
    direction.value = getDirection(startX.value, startY.value, endX.value, endY.value)

    moveLastX = endX.value
    moveLastY = endY.value

    onSwipe?.(e)
  }, threshold)

  function handleTouchEnd(e: TouchEvent) {
    isSwiping.value = false
    onSwipeEnd?.(e, direction.value)
    resetStates()
  }

  function getDirection(startX: number, startY: number, endX: number, endY: number) {
    const dy = startY - endY
    const dx = endX - startX
    if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
      return 'none'
    }

    const angle = (Math.atan2(dy, dx) * 180) / Math.PI
    if (angle >= -45 && angle < 45) {
      return 'right'
    }
    else if (angle >= 45 && angle < 135) {
      return 'up'
    }
    else if (angle >= -135 && angle < -45) {
      return 'down'
    }
    else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
      return 'left'
    }
    else {
      return 'none'
    }
  }

  return {
    handleTouchStart,
    handleTouchEnd,
    handleTouchMove,

    startX,
    startY,
    endX,
    endY,
    direction,
    liveDirection,
    isSwiping,
    lengthX,
    lengthY,
  }
}
