import React, { useState } from 'react'; // <-- WAJIB
import { SafeAreaView } from 'react-native'; // <-- WAJIB
import { ThemeProvider, useAppTheme } from './src/constants/ThemeContext';
import OnboardingScreen from './src/screens/OnboardingScreen';
import HomeScreen from './src/screens/HomeScreen';

export default function App() {
  return (
    <ThemeProvider>
      <MainLayout />
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