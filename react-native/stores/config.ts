import { hookstate, useHookstate } from '@hookstate/core';

const config = hookstate({
  count: 0,
});

export function useConfigStore() {
  const state = useHookstate(config);

  const countUp = () => state.count.set((prev) => prev + 1);

  return {
    state,
    countUp,
  };
}
