import { hookstate, useHookstate } from '@hookstate/core';

export type SystemBarsState = {
  hidden: boolean;
  style: 'auto' | 'light' | 'dark';
};

const _state = hookstate<SystemBarsState>({
  hidden: false,
  style: 'auto',
});

export const useSystemBarsStore = () => {
  const state = useHookstate(_state);

  return {
    state,
  };
};
