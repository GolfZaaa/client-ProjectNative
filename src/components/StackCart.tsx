import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductAsync,
  deleteProductAsync,
  deleteProductAsyncAll,
  getCartAsync,
  selectCartItems,
  updateCart,
} from "../features/cart/cartSlice";
import { AnyAction } from "@reduxjs/toolkit";
import {
  GetAddressUser,
  anonymousUser,
  selectToken,
  selectstreet,
  selectuserid,
  updateToken,
  updateUserId,
} from "../features/account/accountSlice";
import { Entypo } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { CreateOrderUser } from "../features/order/orderSlice";
import Lottie from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TwoOptionModalAlert from "../features/component/TwoOptionModalAlert";

const { width, height } = Dimensions.get("window");

const StackCart = ({ navigation, route, item }: any) => {
  const dispatch = useDispatch();
  const userId = useSelector(selectuserid);
  const cart: any = useSelector(selectCartItems);
  const token = useSelector(selectToken);
  const addressuser:any = useSelector(selectstreet);

  const [isModalVisible, setModalVisible] = useState(false);

  console.log("🤷‍♀️", addressuser.statusCode);
  console.log("😜", cart.items);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          dispatch(getCartAsync({ userId }) as unknown as AnyAction),
          dispatch(GetAddressUser({ userId }) as unknown as AnyAction),
        ]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [userId]);

  const CreateOrder = async (id: any) => {
    await dispatch(CreateOrderUser({ userId }) as any);
    await dispatch(updateCart(null));
  };

  const handleAddress = async (id: any) => {
    navigation.navigate("createaddress");
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleConfirm = () => {
    // ทำงานเมื่อกด Confirm
    console.log("Confirmed");
    toggleModal();
  };

  const handleCancel = () => {
    // ทำงานเมื่อกด Cancel
    console.log("Cancelled");
    toggleModal();
  };

  const handleLogout = async () => {
    if (token !== "") {
      try {
        await AsyncStorage.multiRemove(["token", "userId", "anonymous,username"]);
        dispatch(updateToken(null));
        dispatch(anonymousUser(false));
        dispatch(updateUserId(null));
      } catch (error) {
        console.log("Error removing token:", error);
      }
    }
  };

  const Test = ({ item, i, dispatch }: any) => {
    const deleteProduct = async (id: any) => {
      dispatch(
        deleteProductAsync({
          userId,
          amount: 1,
          productId: id,
        }) as any
      );
      await dispatch(getCartAsync({ userId }));
    };

    const AddProduct = async (id: any) => {
      await dispatch(
        addProductAsync({ userId, amount: 1, productId: id }) as any
      );
      await dispatch(getCartAsync({ userId }));
    };

    const DeleteProductAll = async (id: any) => {
      await dispatch(deleteProductAsyncAll({ userId, productId: id }) as any);
      await dispatch(getCartAsync({ userId }));
    };

    return (
      <>
        {token && (
          <View key={i} style={styles.cartCrad}>
            <Image
              style={{
                width: 80,
                height: 80,
                borderRadius: 20,
              }}
              source={{
                uri: item.product.imageUrls[0],
              }}
            />
            <View
              style={{
                height: 100,
                marginLeft: 10,
                paddingVertical: 20,
                flex: 1,
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                {item.product.name}
              </Text>
              <Text style={{ fontSize: 13, color: "gray" }}>
                Type : {item.product.type}
              </Text>
              <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                ${item.product.price}
              </Text>
            </View>

            <View>
              <Text
                style={{
                  left: 40,
                  bottom: -10,
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                {item.amount}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={styles.actionBtn}
                  onPress={() => AddProduct(item.product.id)}
                >
                  <Entypo name="plus" size={23} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionBtn}
                  onPress={() => deleteProduct(item.product.id)}
                >
                  <Fontisto name="minus-a" size={21} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ position: "relative", bottom: 35 }}
                  onPress={() => DeleteProductAll(item.product.id)}
                >
                  <AntDesign name="delete" size={24} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </>
    );
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={28}
          color="black"
          style={{ marginRight: 5 }}
        />
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Cart</Text>
      </View>

      <View>
        {cart.items !== null && cart.items !== undefined && (
          <>
            {cart.items.map((item: any, i: any) => (
              <>
                <Test key={item.product.id} item={item} dispatch={dispatch} />
              </>
            ))}
          </>
        )}
      </View>

      {!!token ? (
        <View>
          {!!cart.items && cart.items.length > 0 ? (
            <View style={styles.cartCradTotal}>
              <Text style={{ fontSize: 20, fontWeight: "600", marginLeft: 10 }}>
                Total Price
              </Text>
              <View style={{ flex: 1, justifyContent: "flex-end" }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "600",
                    textAlign: "right",
                    right: 10,
                  }}
                >
                  ${cart.totalPrice}
                </Text>
              </View>

              {addressuser.statusCode === 400 ? (
                <View style={{ marginTop: 40,position:'absolute' }}>
                  <TouchableOpacity
                    style={{
                      width: 330,
                      backgroundColor: "#ff8f1f",
                      top:100,
                      height: 60,
                      borderRadius: 30,
                      alignItems: "center",
                      justifyContent: "center",
                      left:10
                    }}
                    onPress={toggleModal}
                  >
                    <Text style={{ color: "#fff", fontSize: 25, fontWeight: "600" }}>
                      Order
                    </Text>
                  </TouchableOpacity>

                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <TwoOptionModalAlert
                      isVisible={isModalVisible}
                      onClose={toggleModal}
                      message="Please add address to place an order."
                      onConfirm={handleAddress}
                      onCancel={handleCancel}
                    />
                  </View>
                </View>
              ) : (
                <View style={{position:'absolute',}}>
                  <TouchableOpacity
                    style={{
                      width: 330,
                      backgroundColor: "#ff8f1f",
                      marginBottom: -130,
                      height: 60,
                      borderRadius: 30,
                      alignItems: "center",
                      justifyContent: "center",
                      top:75,
                      left:10
                    }}
                    onPress={CreateOrder}
                  >
                    <Text
                      style={{ color: "#fff", fontSize: 25, fontWeight: "600" }}
                    >
                      Order
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ) : (
            <View>
              <View style={styles.lottie}>
                <Lottie
                  source={require("../../assets/icons/lottie/cartisemty.json")}
                  autoPlay
                  loop
                />
              </View>
              <Text style={{textAlign:'center',fontSize:40,fontWeight:'700',color:'gray'}}>Cart is Empty</Text>
            </View>
          )}

          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          ></View>
        </View>
      ) : (
        <View>
          <View style={styles.lottie}>
            <Lottie
              source={require("../../assets/icons/lottie/animation_lke8lpsr.json")}
              autoPlay
              loop
            />
          </View>
          <TouchableOpacity
            style={{
              width: 330,
              backgroundColor: "#1a57ff",
              marginBottom: 20,
              height: 60,
              marginTop: 30,
              borderRadius: 10,
              alignItems: "center",
              left: 30,
            }}
            onPress={handleLogout}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 25,
                fontWeight: "600",
                top: 15,
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default StackCart;

const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 10,
  },
  cartCradTotal: {
    height: 60,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: "white",
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  cartCrad: {
    height: 100,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: "white",
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  actionBtn: {
    width: 40,
    height: 25,
    backgroundColor: "orange",
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    position: "relative",
    left: -10,
    top: 10,
    marginLeft: 10,
  },
  lottie: {
    width: width * 0.9,
    height: width,
    left: 20,
  },
});
