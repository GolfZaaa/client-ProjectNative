import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import { confirmUserAsync } from "./accountSlice";
import { useDispatch } from "react-redux";

const ConfirmEmailUser = ({ route, navigation }:any) => {
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
  

  const handleOTPChange = (text:any, index:any) => {
    switch (index) {
      case 0:
        setOtp1(text);
        if (text && text.length === 1 && inputRefs[1].current) {
          inputRefs[1].current.focus();
        }
        break;
      case 1:
        setOtp2(text);
        if (text && text.length === 1 && inputRefs[2].current) {
          inputRefs[2].current.focus();
        }
        break;
      case 2:
        setOtp3(text);
        if (text && text.length === 1 && inputRefs[3].current) {
          inputRefs[3].current.focus();
        }
        break;
      case 3:
        setOtp4(text);
        break;
      default:
        break;
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
          keyboardType="numeric"
          maxLength={1}
        />
        <TextInput
          ref={inputRefs[1]}
          style={styles.otpInput}
          value={otp2}
          onChangeText={(text) => handleOTPChange(text, 1)}
          keyboardType="numeric"
          maxLength={1}
        />
        <TextInput
          ref={inputRefs[2]}
          style={styles.otpInput}
          value={otp3}
          onChangeText={(text) => handleOTPChange(text, 2)}
          keyboardType="numeric"
          maxLength={1}
        />
        <TextInput
          ref={inputRefs[3]}
          style={styles.otpInput}
          value={otp4}
          onChangeText={(text) => handleOTPChange(text, 3)}
          keyboardType="numeric"
          maxLength={1}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleConfirm}>
        <Text style={styles.buttonText}>Confirm Email</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    marginRight: 8,
    textAlign: "center",
    fontSize: 20,
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
});

export default ConfirmEmailUser;
