import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './src/components/Navigation';
import { Provider } from 'react-redux';
import store from './src/api/store';
import { StatusBar } from 'expo-status-bar';


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
