import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Modal from "react-native-modal/dist/modal";

const TwoOptionModalAlert = ({
  isVisible,
  onClose,
  title,
  message,
  onConfirm,
  onCancel,
}: any) => {
  return (
    <View>
      <Modal
        isVisible={isVisible}
        backdropOpacity={0.5}
        onBackdropPress={onClose}
        onBackButtonPress={onClose}
        animationIn="zoomIn"
        animationOut="zoomOut"
        avoidKeyboard={true}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{ backgroundColor: "white", padding: 20, borderRadius: 8 }}
          >
            <Text
              style={{ fontSize: 18, fontWeight: "bold", marginBottom: -20 }}
            >
              {title}
            </Text>
            <Text>{message}</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: 20,
              }}
            >
              <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onConfirm}
                style={styles.confirmButton}
              >
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TwoOptionModalAlert;

const styles = StyleSheet.create({
  cancelButton: {
    backgroundColor: "#FF5858",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  confirmButton: {
    backgroundColor: "#3CB371",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginLeft: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
