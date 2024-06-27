import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Button } from 'react-native-paper';

import { useConfigStore } from '~/stores/config';

export default function HomeScreen() {
  const { state, countUp } = useConfigStore();

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Text>count: {state.count.get()}</Text>
      <Button onPress={countUp}>add</Button>
      <Link href="/about" asChild>
        <Button mode="contained-tonal">go to about</Button>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
