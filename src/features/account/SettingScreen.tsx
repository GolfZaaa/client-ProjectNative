import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const SettingScreen = ({ navigation }: any) => {
      const HandlegotoAccount = () => {
    navigation.navigate("EditSettingUserScreen");
  };

  const HandlegoEditAddress = () => {
    navigation.navigate("EditAddressScreen");
  };

  return (
 <View style={{ padding: 40, flex: 1, backgroundColor: "#ffffff" }}>
      <View style={styles.header}>
        <Text style={{ fontSize: 30, fontWeight: "500" }}>Settings</Text>
      </View>

      <View style={{marginBottom:20}}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            backgroundColor: "#f3f3f3",
            height: 50,
            borderRadius: 10,
            paddingHorizontal: 10,
          }}
          onPress={HandlegotoAccount}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ paddingLeft: 7 }}>
              <FontAwesome5 name="user-edit" size={23} color="black" />
            </View>
            <Text style={{ fontSize: 17, marginLeft: 15 }}>
              Account Information
            </Text>
          </View>
          <AntDesign name="right" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={{marginBottom:20}}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            backgroundColor: "#f3f3f3",
            height: 50,
            borderRadius: 10,
            paddingHorizontal: 10,
          }}
          onPress={HandlegoEditAddress}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ paddingLeft: 7 }}>
            <AntDesign name="customerservice" size={24} color="black" />
            </View>
            <Text style={{ fontSize: 17, marginLeft: 15 }}>
              Edit Address
            </Text>
          </View>
          <AntDesign name="right" size={24} color="black" />
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default SettingScreen

const styles = StyleSheet.create({
    header: {
      flexDirection: "row",
      marginTop: 10,
      marginBottom: 20,
    },
    itemContainer: {
      borderBottomWidth: 1,
      borderTopWidth: 0.9,
      borderColor: "#f5f5f5",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingLeft: 20,
      paddingRight: 20,
    },
    modalContainer: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
    },
    modalBackground: {
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(128, 128, 128, 0.5)",
    },
    modalContent: {
      backgroundColor: "white",
      padding: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      elevation: 5,
      width: "100%",
      height: "100%",
    },
    input: {
      borderWidth: 0,
      borderBottomWidth: 1,
      borderBottomColor: "gray",
      padding: 10,
      marginBottom: 10,
    },
    label: {
      fontSize: 16,
      fontWeight: "400",
      marginTop: 15,
      marginBottom: 15,
    },
    value: {
      fontSize: 18,
      fontWeight: "400",
      marginTop: 15,
      marginBottom: 15,
    },
    text: {
      color: "gray",
    },
    button: {
      padding: 10,
      borderRadius: 20,
      width: 160,
      height: 45,
      alignItems: "center",
      marginTop: 20,
      justifyContent: "center",
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "center",
    },
    buttonWithDivider: {},
    divider: {
      width: 0.5,
      height: 30,
      backgroundColor: "gray",
      position: "absolute",
      top: 30,
    },
  });
  