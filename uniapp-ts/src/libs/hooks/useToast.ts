/**
 * Toast 全局提示 Hook
 *
 * 意图：提供轻量级的全局消息提示功能，支持队列管理和手动关闭
 *
 * 约束：
 * - 最多同时显示 3 个 Toast
 * - 超出部分自动排队，等前面的消失后显示
 * - 每个 Toast 有唯一 ID，可通过 ID 手动移除
 *
 * 使用方式：
 * ```ts
 * const toast = useToast();
 * const id = toast.add({ severity: 'success', detail: '操作成功' });
 * toast.remove(id);  // 手动移除
 * toast.clear();     // 清空所有
 * ```
 */

export type ToastSeverity = 'success' | 'info' | 'warn' | 'error'

export interface ToastItem {
  id: string
  severity: ToastSeverity
  summary?: string
  detail: string
  life?: number
  closable?: boolean
  _entering?: boolean
  _leaving?: boolean
  _removing?: boolean // 标记正在移除但还未从数组删除
}

// 全局队列：所有待显示和正在显示的 Toast
export const toastQueue = ref<ToastItem[]>([])

// 当前可见的 Toast（最多 3 个）
export const visibleToasts = ref<ToastItem[]>([])

const timeoutMap = new Map<string, NodeJS.Timeout>()

let toastIdCounter = 0

/**
 * 生成唯一 Toast ID
 */
function generateToastId(): string {
  return `toast-${Date.now()}-${toastIdCounter++}`
}

/**
 * 从队列中取出下一个 Toast 显示
 */
function showNextToast() {
  if (visibleToasts.value.length >= 3 || toastQueue.value.length === 0) {
    return
  }

  const nextToast = toastQueue.value.shift()
  if (nextToast) {
    // 设置进入动画标记
    nextToast._entering = true
    visibleToasts.value.push(nextToast)

    // 移除进入动画标记
    setTimeout(() => {
      nextToast._entering = false
    }, 300)

    // 设置自动移除定时器
    const life = nextToast.life ?? 3000
    // 如果 life 为 -1，表示不自动移除
    if (life === -1)
      return
    const id = setTimeout(() => {
      removeToast(nextToast.id)
      timeoutMap.delete(nextToast.id)
    }, life)
    timeoutMap.set(nextToast.id, id)
  }
}

/**
 * 移除指定 Toast
 */
function removeToast(id: string) {
  const index = visibleToasts.value.findIndex(t => t.id === id)
  if (index !== -1) {
    const toast = visibleToasts.value[index]

    // 如果已经在移除中，不重复处理
    if (toast._removing) {
      return
    }

    // 设置移除标记和离开动画标记
    toast._removing = true
    toast._leaving = true

    timeoutMap.delete(id)

    // 动画结束后从数组移除
    setTimeout(() => {
      const currentIndex = visibleToasts.value.findIndex(t => t.id === id)
      if (currentIndex !== -1) {
        visibleToasts.value.splice(currentIndex, 1)
      }
      // 移除后尝试显示下一个
      showNextToast()
    }, 200) // 与退出动画时长一致
  }
}

export function useToast() {
  /**
   * 添加一个 Toast
   * @returns Toast ID，可用于手动移除
   */
  function add(options: Omit<ToastItem, 'id'>): string {
    const toast: ToastItem = {
      id: generateToastId(),
      severity: options.severity,
      summary: options.summary,
      detail: options.detail,
      life: options.life ?? 3000,
      closable: options.closable ?? true,
    }

    toastQueue.value.push(toast)
    showNextToast()

    return toast.id
  }

  /**
   * 手动移除指定 Toast
   */
  function remove(id: string) {
    // 从可见列表移除
    removeToast(id)
    // 从队列移除（如果还在队列中）
    const queueIndex = toastQueue.value.findIndex(t => t.id === id)
    if (queueIndex !== -1) {
      toastQueue.value.splice(queueIndex, 1)
    }
  }

  /**
   * 清空所有 Toast
   */
  function clear() {
    toastQueue.value = []
    visibleToasts.value = []
  }

  return {
    add,
    remove,
    clear,
  }
}
