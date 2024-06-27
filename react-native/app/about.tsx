import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Button } from 'react-native-paper';

import { useConfigStore } from '~/stores/config';

export default function AboutScreen() {
  const { state, countUp } = useConfigStore();

  return (
    <View style={styles.container}>
      <Text>About</Text>
      <Text>count: {state.count.get()}</Text>
      <Button mode="contained" onPress={countUp}>
        add
      </Button>
      <Link href="/" asChild>
        <Button mode="contained-tonal">go to home</Button>
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
