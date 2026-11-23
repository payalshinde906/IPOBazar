import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

/**
 * Root layout for the app (Expo Router).
 *
 * A root `_layout.tsx` wraps every screen. We register a simple Stack
 * navigator here; headers are hidden because screens will render their own
 * branded headers in later phases.
 */
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaProvider>
  );
}
