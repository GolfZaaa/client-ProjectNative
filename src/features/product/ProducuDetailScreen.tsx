import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Animated } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts } from "./productSlice";
import { Ionicons } from '@expo/vector-icons';
import { selectuserid } from "../account/accountSlice";
import { addProductAsync, getCartAsync, selectCartItems } from "../cart/cartSlice";
import { AnyAction } from "@reduxjs/toolkit";

const ProductDetailScreen = ({ navigation, route }: any) => {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const cart: any = useSelector(selectCartItems);
  const { productId } = route.params;
  const products = useSelector(selectProducts);

  const userId = useSelector(selectuserid);
  console.log(userId);




  const AddProduct = () => {
    dispatch(addProductAsync({ userId, amount: quantity, productId: productId.id }) as any)
      .then(() => {
        dispatch(getCartAsync({ userId }) as any)
        navigation.reset({
          index: 0,
          routes: [{ name: "homeproduct" }], // รีหน้า
        });
      });
  };
  
  



  const [slideAnim] = useState(new Animated.Value(0)); // สร้าง Animated Value

  const handleProductSelection = (product: any) => {
    navigation.push("productDetail", { productId: product });
  };

  const recommendedProducts = products.filter(
    (product: any) => product !== productId
  );

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    Animated.timing(slideAnim, {
      toValue: offsetY > 0 ? 1 : 0, // ถ้า offsetY > 0 ให้ slideAnim เป็น 1, ถ้าไม่ใช่ให้เป็น 0
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const opacityInterpolate = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0], // เมื่อ slideAnim เป็น 0 ให้ opacity เป็น 1, เมื่อ slideAnim เป็น 1 ให้ opacity เป็น 0
    extrapolate: 'clamp',
  });

  const translateYInterpolate = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100], // เมื่อ slideAnim เป็น 0 ให้ translateY เป็น 0, เมื่อ slideAnim เป็น 1 ให้ translateY เป็น 100
    extrapolate: 'clamp',
  });

  const animatedStyles = {
    opacity: opacityInterpolate,
    transform: [{ translateY: translateYInterpolate }],
  };


  return (
    <View style={styles.container}>
      <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
        <View style={{}}>
          <View style={{ position: 'relative' }}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', top: 30, left: 13, zIndex: 99 }}>
              <Ionicons name="arrow-back" size={34} color="black" />
            </TouchableOpacity>
            <Image style={{ width: '100%', height: 350, borderBottomLeftRadius: 100, borderBottomRightRadius: 100, marginTop: 30 }} source={{ uri: productId.imageUrls[0] }} />
          </View>

          <View style={{ margin: 25 }}>
            <Text style={{ fontSize: 25, fontWeight: '500', marginBottom: 5 }}>{productId.name}</Text>
            <Text style={{ color: 'gray', fontSize: 17 }}>Type : {productId.type} </Text>
            <Text style={{ color: 'gray', fontSize: 17 }}>calorie : {productId.calorie} </Text>
            <Text style={{ left: 275, position: 'absolute', top: 35, fontSize: 25, fontWeight: '700' }}>${productId.price}</Text>

            <View>
              <Text style={{ fontSize: 16, marginTop: 40, fontWeight: '600', marginBottom: 10 }}>Description</Text>
              <Text style={{ color: 'gray' }}>{productId.description}</Text>
            </View>
            <Text style={{ top: 30,fontWeight:'500'}}>Quantity of products : {productId.quantityInStock}</Text>

          </View>
          {/* ProductDetail End */}
          
          <Text style={{fontSize:20,fontWeight:'600',top:60,textAlign:'center'}}>Recommended Product</Text>
          {/* Recommended product Start */}
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
                  <Image style={{
                    width: 100,
                    height: 100,
                    borderRadius:10,
                    marginBottom:20
                  }} source={{
                    uri: product.imageUrls[0]
                  }} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
          {/* Recommended product End */}
        </View>
      </ScrollView>

      <Animated.View style={[styles.bottomContainer, animatedStyles]}>
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
    width: '100%',
    height: '100%',
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
    width:40,
    textAlign: "center",
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: '#fff',
    borderTopWidth: 2,
    borderTopColor: 'lightgray',
    justifyContent: 'center',
    flexDirection:'row',
    borderTopLeftRadius:30,
  },
  buyButton: {
    backgroundColor: 'blue',
    alignItems:'center',
    paddingVertical: 10,
    borderRadius: 30,
    width:'60%',
    height:'45%',
    top:25,
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
