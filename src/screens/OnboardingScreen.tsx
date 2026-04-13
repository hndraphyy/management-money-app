import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

interface Props {
  onFinish: (name: string) => void;
}

export default function OnboardingScreen({ onFinish }: Props) {
  const [name, setName] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Halo!</Text>
      <Text style={styles.subtitle}>Siapa nama lo biar kita makin akrab?</Text>

      <TextInput
        style={styles.input}
        placeholder="Ketik nama di sini..."
        value={name}
        onChangeText={setName}
      />

      <TouchableOpacity
        style={[styles.button, { opacity: name.length > 2 ? 1 : 0.5 }]}
        disabled={name.length <= 2}
        onPress={() => onFinish(name)}
      >
        <Text style={styles.buttonText}>Lanjut</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 30,
    backgroundColor: "#fff",
  },
  title: { fontSize: 32, fontWeight: "bold", color: "#2d3436" },
  subtitle: { fontSize: 16, color: "#636e72", marginTop: 8, marginBottom: 30 },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: "#2d3436",
    fontSize: 20,
    paddingVertical: 10,
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#2d3436",
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
