import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Entypo } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { AddReviewUser } from "./reviewSlice";
import { selectuserid } from "../account/accountSlice";
import { LinearGradient } from "expo-linear-gradient";
import { fetchProductAsync } from "../product/productSlice";
import { AnyAction } from "@reduxjs/toolkit";
import agent from "../api/agent";

const WriteReviewScreen = ({ route, navigation }: any) => {
  const { productId, OrderId } = route.params;
  console.log("productId", productId);
  const dispatch = useDispatch();

  const [rating, setRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState("");
  const [imageReviews, setImageReviews]: any[] = useState([]);
  const userId = useSelector(selectuserid);
  const UrlImage = agent.UrlFolderOrderImage;

  console.log("imageReviews", imageReviews);

  const handleRating = (value: number) => {
    setRating(value);
  };

  const handleReviewText = (text: string) => {
    setReviewText(text);
  };

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
      const fileInfo = await FileSystem.getInfoAsync(result.uri);
      let fileUri = fileInfo.uri;
      let fileName = fileUri.split("/").pop();
      let fileType = "image/jpeg";

      const newImageReview = {
        uri: fileUri,
        name: fileName,
        type: fileType,
      };

      setImageReviews((prevImageReviews: any) => [
        ...prevImageReviews,
        newImageReview,
      ]);
    }

    console.log("result", result);
  };

  const AddReview = async () => {
    if (rating === 0 || reviewText.trim() === '') {
      alert("Please provide a rating, review text before submitting.");
      return;
    }
    try {
      const check = await dispatch(
        AddReviewUser({
          userId,
          ProductId: productId.id,
          Texts: reviewText,
          Star: rating,
          FormFiles: imageReviews,
          OrderItemId: OrderId,
        }) as any
      );
      await dispatch(fetchProductAsync() as unknown as AnyAction);
      navigation.navigate("product");
      console.log("check", check);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  console.log("reviewText", reviewText);

  console.log("rating", rating);

  return (
    <View style={styles.container}>
      <ScrollView>
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
            Write Reivew
          </Text>
        </View>
        {/* เส้นเล็ก Start */}
        <View
          style={{
            borderWidth: 0.2,
            borderColor: "#e0e0e0",
            width: "100%",
            right: 10,
            bottom: 15,
          }}
        ></View>
        {/* เส้นเล็ก End */}

        <View
          style={{
            position: "relative",
            paddingLeft: 25,
            flexDirection: "row",
          }}
        >
          <Image
            style={{
              width: "25%",
              height: 80,
              borderRadius: 10,
            }}
            source={{ uri: UrlImage + productId.image }}
          />

          {/* <Image
                      key={index}
                      source={{ uri: UrlImage + item.product.image }}
                      style={{
                        width: 100,
                        height: 100,
                        marginTop: 20,
                        resizeMode: "contain",
                        borderWidth: 0.3,
                        borderColor: "#a3a3a3",
                      }}
                    /> */}

          <View style={{ flex: 1, paddingLeft: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>
              {productId.name.length > 30
                ? productId.name.substring(0, 30) +
                  "\n" +
                  productId.name.substring(30)
                : productId.name}
            </Text>
            <Text
              style={{
                paddingTop: 8,
                fontSize: 17,
                fontWeight: "500",
                color: "gray",
              }}
            >
              Type {productId.type}
            </Text>
          </View>
        </View>

        {/* ส่วนของการให้คะแนนดาว */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: 25,
            paddingTop: 15,
          }}
        >
          {/* Icon Star Start */}

          <View style={{ flexDirection: "row" }}>
            {[1, 2, 3, 4, 5].map((value) => (
              <TouchableOpacity key={value} onPress={() => handleRating(value)}>
                {/* Icon ที่ต้องใช้ ! หลัง rating เพราะจะขึ้น Error rating' is possibly 'null' มันแจ้งว่า... */}
                {/* rating อาจจะเป็น null ถ้าเราคิดว่า rating มีค่า และ ไม่เป็น null ให้ใช้ ! เพื่อบอกมันว่าจะไม่เป็น null แน่นอน*/}
                <Ionicons
                  name={rating! >= value ? "star" : "star-outline"}
                  size={40}
                  color={rating! >= value ? "#FFD700" : "gray"}
                  style={{ marginRight: 20 }}
                />
              </TouchableOpacity>
            ))}
          </View>
          {/* Icon Star End */}
        </View>

        {/* Like and Dislike Start */}
        <View style={{ flexDirection: "row", paddingLeft: 20, paddingTop: 10 }}>
          <Text style={{ fontSize: 15, color: "gray", paddingLeft: 5 }}>
            Dislike
          </Text>
          <Text style={{ fontSize: 15, color: "gray", paddingLeft: 203 }}>
            Like
          </Text>
        </View>
        {/* Like and Dislike End */}

        <View style={{ paddingHorizontal: 25, marginTop: 20 }}>
          <TextInput
            multiline
            numberOfLines={4}
            placeholder="What's your product experience after using it?"
            style={{
              borderWidth: 1,
              borderColor: "#e0e0e0",
              borderRadius: 10,
              padding: 10,
              textAlignVertical: "top",
              height: 150,
            }}
            value={reviewText}
            onChangeText={handleReviewText} //
          />

          {imageReviews.length === 0 ? (
            <TouchableOpacity onPress={pickImage}>
              <View
                style={{
                  marginTop: 20,
                  width: 90,
                  backgroundColor: "#f1f1f1",
                  height: 100,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: "gray",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  borderStyle: "dashed",
                }}
              >
                <Entypo name="camera" size={26} color="gray" />
                <Text>Upload</Text>
                <Text>Photos</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View
              style={{ marginTop: 20, flexDirection: "row", flexWrap: "wrap" }}
            >
              {imageReviews.map((image: any, index: any) => (
                <Image
                  key={index}
                  source={{ uri: image.uri }}
                  style={{
                    width: 90,
                    height: 100,
                    borderRadius: 10,
                    marginRight: 10,
                    marginBottom: 10,
                  }}
                />
              ))}
              <TouchableOpacity onPress={pickImage}>
                <View
                  style={{
                    width: 90,
                    height: 100,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: "gray",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 10,
                    borderStyle: "dashed",
                  }}
                >
                  <Entypo name="camera" size={26} color="gray" />
                  <Text>Upload</Text>
                  <Text>Photos</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity
            style={{
              marginTop: 20,
              width: "100%",
              height: 40,
              borderRadius: 30,
            }}
            onPress={AddReview}
          >
            <LinearGradient
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 30,
              }}
              colors={["orange", "#ff4322"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={{ fontSize: 17, fontWeight: "400", color: "#fff" }}>
                Confirm
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default WriteReviewScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    paddingTop: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
});
