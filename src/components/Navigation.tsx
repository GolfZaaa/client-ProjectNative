import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import ProductScreen from "../features/product/ProductScreen";
import RegisterScreen from "../features/account/RegisterScreen";
import ProducuDetailScreen from "../features/product/ProducuDetailScreen";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAddressUser,
  GetDetailUserById,
  anonymousUser,
  removeaddress,
  selectEmail,
  selectPassword,
  selectToken,
  selectanonymous,
  selectstreet,
  selectuserid,
  selectusername,
  updateEmail,
  updatePassword,
  updateToken,
  updateUserId,
  updateusername,
} from "../features/account/accountSlice";
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
import { FontAwesome5 } from "@expo/vector-icons";
import Toast from "../features/component/AlertToast";
import StackOnboard from "./StackOnboard";
import StackHome from "./StackHome";
import checkoutscreen from "../features/checkout/checkoutscreen";
import address from "../features/account/address";
import Address from "../features/account/address";
import ForgotPasswordScreen from "../features/account/ForgotPasswordScreen";
import CheckyouEmailScreen from "../features/account/CheckyouEmailScreen";
import CreateNewPasswordScreen from "../features/account/CreateNewPasswordScreen";
import InPutOTPForgotPasswordScreen from "../features/account/ConfirmOTPForgotPasswordScreen";
import { GetOrderUser, selectorder } from "../features/order/orderSlice";
import StackSetting from "./StackSetting";
import SettingScreen from "../features/account/EditSettingUserScreen";
import AddNewAddressScreen from "../features/account/AddNewAddressScreen";
import EditAddressScreen from "../features/order/ConfirmyourOrder";
import ConfirmyourAddress from "../features/order/ConfirmyourOrder";
import ConfirmyourOrder from "../features/order/ConfirmyourOrder";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Navigation = () => {
  const dispatch = useDispatch();
  const [showOnboard, setShowOnboard] = useState<boolean>(false);

  const token = useSelector(selectToken);
  const anonymous = useSelector(selectanonymous);
  const cart: any = useSelector(selectCartItems);
  const userId = useSelector(selectuserid);
  const addresstest = useSelector(selectstreet);
  const username = useSelector(selectusername);
  const email = useSelector(selectEmail);
  const password = useSelector(selectPassword);
  const order = useSelector(selectorder);

  useEffect(() => {
    (async () => {
      try {
        const token: any = await AsyncStorage.getItem("token");
        const userId: any = await AsyncStorage.getItem("userId");
        const anonymoususer: any = await AsyncStorage.getItem("anonymous");
        const username: any = await AsyncStorage.getItem("username");
        const email: any = await AsyncStorage.getItem("email");

        await dispatch(updateToken(token));
        await dispatch(updateUserId(userId));
        await dispatch(anonymousUser(anonymoususer));
        await dispatch(updateusername(username));
        await dispatch(updateEmail(email));
      } catch (err) {}
    })();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          dispatch(getCartAsync({ userId }) as unknown as AnyAction),
          dispatch(GetAddressUser({ userId }) as unknown as AnyAction),
          dispatch(GetDetailUserById({ username: username }) as any),
          dispatch(GetOrderUser({ username: username }) as any),
        ]);
      } catch (err) {}
    };

    fetchData();
  }, [userId, username]);

  // console.log(username);
  // console.log(email);

  const products = useSelector(selectProducts);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!token && !anonymous ? (
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

            <Stack.Screen
              name="CreateNewPassword"
              component={CreateNewPasswordScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CheckyouEmail"
              component={CheckyouEmailScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="OptForgotPassword"
              component={InPutOTPForgotPasswordScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="forgotpassword"
              component={ForgotPasswordScreen}
              options={{ headerShown: false }}
            />

               
      
          </>
        ) : (
          <Stack.Screen name="homeproduct" options={{ headerShown: false }}>
            {() => (
              <Tab.Navigator>
                <Tab.Screen
                  name="Product"
                  component={StackProduct}
                  options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                      <FontAwesome name="home" size={24} color={color} />
                    ),
                    tabBarLabelStyle: {
                      fontSize: 14,
                    },
                  }}
                />

                {token && (
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
                          {token && (
                            <View>
                              {cart.items && cart.items.length > 0 && (
                                <View style={styles.itemCountContainer}>
                                  <Text style={styles.itemCountText}>
                                    {cart.items.length}
                                  </Text>
                                </View>
                              )}
                            </View>
                          )}
                        </View>
                      ),
                    }}
                  />
                )}

                <Tab.Screen
                  name="Setting"
                  component={StackSetting}
                  initialParams={products}
                  options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                      <FontAwesome5 name="cog" size={24} color={color} />
                    ),
                    tabBarLabelStyle: {
                      fontSize: 14,
                    },
                  }}
                />
              </Tab.Navigator>
            )}
          </Stack.Screen>
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
    paddingHorizontal: 5,
    paddingVertical: 1,
    position: "absolute",
    top: -50,
    right: -25,
  },
  itemCountText: {
    color: "white",
    fontSize: 12,
  },
});
