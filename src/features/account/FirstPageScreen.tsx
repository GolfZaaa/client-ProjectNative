import { Animated, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const image = require('../../../assets/image1.png');

const FirstPageScreen = ({navigation}:any) => {

  const loginAnimationValue = useRef(new Animated.Value(1)).current;
  const registerAnimationValue = useRef(new Animated.Value(1)).current;

  const handleLoginPressIn = () => {
    Animated.spring(loginAnimationValue, {
      toValue: 0.8,
      useNativeDriver: true,
    }).start();
  };

  const handleLoginPressOut = () => {
    Animated.spring(loginAnimationValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const handleRegisterPressIn = () => {
    Animated.spring(registerAnimationValue, {
      toValue: 0.8,
      useNativeDriver: true,
    }).start();
  };

  const handleRegisterPressOut = () => {
    Animated.spring(registerAnimationValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const loginAnimatedStyle = {
    transform: [{ scale: loginAnimationValue }],
  };

  const registerAnimatedStyle = {
    transform: [{ scale: registerAnimationValue }],
  };

  const gologin = () => {
    navigation.navigate("login");
  };

  const goregister = () => {
    navigation.navigate("register");
  };

  return (
    <SafeAreaView style={{ width: '100%', height: '100%', backgroundColor: '#fff' }}>
      <View>
        <ImageBackground
          style={{ width: '100%', height: 200, marginTop: 50, marginBottom: 40 }}
          resizeMode="contain"
          source={image}
        />
        <View>
          <Text
            style={{
              fontSize: 35,
              marginLeft: 20,
              marginRight: 20,
              fontWeight: '600',
              textAlign: 'center',
              marginTop: 30,
            }}
          >
            "Welcome to our"
          </Text>
          <Text
            style={{
              fontSize: 35,
              fontWeight: '600',
              textAlign: 'center',
              right: 10,
              marginBottom: 20,
            }}
          >
            Application!
          </Text>
          <Text style={{ color: 'gray', fontSize: 20, marginLeft: 20 }}>
            {' '}
            We're delighted to have you on board.
          </Text>
          <Text style={{ textAlign: 'center', fontSize: 20, color: 'gray' }}>
            Thank you for choosing our app.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPressIn={handleLoginPressIn}
          onPressOut={handleLoginPressOut}
          onPress={gologin}
        >
          <Animated.View style={[styles.buttonContainer, loginAnimatedStyle]}>
            <Text style={styles.buttonText}>Login</Text>
          </Animated.View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonregister}
          onPressIn={handleRegisterPressIn}
          onPressOut={handleRegisterPressOut}
          onPress={goregister}
        >
          <Animated.View style={[styles.buttonContainer, registerAnimatedStyle]}>
            <Text style={styles.buttonText}>Register</Text>
          </Animated.View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default FirstPageScreen;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  buttonregister: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonContainer: {
    backgroundColor: 'blue',
    paddingVertical: 18,
    borderRadius: 20,
    width: 250,
    height: 70,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 25,
    fontWeight: '600',
    marginBottom: -10,
  },
});
