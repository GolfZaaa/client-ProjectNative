import React from 'react';
import { LogBox, StyleSheet, Text, View } from 'react-native';
import Navigation from './src/components/Navigation';
import { Provider } from 'react-redux';
import store from './src/api/store';
import { StatusBar } from 'expo-status-bar';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

export default function App() {
  return (
    <Provider store={store}>
      <Navigation/>
    </Provider>
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
