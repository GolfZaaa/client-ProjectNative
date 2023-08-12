import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems, updateCart } from "../cart/cartSlice";
import { CreateOrderUser, selectorder } from "../order/orderSlice";
import { GetAddressUser, selectuserid } from "../account/accountSlice";
import Lottie from "lottie-react-native";
import { AnyAction } from "@reduxjs/toolkit";
import { initPaymentSheet, presentPaymentSheet } from "@stripe/stripe-react-native";

const OrderScreen = ({navigation}:any) => {
  const dispatch = useDispatch();
  const userId = useSelector(selectuserid);
  const cart: any = useSelector(selectCartItems);
  const order = useSelector(selectorder);
  // order.length - 1 คือไปที่ array ลำดับสุดท้าย 
  const latestOrder =  order[order.length - 1] ;
  const latestClientSecret =  latestOrder.clientSecret ;
  console.log("ClientSecret", order[0]);
  console.log("latestClientSecret", latestClientSecret);
  
  const [showModal, setShowModal] = useState(false);

  const CreateOrder = async (id: any) => {
    await dispatch(CreateOrderUser({ userId }) as any);
    await dispatch(updateCart(null));
    // await dispatch(GetAddressUser({ userId }) as unknown as AnyAction)
    // Alert.alert('I goof', 'My Alert Msg', [
    //   {
    //     text: 'Cancel',
    //     onPress: () => console.log('Cancel Pressed'),
    //     style: 'cancel',
    //   },
    //   {text: 'OK', onPress: () => handleConfirmPayment()},
    // ]);
    handleConfirmPayment();
  };
 
  const handleConfirmPayment = async () => {
    try {
      const { error } = await initPaymentSheet({
        paymentIntentClientSecret: latestClientSecret,
        merchantDisplayName: "Admin", 
      });

      const { paymentOption } = await presentPaymentSheet();

      if (error) {
        console.error("Payment confirmation failed:", error.message);
        // Handle the payment error here
      } else {
        // Payment is successful, update the order status as "success"
        console.log("Payment successful. Payment Method ID:", paymentOption);
        // Implement your code to update the order status as "success" here
        navigation.navigate("homeproduct" as never);
      }
    } catch (e: any) {
      console.error("Payment confirmation failed:", e.message);
      // Handle the payment error here
    }
  };
  
  console.log(cart);
  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <Text
        style={{
          fontSize: 22,
          fontWeight: "500",
          marginTop: 50,
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        Order details
      </Text>
      <View style={{ paddingLeft: 40 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "400",
            marginBottom: 20,
          }}
        >
          Food fee
        </Text>
        <View style={{ flexDirection: "row", marginBottom: 20 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "400",
              color: "gray",
            }}
          >
            Subtotal food fee(
            {cart.items && cart.items.length > 0 && (
              <Text>{cart.items.length}</Text>
            )}
            )
          </Text>
          <Text
            style={{
              paddingLeft: 85,
              fontSize: 18,
              fontWeight: "400",
              color: "gray",
            }}
          >
            ${cart.totalPrice}.00
          </Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 20, color: "#248f16", fontWeight: "500" }}>
            Total food fee
          </Text>
          <Text
            style={{
              paddingLeft: 148,
              fontSize: 18,
              fontWeight: "500",
              color: "#248f16",
              marginBottom: 20,
            }}
          >
            ${cart.totalPrice}
          </Text>
        </View>

        <View
          style={{
            height: 3,
            backgroundColor: "#f7f7f7",
            borderRadius: 2,
            borderWidth: 1,
            borderColor: "#f3f3f3",
            right: 20,
            marginBottom: 20,
          }}
        ></View>
        <Text style={{ fontSize: 18, marginBottom: 20 }}>Delivery</Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <Text style={{ fontSize: 18, color: "gray" }}>Delivery</Text>
          <Text style={{ fontSize: 18, right: 50, color: "gray" }}>$0</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <Text style={{ fontSize: 18, color: "red" }}>Coupon</Text>
          <Text style={{ fontSize: 18, right: 50, color: "red" }}>-$0</Text>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 18, color: "#248f16", marginBottom: 20 }}>
            Total delivery fee
          </Text>
          <Text style={{ fontSize: 18, right: 50, color: "#248f16" }}>$0</Text>
        </View>

        <View
          style={{
            height: 3,
            backgroundColor: "#f7f7f7",
            borderRadius: 2,
            borderWidth: 1,
            borderColor: "#f3f3f3",
            right: 20,
            marginBottom: 20,
          }}
        ></View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 20, color: "black", marginBottom: 30 }}>
            Total
          </Text>
          <Text
            style={{
              fontSize: 20,
              right: 50,
              color: "black",
              fontWeight: "500",
            }}
          >
            ${cart.totalPrice}
          </Text>
        </View>

        <TouchableOpacity
          style={{ paddingRight: 40, marginBottom: 20 }}
          onPress={CreateOrder}
        >
          <View
            style={{
              backgroundColor: "green",
              height: 50,
              borderRadius: 8,
              borderWidth: 1,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                textAlign: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "800",
                top: 10,
              }}
            >
              Ok, I See
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={{ paddingRight: 40 }}>
          <View style={{ height: 50, borderRadius: 8, borderWidth: 1 }}>
            <Text
              style={{
                fontSize: 20,
                textAlign: "center",
                justifyContent: "center",
                color: "black",
                fontWeight: "500",
                top: 10,
              }}
            >
              Price Policy
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {showModal && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // สี background ของ Modal
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 8,
              width: 300,
              height: 300,
            }}
          >
            <Text style={{ fontSize: 20, textAlign: "center", marginTop: 10 }}>
              Success
            </Text>
            <View style={{ alignItems: "center" }}>
              <Lottie
                source={require("../../../assets/icons/lottie/Successorder.json")}
                autoPlay
                // loop
                style={{ width: 200 }}
              />
            </View>
            <TouchableOpacity
              style={{ alignSelf: "center", marginTop: 10 }}
              onPress={() => {
                setShowModal(false);
                navigation.navigate("product");
              }}
            >
              <Text style={{ color: "blue", fontSize: 18 }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({});
