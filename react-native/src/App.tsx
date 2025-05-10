import { PaperProvider } from 'react-native-paper';
import { SystemBars } from 'react-native-edge-to-edge';
import { pick } from 'es-toolkit';
import { useShallow } from 'zustand/shallow';

import { usePaperTheme } from '@/modules/system-ui/paper-theme';
import { useSystemBarsStore } from '@/modules/system-ui/system-bars';

export function App({ children }: { children: React.ReactNode }) {
  const { paperTheme } = usePaperTheme();
  const state = useSystemBarsStore(useShallow((s) => pick(s, ['hidden', 'style'])));

  return (
    <PaperProvider theme={paperTheme}>
      <SystemBars {...state} />
      {children}
    </PaperProvider>
  );
}
