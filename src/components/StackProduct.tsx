import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductScreen from "../features/product/ProductScreen";
import HomeScreen from "../screens/HomeScreen";
import ProducuDetailScreen from "../features/product/ProducuDetailScreen";
import SettingUser from "../features/account/SettingUser";
import Address from "../features/account/address";
import OrderScreen from "../features/checkout/OrderScreen";
import ForgotPasswordScreen from "../features/account/ForgotPasswordScreen";
import SettingScreen from "../features/account/EditSettingUserScreen";
import ConfirmyourOrder from "../features/order/ConfirmyourOrder";
import WriteReviewScreen from "../features/review/WriteReviewScreen";
import MyOrdersScreen from "../features/order/MyOrdersScreen";
import CheckOutFailScreen from "../features/checkout/CheckOutFailScreen";
import CheckOutSuccessScreen from "../features/checkout/CheckOutSuccessScreen";
import EditAddressScreen from "../features/account/EditAddressScreen";

const Stack = createNativeStackNavigator();

const StackProduct = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="product"
        component={ProductScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="productDetail"
        component={ProducuDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="setting"
        component={SettingUser}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="orders"
        component={OrderScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="createaddress"
        component={Address}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="EditAddressScreen"
        component={EditAddressScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ConfirmyourOrder"
        component={ConfirmyourOrder}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="WriteReviewScreen"
        component={WriteReviewScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MyOrder"
        component={MyOrdersScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CheckOutFailScreen"
        component={CheckOutFailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CheckOutSuccessScreen"
        component={CheckOutSuccessScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StackProduct;

const styles = StyleSheet.create({});
