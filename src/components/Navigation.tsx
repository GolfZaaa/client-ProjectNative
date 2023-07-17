import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import ProductScreen from "../features/product/ProductScreen";
import RegisterScreen from "../features/account/RegisterScreen";
import ProducuDetailScreen from "../features/product/ProducuDetailScreen";
import { useDispatch, useSelector } from "react-redux";
import { selectToken, selectuserid, updateToken, updateUserId } from "../features/account/accountSlice";
import ConfirmEmailUser from "../features/account/ConfirmEmailUser";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StackProduct from "./StackProduct";
import Icon from "react-native-vector-icons/FontAwesome";
import FirstPageScreen from "../features/account/FirstPageScreen";
import LoginScreen from "../features/account/LoginScreen";
import { FontAwesome } from "@expo/vector-icons";
import StackCart from "./StackCart";
import { selectProducts } from "../features/product/productSlice";
import { getCartAsync, selectCartItems } from "../features/cart/cartSlice";
import { AnyAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StackHistory from "./StackHistory";
import { FontAwesome5 } from '@expo/vector-icons';
import Toast from "../features/component/AlertToast";
import StackOnboard from "./StackOnboard";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Navigation = () => {

  const [showOnboard, setShowOnboard] = useState<boolean>(false);

  const token = useSelector(selectToken);
  const cart: any = useSelector(selectCartItems);
  const userId = useSelector(selectuserid);
  const dispatch = useDispatch();


  useEffect(() => {
    (async () => {
      try {
        const token: any = await AsyncStorage.getItem('token');
        const userId: any = await AsyncStorage.getItem('userId');
        dispatch(updateToken(token));
        dispatch(updateUserId(userId));
      } catch (err) {
        console.log(err);
      }
    })()
  }, [])


  

  console.log(token);

  const products = useSelector(selectProducts);

  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!token ? (
          <>

            <Stack.Screen
              name="Onboarding"
              component={StackOnboard}
              options={{ headerShown: false }}
            />

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
                        <FontAwesome name="home" size={24} color={color} />
                      ),
                    }}
                    listeners={({ navigation }) => ({
                      tabPress: () => {
                        navigation.navigate("homeproduct", {
                          screen: "product",
                        });
                        navigation.reset({
                          index: 0,
                          routes: [{ name: "homeproduct" }],
                        });
                      },
                    })}
                  />

                  <Tab.Screen
                    name="Cart"
                    component={StackCart}
                    initialParams={products}
                    options={{
                      headerShown: false,
                      tabBarIcon: ({ color, size }) => (
                        <Icon name="shopping-cart" color={color} size={size} />
                      ),
                      tabBarLabel: ({ color }) => (
                        <View style={styles.tabBarLabel}>
                          <Text style={{ color }}>Cart</Text>
                          {cart.items && cart.items.length > 0 && (
                            <View style={styles.itemCountContainer}>
                              <Text style={styles.itemCountText}>
                                {cart.items.length}
                              </Text>
                            </View>
                          )}
                        </View>
                      ),
                    }}
                    listeners={({ navigation, route }) => ({
                      tabPress: () => {
                        navigation.navigate("Cart");
                      },
                    })}
                  />

                  <Tab.Screen
                    name="History"
                    component={StackHistory}
                    initialParams={products}
                    options={{
                      headerShown: false,
                      tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="history" size={24} color="black" />
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

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 17,
  },
  tabBarLabel: {
    alignItems: "center",
  },
  itemCountContainer: {
    backgroundColor: "red",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    position: "absolute",
    top: -30,
    right: -15,
  },
  itemCountText: {
    color: "white",
    fontSize: 12,
  },
});
