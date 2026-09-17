import { BASE_URL, STATIC_URL } from '@/constants/config'

export function resource(path?: string) {
  if (!path)
    return ''
  if (path.startsWith('/upload')) {
    return `${BASE_URL}${path}`
  }

  if (path.startsWith('http')) {
    return path
  }

  return `${STATIC_URL}${path}`
}
