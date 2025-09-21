import '@/polyfills';

import { useTheme } from '@/source/core/hooks';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MenuProvider } from 'react-native-popup-menu';
import 'react-native-reanimated';

export default function RootLayout() {
  const { isDark } = useTheme();

  return (
    <MenuProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style={isDark ? 'light' : 'dark'} />
    </MenuProvider>
  );
}
