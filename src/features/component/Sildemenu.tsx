import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import { Feather } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  anonymousUser,
  removeaddress,
  selectEmail,
  selectToken,
  selectstreet,
  selectusername,
  test,
  updateEmail,
  updateToken,
  updateUserId,
  updateusername,
} from "../account/accountSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome5 } from "@expo/vector-icons";
import { updateCart } from "../cart/cartSlice";

const Sildemenu = ({ navigation }: any) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const username = useSelector(selectusername);
  const token = useSelector(selectToken);
  const email = useSelector(selectEmail);
  const addresstest = useSelector(selectstreet);

  const handlesetting = () => {
    setOpen(!open), navigation.navigate("setting");
  };

  const handleGuestVisit = () => {
    dispatch(test({token:addresstest}));
  };

  const handleLogout = async () => {
    if (token !== "") {
      try {
        await AsyncStorage.multiRemove(["token", "userId", "anonymous","username,email"]);
        dispatch(updateToken(null));
        dispatch(anonymousUser(false));
        dispatch(updateUserId(null));
        dispatch(removeaddress(null));
        dispatch(updateusername(null));
        dispatch(updateCart(null));
        dispatch(updateEmail(null));
      } catch (error) {
        console.log("Error removing token:", error);
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
      }}
    >
      <FontAwesome5
        style={{ zIndex: 99, position: "absolute", top: 45, left: 305 }}
        name="user-circle"
        size={44}
        color="black"
        onPress={() => setOpen(true)}
      />

      <Modal
        animationIn={"slideInLeft"}
        animationOut={"slideOutLeft"}
        isVisible={open}
        backdropOpacity={0.5}
        onBackdropPress={() => setOpen(false)}
      >
        <View
          style={{
            alignItems: "center",
            width: "90%",
            height: "100%",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: "80%",
              height: "95%",
              backgroundColor: "white",
              borderRadius: 20,
            }}
          >
            <View style={{ marginTop: 250, marginLeft: 20 }}>
              <TouchableOpacity
                style={{
                  width: "90%",
                  height: 50,
                  flexDirection: "row",
                  marginBottom: 10,
                  marginLeft: 5,
                }}
                onPress={handlesetting}
              >
                <Feather name="settings" size={24} color="blue" />
                <Text
                  style={{
                    marginLeft: 20,
                    fontSize: 19,
                    color: "blue",
                    fontWeight: "400",
                  }}
                >
                  Setting
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  width: "90%",
                  height: 50,
                  flexDirection: "row",
                  marginLeft: 3,
                  marginBottom: 10,
                }}
                onPress={handleGuestVisit}
              >
                <MaterialIcons name="support-agent" size={24} color="blue" />
                <Text
                  style={{
                    marginLeft: 20,
                    fontSize: 19,
                    color: "blue",
                    fontWeight: "400",
                  }}
                >
                  Help & Support
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleLogout}
                style={{
                  width: "90%",
                  height: 50,
                  flexDirection: "row",
                  marginLeft: 3,
                  marginBottom: 10,
                }}
              >
                <SimpleLineIcons name="logout" size={24} color="blue" />
                <Text
                  style={{
                    marginLeft: 20,
                    fontSize: 19,
                    color: "blue",
                    fontWeight: "400",
                  }}
                >
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              height: 120,
              position: "absolute",
              top: 100,
            }}
          >
            <View
              style={{
                // backgroundColor: "#ffe5b0",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                // borderWidth: 2,
                borderColor: "orange",
                width: "100%",
                height: 100,
                flexDirection: "row",
                alignItems: "center",
                paddingLeft: 20,
                paddingRight: 10,
                justifyContent: "space-between",
              }}
            >
              <View
                style={[
                  styles.container,
                  { alignItems: "center", justifyContent: "center" },
                ]}
              >
                <FontAwesome name="user-circle-o" size={124} color="black" />
                <View style={{ marginLeft: 0 }}>
                  <Text
                    style={{ fontSize: 18, fontWeight: "600", color: "black" }}
                  ></Text>
                  <Text
                    style={{ fontSize: 18, fontWeight: "600", color: "black" }}
                  >
                    0123981****
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
                marginTop: -3,
              }}
            ></View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Sildemenu;

const styles = StyleSheet.create({
  modalContent: {
    alignItems: "center",
    width: "80%",
    height: "95%",
    backgroundColor: "white",
    borderRadius: 20,
  },
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});
