/** https://github.com/i18next/react-i18next/issues/1495#issuecomment-1113990587 */
import 'intl-pluralrules';
import '@/i18n';
// NativeWind v4
import '@/tailwind.css';

import { PaperProvider } from 'react-native-paper';
import { Stack } from 'expo-router';
import { SystemBars } from 'react-native-edge-to-edge';
import { MMKV } from 'react-native-mmkv';
import { SafeAreaView } from 'react-native-safe-area-context';

import { usePaperTheme } from '@/hooks/usePaperTheme';
import { useSystemBarsStore } from '@/stores/systemBars';

new MMKV({
  id: 'storage',
});

export default function RootLayout() {
  const { paperTheme } = usePaperTheme();
  const { state } = useSystemBarsStore();

  const options = { headerShown: false };

  return (
    <PaperProvider theme={paperTheme}>
      <SystemBars {...state.value} />
      <Stack>
        <Stack.Screen name="(tabs)" options={options} />
      </Stack>
    </PaperProvider>
  );
}
