import { useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';

export function usePaperTheme() {
  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme();

  const paperTheme = useMemo(() => {
    const light = {
      ...MD3LightTheme,
      colors: theme.light,
    };
    const dark = {
      ...MD3DarkTheme,
      colors: theme.dark,
    };

    return colorScheme === 'dark' ? dark : light;
  }, [colorScheme, theme]);

  return paperTheme;
}
