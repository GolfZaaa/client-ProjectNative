import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  View,
  Animated,
  LayoutAnimation,
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { anonymousadd, registerAsync, selectIsLoading } from "./accountSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const RegisterScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Member");
  const [showPassword, setShowPassword] = useState(false);
  const [eyeIconOpacity] = useState(new Animated.Value(0));
  const [PasswordVisible, setPasswordVisible] = useState(false);
  const rotateValue = new Animated.Value(0);

  const isLoading = useSelector(selectIsLoading);
  const imagelogo = require("../../../assets/iconlogin.png");
  const dispatch = useDispatch();

  const handleregister = async () => {
    if (email === "" || role === "" || username === "" || password === "") {
      // หากมีค่าว่างในอย่างใดอย่างหนึ่ง ไม่ทำอะไรและออกจากฟังก์ชัน
      alert("Please provide your complete Email, UserName, and Password.");
      return;
    }

    const test = await dispatch(
      registerAsync({ email, role, username, password }) as any
    );
    if (test?.payload?.value.message === "This e-mail has already been used.") {
      alert("This e-mail has already been used.");
      return;
    }
    if (test?.payload?.value.message === "Create Successfully") {
      alert("Register Create Successfully");
      navigation.navigate("confirmemail", { email });
    }
    console.log("Register", test);
  };

  const handleGuestVisit = () => {
    dispatch(anonymousadd());
    AsyncStorage.removeItem("userid");
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!PasswordVisible);
    const toValue = PasswordVisible ? 0 : 1;
    Animated.timing(eyeIconOpacity, {
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
        useNativeDriver: false,
      }).start();
    } else {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      Animated.timing(eyeIconOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const iconRotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["180deg", "0deg"],
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      {isLoading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <>
          {/* {error && <Text style={{ color: "red" }}>{error}</Text>} */}
          <Text
            style={{
              fontSize: 40,
              fontWeight: "800",
              color: "#1c68f7",
              textAlign: "center",
              marginBottom: 50,
            }}
          >
            Register
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 10,
              marginBottom: 30,
              backgroundColor: "#b2d1fd",
              borderRadius: 15,
              elevation: 15,
              width: 330,
              height: 60,
            }}
          >
            <MaterialCommunityIcons
              name="email-outline"
              size={30}
              style={{ paddingLeft: 3 }}
              color="gray"
            />
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={{
                flex: 1,
                fontSize: 15,
                fontWeight: "500",
                paddingLeft: 13,
              }}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 10,
              marginBottom: 30,
              backgroundColor: "#b2d1fd",
              borderRadius: 15,
              elevation: 15,
              width: 330,
              height: 60,
            }}
          >
            <View style={{ paddingLeft: 3 }}>
              <Feather name="user" size={30} color="gray" />
            </View>
            <TextInput
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              style={{
                flex: 1,
                fontSize: 15,
                fontWeight: "500",
                paddingLeft: 13,
              }}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 10,
              marginBottom: 20,
              backgroundColor: "#b2d1fd",
              borderRadius: 15,
              elevation: 15,
              width: 330,
              height: 60,
            }}
          >
            <Feather
              name="lock"
              size={29}
              style={{ paddingLeft: 4 }}
              color="gray"
            />

            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={handlePasswordChange}
              secureTextEntry={!PasswordVisible}
              style={{
                flex: 1,
                fontSize: 15,
                fontWeight: "500",
                paddingLeft: 13,
              }}
            />
            {password.length > 0 && (
              <TouchableOpacity onPress={togglePasswordVisibility}>
                <Animated.View style={{ transform: [{ rotate: iconRotate }] }}>
                  <MaterialIcons
                    name={PasswordVisible ? "visibility-off" : "visibility"}
                    size={24}
                    color="gray"
                  />
                </Animated.View>
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity
            onPress={handleregister}
            style={{
              width: 330,
              backgroundColor: "#1a57ff",
              marginBottom: 20,
              height: 60,
              marginTop: 30,
              borderRadius: 10,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 25,
                fontWeight: "600",
                top: 15,
              }}
            >
              Register
            </Text>
          </TouchableOpacity>

          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 15, fontWeight: "600" }}>
              Or continue with
            </Text>
          </View>

          <View style={styles.socialRow}>
            <TouchableOpacity
              style={[styles.socialCard]}
              onPress={() => console.log("Facebook login")}
            >
              <Image
                source={require("../../../assets/icons/imageicon/facebook.png")}
                style={styles.socialIconfacebook}
              />
              <Text style={styles.socialText}>Facebook</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.socialCard]}
              onPress={handleGuestVisit}
            >
              <Image
                source={require("../../../assets/icons/imageicon/anonymous.png")}
                style={styles.socialIcon}
              />
              <Text style={styles.socialText}>Guest </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 50,
            }}
          >
            <Text>Already Have An Account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("login")}>
              <Text
                style={{ fontSize: 15, fontWeight: "800", color: "#0464ff" }}
              >
                login
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              top: 720,
              right: -140,
              width: 300,
              height: 300,
              position: "absolute",
              backgroundColor: "#5ee1ff",
              borderRadius: 140,
            }}
          ></View>
          <View
            style={{
              bottom: 710,
              right: 210,
              width: 300,
              height: 300,
              position: "absolute",
              backgroundColor: "#5ee1ff",
              borderRadius: 140,
            }}
          ></View>
        </>
      )}
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 20,
  },
  wrapperInput: {
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: "grey",
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  wrapperInputEmail: {
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: "grey",
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    padding: 10,
    width: "100%",
  },
  wrapperIcon: {
    position: "absolute",
    right: 0,
    padding: 10,
  },
  button: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "orange",
    borderRadius: 5,
    marginTop: 25,
  },
  buttonDisable: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "grey",
    borderRadius: 5,
    marginTop: 25,
  },
  text: {
    color: "white",
    fontWeight: "700",
  },
  textFailed: {
    alignSelf: "flex-end",
    color: "red",
  },
  socialCard: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    width: 140,
  },
  socialRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    marginTop: 20,
  },
  socialIcon: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  socialIconfacebook: {
    width: 40,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  socialText: {
    fontWeight: "600",
    fontSize: 14,
  },
});
