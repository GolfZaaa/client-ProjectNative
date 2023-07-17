import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Animated, Button } from 'react-native';

 export const Toast = ({ message, duration = 2000, onHidden,title }:any) => {
  const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(duration),
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (onHidden) {
        onHidden();
      }
    });
  }, []);

  const containerStyle = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0], 
        }),
      },
    ],
  };

  const textStyle = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 0.3, 1],
      outputRange: [0, 1, 1],
    }),
  };

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <View style={styles.toast}>
      <Animated.Text style={[styles.message, textStyle]}>
          {title}
          </Animated.Text>

        <Animated.Text style={[styles.message, textStyle]}>
          {message}
          </Animated.Text>
      </View>
    </Animated.View>
  );
};

const AlertToast = () => {

  const showToast = () => {
    setShowingToast(true);
    setTimeout(() => {
      setShowingToast(false);
    }, 5000);
  };

  const [showingToast, setShowingToast] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Toast Example</Text>
      <View style={styles.buttonContainer}>
        <Button title="Show Toast" onPress={showToast} />
      </View>
      {showingToast && (
        <View style={{position:'absolute'}}>
                  <Toast
                  title ="success"
          message="This is a toast message"
          duration={2000}
          onHidden={() => setShowingToast(false)}
        />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  toast: {
    backgroundColor: 'rgba(255, 0, 0, 0.8)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  message: {
    color: 'white',
    fontSize: 16,
  },
});

export default AlertToast;
