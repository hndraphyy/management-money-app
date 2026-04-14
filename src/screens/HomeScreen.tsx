import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  Platform,
} from "react-native";
import { useAppTheme } from "../constants/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { toRupiah } from "../utils/formatCurrency";

const { height } = Dimensions.get("window");

export default function HomeScreen({ name }: { name: string }) {
  const { theme } = useAppTheme();
  const [balance, setBalance] = useState(700000);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tempBalance, setTempBalance] = useState("");

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(height)).current;

  const toggleModal = (show: boolean) => {
    if (show) {
      setTempBalance(balance.toString());
      setIsModalVisible(true);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: height,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setIsModalVisible(false);
      });
    }
  };

  const handleSave = () => {
    if (tempBalance.trim()) {
      setTempBalance(tempBalance);
    }
    toggleModal(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <LinearGradient
          colors={["#D12F2F", "#7C1A1D"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.topSection}
        >
          <Text style={styles.welcome}>Woi, {name}!</Text>
          <Text style={styles.balanceTitle}>
            Cek dulu dompetmu biar nggak boncos pas akhir bulan.
          </Text>

          <View style={styles.balanceRow}>
            <Text style={styles.balance}>Rp {balance}</Text>
            <TouchableOpacity
              onPress={() => toggleModal(true)}
              style={styles.editBtn}
            >
              <Feather name="edit-3" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>

      <Modal
        transparent
        visible={isModalVisible}
        onRequestClose={() => toggleModal(false)}
        animationType="none"
      >
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback onPress={() => toggleModal(false)}>
            <Animated.View
              style={[styles.modalOverlay, { opacity: fadeAnim }]}
            />
          </TouchableWithoutFeedback>

          <Animated.View
            style={[
              styles.bottomSheet,
              { transform: [{ translateY: slideAnim }] },
            ]}
          >
            <View style={styles.handleBar} />

            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Masukkan Uangmu</Text>

              <TextInput
                style={styles.input}
                placeholder="Masukkan saldo baru"
                placeholderTextColor="#999"
                keyboardType="numeric"
                value={tempBalance}
                onChangeText={setTempBalance}
                autoFocus={true}
              />

              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Simpan</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => toggleModal(false)}
              >
                <Text style={styles.cancelButtonText}>Batal</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1 },
  topSection: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 40,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  welcome: { fontSize: 18, color: "white", fontFamily: "Outfit-SemiBold" },
  balanceTitle: {
    color: "white",
    fontSize: 14,
    marginTop: 5,
    opacity: 0.8,
    fontFamily: "Outfit-Regular",
  },
  balanceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  balance: {
    color: "white",
    fontSize: 32,
    fontFamily: "Outfit-Bold",
  },
  editBtn: {
    marginLeft: 15,
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 8,
    borderRadius: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  bottomSheet: {
    backgroundColor: "white",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === "ios" ? 40 : 30,
    paddingTop: 12,
    minHeight: 320,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 20,
  },
  handleBar: {
    width: 45,
    height: 5,
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 25,
  },
  modalContent: {
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 25,
    color: "#1A1A1A",
    fontFamily: "Outfit-SemiBold",
  },
  input: {
    width: "100%",
    height: 55,
    backgroundColor: "#F5F5F5",
    borderRadius: 15,
    paddingHorizontal: 20,
    marginBottom: 20,
    fontSize: 18,
    color: "#333",
    fontFamily: "Outfit-Regular",
    borderWidth: 1,
    borderColor: "#EEE",
  },
  saveButton: {
    backgroundColor: "#D12F2F",
    width: "100%",
    padding: 14,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "#D12F2F",
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Outfit-SemiBold",
  },
  cancelButton: {
    width: "100%",
    padding: 14,
    borderRadius: 15,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#D12F2F",
  },
  cancelButtonText: {
    color: "#D12F2F",
    fontSize: 15,
    fontWeight: "600",
    fontFamily: "Outfit-SemiBold",
  },
});
