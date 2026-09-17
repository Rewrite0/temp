/**
 * Dialog 全局对话框 Hook
 *
 * 意图：提供全局确认/提示对话框功能，支持嵌套显示和异步操作
 *
 * 约束：
 * - 支持 Dialog 嵌套，后打开的层级更高
 * - 嵌套时遮罩透明度递减（0.5 → 0.3 → 0.2）
 * - loading 期间所有按钮禁用，遮罩不可关闭
 * - 按钮 onClick 不传时默认直接关闭
 *
 * 使用方式：
 * ```ts
 * const dialog = useDialog();
 * dialog.show({
 *   type: 'info',
 *   title: '提示',
 *   content: '确认删除？',
 *   buttons: [
 *     { text: '取消', type: 'cancel' },
 *     { text: '确定', type: 'danger', onClick: async (close, setLoading) => {
 *       setLoading(true);
 *       await deleteItem();
 *       close();
 *     }}
 *   ]
 * });
 * ```
 */

export type DialogType = 'info' | 'success' | 'error'

export interface DialogButton {
  text: string
  type: 'primary' | 'danger' | 'cancel'
  onClick?: (close: () => void, setLoading: (loading: boolean) => void) => void
}

export interface DialogOptions {
  type?: DialogType
  title?: string
  content: string
  buttons?: DialogButton[]
  maskClosable?: boolean
}

export type DialogInstance = DialogOptions & {
  id: string
  visible: boolean
  loading: boolean
  loadingButtonIndex: number | null
  _entering?: boolean
  _leaving?: boolean
}

// 全局 Dialog 栈
export const dialogStack = ref<DialogInstance[]>([])

let dialogIdCounter = 0

/**
 * 生成唯一 Dialog ID
 */
function generateDialogId(): string {
  return `dialog-${Date.now()}-${dialogIdCounter++}`
}

/**
 * 计算 Dialog 的 z-index
 */
export function getDialogZIndex(index: number): { mask: number, content: number } {
  const base = 10000
  return {
    mask: base + index * 2,
    content: base + index * 2 + 1,
  }
}

/**
 * 计算 Dialog 遮罩透明度
 */
export function getDialogMaskOpacity(index: number): number {
  if (index === 0)
    return 0.5
  if (index === 1)
    return 0.3
  return 0.2
}

export function useDialog() {
  /**
   * 显示一个 Dialog
   */
  function show(options: DialogOptions) {
    const dialog: DialogInstance = {
      id: generateDialogId(),
      type: options.type ?? 'info',
      title: options.title,
      content: options.content,
      buttons: options.buttons,
      maskClosable: options.maskClosable ?? !options.buttons,
      visible: true,
      loading: false,
      loadingButtonIndex: null,
      _entering: true,
      _leaving: false,
    }

    dialogStack.value.push(dialog)

    // 移除进入动画标记
    setTimeout(() => {
      dialog._entering = false
    }, 200)
  }

  /**
   * 关闭指定 Dialog
   */
  function close(id: string) {
    const dialog = dialogStack.value.find(d => d.id === id)
    if (dialog) {
      // 设置离开动画标记
      dialog._leaving = true

      // 动画结束后移除
      setTimeout(() => {
        dialog.visible = false
        setTimeout(() => {
          const index = dialogStack.value.findIndex(d => d.id === id)
          if (index !== -1) {
            dialogStack.value.splice(index, 1)
          }
        }, 50)
      }, 200)
    }
  }

  /**
   * 设置指定 Dialog 的 loading 状态
   */
  function setLoading(id: string, loading: boolean, buttonIndex: number | null = null) {
    const dialog = dialogStack.value.find(d => d.id === id)
    if (dialog) {
      dialog.loading = loading
      dialog.loadingButtonIndex = buttonIndex
    }
  }

  return {
    show,
    close,
    setLoading,
  }
}
