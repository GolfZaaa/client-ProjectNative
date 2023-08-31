import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
  Modal,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts, selectProductsReview } from "./productSlice";
import { Ionicons } from "@expo/vector-icons";
import { selectuserid, selectusername } from "../account/accountSlice";
import {
  addProductAsync,
  getCartAsync,
  selectCartItems,
} from "../cart/cartSlice";
import { AnyAction } from "@reduxjs/toolkit";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { GetReviewUserById } from "../review/reviewSlice";
import { EvilIcons } from "@expo/vector-icons";
import { FontAwesome } from '@expo/vector-icons';

const ProductDetailScreen = ({ navigation, route }: any) => {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const cart: any = useSelector(selectCartItems);
  const { productId,formreview } = route.params;
  const products = useSelector(selectProducts);

  const userId = useSelector(selectuserid);
  const username = useSelector(selectusername);
  

  // console.log("productReviews", productId.reviews[3]);
  // console.log("productReviews", productId.reviews.reviewImageUrls);

  const AddProduct = () => {
    dispatch(
      addProductAsync({
        userId,
        amount: quantity,
        productId: productId.id,
      }) as any
    ).then(() => {
      dispatch(getCartAsync({ userId }) as any);
      navigation.reset({
        index: 0,
        routes: [{ name: "homeproduct" }], // รีหน้า
      });
    });
  };

  const [slideAnim] = useState(new Animated.Value(0)); // สร้าง Animated Value
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [DropdownVisible, setDropdownVisible] = useState(false);
  const [shouldShowNavbar, setShouldShowNavbar] = useState(true);
  const [reviewData, setReviewData] = useState<any[]>([]);
  const [expandedReviewIndex, setExpandedReviewIndex] = useState<number | null>(null);


  const handleProductSelection = (product: any) => {
    navigation.push("productDetail", { productId: product });
  };

  const handleGotoReview = async (product: any) => {
    navigation.push("WriteReviewScreen", { productId: product });
  };

  const recommendedProducts = products.filter(
    (product: any) => product !== productId
  );

  const increaseQuantity = () => {
    if (quantity < productId.quantityInStock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const shouldShowNavbar = offsetY <= 0;

    // console.log("OffsetY:", offsetY);
    // console.log("Should Show Navbar:", shouldShowNavbar);

    setNavbarVisible(shouldShowNavbar);
    setShouldShowNavbar(shouldShowNavbar);
    Animated.timing(slideAnim, {
      toValue: shouldShowNavbar ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const Test = async () => {
    try {
      const Test = await dispatch(
        GetReviewUserById({
          userId,
        }) as any
      );
      console.log("check", Test);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  // ค่าเฉลี่ยดาว Start
  const calculateAverageRating = () => {
    if (productId.reviews.length === 0) {
      return 0;
    }

    const totalStars = productId.reviews.reduce(
      (sum: number, review: any) => sum + review.star,
      0
    );
    const averageRating = totalStars / productId.reviews.length;
    return averageRating.toFixed(1);
  };
  // ค่าเฉลี่ยดาว End

  const renderAverageRating = () => {
    const averageRating:any = calculateAverageRating();
    const roundedRating = Math.round(averageRating);
    const iconColor = averageRating >= 3 ? "#fc7a00" : "gray";

    return (
      <View style={{ flexDirection: "row", alignItems: "center",bottom:3 }}>
        {Array.from({ length: 5 }, (_, index) => (
          <AntDesign
            key={index}
            name="star"
            size={20}
            color={index < roundedRating ? iconColor : "gray"}
          />
        ))}
      </View>
    );
  };

  const handleGoHome = () => {
    navigation.navigate("product");
    setDropdownVisible(false); 
  };
  

  return (
    <View style={styles.container}>
      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={{ flex: 1 }}
      >
        <View style={{ position: "relative" }}>
          <Image
            style={{
              width: "100%",
              height: 350,
            }}
            // source={{ uri: productId.imageUrls[0] }}
            source={{ uri: productId.image }}
          />
        </View>

        <ScrollView horizontal={true} style={{ marginTop: 20 }}>
  <View style={{ flexDirection: "row" }}>
    {productId.imageUrls.map((index: any) => (
      <Image
        key={index}
        style={{
          width: 85,
          height: 70,
          marginLeft: 5,
          marginBottom: 10,
        }}
        source={{ uri: index }}
      />
    ))}
  </View>
</ScrollView>


        <View style={{ width: "100%", backgroundColor: "#f7f7f7", height: 15 }}>
          <Text style={{ color: "rgba(0, 0, 0, 0)" }}>wewe</Text>
        </View>

        <View style={{ paddingLeft: 20, paddingTop: 20 }}>
          <Text style={{ fontSize: 25, fontWeight: "500", marginBottom: 5 }}>
            {productId.name}
          </Text>
          <Text style={{ color: "gray", fontSize: 17 }}>
            Type : {productId.type}{" "}
          </Text>
          <Text style={{ color: "gray", fontSize: 17 }}>
            calorie : {productId.calorie}{" "}
          </Text>
          <Text
            style={{
              left: 275,
              position: "absolute",
              top: 35,
              fontSize: 25,
              fontWeight: "700",
            }}
          >
            ${productId.price}
          </Text>

          <View>
            <Text
              style={{
                fontSize: 16,
                marginTop: 40,
                fontWeight: "600",
                marginBottom: 10,
              }}
            >
              Description
            </Text>
            <Text style={{ color: "gray" }}>{productId.description}</Text>
          </View>
          <Text style={{ paddingTop: 30, fontWeight: "500" }}>
            Quantity of products : {productId.quantityInStock}
          </Text>
        </View>
        {/* ProductDetail End */}

        <View
          style={{
            width: "100%",
            backgroundColor: "#f7f7f7",
            height: 15,
            marginTop: 20,
          }}
        >
          <Text style={{ color: "rgba(0, 0, 0, 0)" }}>wewe</Text>
        </View>

        {/* Review Start */}
        <View style={{ paddingLeft: 20, paddingTop: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "500" }}>
            Product Ratings
          </Text>
          <View style={{ flexDirection: "row", paddingTop: 3 }}>
            {/* <AntDesign name="star" size={20} color="#fc7a00" />
            <AntDesign name="star" size={20} color="#fc7a00" />
            <AntDesign name="star" size={20} color="#fc7a00" />
            <AntDesign name="star" size={20} color="#fc7a00" />
            <AntDesign name="star" size={20} color="#fc7a00" /> */}
            {renderAverageRating()}
            <Text
              style={{
                fontSize: 19,
                bottom: 3,
                color: "#fc2600",
                fontWeight: "400",
                paddingLeft: 5,
              }}
            >
              {calculateAverageRating()}/5
            </Text>

            <Text style={{ fontSize: 19, bottom: 3, color: "gray", paddingLeft: 8 }}>
            ({productId.reviews.length} Reviews)
          </Text>

          </View>

          <Text
            style={{
              marginTop: 10,
              fontSize: 18,
              color: "gray",
              marginBottom: 10,
            }}
          >
            Buyer Gallery
          </Text>

          {/* เส้นเล็ก Start */}
          <View
            style={{
              borderWidth: 0.2,
              borderColor: "#e0e0e0",
              width: "100%",
              marginBottom: 15,
              right: 10,
            }}
          ></View>
          {/* เส้นเล็ก End */}

          {/* ShowReview Start */}

          {productId.reviews.map((review: any) => (
            <View style={{ paddingRight: 10 }}>
              <View
                key={review.id}
                style={{
                  paddingLeft: 5,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {/* รูปโปรไฟล์ Start */}
                {review.user.profileImageUrl ? (
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 40,
                      }}
                      source={{
                        uri: review.user.profileImageUrl,
                      }}
                    />
                    {/* อันนี้เป็นชื่อ UserName จากการ inc.. ข้อมูลข้างในไม่ใช่ Array จึงไม่ต้องนำไป .map แยก Start */}
                    <Text style={{ paddingLeft: 20, fontSize: 17 }}>
                      {review.user.userName}
                    </Text>
                    {/* อันนี้เป็นชื่อ UserName จากการ inc.. ข้อมูลข้างในไม่ใช่ Array จึงไม่ต้องนำไป .map แยก  End*/}
                  </View>
                ) : (
                  <View
                    style={{
                      position: "relative",
                      paddingRight: 20,
                      flexDirection: "row",
                    }}
                  >
                    <EvilIcons name="user" size={55} color="black" />
                    {/* อันนี้เป็นชื่อ UserName จากการ inc.. ข้อมูลข้างในไม่ใช่ Array จึงไม่ต้องนำไป .map แยก Start */}
                    <Text
                      style={{ paddingLeft: 5, fontSize: 17, paddingTop: 8 }}
                    >
                      {review.user.userName}
                    </Text>
                    {/* อันนี้เป็นชื่อ UserName จากการ inc.. ข้อมูลข้างในไม่ใช่ Array จึงไม่ต้องนำไป .map แยก  End*/}
                  </View>
                )}

                {/* รูปโปรไฟล์ End */}
              </View>

              <View style={{ paddingLeft: 65, bottom: 5 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {Array.from({ length: review.star }, () => (
                    <FontAwesome name="star" size={15} color="gold" />
                  ))}
                </View>

                <Text style={{ fontSize: 15 }}>
                  {expandedReviewIndex === review
                    ? review.texts
                    : review.texts.slice(0, 200) +
                      (review.texts.length > 200 ? "..." : "")}
                  {review.texts.length > 200 && (
                    <Text
                      style={{ color: "gray" }}
                      onPress={() => setExpandedReviewIndex(review)}
                    >
                      {expandedReviewIndex === review ? "" : "See More"}
                    </Text>
                  )}
                </Text>

                {/* ส่วนนี้เป็นการ .map ของข้อมูลรูปของ Review reviewImageUrls เพื่อให้ได้ทุกข้อมูลที่อยู่ใน Array Start */}
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                  {review.reviewImageUrls.map(
                    (imageUrl: string, index: number) => (
                      <Image
                        key={index}
                        style={{
                          width: 80,
                          height: 80,
                          borderRadius: 20,
                          marginRight: 10,
                          marginTop: 10,
                          marginBottom: 10,
                        }}
                        source={{
                          uri: imageUrl,
                        }}
                      />
                    )
                  )}
                </View>
                <Text style={{ marginBottom: 10 }}>
                  {new Date(review.date).toLocaleString("TH", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
                
              </View>
              {/* เส้นเล็ก Start */}
              <View
                style={{
                  borderWidth: 0.2,
                  borderColor: "#e0e0e0",
                  width: "100%",
                  marginBottom: 15,
                  right: 10,
                }}
              ></View>
              {/* เส้นเล็ก End */}
            </View>
          ))}

          {/* ShowReview End */}

          {/* <Button title="Review" onPress={() => handleGotoReview(productId)} /> */}
          {/* <Button title="Test" onPress={Test} /> */}
        </View>

        {/* Review End */}

        {/* Recommended product Start */}
        <Text
          style={{
            fontSize: 20,
            fontWeight: "500",
            textAlign: "center",
            marginTop:30
          }}
        >
          Recommended Product
        </Text>
        <View style={styles.recommendedContainer}>
          {recommendedProducts.map((product: any) => (
            <TouchableOpacity
              key={product.id}
              onPress={() => handleProductSelection(product)}
            >
              <View style={styles.recommendedProduct}>
                <Image
                  source={product.imageUrl}
                  style={styles.recommendedImage}
                />
                <Text style={styles.recommendedName}>{product.name}</Text>
                <Image
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 10,
                    marginBottom: 20,
                  }}
                  source={{
                    uri: product.imageUrls[0],
                  }}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
        {/* Recommended product End */}
      </ScrollView>

      {/* Navbar */}
      <View
        style={{
          top: 0,
          position: "absolute",
          height: shouldShowNavbar ? 0 : 70,
          backgroundColor: shouldShowNavbar
            ? "rgba(255, 255, 255, 0.3)"
            : "#f8f8f8",
          width: "100%",
          elevation: 24,
        }}
      >
        <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.iconButton}
          >
            <View
              style={{
                backgroundColor: shouldShowNavbar
                  ? "rgba(0, 0, 0, 0.3)"
                  : "#f8f8f8",
                padding: 2,
                flexDirection: "row",
              }}
            >
              <Ionicons
                name="arrow-back"
                size={34}
                color={shouldShowNavbar ? "white" : "#ff5e00"}
              />
            </View>
          </TouchableOpacity>

          <View>
  <TouchableOpacity
    onPress={() => setDropdownVisible(!DropdownVisible)}
    style={[styles.iconButton, { right: 30 }]}
  >
    <View
      style={{
        backgroundColor: shouldShowNavbar ? "rgba(0, 0, 0, 0.3)" : "#f8f8f8",
        padding: 8,
        flexDirection: "row",
      }}
    >
      <Entypo
        name="dots-three-vertical"
        size={24}
        color={shouldShowNavbar ? "white" : "#ff5e00"}
      />
    </View>
  </TouchableOpacity>

  {DropdownVisible && (
    <View style={styles.dropdown}>
      <View style={{ height: 50, padding: 10 }}>
        <TouchableOpacity onPress={() => handleGoHome()}>
          <Text style={{ fontSize: 18, paddingLeft: 25 }}>Go Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  )}
</View>

        </View>
      </View>

      <Animated.View style={[styles.bottomContainer]}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={decreaseQuantity}>
            <Text style={styles.quantityButton}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity onPress={increaseQuantity}>
            <Text style={styles.quantityButton}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.buyButton} onPress={() => AddProduct()}>
          <Text style={styles.buyButtonText}>Add To Cart</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
  },
  recommendedTitle: {
    top: 100,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  recommendedContainer: {
    flexDirection: "row",
    justifyContent: "center",
    bottom:100
  },
  recommendedProduct: {
    alignItems: "center",
    marginRight: 16,
  },
  recommendedImage: {
    width: 100,
    height: 100,
    marginBottom: 8,
    borderRadius: 100,
  },
  recommendedName: {
    fontSize: 16,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
  quantityButton: {
    fontSize: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "lightgray",
    borderRadius: 40,
    width: 40,
    textAlign: "center",
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: "#fff",
    borderTopWidth: 2,
    borderTopColor: "lightgray",
    justifyContent: "center",
    flexDirection: "row",
    zIndex: 99,
  },
  buyButton: {
    backgroundColor: "blue",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 30,
    width: "60%",
    height: "45%",
    top: 25,
  },
  buyButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  iconContainer: {
    position: "absolute",
    top: 15,
    left: 13,
    zIndex: 99,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  iconButton: {
    borderRadius: 999,
    overflow: "hidden",
  },
  dropdown: {
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 5,
    elevation: 4,
    zIndex: 99,
    width: 200,
    right: 40,
    top: 30,
  },
});
