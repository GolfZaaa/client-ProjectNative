import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";
import { SendMessageToForgotPassword } from "./accountSlice";

const ForgotPasswordScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  // const handleResetPassword = () => {
  //   navigation.navigate("CheckyouEmail");
  // };

    const sendMessage = async () => {
      const test = await dispatch(SendMessageToForgotPassword({ email: email }) as any)

      if(test.payload.message === "Success to SendEmail for Forgotpassword")
      {
    navigation.navigate("CheckyouEmail",{email});
      }
      console.log("🫥",test.payload.message)
  }

  return (
    <View
      style={{ flex: 1, backgroundColor: "#fff", padding: 20, paddingTop: 40 }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
        <View style={{ flexDirection: "row" }}>
          <MaterialIcons name="keyboard-backspace" size={35} color="black" />
        </View>
        </TouchableOpacity>
        <View style={{ paddingTop: 5 }}>
          <AntDesign name="questioncircleo" size={25} color="black" />
        </View>
      </View>
      <Text
        style={{
          paddingTop: 25,
          fontWeight: "600",
          fontSize: 30,
          marginBottom: 15,
        }}
      >
        Reset password
      </Text>
      <Text style={{ fontSize: 17, color: "gray", marginBottom: 25 }}>
        Enter the email associated with your account and we'll send an email
        with instructions to reset your password.
      </Text>

      <Text
        style={{
          color: "gray",
          fontSize: 17,
          fontWeight: "500",
          marginBottom: 10,
        }}
      >
        Email address
      </Text>
      <View
        style={{
          position: "relative",
          marginBottom: 30,
        }}
      >
        <AntDesign
          name="mail"
          size={25}
          color="gray"
          style={{ position: "absolute", top: 12, left: 13 }}
        />
        <TextInput
          style={{
            height: 50,
            borderColor: "gray",
            borderWidth: 1,
            borderRadius: 5,
            paddingLeft: 45,
            paddingRight: 15,
          }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="Enter your email"
        />
      </View>

      <TouchableOpacity onPress={sendMessage}>
        <LinearGradient
          style={{
            borderRadius: 10,
            alignItems: "center",
          }}
          colors={["#d139ff", "#38d0ff"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "500",
              padding: 12,
            }}
          >
            Send Instructions
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({});
