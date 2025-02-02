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
import { CreateOrderUser, GetOrderUser, selectorder } from "../order/orderSlice";
import { GetAddressUser, selectuserid, selectusername } from "../account/accountSlice";
import Lottie from "lottie-react-native";
import { AnyAction } from "@reduxjs/toolkit";
import { initPaymentSheet, presentPaymentSheet } from "@stripe/stripe-react-native";

const OrderScreen = ({navigation}:any) => {
  const dispatch = useDispatch();
  const userId = useSelector(selectuserid);
  const cart: any = useSelector(selectCartItems);
  const order = useSelector(selectorder);
  const username = useSelector(selectusername);
  // order.length - 1 คือไปที่ array ลำดับสุดท้าย 
  
  //ส่วนนี้จะใช้ไม่ได้ เพราะ ถ้า เมื่อ database ยังไม่มีข้อมูลจะหาตัวสุดท้ายไม่เจอจะขึ้น clientSecret' undefined ซึ่งจะ Error Start
  // ต้องให้ถ้ามีข้อมูลให้ order.length - 1 แต่ถ้าไม่มีให้เป็น null ถึงจะไม่ Error
  // const latestOrder =  order[order.length - 1] ;
  // const latestClientSecret =  latestOrder.clientSecret ;
  //ส่วนนี้จะใช้ไม่ได้ เพราะ ถ้า เมื่อ database ยังไม่มีข้อมูลจะหาตัวสุดท้ายไม่เจอจะขึ้น clientSecret' undefined End


  console.log("order",order)
  // const latestOrder = order.length > 0 ? order[order.length - 1] : null;
  // const latestClientSecret = latestOrder ? latestOrder.clientSecret : null;

  // const latestOrder = order.length > 0 ? order[order.length - 1] : {};
  // const latestClientSecret = latestOrder.clientSecret || null;
  
  // console.log("ClientSecret", latestOrder);
  // console.log("latestClientSecret", latestClientSecret);
  
  const [showModal, setShowModal] = useState(false);

  const CreateOrder = async (id: any) => {
    const check = await dispatch(CreateOrderUser({ userId }) as any);
    await dispatch(updateCart(null));
    console.log("check",check.payload.clientSecret)
    handleConfirmPayment(check.payload.clientSecret);
  };
 
  const handleConfirmPayment = async (clientSecret:any) => {
    try {
      const { error } = await initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: "Admin", 
        defaultBillingDetails : {
          name: "Test",
        }
      });

      const { paymentOption } = await presentPaymentSheet();

      if (error) {
        console.error("Payment confirmation failed:", error.message);
        // Handle the payment error here
      } else {
        // Payment is successful, update the order status as "success"
        console.log("Payment successful. Payment Method ID:", paymentOption);
        navigation.navigate("homeproduct" as never);
        setShowModal(true);
      }
    } catch (e: any) {
      console.error("Payment confirmation failed:", e.message);
      // Handle the payment error here
    }
  };
  
  // trips Started
  // ส่วนนี้จะเป็นการใช้ useEffect ในการเปลี่ยนค่าของ order โดยจะใช้ค่า showModal(false) ที่มีค่าตั้งต้นเป็น false ในการรี 
  // เมื่อ useEffect มีการ if ถ้ามี showModal จะนำค่า fetchData มาใช้ โดยข้างในจะมี setShowModal(true);
  // ซึ่งจะเป็นการเปลี่ยนค่า เพื่อทำการรี order ที่ทำการ dispatch มานั้นเอง

  useEffect(() => {
    if (showModal) {
      fetchData();
    }
  }, [showModal]);

  const fetchData = async () => {
    try {
      await dispatch(GetOrderUser({ username: username }) as any);
      setShowModal(true); 
    } catch (error) {
      console.log(error);
    }
  };

  // trips End

  
  console.log("cart",cart);
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
