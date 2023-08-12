import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EditSettingUserScreen from "../features/account/EditSettingUserScreen";
import SettingScreen from "../features/account/SettingScreen";

const Stack = createNativeStackNavigator();

const StackSetting = ({ navigation }: any) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        component={SettingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditSettingUserScreen"
        component={EditSettingUserScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
   
  );
};

export default StackSetting;

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
