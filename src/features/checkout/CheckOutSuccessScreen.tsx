import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";
  import React from "react";
  import { Ionicons } from "@expo/vector-icons";
  import Lottie from "lottie-react-native";
  
  const { width, height } = Dimensions.get("window");
  
  const CheckOutSuccessScreen = ({ navigation }: any) => {
    return (
      <View style={{ paddingTop: 20, flex: 1, backgroundColor: "#fff" }}>
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
          ></Text>
        </View>
  
        <View style={styles.centeredContainer}>
          <View style={styles.lottie}>
            <Lottie
              source={require("../../../assets/icons/lottie/CheckoutSuccess.json")}
              autoPlay
              loop
            />
          </View>
          <View style={{ position: "relative", bottom: 80 }}>
            <Text style={{ fontSize: 22, fontWeight: "600" }}>Order Placed!</Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              bottom: 60,
            }}
          >
            <Text style={{ fontSize: 19, fontWeight: "400", color: "gray" }}>
              Your order has been successfully
            </Text>
            <Text style={{ fontSize: 19, fontWeight: "400", color: "gray" }}>
              processed and is on its way to you soon.
            </Text>
          </View>
  
          <TouchableOpacity onPress={() => {navigation.navigate("product")}} style={styles.button}>
            <Text style={styles.buttonText}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  export default CheckOutSuccessScreen;
  
  const styles = StyleSheet.create({
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 30,
    },
    lottie: {
      width: width * 0.6,
      height: 400,
    },
    centeredContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingBottom: 320,
    },
    button: {
      marginTop: 20,
      backgroundColor: "#fff",
      borderColor: "#2ac703",
      borderWidth: 2,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
      height: 50,
      width: 300,
    },
    buttonText: {
      color: "#00c721",
      fontSize: 18,
      fontWeight: "600",
    },
  });
  