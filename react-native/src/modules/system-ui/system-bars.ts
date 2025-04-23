import { hookstate } from '@hookstate/core';

export type SystemBarsState = {
  hidden: boolean;
  style: 'auto' | 'light' | 'dark';
};

export const systemBarsState = hookstate<SystemBarsState>({
  hidden: false,
  style: 'auto',
});
