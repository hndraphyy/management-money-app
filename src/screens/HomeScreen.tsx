import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { useAppTheme } from "../constants/ThemeContext";
import { toRupiah } from "../utils/formatCurrency";
import { useBalance } from "../hooks/useBalance";
import { EditBalanceModal } from "../components/bottom-sheet/EditBalanceModal";

export default function HomeScreen({ name }: { name: string }) {
  const { theme } = useAppTheme();
  const { balance, saveBalance, loading } = useBalance();
  const [modalOpen, setModalOpen] = useState(false);

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", backgroundColor: theme.background },
        ]}
      >
        <ActivityIndicator size="large" color="#D12F2F" />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <LinearGradient
          colors={["#D12F2F", "#7C1A1D"]}
          style={styles.topSection}
        >
          <Text style={styles.welcome}>Woi, {name}!</Text>
          <Text style={styles.balanceTitle}>
            Cek dulu dompetmu biar nggak boncos pas akhir bulan.
          </Text>

          <View style={styles.balanceRow}>
            <Text style={styles.balance}>{toRupiah(balance)}</Text>
            <TouchableOpacity
              onPress={() => setModalOpen(true)}
              style={styles.editBtn}
            >
              <Feather name="edit-3" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>

      <EditBalanceModal
        isVisible={modalOpen}
        currentBalance={balance}
        onClose={() => setModalOpen(false)}
        onSave={saveBalance}
      />
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
  },
  welcome: { fontSize: 18, color: "white", fontFamily: "Outfit-SemiBold" },
  balanceTitle: {
    color: "white",
    fontSize: 14,
    marginTop: 5,
    opacity: 0.8,
    fontFamily: "Outfit-Regular",
  },
  balanceRow: { flexDirection: "row", alignItems: "center", marginTop: 15 },
  balance: { color: "white", fontSize: 32, fontFamily: "Outfit-Bold" },
  editBtn: {
    marginLeft: 15,
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 8,
    borderRadius: 12,
  },
});
