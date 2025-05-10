import { zustandStorage } from './init';
import { createStore } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { produce } from 'immer';

export type MMKVStoreState = {
  appColorScheme: 'auto' | 'light' | 'dark';
  test: string;
};

const initialState: MMKVStoreState = {
  appColorScheme: 'auto',
  test: 'value',
};

export type MMKVStoreActions = {
  /** 通用的 setter 方法，接受指定 state 更新 */
  setState: <K extends keyof MMKVStoreState>(key: K, value: MMKVStoreState[K]) => void;

  /** 使用 Immer 进行更新 */
  update: (updater: (state: MMKVStoreState) => void) => void;
};

type Store = MMKVStoreState & MMKVStoreActions;

export const mmkvStore = createStore<Store>()(
  persist(
    (set) => ({
      ...initialState,

      setState: (key, value) => set({ [key]: value } as Partial<MMKVStoreState>),

      update: (updater) => set(produce((s: MMKVStoreState) => updater(s))),
    }),
    {
      name: 'mmkv-storage',
      storage: createJSONStorage(() => zustandStorage),
      version: 0,
      migrate: (persisted: any, version) => {
        console.log('migrate', persisted, version);
        return persisted;
      },
    }
  )
);
