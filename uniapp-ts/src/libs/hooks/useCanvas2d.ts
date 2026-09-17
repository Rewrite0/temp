import { onReady } from '@dcloudio/uni-app'

interface Canvas2d {
  createImage: () => HTMLImageElement
  getContext: (contextId: '2d' | 'webgl') => CanvasRenderingContext2D
  width: number
  height: number
}

export function useCanvas2d(
  id: string,
  onReadyCallback?: (opts: {
    canvas: Canvas2d
    ctx: CanvasRenderingContext2D
    width: number
    height: number
  }) => void,
) {
  const query = uni.createSelectorQuery().in(getCurrentInstance())
  let canvas: Canvas2d | null = null
  let ctx: CanvasRenderingContext2D | null = null
  let width = 0
  let height = 0

  onReady(() => {
    query
      .select(`#${id}`)
      .fields({ size: true, node: true }, () => {})
      .exec((res) => {
        canvas = res[0].node as Canvas2d
        width = res[0].width
        height = res[0].height

        ctx = canvas.getContext('2d')
        const dpr = uni.getWindowInfo().pixelRatio
        canvas.width = width * dpr
        canvas.height = height * dpr
        ctx.scale(dpr, dpr)
        onReadyCallback?.({ canvas, ctx, width, height })
      })
  })

  async function createImage(url: string) {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      if (!canvas) {
        reject(new Error('Canvas is not initialized yet.'))
        return
      }
      const img = canvas.createImage()
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = url
    })
  }

  return {
    getCanvas: () => canvas,
    getContext: () => ctx,
    getSize: () => ({ width, height }),
    createImage,
  }
}
