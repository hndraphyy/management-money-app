import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  Keyboard,
  Animated,
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
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
        Animated.spring(translateY, {
          toValue: -e.endCoordinates.height / 1,
          useNativeDriver: true,
          damping: 20,
          mass: 1,
          stiffness: 200,
        }).start();
      },
    );

    const keyboardWillHide = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          damping: 20,
          mass: 1,
          stiffness: 200,
        }).start();
      },
    );

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <View style={styles.topSection}>
          <Text style={[styles.title, { color: theme.primary }]}>
            Selamat Datang
          </Text>
          <Text style={[styles.subtitle, { color: theme.secondary }]}>
            Stop bocor halus! Catat pengeluaranmu biar masa depan aman
          </Text>

          <Image
            source={OnboardingImg}
            style={{ width: 270, height: 280, marginLeft: 20, marginTop: 10 }}
            resizeMode="contain"
          />
        </View>

        <Animated.View
          style={[
            styles.cardWrapper,
            {
              transform: [{ translateY }],
            },
          ]}
        >
          <LinearGradient
            colors={["#D12F2F", "#7C1A1D"]}
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
        </Animated.View>
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
    paddingTop: 120,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  illustrationContainer: {
    alignItems: "center",
    marginVertical: 30,
    width: "100%",
  },
  title: {
    fontSize: 38,
    textAlign: "center",
    fontFamily: "Outfit-Bold",
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 10,
    lineHeight: 22,
    fontFamily: "Outfit-Regular",
    paddingHorizontal: 10,
  },
  cardWrapper: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  card: {
    width: "100%",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 32,
    paddingVertical: 40,
    paddingBottom: Platform.OS === "ios" ? 90 : 100,
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
