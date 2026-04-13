import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function HomeScreen({ name }: { name: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Yo, {name}!</Text>
      <Text style={styles.balanceTitle}>Saldo lo aman hari ini?</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, paddingTop: 60 },
  welcome: { fontSize: 24, fontWeight: "bold" },
  balanceTitle: { color: "#636e72", marginTop: 5 },
});
