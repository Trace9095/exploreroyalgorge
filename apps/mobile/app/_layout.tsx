import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'

const BG = '#0D1117'

export default function RootLayout() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor={BG} />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: BG },
          headerTintColor: '#E6EDF3',
          headerTitleStyle: { fontWeight: '700' },
          contentStyle: { backgroundColor: BG },
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
  },
})
