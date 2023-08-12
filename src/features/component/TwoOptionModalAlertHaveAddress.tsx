import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Modal from "react-native-modal/dist/modal";
import { useDispatch, useSelector } from "react-redux";
import { selectstreet } from "../account/accountSlice";

const TwoOptionModalAlertHaveAddress = ({
  isVisible,
  onClose,
  title,
  message,
  onConfirm,
  onCancel,
}: any) => {
  const addressuser:any = useSelector(selectstreet);

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
            <View style={{  }}>
              <Text style={{ marginTop: 30,fontSize: 15, color: "gray"}}>
                Address: {addressuser.value.subDistrict}{" "}{" "}{" "}
                {addressuser.value.district} 
              </Text>
              <Text style={{fontSize: 15, color: "gray"}}>{addressuser.value.province}{" "}{" "}{" "} {addressuser.value.postalCode}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: 20,
              }}
            >
              <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
                <Text style={styles.buttonText}>Edit Address</Text>
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

export default TwoOptionModalAlertHaveAddress;

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
