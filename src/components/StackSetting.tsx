import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const StackSetting = () => {
  return (
    <SafeAreaView
      style={{ backgroundColor: "white", flex: 1, paddingVertical: 10 }}
    >
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={28}
          color="black"
          style={{ marginRight: 5 }}
        />
        <Text style={{ fontSize: 20, fontWeight: "500" }}>
          Account Information
        </Text>
      </View>

      <View>
        <TouchableOpacity>
          <View
            style={{
              borderBottomWidth: 1,
              borderTopWidth: 0.9,
              borderColor: "#f5f5f5",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingLeft: 20,
              paddingRight: 20,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "400",
                marginTop: 15,
                marginBottom: 15,
              }}
            >
              Full Name
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "400",
                marginTop: 15,
                marginBottom: 15,
              }}
            >
              name user
            </Text>
            <AntDesign name="right" size={24} color="gray" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View
            style={{
              borderBottomWidth: 1,
              borderTopWidth: 0.9,
              borderColor: "#f5f5f5",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingLeft: 20,
              paddingRight: 20,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "400",
                marginTop: 15,
                marginBottom: 15,
              }}
            >
              Change Password
            </Text>
            <AntDesign name="right" size={24} color="gray" />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default StackSetting;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
    paddingLeft: 20,
  },
});
