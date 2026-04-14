import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  Platform,
} from "react-native";
import { toRupiah } from "../../utils/formatCurrency";

const { height } = Dimensions.get("window");

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onSave: (value: number) => void;
  currentBalance: number;
}

export const EditBalanceModal = ({
  isVisible,
  onClose,
  onSave,
  currentBalance,
}: Props) => {
  const [tempValue, setTempValue] = React.useState("");
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    if (isVisible) {
      setTempValue(currentBalance.toString());
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
    }
  }, [isVisible]);

  const handleClose = () => {
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
    ]).start(() => onClose());
  };

  return (
    <Modal
      transparent
      visible={isVisible}
      animationType="none"
      onRequestClose={handleClose}
    >
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={handleClose}>
          <Animated.View style={[styles.overlay, { opacity: fadeAnim }]} />
        </TouchableWithoutFeedback>

        <Animated.View
          style={[styles.sheet, { transform: [{ translateY: slideAnim }] }]}
        >
          <View style={styles.handle} />
          <Text style={styles.title}>Masukkan Nominal Uangmu</Text>
          <Text style={styles.preview}>{toRupiah(Number(tempValue) || 0)}</Text>

          <TextInput
            style={styles.input}
            keyboardType="numeric"
            // value={tempValue}
            onChangeText={(t) => setTempValue(t.replace(/[^0-9]/g, ""))}
            placeholder="Masukkan nominal..."
            autoFocus
          />

          <TouchableOpacity
            style={styles.btnSave}
            onPress={() => {
              onSave(Number(tempValue));
              handleClose();
            }}
          >
            <Text style={styles.btnTextSave}>Simpan Perubahan</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleClose} style={styles.btnclose}>
            <Text style={styles.btnTextClose}>Batal</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "flex-end" },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  sheet: {
    backgroundColor: "white",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    minHeight: 350,
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontFamily: "Outfit-SemiBold",
    textAlign: "center",
    marginBottom: 10,
  },
  preview: {
    fontSize: 22,
    fontFamily: "Outfit-Bold",
    color: "#D12F2F",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    padding: 15,
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Outfit-Regular",
  },
  btnSave: {
    backgroundColor: "#D12F2F",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#D12F2F",
  },
  btnTextSave: { color: "white", fontFamily: "Outfit-SemiBold", fontSize: 16 },
  btnclose: {
    marginTop: 12,
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#D12F2F",
  },
  btnTextClose: {
    color: "#D12F2F",
    fontFamily: "Outfit-SemiBold",
    fontSize: 16,
  },
});
