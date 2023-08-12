import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Lottie from "lottie-react-native";

const CheckyouEmailScreen = ({navigation,route}:any) => {

  const { email } = route.params;

  console.log("params",email)
  const handleGotoCreateNewPasswordScreen = () => {
    navigation.navigate("OptForgotPassword",{email});
  }

  const handleGotoLogin = () => {
    navigation.navigate("login");
  }

  const handleGotoForgotpassword = () => {
    navigation.navigate("forgotpassword");
  }

  return (
    <View style={styles.container}>
      <View style={styles.lottieContainer}>
        <View style={styles.lottie}>
          <Lottie
            source={require("../../../assets/icons/lottie/CheckEmail.json")}
            autoPlay
            loop
          />
        </View>
      </View>
      <Text style={{ fontSize: 29, marginTop: 25, fontWeight: "700" }}>
        Check your mail
      </Text>
      <View>
        <Text style={{ fontSize: 18, marginTop: 10, color: "gray" }}>
          We have sent a password recover
        </Text>
        <Text
          style={{
            fontSize: 18,
            marginTop: 5,
            color: "gray",
            textAlign: "center",
          }}
        >
          instructions to your email.
        </Text>
      </View>
      <TouchableOpacity style={styles.botton} onPress={handleGotoCreateNewPasswordScreen}>
        <Text style={{ fontWeight:'500',fontSize:16,justifyContent: "center", alignItems: "center", color: "#fff" }}>Go Fill In The Token.</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{marginTop:30}} onPress={handleGotoLogin}>
        <Text style={{fontSize:16,color:'gray',fontWeight:'700'}}>Skip, I'll confirm later</Text>
      </TouchableOpacity>

          <View style={{paddingTop:170}}>
          <Text style={{fontSize:14,color:'gray',fontWeight:'500'}}>Did not receive the email? Check your spam filter,</Text>
      <View style={{flexDirection:'row' ,justifyContent:'center'}}>
          <Text style={{color:'gray',fontWeight:'500'}}>or</Text>
          <TouchableOpacity onPress={handleGotoForgotpassword}>
            <Text style={{color:'#8600c4',fontWeight:'500'}}> Try another email address</Text>
          </TouchableOpacity>
      </View>
          </View>
    </View>
  );
};

export default CheckyouEmailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 20,
    paddingTop: 140,
  },
  lottieContainer: {
    borderColor: "#000",
    borderRadius: 20,
    justifyContent: "center",
    backgroundColor: "#f9ecff",
    width: 180,
    height: 130,
  },
  lottie: {
    width: 180,
    height: 180,
  },
  botton: {
    marginTop: 40,
    backgroundColor: "#8645ff",
    width: 180,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
