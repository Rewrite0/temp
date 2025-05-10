import { type SystemBarStyle, type SystemBarsProps } from 'react-native-edge-to-edge';
import { create } from 'zustand';

export type SystemBarsState = SystemBarsProps;

export type SystemBarsActions = {
  setHidden: (hidden: boolean) => void;
  setStyle: (style: SystemBarStyle) => void;
};

type Store = SystemBarsState & SystemBarsActions;

export const useSystemBarsStore = create<Store>((set) => ({
  hidden: false,
  style: 'auto',

  setHidden: (hidden) => set({ hidden }),
  setStyle: (style) => set({ style }),
}));
