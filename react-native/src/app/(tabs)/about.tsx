import { View } from 'react-native';
import { Text, SegmentedButtons } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { usePaperTheme, type ColorScheme } from '@/modules/system-ui/paper-theme';

export default function AboutScreen() {
  const { colorSchemeList, setColorScheme, colorScheme } = usePaperTheme();

  return (
    <SafeAreaView className="px-2 flex-1">
      <View className="flex-row items-center justify-between">
        <Text>Theme</Text>

        <View className="w-2/3">
          <SegmentedButtons
            value={colorScheme}
            onValueChange={(e) => setColorScheme(e as ColorScheme)}
            buttons={colorSchemeList.map((c) => ({ label: c, value: c }))}
            density="medium"
          ></SegmentedButtons>
        </View>
      </View>
    </SafeAreaView>
  );
}
