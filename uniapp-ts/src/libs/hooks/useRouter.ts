import type { LocationUrl } from 'virtual:uni-pages'
import { onLoad } from '@dcloudio/uni-app'

export type RouterParams = Record<string, string | number | boolean>

let current: Page.PageInstance
let currentUrl: LocationUrl = '/pages/tabbar/index'

/** 存储当前页面query */
const currentPageQuery = ref<RouterParams>({})
/** 当前页面完整url */
const currentFullUrl = computed(() => normalizeUrl(currentUrl, currentPageQuery.value))

/** 同步当前页面url与query */
export function useSyncPageUrl() {
  updateCurrentPage()
  onLoad((e) => {
    currentPageQuery.value = e || {}
    console.log(`%c[当前页面] => ${currentFullUrl.value}`, 'color: orange; font-weight: 700;')
  })
}

function updateCurrentPage() {
  const pages = getCurrentPages()
  current = pages[pages.length - 1]
  currentUrl = current?.route as LocationUrl
}

function buildParams<T extends RouterParams>(params?: T): string {
  if (!params)
    return ''
  let str = ''
  str = Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
    .join('&')
  return str ? `?${str}` : ''
}

function normalizeUrl(url: string, params?: RouterParams) {
  if (!url.startsWith('/')) {
    url = `/${url}`
  }
  return url + buildParams(params)
}

export function useRouter() {
  updateCurrentPage()

  function eq(url: LocationUrl | string, url2: LocationUrl | string) {
    return normalizeUrl(url) === normalizeUrl(url2)
  }

  function isCurrent(url: LocationUrl | string) {
    return eq(url, currentUrl)
  }

  function buildRouteUrl(url: LocationUrl, params?: RouterParams) {
    return normalizeUrl(url, params)
  }

  function switchTab(url: LocationUrl, params?: RouterParams) {
    uni.switchTab({ url: normalizeUrl(url, params) })
  }

  function navigateTo(url: LocationUrl, params?: RouterParams) {
    uni.navigateTo({ url: normalizeUrl(url, params) })
  }

  function redirect(url: LocationUrl, params?: RouterParams) {
    uni.redirectTo({ url: normalizeUrl(url, params) })
  }

  function reLaunch(url: LocationUrl, params?: RouterParams) {
    uni.reLaunch({ url: normalizeUrl(url, params) })
  }

  function back() {
    uni.navigateBack().catch(() => {
      reLaunch('/pages/tabbar/index')
    })
  }

  return {
    current,
    currentUrl,
    currentFullUrl,

    switchTab,
    navigateTo,
    redirect,
    reLaunch,
    back,

    normalizeUrl,
    eq,
    isCurrent,
    buildRouteUrl,
  }
}
