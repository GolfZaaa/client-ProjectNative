import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Dimensions,
  } from "react-native";
import React, { useRef, useState } from 'react'
import { useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import Lottie from 'lottie-react-native';
import { ConfirmOtpPassword, ResetForgotPasswordToken } from "./accountSlice";
import { LinearGradient } from "expo-linear-gradient";

const ConfirmOTPForgotPasswordScreen = ({ route, navigation }: any) => {

  const dispatch = useDispatch();
  const { email } = route.params;
  const [test, settest] = useState("")
  
  const [ResendButtonDisabled, setResendButtonDisabled] = useState(false);
  const [TimeResend, setTimeResend] = useState(30);
  const [otp1, setOtp1] = useState("");
  const [otp2, setOtp2] = useState("");
  const [otp3, setOtp3] = useState("");
  const [otp4, setOtp4] = useState("");

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

    const backgroundColor = text.length === 0 ? "#fff" : "#01b3fa";

    inputRefs[index]?.current?.setNativeProps({
      style: { ...styles.otpInput, backgroundColor },
    });

    if (text.length === 1 && inputRefs[index + 1]?.current) {
      inputRefs[index + 1]?.current?.focus();
    }
  };

  const handleOTPKeyPress = (e: any, index: number) => {
    e.persist();
    const latestOtpValue = [otp1, otp2, otp3, otp4];

    if (e.nativeEvent.key === "Backspace" && latestOtpValue[index] === "") {
      inputRefs[index - 1]?.current?.focus();
    }
  };

  const handleConfirm = async () => {
    const otp = otp1 + otp2 + otp3 + otp4;

    if (otp === "") {
      console.log("Please enter a Token.");
      alert("Please enter a Token.");
      return;
    }
    const asd = await dispatch(ConfirmOtpPassword({ email:email, confirmForgotPassowrd: otp }) as any)
      // if(asd.payload?.value.message === "Confirmed token successfully go to ResetPassword.")
      // {
      //   alert("Completed To Confirm Email for forgotpassword ")
      //   navigation.navigate("CreateNewPassword");
      // }else{
      //   alert("Token wrong.");
      // }
      
        if(asd.payload?.message === "Confirmed token successfully go to ResetPassword.")
        {
        alert("Completed To Confirm Email for forgotpassword ")
        navigation.navigate("CreateNewPassword",{email});
        }else{
        alert("Token wrong.");

        }

      console.log("😊😊",asd.error.message)
  };

  console.log("params",email)

  
  const ResendEmail = async () => {
    try {
      await dispatch(ResetForgotPasswordToken({ email: email }) as any);
      setResendButtonDisabled(true);

      const Cooldown = setInterval(() => {
        setTimeResend((index) => {
          if (index === 1) {
            clearInterval(Cooldown);
            setResendButtonDisabled(false);
          }
          return index - 1;
        });
      }, 1000);

      setTimeout(() => {
        setResendButtonDisabled(false);
      }, 30000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      
      <TouchableOpacity style={{margin:20}} onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back" size={35} color="black" />
      </TouchableOpacity>

    <View style={styles.lottieContainer}>
    <View style={styles.lottie}>
                <Lottie source={require('../../../assets/icons/lottie/ConfirmPassword.json')} autoPlay loop />
        </View>
    </View>


      <View style={styles.container}>
      <Text style={styles.title}>Confirm Password</Text>
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

        <View style={{flexDirection:'row',marginBottom:50,marginTop:10}}>
        <Text style={{ fontWeight: '500', color: 'gray', fontSize: 15, marginRight: 5 }}>Don't receive the OTP ?</Text>
        <TouchableOpacity style={{ flexDirection: 'row', marginBottom: 50}}
        onPress={ResendEmail}
        disabled={ResendButtonDisabled} 
      >
        <Text style={{ fontSize: 15, fontWeight: '800', color: ResendButtonDisabled ? '#ccc' : '#0533ff' }}>
          {ResendButtonDisabled ? `RESENDING... (${TimeResend}s)` : 'RESEND OTP'}
        </Text>
      </TouchableOpacity>
        </View>

        <TouchableOpacity  onPress={handleConfirm}>
        <LinearGradient
          style={{
            borderRadius: 10,
            alignItems: "center",
            width: 330,
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
            VERIFY & PROCEED
          </Text>
        </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ConfirmOTPForgotPasswordScreen

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
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
    paddingTop:40,
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
    fontWeight:'500',

  },
  button: {
    backgroundColor: "#00c0fa",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    width:'85%',
    height:50
  },
  buttonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
    textAlign:'center',
    top:3
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
    width:240,
    height:240,
},
lottieContainer: {
  justifyContent: 'center',
  alignItems: 'center',
},
})