import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  TextInput,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  selectEmail,
  selectstreet,
  selectuserid,
  selectusername,
} from "../account/accountSlice";
import { AnyAction } from "@reduxjs/toolkit";
import { getCartAsync, selectCartItems, updateCart } from "../cart/cartSlice";
import { Fontisto } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import RadioInputCreditCard from "../component/RadioInputCreditCard";
import * as ImagePicker from "expo-image-picker";
import { CreateOrderUser, GetOrderUser, UpdateOrderStatus, selectOrderImage } from "./orderSlice";
import {
  initPaymentSheet,
  presentPaymentSheet,
} from "@stripe/stripe-react-native";
import * as FileSystem from "expo-file-system";
import { LinearGradient } from "expo-linear-gradient";
import agent, { UrlFolderOrderImage } from "../api/agent";
const ConfirmyourOrder = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const username = useSelector(selectusername);
  const addressuser: any = useSelector(selectstreet);
  const userId = useSelector(selectuserid);
  const cart: any = useSelector(selectCartItems);
  const orderImage: any = useSelector(selectOrderImage);
  const UrlImage = agent.UrlFolderOrderImage;
  const email = useSelector(selectEmail);

  const [selectedMethod, setSelectedMethod] = useState(1);
  const [imageUri, setImageUri]: any = useState(null);
  const [showModal, setShowModal] = useState(false);

  console.log('showModal',showModal)

  const [PaymentMethod, setPaymentMethod] = useState(0);

  console.log("selectedMethod", showModal);

  console.log("cart", cart);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access media library is required!");
      return;
    }

    const result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.cancelled) {
      let fileInfo = await FileSystem.getInfoAsync(result.assets[0].uri);
      let fileUri = fileInfo.uri;
      let fileName = fileUri.split("/").pop();
      let fileType = "image/jpeg";

      setImageUri({
        uri: fileUri,
        name: fileName,
        type: fileType,
      });
    }

    console.log("result", result);
  };

  const CreateOrder = async (clientSecret: any) => {
    try {
      const check = await dispatch(
        CreateOrderUser({
          userId,
          PaymentMethod: selectedMethod,
          orderImage: imageUri,
        }) as any
      );
      handleConfirmPayment(check.payload.clientSecret);
    await dispatch(updateCart(null));
      console.log(check.meta.arg.PaymentMethod)
      if(check.meta.arg.PaymentMethod === 0)
      {
    navigation.navigate("CheckOutSuccessScreen");
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };



  console.log(imageUri);

  const handleConfirmPayment = async (clientSecret: any) => {
    try {
      const { paymentOption } = await initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: "Admin",
        defaultBillingDetails: {
          name: "Test",
        },
      });

      const { error } = await presentPaymentSheet();

      if (error) {
        console.log("Payment confirmation failed:", error.message);
        navigation.navigate("CheckOutFailScreen")
      } else {
        console.log("Payment successful. Payment Method ID:", paymentOption);
        setShowModal(false);
        navigation.navigate("CheckOutSuccessScreen")
      }
    } catch (e: any) {
      console.error("Payment confirmation failed:", e.message);
    }
  };

  // trips Started
  // ส่วนนี้จะเป็นการใช้ useEffect ในการเปลี่ยนค่าของ order โดยจะใช้ค่า showModal(false) ที่มีค่าตั้งต้นเป็น false ในการรี
  // เมื่อ useEffect มีการ if ถ้ามี showModal จะนำค่า fetchData มาใช้ โดยข้างในจะมี setShowModal(true);
  // ซึ่งจะเป็นการเปลี่ยนค่า เพื่อทำการรี order ที่ทำการ dispatch มานั้นเอง

  useEffect(() => {
    if (!showModal) {
      fetchData();
    }
  }, [showModal]);

  const fetchData = async () => {
    try {
      await dispatch(GetOrderUser({ username: username }) as any);
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          dispatch(getCartAsync({ userId }) as unknown as AnyAction),
        ]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [userId]);

  const handleMethodSelect = (method: any) => {
    setSelectedMethod(method);
  };

  const handleMethodSelectImage = (method: any) => {
    setSelectedMethod(method);
    pickImage();
  };

  const Test = ({ item, i, dispatch }: any) => {

    const productName = item.product.name;
    const maxLength = 26;

    let trimmedName = productName;
    if (productName.length > maxLength) {
      trimmedName = productName.substring(0, maxLength - 3) + "...";
    }

    return (
      <View
        key={i}
        style={{ paddingLeft: 25, paddingTop: 15, paddingRight: 20 }}
      >
        <View style={{ flexDirection: "row" }}>
          <Image
            style={{
              width: 120,
              height: 120,
              borderRadius: 10,
            }}
            source={{
              uri: UrlFolderOrderImage + item.product.image,
            }}
          />

          <View
            style={{
              flex: 1,
              marginLeft: 15,
              flexDirection: "column",
            }}
          >
            <Text
              style={{
                fontSize: 13,
                color: "gray",
                fontWeight: "500",
                marginBottom: 3,
              }}
            >
              {item.product.type}
            </Text>

            <Text style={{ fontWeight: "400", fontSize: 16 }}>
              {trimmedName}
            </Text>

            <View
              style={{
                borderWidth: 0.2,
                borderColor: "#e0e0e0",
                width: 210,
                marginTop: 5,
                marginBottom: 5,
              }}
            ></View>

            <Text
              style={{
                fontWeight: "400",
                fontSize: 13,
                color: "gray",
                marginBottom: 2,
              }}
            >
              Calorie
            </Text>
            <Text style={{ fontWeight: "400", fontSize: 13, color: "gray" }}>
              Quantity
            </Text>
          </View>

          <View>
            <Text style={{ fontSize: 17, fontWeight: "600" }}>
              ${item.product.price}
            </Text>

            <Text
              style={{
                fontSize: 13,
                fontWeight: "400",
                paddingTop: 32,
                paddingLeft: 13,
                color: "#919191",
              }}
            >
              {item.product.calorie}
            </Text>

            <Text
              style={{
                fontSize: 13,
                fontWeight: "400",
                color: "#919191",
                left: 28,
              }}
            >
              {item.amount}
            </Text>
          </View>
        </View>
        <View
          style={{
            borderWidth: 0.2,
            borderColor: "#e0e0e0",
            width: 345,
            marginTop: 20,
          }}
        ></View>
      </View>
    );
  };

  return (
    <View>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.bottomLinetop}></View>
          <View style={styles.bottomLinebot}></View>

          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="arrow-back"
                size={28}
                color="black"
                style={{ paddingLeft: 20 }}
              />
            </TouchableOpacity>
            <Text
              style={{
                flex: 1,
                fontSize: 20,
                fontWeight: "600",
                textAlign: "center",
                right: 15,
              }}
            >
              Confirm Your Order
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: 20,
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: 20,
                height: 20,
                backgroundColor: "#b1b1b1",
                borderRadius: 25,
              }}
            >
              <Text style={{ color: "white", fontSize: 13 }}>1</Text>
            </View>
            <Text
              style={{
                fontSize: 15,
                marginLeft: 5,
                fontWeight: "400",
                color: "#b3b3b3",
              }}
            >
              Set Address
            </Text>
            <AntDesign
              name="right"
              size={18}
              style={{ paddingLeft: 10, paddingRight: 10 }}
              color="#d3d3d3"
            />

            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: 20,
                height: 20,
                backgroundColor: "#a500b4",
                borderRadius: 25,
              }}
            >
              <Text style={{ color: "white", fontSize: 13 }}>2</Text>
            </View>
            <Text style={{ fontSize: 15, marginLeft: 5, fontWeight: "500" }}>
              Confirm Order
            </Text>
          </View>

          {/* Address Start */}

          <TouchableOpacity style={{ marginBottom: 20 }}>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  paddingTop: 15,
                  paddingLeft: 45,
                }}
              >
                <Ionicons name="location-outline" size={24} color="#c807da" />
                <View style={{ flexDirection: "row", paddingLeft: 10 }}>
                  <Text style={{ fontWeight: "400", fontSize: 18 }}>
                    {username}{" "}
                  </Text>
                  <Text style={{ fontSize: 18, color: "gray", paddingLeft: 10 }}>
                {email.length > 10 ? email.substring(0, 19) + "..." : email}
              </Text>

                </View>
              </View>
              <View
                style={{ flexDirection: "row", paddingTop: 5, paddingLeft: 70 }}
              >
                <View style={{ flexDirection: "row", paddingLeft: 10 }}>
                  <Text style={{ fontWeight: "400", fontSize: 18 }}>
                    {addressuser.value.subDistrict},{" "}
                    {addressuser.value.district},{" "}
                  </Text>
                  <AntDesign
                    name="right"
                    size={27}
                    style={{
                      position: "absolute",
                      paddingLeft: 270,
                      bottom: 3,
                    }}
                    color="#cfcfcf"
                  />
                </View>
              </View>
              <View
                style={{ flexDirection: "row", paddingTop: 5, paddingLeft: 70 }}
              >
                <View style={{ flexDirection: "row", paddingLeft: 10 }}>
                  <Text style={{ fontWeight: "400", fontSize: 18 }}>
                    {addressuser.value.province}, {addressuser.value.postalCode}{" "}
                    ประเทศไทย{" "}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          {/* Address End */}

          <View
            style={{ width: "100%", backgroundColor: "#f3f3f3", height: 8 }}
          >
            <Text style={{ color: "rgba(0, 0, 0, 0)" }}>wewe</Text>
          </View>

          <View style={{ paddingLeft: 28, paddingTop: 20 }}>
            <Text style={{ fontSize: 17, fontWeight: "500" }}>Item Detail</Text>
          </View>
          <View>
            {cart.items !== null && cart.items !== undefined && (
              <>
                {cart.items.map((item: any, i: any) => (
                  <>
                    <Test
                      key={item.product.id}
                      item={item}
                      dispatch={dispatch}
                    />
                  </>
                ))}
              </>
            )}

            <View
              style={{
                marginTop: 20,
                marginBottom: 20,
                flexDirection: "row",
                justifyContent: "space-between",
                paddingLeft: 25,
                paddingRight: 25,
              }}
            >
              <Text
                style={{ color: "#919191", fontWeight: "500", fontSize: 16 }}
              >
                Subtotal
              </Text>
              <Text
                style={{ color: "#9504d8", fontWeight: "900", fontSize: 16 }}
              >
                {" "}
                ${cart.totalPrice}
              </Text>
            </View>
            {/* เส้นใหญ่  Start*/}
            <View
              style={{ width: "100%", backgroundColor: "#f3f3f3", height: 8 }}
            >
              <Text style={{ color: "rgba(0, 0, 0, 0)" }}>wewe</Text>
            </View>
            {/* เส้นใหญ่  End*/}

            {/* Payment Methods Start  */}
            <View style={{ paddingLeft: 25, paddingTop: 20, marginBottom: 20 }}>
              <Text
                style={{ fontSize: 17, fontWeight: "600", marginBottom: 10 }}
              >
                Payment Methods
              </Text>

              {/* Pay in full with Start */}
              <View>
                <TouchableWithoutFeedback onPress={() => handleMethodSelect(1)}>
                  <View
                    style={{
                      paddingLeft: 10,
                      flexDirection: "row",
                      marginBottom: 10,
                    }}
                  >
                    {/* Assuming RadioInputCreditCard component is used here */}
                    <RadioInputCreditCard
                      selected={selectedMethod === 1}
                      onSelect={() => handleMethodSelect(1)}
                    />
                    <Text
                      style={{
                        fontSize: 16,
                        color: "#9b9b9b",
                        fontWeight: "400",
                      }}
                    >
                      Pay in full with
                    </Text>
                  </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => handleMethodSelect(1)}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      width: "85%",
                      backgroundColor: "#f8f8f8",
                      height: 65,
                      borderRadius: 5,
                      left: 30,
                      paddingLeft: 20,
                    }}
                  >
                    <AntDesign name="creditcard" size={24} color="black" />
                    <View style={{ flex: 1, paddingLeft: 20 }}>
                      <View>
                        <Text style={{ fontWeight: "600", fontSize: 16 }}>
                          Credit/Debit Card
                        </Text>
                      </View>
                      <Text style={{ fontSize: 15, color: "gray" }}>
                        VISA ending in 6633
                      </Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </View>

              {/* Pay in full with End */}

              {/* เส้นเล็ก Start */}
              <View
                style={{
                  borderWidth: 0.2,
                  borderColor: "#e0e0e0",
                  width: 345,
                  marginTop: 20,
                  marginBottom: 20,
                }}
              ></View>
              {/* เส้นเล็ก End */}

              {/* TransferPayment Start */}
              <View>
                <TouchableWithoutFeedback onPress={() => handleMethodSelect(0)}>
                  <View
                    style={{
                      paddingLeft: 10,
                      flexDirection: "row",
                      marginBottom: 10,
                    }}
                  >
                    <RadioInputCreditCard
                      selected={selectedMethod === 0}
                      onSelect={() => handleMethodSelect(0)}
                    />
                    <Text
                      style={{
                        fontSize: 16,
                        color: "#9b9b9b",
                        fontWeight: "400",
                      }}
                    >
                      Pay in Transfer Payment
                    </Text>
                  </View>
                </TouchableWithoutFeedback>

                {selectedMethod === 0 && (
                  <>
                    <TouchableWithoutFeedback
                      onPress={() => handleMethodSelectImage(0)}
                    >
                      <View style={{ paddingLeft: 35 }}>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            width: "93%",
                            backgroundColor: "#f8f8f8",
                            height: 65,
                            borderRadius: 5,
                            paddingLeft: 20,
                            marginBottom: 10,
                          }}
                        >
                          <AntDesign name="file1" size={24} color="black" />
                          <View style={{ flex: 1, paddingLeft: 20 }}>
                            <View>
                              <Text style={{ fontWeight: "600", fontSize: 16 }}>
                                Upload Receipt
                              </Text>
                            </View>
                            <Text style={{ fontSize: 15, color: "gray" }}>
                              Click to upload a receipt image
                            </Text>
                          </View>
                        </View>
                      </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback
                      onPress={() => handleMethodSelectImage(0)}
                    >
                      <View>
                        <TouchableOpacity onPress={pickImage}>
                          <View
                            style={{
                              flex: 1,
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {imageUri && (
                              <Image
                                source={{ uri: imageUri.uri }}
                                style={{
                                  width: 200,
                                  height: 200,
                                  marginBottom: 20,
                                }}
                              />
                            )}
                          </View>
                        </TouchableOpacity>
                      </View>
                    </TouchableWithoutFeedback>
                  </>
                )}
              </View>

              {/* TransferPayment End */}
            </View>

            {/* Payment Methods End  */}
          </View>

          {/* เส้นใหญ่ */}

          <View
            style={{ width: "100%", backgroundColor: "#f3f3f3", height: 8 }}
          >
            <Text style={{ color: "rgba(0, 0, 0, 0)" }}>wewe</Text>
          </View>

  

          <TouchableOpacity
            style={{
              width: "90%",
              height: 50,
              marginLeft: 20,
              marginTop:40,
              marginBottom:40
            }}
            onPress={CreateOrder}
          >
            <LinearGradient
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 15,
              }}
              colors={["#c109c7", "#ff00bf"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={{ fontSize: 20, fontWeight: "700", color: "#fff" }}>
                Submit Order (${cart.totalPrice})
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ConfirmyourOrder;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    paddingTop: 30,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    marginBottom: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  bottomLinetop: {
    borderWidth: 0.2,
    width: 400,
    position: "absolute",
    top: 75,
    borderColor: "#e2e2e2",
  },
  bottomLinebot: {
    borderWidth: 0.2,
    width: 400,
    position: "absolute",
    top: 125,
    borderColor: "#e2e2e2",
  },
  inputContainer: {},
  disabledInput: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 15,
    backgroundColor: "#f2f2f2",
  },
  disabledInputPostalCode: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    backgroundColor: "#f2f2f2",
    width: 90,
    height: 50,
  },
  placeholderTextPostalCode: {
    fontSize: 18,
    color: "gray",
    fontWeight: "400",
    textAlign: "center",
  },
  placeholderText: {
    fontSize: 18,
    color: "gray",
    fontWeight: "400",
  },
  PickerDropdown: {
    fontSize: 18,
    color: "gray",
    fontWeight: "400",
    textAlign: "center",
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
    borderRadius: 10,
    backgroundColor: "white",
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
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
  image: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
  },
  placeholder: {
    width: 200,
    height: 200,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  input: {
    marginTop: 10,
    width: 200,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
});
