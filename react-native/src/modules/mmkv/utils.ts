import { storage } from './init';

export type UseValue<T> = [get: () => T, set: (val: T) => void, del: () => void];

export type DataType = 'boolean' | 'buffer' | 'number' | 'string' | 'object';
export function createDataHook<T>(key: string, type: DataType, defaultValue?: unknown) {
  const get = () => {
    switch (type) {
      case 'boolean':
        return storage.getBoolean(key) ?? (defaultValue as T);
      case 'buffer':
        return storage.getBuffer(key) ?? (defaultValue as T);
      case 'number':
        return storage.getNumber(key) ?? (defaultValue as T);
      case 'string':
        return storage.getString(key) ?? (defaultValue as T);
      case 'object': {
        const value = storage.getString(key);
        if (value) {
          try {
            return JSON.parse(value) as T;
          } catch (e) {
            console.error(`Failed to parse object from storage for key "${key}":`, e);
            return defaultValue as T;
          }
        }
        return defaultValue as T;
      }
    }
  };

  const set = (val: unknown) => {
    switch (type) {
      case 'boolean':
        storage.set(key, val as boolean);
        break;
      case 'buffer':
        storage.set(key, val as ArrayBuffer);
        break;
      case 'number':
        storage.set(key, val as number);
        break;
      case 'string':
        storage.set(key, val as string);
        break;
    }
  };

  const del = () => {
    storage.delete(key);
  };

  return () => [get, set, del] as UseValue<T>;
}
