import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductScreen from "../features/product/ProductScreen";
import HomeScreen from "../screens/HomeScreen";
import ProducuDetailScreen from "../features/product/ProducuDetailScreen";

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
    </Stack.Navigator>
  );
};

export default StackProduct;

const styles = StyleSheet.create({});
