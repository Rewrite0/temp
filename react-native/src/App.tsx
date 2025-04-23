import { PaperProvider } from 'react-native-paper';
import { SystemBars } from 'react-native-edge-to-edge';
import { useHookstate } from '@hookstate/core';

import { usePaperTheme } from '@/modules/system-ui/paper-theme';
import { systemBarsState } from '@/modules/system-ui/system-bars';

export function App({ children }: { children: React.ReactNode }) {
  const { paperTheme } = usePaperTheme();
  const state = useHookstate(systemBarsState);

  return (
    <PaperProvider theme={paperTheme}>
      <SystemBars {...state.value} />
      {children}
    </PaperProvider>
  );
}
