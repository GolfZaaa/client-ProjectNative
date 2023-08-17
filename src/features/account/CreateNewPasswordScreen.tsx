import {
  Animated,
  LayoutAnimation,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";
import { CreateNewPassword } from "./accountSlice";

const CreateNewPasswordScreen = ({ navigation, route }: any) => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [PasswordVisible, setPasswordVisible] = useState(false);
  const [PasswordVisibleconfirm, setPasswordVisibleconfirm] = useState(false);
  const rotateValue = new Animated.Value(0);
  const rotateValueConfirm = new Animated.Value(0);
  const [eyeIconOpacity] = useState(new Animated.Value(0));
  const { email } = route.params;
  console.log("params", email);

  const HandleChangePassword = async () => {
    const test = await dispatch(
      CreateNewPassword({
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      }) as any
    );

    if (
      test.payload.value.message ===
      "Password and confirm password do not match"
    ) {
      alert("Password and confirm password do not match");
    }

    if (test.payload.value.message === "Password changed successfully") {
      alert("Completed to change password");
      navigation.navigate("login");
    }

    if(test.payload.value.message === "Failed to Change Password") {
      alert("Failed to Change Password");
    }

    console.log("🫥", test.payload.value.message);
  };

  // function animation ลูกตา password Start
  const togglePasswordVisibility = () => {
    setPasswordVisible(!PasswordVisible);
    const toValue = PasswordVisible ? 0 : 1;
    Animated.timing(rotateValue, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handlePasswordChange = (text: any) => {
    setPassword(text);
    if (text.length > 0) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      Animated.timing(eyeIconOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      Animated.timing(eyeIconOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const toggleConfirmPasswordVisibility = () => {
    setPasswordVisibleconfirm(!PasswordVisibleconfirm);
    const toValue = PasswordVisibleconfirm ? 0 : 1;
    Animated.timing(rotateValue, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleConfirmPasswordChange = (text: any) => {
    setConfirmPassword(text);
    if (text.length > 0) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      Animated.timing(eyeIconOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      Animated.timing(eyeIconOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const iconRotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["180deg", "0deg"],
  });
  // function animation ลูกตา password End

  return (
    <View
      style={{ flex: 1, backgroundColor: "#fff", padding: 20, paddingTop: 40 }}
    >
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row" }}>
            <MaterialIcons name="keyboard-backspace" size={35} color="black" />
          </View>
        </View>
      </TouchableOpacity>

      <Text
        style={{
          paddingTop: 25,
          fontWeight: "600",
          fontSize: 30,
          marginBottom: 15,
        }}
      >
        Create new password
      </Text>

      <Text style={{ fontSize: 18, color: "gray" }}>
        Your new password must be different
      </Text>
      <Text style={{ fontSize: 18, color: "gray", marginBottom: 25 }}>
        from previous used passwords.
      </Text>

      <Text
        style={{
          color: "gray",
          fontSize: 17,
          fontWeight: "500",
          marginBottom: 10,
        }}
      >
        Password
      </Text>

      <View
        style={{
          position: "relative",
          marginBottom: 20,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <EvilIcons
            name="lock"
            size={35}
            color="gray"
            style={{ position: "absolute", top: 8, left: 7 }}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={handlePasswordChange}
            secureTextEntry={!PasswordVisible}
            style={{
              height: 50,
              borderColor: "gray",
              borderWidth: 1,
              borderRadius: 5,
              paddingLeft: 45,
              paddingRight: 15,
              marginBottom: 5,
              width: "100%",
            }}
          />
          {password.length > 0 && (
            <TouchableOpacity
              onPress={togglePasswordVisibility}
              style={{ paddingRight: 20 }}
            >
              <Animated.View style={{ transform: [{ rotate: iconRotate }] }}>
                <MaterialIcons
                  name={PasswordVisible ? "visibility-off" : "visibility"}
                  style={{ position: "absolute", bottom: 10, left: 10 }}
                  size={28}
                  color="gray"
                />
              </Animated.View>
            </TouchableOpacity>
          )}
        </View>

        <Text style={{ color: "gray" }}>Must be at least 8 characters.</Text>
      </View>

      <Text
        style={{
          color: "gray",
          fontSize: 17,
          fontWeight: "500",
          marginBottom: 10,
        }}
      >
        Confirm Password
      </Text>

      <View
        style={{
          position: "relative",
          marginBottom: 30,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <EvilIcons
            name="lock"
            size={35}
            color="gray"
            style={{ position: "absolute", top: 8, left: 7 }}
          />
          <TextInput
            style={{
              height: 50,
              borderColor: "gray",
              borderWidth: 1,
              borderRadius: 5,
              paddingLeft: 45,
              paddingRight: 15,
              marginBottom: 5,
              width: "100%",
            }}
            onChangeText={handleConfirmPasswordChange}
            value={confirmPassword}
            placeholder="Enter your password"
            secureTextEntry={!PasswordVisibleconfirm}
            autoCorrect={false}
          />
          {confirmPassword.length > 0 && (
            <TouchableOpacity
              onPress={toggleConfirmPasswordVisibility}
              style={{ paddingRight: 20 }}
            >
              <Animated.View style={{ transform: [{ rotate: iconRotate }] }}>
                <MaterialIcons
                  name={
                    PasswordVisibleconfirm ? "visibility-off" : "visibility"
                  }
                  style={{ position: "absolute", bottom: 10, left: 10 }}
                  size={28}
                  color="gray"
                />
              </Animated.View>
            </TouchableOpacity>
          )}
        </View>
        <Text style={{ color: "gray" }}>Both passwords must match.</Text>
      </View>

      <TouchableOpacity onPress={HandleChangePassword}>
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
            Reset Password
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default CreateNewPasswordScreen;

const styles = StyleSheet.create({});
