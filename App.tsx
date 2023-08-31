import React from 'react';
import { LogBox, StyleSheet, Text, View } from 'react-native';
import Navigation from './src/components/Navigation';
import { Provider } from 'react-redux';
import store from './src/features/api/store';
import { StatusBar } from 'expo-status-bar';
import { StripeProvider } from '@stripe/stripe-react-native';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

export default function App() {
  const publishableKey = "pk_test_51NXzoLKP6BtYWFTXQF5bdWURW7JXVd4YNwaOQkxxh0xScmXG8Y4dhkOMM5GJRDnThjM2XRkVp53bHNufNNLOi9vD00AZ9d4O1n"
  return (
    <StripeProvider  publishableKey={publishableKey}>
      <Provider store={store}>
        <Navigation/>
      </Provider>
      </StripeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
