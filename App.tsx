import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import HomeScreen from "./src/screens/HomeScreen";
import OnboardingScreen from "./src/screens/OnboardingScreen";

export default function App() {
  const [userName, setUserName] = useState<string | null>(null);

  const handleFinishOnboarding = (name: string) => {
    setUserName(name);
    // Nanti di sini tempat kita simpan nama ke Async Storage (Offline Database)
  };

  return (
    <SafeAreaView style={styles.root}>
      {userName ? (
        <HomeScreen name={userName} />
      ) : (
        <OnboardingScreen onFinish={handleFinishOnboarding} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff" },
});
