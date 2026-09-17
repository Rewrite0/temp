import { onLoad } from '@dcloudio/uni-app'
import * as v from 'valibot'

export function useQuery<T = string>(key: string, format?: (v: string) => T) {
  const v = ref<T>()

  onLoad((e) => {
    const query = e || {}
    const value = decodeURIComponent(query?.[key] || '')
    const formatValue = format ? format(value) : value
    v.value = formatValue as T

    console.log(`%c[${key}] => ${v.value}`, 'color: #0ea5e9; font-weight: 700;')
  })

  return v
}

export function useValiQuery<T extends v.ObjectSchema<Record<string, any>, undefined>>(schema: T) {
  const defaultValue = Object.fromEntries(Object.keys(schema.entries).map(key => [key, void 0]))
  const val = reactive<v.InferOutput<T>>(defaultValue)

  onLoad((e) => {
    const query = e || {}
    const result = v.safeParse(schema, query)
    if (result.success) {
      // 逐属性赋值，保持同一个 reactive 引用
      Object.assign(val, result.output)
      console.log(`%c[query] =>`, 'color: #0ea5e9; font-weight: 700;', val)
    }
    else {
      result.issues.forEach((issue) => {
        console.warn(
          `Query parameter "${issue.path.join('.')}" validation error: ${issue.message}`,
        )
      })
    }
  })

  return val
}
