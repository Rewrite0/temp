import { Text, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import notifee from '@notifee/react-native';

export default function HomeScreen() {
  async function onDisplayNotification() {
    // Request permissions (required for iOS)
    const s = await notifee.requestPermission();
    console.log('Permission status:', s);

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    console.log('Channel created:', channelId);

    // Display a notification
    const a = await notifee.displayNotification({
      title: '这是一条通知测试',
      body: '这是通知的内容',
      android: {
        channelId,
        // 如果你想在按下通知时打开应用程序，则需要 pressAction
        pressAction: {
          id: 'default',
        },
      },
    });
    console.log('Notification displayed:', a);
  }

  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <Text>index</Text>
      <Button onPress={() => onDisplayNotification()} mode="contained-tonal">
        Display Notification
      </Button>
    </SafeAreaView>
  );
}
