import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import ProductScreen from "../features/product/ProductScreen";
import RegisterScreen from "../features/account/RegisterScreen";
import ProducuDetailScreen from "../features/product/ProducuDetailScreen";
import { useSelector } from "react-redux";
import { selectToken } from "../features/account/accountSlice";
import ConfirmEmailUser from "../features/account/ConfirmEmailUser";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StackProduct from "./StackProduct";
import Icon from "react-native-vector-icons/FontAwesome";
import SettingUser from "../features/account/SettingUser";
import FirstPageScreen from "../features/account/FirstPageScreen";
import LoginScreen from "../features/account/LoginScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Navigation = () => {
  const token = useSelector(selectToken);
  console.log(token);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!token ? (
          <>
            <Stack.Screen
              name="firstScreen"
              component={FirstPageScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="confirmemail"
              component={ConfirmEmailUser}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="homeproduct" options={{ headerShown: false }}>
              {() => (
                <Tab.Navigator>
                  <Tab.Screen
                    name="product"
                    component={StackProduct}
                    options={{
                      headerShown: false,
                      tabBarIcon: ({ color, size }) => (
                        <Icon name="shopping-cart" color={color} size={size} />
                      ),
                    }}
                  />
                  <Tab.Screen
                    name="setting"
                    component={SettingUser}
                    options={{
                      headerShown: false,
                      tabBarIcon: ({ color, size }) => (
                        <Icon name="user" color={color} size={size} />
                      ),
                    }}
                  />
                </Tab.Navigator>
              )}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
