import { useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
import { useMMKVString } from 'react-native-mmkv';

const colorSchemeList = ['auto', 'light', 'dark'] as const;
export type ColorScheme = (typeof colorSchemeList)[number];

export function usePaperTheme() {
  const [appColorScheme, setAppColorScheme] = useMMKVString('appColorScheme');
  if (!appColorScheme) setAppColorScheme('auto');

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

  const colorScheme = useMemo(() => appColorScheme ?? 'auto', [appColorScheme]);
  const setColorScheme = (colorScheme: ColorScheme) => setAppColorScheme(colorScheme);

  return { colorSchemeList, colorScheme, paperTheme, setColorScheme };
}
