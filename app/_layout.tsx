import "../global.css";
import "../lib/i18n"; // Initialize i18n

import {
    Cairo_400Regular,
    Cairo_600SemiBold,
    Cairo_700Bold,
    useFonts as useCairo,
} from "@expo-google-fonts/cairo";
import {
    Fredoka_500Medium,
    Fredoka_600SemiBold,
    Fredoka_700Bold,
    useFonts as useFredoka,
} from "@expo-google-fonts/fredoka";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { LanguageProvider } from "@/contexts/LanguageContext";
import { UserDataProvider } from "@/contexts/UserDataContext";
import { AuthProvider } from "@/contexts/AuthContext";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fredokaLoaded] = useFredoka({
    Fredoka_500Medium,
    Fredoka_600SemiBold,
    Fredoka_700Bold,
  });
  const [cairoLoaded] = useCairo({
    Cairo_400Regular,
    Cairo_600SemiBold,
    Cairo_700Bold,
  });

  const loaded = fredokaLoaded && cairoLoaded;

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <LanguageProvider>
        <AuthProvider>
          <UserDataProvider>
            <StatusBar style="dark" />
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="splash" />
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="tasks" />
              <Stack.Screen name="history" />
              <Stack.Screen name="accomplishments" />
            </Stack>
          </UserDataProvider>
        </AuthProvider>
      </LanguageProvider>
    </SafeAreaProvider>
  );
}

