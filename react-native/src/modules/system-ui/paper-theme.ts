import { useEffect, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
import { mmkvStore } from '../mmkv';
import { useStore } from 'zustand';
import { useSystemBarsStore } from './system-bars';

const colorSchemeList = ['auto', 'light', 'dark'] as const;
export type ColorScheme = (typeof colorSchemeList)[number];

export function usePaperTheme() {
  const appColorScheme = useStore(mmkvStore, (s) => s.appColorScheme);
  const setState = useStore(mmkvStore, (s) => s.setState);
  const setColorScheme = (colorScheme: ColorScheme) => setState('appColorScheme', colorScheme);
  const setBarStyle = useSystemBarsStore((s) => s.setStyle);

  const systemColorScheme = useColorScheme();
  const { theme } = useMaterial3Theme();

  const paperTheme = useMemo(() => {
    const colorScheme = appColorScheme === 'auto' ? systemColorScheme : appColorScheme;

    const defaultTheme = colorScheme === 'dark' ? MD3DarkTheme : MD3LightTheme;
    const userTheme = colorScheme === 'dark' ? theme.dark : theme.light;
    return {
      ...defaultTheme,
      colors: userTheme,
    };
  }, [appColorScheme, systemColorScheme, theme]);

  useEffect(() => {
    switch (appColorScheme) {
      case 'dark':
        setBarStyle('light');
        break;
      case 'light':
        setBarStyle('dark');
        break;
      case 'auto':
        setBarStyle('auto');
        break;
    }
  }, [appColorScheme, setBarStyle]);

  return { colorSchemeList, colorScheme: appColorScheme, paperTheme, setColorScheme };
}
