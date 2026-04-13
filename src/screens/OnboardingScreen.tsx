import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useAppTheme } from "../constants/ThemeContext";

import OnboardingImg from "../../assets/onboarding.png";

export default function OnboardingScreen({
  onFinish,
}: {
  onFinish: (name: string) => void;
}) {
  const { theme } = useAppTheme();
  const [name, setName] = useState("");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={styles.content}>
        <View style={styles.topSection}>
          <Text style={[styles.title, { color: theme.primary }]}>
            Selamat Datang
          </Text>
          <Text style={[styles.subtitle, { color: theme.secondary }]}>
            Mari saling mengenal lebih dekat untuk mempersonalisasi pengalaman
            Anda.
          </Text>

          <View style={styles.illustrationContainer}>
            <Image
              source={OnboardingImg}
              style={{ width: 220, height: 220 }}
              resizeMode="contain"
            />
          </View>
        </View>

        <LinearGradient
          colors={["#E2464B", "#8E2226"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.card}
        >
          <Text style={[styles.label, { color: "#FFFFFF" }]}>Nama</Text>
          <TextInput
            style={[
              styles.input,
              {
                color: "#FFFFFF",
                borderBottomColor: "#FFFFFF80",
                fontFamily: "Outfit-Regular",
              },
            ]}
            placeholder="Isikan namamu"
            placeholderTextColor="#FFFFFF90"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />

          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: "white",
                opacity: name.trim().length >= 3 ? 1 : 0.8,
              },
            ]}
            disabled={name.trim().length < 3}
            onPress={() => onFinish(name)}
          >
            <Text style={styles.buttonText}>Simpan</Text>
          </TouchableOpacity>
        </LinearGradient>
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
    position: "relative",
  },
  topSection: {
    paddingTop: 130,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  illustrationContainer: {
    alignItems: "center",
    marginVertical: 50,
    width: "100%",
  },
  title: {
    fontSize: 38,
    textAlign: "center",
    fontFamily: "Outfit-Bold",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
    lineHeight: 22,
    fontFamily: "Outfit-Regular",
    paddingHorizontal: 10,
  },
  card: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 32,
    paddingVertical: 40,
    marginTop: 20,
    paddingBottom: 80,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    fontFamily: "Outfit-Bold",
    opacity: 0.9,
  },
  input: {
    borderBottomWidth: 1.5,
    fontSize: 18,
    paddingVertical: 12,
    marginBottom: 40,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "#333",
    fontSize: 16,
    fontFamily: "Outfit-Bold",
  },
});
