import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  Animated,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  anonymousUser,
  anonymousadd,
  loginAsync,
  selectError,
  selectIsLoading,
  selectToken,
  selectanonymous,
} from "./accountSlice";
import { Toast } from "../component/AlertToast";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }: any) => {
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showingToast, setShowingToast] = useState(false);
  const anonymous = useSelector(selectanonymous);
  const token = useSelector(selectToken);

  const imagelogo = require("../../../assets/iconlogin.png");

  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  // const handleLogin = ({navigation}:any) => {
  //   setShowingToast(true);
  //   dispatch(loginAsync({ username, password }) as any)
  // };

  const handleLogin = ({ navigation }: any) => {
    setShowingToast(true);
    dispatch(loginAsync({ username, password }) as any).then((success: any) => {
      if (success) {
        setShowingToast(true);
      } else {
        setShowingToast(false);
      }
    });
  };

  const handleGuestVisit = () => {
    dispatch(anonymousadd());
    AsyncStorage.removeItem("userid");
  };

  React.useEffect(() => {
    // ใช้ Animated.timing เพื่อทำ Animation ให้กับ fadeAnim โดยเปลี่ยนค่า opacity จาก 0 เป็น 1 ในระยะเวลา 1000 milliseconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <Animated.View style={{ opacity: fadeAnim }}>
        {isLoading ? (
          <ActivityIndicator size="large" color="blue" />
        ) : (
          <>
            {showingToast && (
              <View
                style={{
                  position: "absolute",
                  top: -60,
                  zIndex: 99,
                  alignContent: "center",
                }}
              >
                <Toast
                  title="Fail to login"
                  message="Login unsuccessful, please try again."
                  duration={2000}
                  onHidden={() => setShowingToast(false)}
                />
              </View>
            )}

            <Text
              style={{
                fontSize: 40,
                fontWeight: "800",
                color: "#1c68f7",
                textAlign: "center",
                marginBottom: 50,
              }}
            >
              Login
            </Text>
            <TextInput
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              style={{
                paddingHorizontal: 30,
                fontSize: 15,
                fontWeight: "500",
                width: 330,
                height: 60,
                marginBottom: 30,
                backgroundColor: "#b2d1fd",
                borderRadius: 15,
              }}
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={{
                paddingHorizontal: 30,
                fontSize: 15,
                fontWeight: "500",
                width: 330,
                height: 60,
                marginBottom: 30,
                backgroundColor: "#b2d1fd",
                borderRadius: 15,
                marginTop: 15,
              }}
            />
            <Text
              style={{
                fontWeight: "bold",
                left: 160,
                fontSize: 16,
                marginBottom: 10,
                bottom: 5,
                color: "#2d6cff",
              }}
            >
              Forgot your password ?
            </Text>

            <TouchableOpacity
              onPress={handleLogin}
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
                Login
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

            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:50}}>
              <Text>Don't have an account? </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("register")}
              >
                <Text style={{ fontSize: 15, fontWeight: "800",color:'#0464ff' }}>
                  Register
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                top: -300,
                right: 180,
                width: 300,
                height: 300,
                position: "absolute",
                backgroundColor: "#92ebff",
                borderRadius: 140,
              }}
            ></View>
            <View
              style={{
                top: 620,
                right: -140,
                width: 300,
                height: 300,
                position: "absolute",
                backgroundColor: "#5ee1ff",
                borderRadius: 140,
              }}
            ></View>
          </>
        )}
      </Animated.View>
    </View>
  );
};

export default LoginScreen;



const styles = StyleSheet.create({
  socialCard: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    width:140,
  },
  socialRow: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
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