export function useUniStorage<T = any>(key: string, initValue: T) {
  function get() {
    return uni.getStorageSync(key) as T;
  }

  function set(value: T) {
    uni.setStorageSync(key, value);
  }

  function del() {
    set(initValue);
  }

  function exist() {
    return get() !== initValue;
  }

  if (!get()) {
    set(initValue);
  }

  return {
    get,
    set,
    del,
    exist,
  };
}
