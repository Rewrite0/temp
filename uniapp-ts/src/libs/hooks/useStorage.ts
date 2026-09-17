import type { Ref } from 'vue'

export function useStorage<T = undefined>(key: string): Ref<T | undefined>
export function useStorage<T = undefined>(key: string, defaultValue: T): Ref<T>
export function useStorage<T = undefined>(key: string, defaultValue?: T) {
  let v = defaultValue

  const storageValue = uni.getStorageSync(key)
  if (storageValue && v !== storageValue) {
    v = storageValue
  }

  return customRef<T | undefined>((track, trigger) => {
    return {
      get() {
        track()
        return v
      },
      set(newValue) {
        v = newValue as T
        if (newValue === void 0) {
          uni.removeStorage({ key })
        }
        else {
          uni.setStorage({ key, data: v })
        }
        trigger()
      },
    }
  })
}
