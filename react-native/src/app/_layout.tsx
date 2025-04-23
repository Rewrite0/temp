import { Stack } from 'expo-router';
import { App } from '../App';

export default function RootLayout() {
  const options = { headerShown: false };

  return (
    <App>
      <Stack>
        <Stack.Screen name="(tabs)" options={options} />
      </Stack>
    </App>
  );
}
