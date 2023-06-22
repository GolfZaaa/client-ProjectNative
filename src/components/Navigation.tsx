import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../features/account/LoginScreen';
import RegisterScreen from '../features/account/RegisterScreen';
import ProducuDetail from '../screens/ProducuDetailScreen';
import ProducuDetailScreen from '../screens/ProducuDetailScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {

  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name='login' component={LoginScreen} options={{headerShown:false}} />
            <Stack.Screen name='home' component={HomeScreen}  options={{headerShown:false}} />
            <Stack.Screen name='register' component={RegisterScreen} options={{headerShown:false}}/>
            <Stack.Screen name='productdetail' component={ProducuDetailScreen} options={{headerShown:false}}/>

        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation

const styles = StyleSheet.create({})