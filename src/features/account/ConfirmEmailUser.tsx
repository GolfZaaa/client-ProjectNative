import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import { confirmUserAsync } from "./accountSlice";
import { useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import Lottie from 'lottie-react-native';


const ConfirmEmailUser = ({ route, navigation }: any) => {
  const { email } = route.params;
  const [otp1, setOtp1] = useState("");
  const [otp2, setOtp2] = useState("");
  const [otp3, setOtp3] = useState("");
  const [otp4, setOtp4] = useState("");
  const dispatch = useDispatch();

  const inputRefs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  const handleOTPChange = (text: any, index: any) => {
    const latestOtpValue = [otp1, otp2, otp3, otp4];
    latestOtpValue[index] = text;

    setOtp1(latestOtpValue[0]);
    setOtp2(latestOtpValue[1]);
    setOtp3(latestOtpValue[2]);
    setOtp4(latestOtpValue[3]);

    const backgroundColor = text.length === 0 ? "#fff" : "#f51616";

    inputRefs[index]?.current?.setNativeProps({
      style: { ...styles.otpInput, backgroundColor },
    });

    if (text.length === 1 && inputRefs[index + 1]?.current) {
      inputRefs[index + 1]?.current?.focus();
    }
  };

  const handleOTPKeyPress = (e: any, index: number) => {
    const latestOtpValue = [otp1, otp2, otp3, otp4];

    if (e.nativeEvent.key === "Backspace" && latestOtpValue[index] === "") {
      inputRefs[index - 1]?.current?.focus();
    }
  };

  const handleConfirm = () => {
    const otp = otp1 + otp2 + otp3 + otp4;

    if (otp === "") {
      return;
    }

    dispatch(confirmUserAsync({ email, emailConfirmationToken: otp }) as any)
      .then(() => {
        navigation.navigate("login");
      })
      .catch(() => {
        console.log("Failed to Confirm");
      });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      
      <TouchableOpacity style={{margin:20}} onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back" size={35} color="black" />
      </TouchableOpacity>

    <View style={styles.lottieContainer}>
    <View style={styles.lottie}>
                <Lottie source={require('../../../assets/icons/lottie/ConfirmEmail.json')} autoPlay loop />
        </View>
    </View>


      <View style={styles.container}>
        <Text style={styles.title}>Confirm Email</Text>
        <Text style={styles.description}>
          Please enter your email address and click the button below to confirm.
        </Text>
        <View style={styles.otpContainer}>
          <TextInput
            ref={inputRefs[0]}
            style={styles.otpInput}
            value={otp1}
            onChangeText={(text) => handleOTPChange(text, 0)}
            onKeyPress={(e) => handleOTPKeyPress(e, 0)}
            keyboardType="numeric"
            maxLength={1}
          />
          <TextInput
            ref={inputRefs[1]}
            style={styles.otpInput}
            value={otp2}
            onChangeText={(text) => handleOTPChange(text, 1)}
            onKeyPress={(e) => handleOTPKeyPress(e, 1)}
            keyboardType="numeric"
            maxLength={1}
          />
          <TextInput
            ref={inputRefs[2]}
            style={styles.otpInput}
            value={otp3}
            onChangeText={(text) => handleOTPChange(text, 2)}
            onKeyPress={(e) => handleOTPKeyPress(e, 2)}
            keyboardType="numeric"
            maxLength={1}
          />
          <TextInput
            ref={inputRefs[3]}
            style={styles.otpInput}
            value={otp4}
            onChangeText={(text) => handleOTPChange(text, 3)}
            onKeyPress={(e) => handleOTPKeyPress(e, 3)}
            keyboardType="numeric"
            maxLength={1}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleConfirm}>
          <Text style={styles.buttonText}>Confirm Email</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 32,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
  },
  otpInput: {
    width: 70,
    height: 70,
    borderWidth: 2,
    borderColor: "gray",
    marginRight: 8,
    textAlign: "center",
    fontSize: 35,
    borderRadius: 50,
    color: "#fff",
  },
  button: {
    backgroundColor: "#4287f5",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  otpInputFilled: {
    width: 70,
    height: 70,
    borderWidth: 2,
    borderColor: "red",
    marginRight: 8,
    textAlign: "center",
    fontSize: 20,
    backgroundColor: "#f51616",
  },
  lottie:{
    width:300,
    height:300,
},
lottieContainer: {
  justifyContent: 'center',
  alignItems: 'center',
},
});

export default ConfirmEmailUser;
