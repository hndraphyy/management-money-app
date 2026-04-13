import React, { useState, useCallback } from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  Outfit_400Regular,
  Outfit_700Bold,
} from "@expo-google-fonts/outfit";

import { ThemeProvider, useAppTheme } from "./src/constants/ThemeContext";
import OnboardingScreen from "./src/screens/OnboardingScreen";
import HomeScreen from "./src/screens/HomeScreen";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Outfit-Regular": Outfit_400Regular,
    "Outfit-Bold": Outfit_700Bold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <ThemeProvider>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <MainLayout />
      </View>
    </ThemeProvider>
  );
}

const MainLayout = () => {
  const { theme } = useAppTheme();
  const [userName, setUserName] = useState<string | null>(null);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      {userName ? (
        <HomeScreen name={userName} />
      ) : (
        <OnboardingScreen onFinish={(name) => setUserName(name)} />
      )}
    </SafeAreaView>
  );
};
