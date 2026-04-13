import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useAppTheme } from "../constants/ThemeContext";

interface Props {
  onFinish: (name: string) => void;
}

export default function OnboardingScreen({ onFinish }: Props) {
  const { theme } = useAppTheme();
  const [name, setName] = useState("");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={styles.content}>
        {/* Header Section */}
        <Text style={[styles.title, { color: theme.text }]}>
          Selamat Datang
        </Text>
        <Text style={[styles.subtitle, { color: theme.secondary }]}>
          Mari saling mengenal lebih dekat untuk mempersonalisasi pengalaman
          Anda.
        </Text>

        {/* Form Card */}
        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <Text style={[styles.label, { color: theme.text }]}>Nama</Text>
          <TextInput
            style={[
              styles.input,
              {
                color: theme.text,
                borderBottomColor:
                  name.length > 0 ? theme.primary : theme.border,
              },
            ]}
            placeholder="Isikan namamu"
            placeholderTextColor={theme.secondary}
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />

          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: theme.primary,
                opacity: name.trim().length >= 3 ? 1 : 0.6,
              },
            ]}
            disabled={name.trim().length < 3}
            onPress={() => onFinish(name)}
          >
            <Text style={styles.buttonText}>Lanjutkan</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 40,
    lineHeight: 22,
  },
  card: {
    padding: 24,
    borderRadius: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    borderBottomWidth: 1.5,
    fontSize: 18,
    paddingVertical: 12,
    marginBottom: 32,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
