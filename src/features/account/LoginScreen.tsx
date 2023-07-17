import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, Animated, TouchableOpacity,Image, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { loginAsync,selectError, selectIsLoading, selectToken} from './accountSlice';
import { Toast } from '../component/AlertToast';

const LoginScreen = ({navigation}:any) => {
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showingToast, setShowingToast] = useState(false);

const imagelogo = require('../../../assets/iconlogin.png');



  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  
  // const handleLogin = ({navigation}:any) => {
  //   setShowingToast(true);
  //   dispatch(loginAsync({ username, password }) as any)
  // };


const handleLogin = ({ navigation }: any) => {
  setShowingToast(true);
  dispatch(loginAsync({ username, password }) as any)
    .then((success: any) => {
      if (success) {
        setShowingToast(true);
      } else {
        setShowingToast(false);
      }
    });
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
            {error && <Text style={{ color: "red" }}>{error}</Text>}

            {showingToast && (
              <View style={{ position: "absolute",top:-60,zIndex:99,alignContent:'center'}}>
                <Toast
                  title ="Fail to login"
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

            <TouchableOpacity
              style={{ alignItems: "center", marginBottom: 35 }}
              onPress={() => navigation.navigate("register")}
            >
              <Text style={{ fontSize: 15, fontWeight: "800" }}>
                Create new account
              </Text>
            </TouchableOpacity>

            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 15, fontWeight: "600" }}>
                Or continue with
              </Text>
            </View>
            <Image source={imagelogo} style={{ top: 20, left: 25 }} />

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