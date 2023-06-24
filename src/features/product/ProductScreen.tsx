import { ActivityIndicator, StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductAsync, fetchTypeAsync, isLoading, selectProducts, selectType } from "./productSlice";
import { AnyAction } from "@reduxjs/toolkit";
import LottieView from 'lottie-react-native';

import { Feather } from '@expo/vector-icons';

const ProductScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const loading = useSelector(isLoading);



  //ฟังก์ชั่น Select Product Start
  const products = useSelector(selectProducts);
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
  //แสดงข้อมูล Product End

  //แสดลงข้อมูล Type Start
  const type = useSelector(selectType);
  const [selectedType, setSelectedType] = useState(null); // เพิ่มสถานะของ Type ที่ถูกเลือก


  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchTypeAsync() as unknown as AnyAction);
    };
    fetchData();
  }, [dispatch]);

  // const handleTypeSelection = (selectedType: any) => {
  //   setSelectedType(selectedType); // อัปเดตสถานะของ Type ที่ถูกเลือก
  //   const filteredProducts = products.filter((product) => {
  //     return product.type === selectedType.name; // กรองสินค้าตาม Type ที่ถูกเลือก
  //   });
  //   setFilteredProducts(filteredProducts);
  // };
  
  
  //แสดลงข้อมูล Type End

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
      <Text style={{ color: "gray", marginLeft: 30, fontSize: 15 }}>
        The best of food collections, all in one place.
      </Text>

      <View style={styles.searchContainer}>
        <Feather
          name="search"
          size={24}
          color="black"
          style={styles.searchIcon}
        />
        <Text style={styles.TextSearch}>Search</Text>
        <TextInput
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
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

{/* เปลี่ยนจาก type.map เป็นการสร้างปุ่มเลือก Type */}
<View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 }}>
    {type.map((Types: any) => (
      <TouchableOpacity
        key={Types.id}
        onPress={() => handleTypeSelection(Types)} // เพิ่มการเรียกใช้ฟังก์ชัน handleTypeSelection เมื่อกดปุ่ม Type
        style={[
          styles.typeButton,
          Types.id === selectedType?.id && styles.selectedTypeButton // ให้ปุ่ม Type ที่ถูกเลือกมีสไตล์เป็นปุ่มที่ถูกเลือก
        ]}
      >
        <Text style={styles.typeButtonText}>{Types.name}</Text>
      </TouchableOpacity>
    ))}
  </View>

      {filteredProducts.map((product: any) => (
        <Text key={product.id}>{product.name}</Text>
      ))}




    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 60,
    marginLeft: 30,
    fontSize: 25,
    fontWeight: "600",
    marginBottom: 10,
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
    position:'absolute',
    zIndex: 10,
    left:20
  },
  searchInput: {
    flex: 1,
    borderColor: "gray",
    marginRight: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#fafafa",
    borderRadius: 15,
    height: 47,
  },
  TextSearch:{
    position:'absolute',
    zIndex: 10,
    left:60,
    fontSize:17,
    color:'gray',
  },
  filter :{
    backgroundColor: "#f5f5f5",
    width:40,
    height:40,
    borderRadius:10
  },
  typeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#ccc',
  },
  selectedTypeButton: {
    backgroundColor: 'blue',
  },
  typeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ProductScreen;
