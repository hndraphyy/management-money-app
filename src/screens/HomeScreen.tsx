import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAppTheme } from "../constants/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";

export default function HomeScreen({ name }: { name: string }) {
  const { theme } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.content]}>
        <LinearGradient
          colors={["#D12F2F", "#7C1A1D"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.topSection]}
        >
          <Text style={[styles.welcome]}>Woi, {name}!</Text>
          <Text style={[styles.balanceTitle]}>
            Cek dulu kondisi dompetmu biar nggak boncos pas akhir bulan.
          </Text>
          <View>
            <Text>Rp 700.000</Text>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    position: "relative",
  },
  topSection: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 30,
  },
  welcome: {
    fontSize: 21,
    color: "white",
    fontFamily: "Outfit-Bold",
  },
  balanceTitle: {
    color: "white",
    fontSize: 16,
    marginTop: 5,
    fontFamily: "Outfit-Regular",
  },
});
