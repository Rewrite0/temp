import { onLoad, onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app'
import { useRouter } from './useRouter'

const DEFAULT_APP_NAME = '鼎湖医疗'

function searchQueryToString(query: Record<string, any>) {
  return Object.entries(query)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&')
}

export interface UsePageShareOptions {
  /** 只携带用户传递的query数据 */
  onlyUserQuery?: boolean
  /** 自定义 query 数据 */
  query?: () => Record<string, any>

  title?: string | (() => string)
  content?: string | (() => string)
  imageUrl?: string | (() => string)
  onShareAppMessage?: boolean
  onShareTimeline?: boolean

  /** 触发分享时的回调 */
  onTrigger?: () => void
}

export function usePageShare(opts: UsePageShareOptions) {
  const { onlyUserQuery, query = () => ({}), content, imageUrl, onTrigger } = opts
  const router = useRouter()
  let pageQuery: Record<string, any> = {}

  onLoad((e) => {
    pageQuery = e ?? {}
  })

  function getter(state?: string | (() => string)) {
    if (!state)
      return void 0
    return typeof state === 'function' ? state() : state
  }

  function share(): Page.CustomShareContent | Page.ShareTimelineContent {
    const shareTitle = getter(opts.title) || DEFAULT_APP_NAME
    const pagePath = router.currentUrl ?? '/pages/tabbar/index'

    const queryStr = searchQueryToString({
      ...(onlyUserQuery ? {} : pageQuery),
      ...query(),
    })

    const fullPath = queryStr ? `${pagePath}?${queryStr}` : pagePath

    console.log('share path:', fullPath)

    onTrigger?.()

    return {
      title: shareTitle,
      path: fullPath,
      content: getter(content),
      imageUrl: getter(imageUrl),
    }
  }

  if (opts.onShareAppMessage) {
    onShareAppMessage(share)
  }

  if (opts.onShareTimeline) {
    onShareTimeline(share)
  }
}
