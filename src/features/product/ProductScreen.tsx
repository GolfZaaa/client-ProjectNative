import {
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductAsync,
  fetchTypeAsync,
  isLoading,
  selectProducts,
  selectType,
} from "./productSlice";
import { AnyAction } from "@reduxjs/toolkit";
import LottieView from "lottie-react-native";
import { AntDesign } from "@expo/vector-icons";

import { Feather } from "@expo/vector-icons";
import Sildemenu from "../component/Sildemenu";
import StackCart from "../../components/StackCart";

const ProductScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const loading = useSelector(isLoading);

  //ฟังก์ชั่น Select Product Start
  const products = useSelector(selectProducts);
  console.log(products)

  const [searchText, setSearchText] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<any[]>(products);

  useEffect(() => {
    const handleSearch = () => {
      const filteredProducts = products.filter((product) => {
        return product.name.toLowerCase().includes(searchText.toLowerCase());
      });
      setFilteredProducts(filteredProducts);
    };

    handleSearch();
  }, [searchText, products]);
  //ฟังก์ชั่น Select Product End

  //แสดงข้อมูล Product Start
  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchProductAsync() as unknown as AnyAction);
    };

    fetchData();
  }, [dispatch]);
  // console.log(products);
  //แสดงข้อมูล Product End

  //แสดลงข้อมูล Type Start
  const type = useSelector(selectType);
  const [selectedType, setSelectedType] = useState(null); // กำหนดชนิดข้อมูลเป็น any หรือ null

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchTypeAsync() as unknown as AnyAction);
    };
    fetchData();
  }, [dispatch]);

  const handleTypeSelection = (selectedType: any) => {
    setSelectedType(selectedType);
  };

  useEffect(() => {
    const handleSearch = () => {
      const filteredProducts = products.filter((product) => {
        return (
          product.name.toLowerCase().includes(searchText.toLowerCase()) &&
          (selectedType ? product.type === selectedType : true) // เพิ่มเงื่อนไขในการกรองสินค้าด้วย Type ที่ถูกเลือก
        );
      });
      setFilteredProducts(filteredProducts);
    };
    handleSearch();
  }, [searchText, products, selectedType]);

  //แสดงข้อมูล Type End

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!products || products.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No products available</Text>
      </View>
    );
  }


  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <Text style={styles.title}>Product Collections</Text>

      <Sildemenu navigation={navigation} />

      <View style={styles.searchContainer}>
        <Feather
          name="search"
          size={24}
          color="black"
          style={styles.searchIcon}
        />
        <Text style={styles.TextSearch}></Text>
        <TextInput
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search . . ."
        />
        <Text style={styles.filter}>
          <LottieView
            source={require("../../../assets/icons/icons8/73288-filter.json")}
            autoPlay
            loop
            style={{ width: 35, left: 2, top: 3 }}
          />
        </Text>
      </View>

      <View>
        <ScrollView horizontal>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginVertical: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => handleTypeSelection(null)}
              style={[
                styles.typeButton,
                selectedType === null && styles.selectedTypeButton,
              ]}
            >
              <Text style={styles.typeButtonText}>All Types</Text>
            </TouchableOpacity>

            {type.map((Types: any) => (
              <TouchableOpacity
                key={Types}
                onPress={() => handleTypeSelection(Types)}
                style={[
                  styles.typeButton,
                  selectedType &&
                    selectedType === Types &&
                    styles.selectedTypeButton,
                ]}
              >
                <Text style={styles.typeButtonText}>{Types}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <ScrollView>
        {filteredProducts.map((product: any) => (
          <TouchableOpacity
          key={product.id}
            onPress={() =>
              navigation.push("productDetail", { productId: product })
            }
          >
            <View style={styles.cardproduct}>
              <Image
                style={{
                  width: 170,
                  height: "100%",
                  borderRadius: 20,
                }}
                source={{
                  uri: product.imageUrls[0],
                }}
              />
              <View style={{ position: "absolute", left: 190, marginTop: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: "400" }}>
                  {product.name}
                </Text>
                <Text
                  style={{
                    color: "gray",
                    fontSize: 12,
                    marginBottom: 10,
                    fontWeight: "400",
                  }}
                >
                  Type {product.type}
                </Text>
                <Text
                  style={{
                    color: "gray",
                    fontSize: 14,
                    marginBottom: 10,
                    fontWeight: "400",
                    right: 4,
                  }}
                >
                  {product.description.substring(0, 20)}
                </Text>
                <Text style={{ color: "gray" }}>
                  QuantityInStock : {product.quantityInStock}
                </Text>
                <Text
                  style={{
                    fontWeight: "700",
                    position: "relative",
                    top: 20,
                    fontSize: 18,
                  }}
                >
                  ${product.price}.{" "}
                </Text>
                <Text
                  style={{
                    position: "absolute",
                    top: 129,
                    left: 48,
                    fontWeight: "600",
                    fontSize: 13,
                  }}
                >
                  00
                </Text>
                <TouchableOpacity>
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>Buy</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 100,
    marginLeft: 30,
    marginRight: 30,
    fontSize: 25,
    fontWeight: "600",
    marginBottom: 5,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 30,
    marginTop: 20,
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: 10,
    position: "absolute",
    zIndex: 10,
    left: 20,
  },
  searchInput: {
    flex: 1,
    borderColor: "gray",
    marginRight: 10,
    paddingVertical: 5,
    paddingHorizontal: 55,
    backgroundColor: "#fafafa",
    borderRadius: 15,
    height: 47,
  },
  TextSearch: {
    position: "absolute",
    zIndex: 10,
    left: 60,
    fontSize: 17,
    color: "gray",
  },
  filter: {
    backgroundColor: "#f5f5f5",
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  typeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#ccc",
    marginLeft: 20,
  },
  selectedTypeButton: {
    backgroundColor: "blue",
  },
  typeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  cardproduct: {
    width: 350,
    height: 200,
    backgroundColor: "#feeded",
    margin: 20,
    borderRadius: 35,
  },
  button: {
    backgroundColor: "#4b4b4b",
    paddingVertical: 5,
    paddingHorizontal: 17,
    borderRadius: 11,
    width: 60,
    left: 80,
    bottom: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default ProductScreen;
