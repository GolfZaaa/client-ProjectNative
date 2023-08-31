import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import { createaddress, selectuserid, selectusername } from "./accountSlice";
import {
  Province,
  Amphure,
  Tambon,
  ZipCode,
} from "../../../assets/api/thailandData";
import thailandData from "../../../assets/api/thailandData.json";
import { Picker } from "@react-native-picker/picker";
import { AntDesign } from "@expo/vector-icons";

const EditAddressScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState(true);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(
    null
  );
  const [selectedAmphure, setSelectedAmphure] = useState<Amphure | null>(null);
  const [selectedTambon, setSelectedTambon] = useState<Tambon | null>(null);
  const [selectedProvinceName, setSelectedProvinceName] = useState<string>("");
  const [selectedAmphureName, setSelectedAmphureName] = useState<string>("");
  const [selectedTambonName, setSelectedTambonName] = useState<string>("");
  const [selectedPostalCode, setSelectedPostalCode] = useState<string>("");

  const nameuser = useSelector(selectusername);
  const userId = useSelector(selectuserid);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province_with_amphure_tambon.json"
        );
        const data = await response.json();
        setProvinces(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleProvinceChange = (provinceId: number) => {
    const province = provinces.find((p) => p.id === provinceId) || null;
    setSelectedProvince(province);
    setSelectedAmphure(null);
    setSelectedTambon(null);
    setSelectedProvinceName(province?.name_th || "");
  };

  const handleAmphureChange = (amphureId: number) => {
    const amphure =
      selectedProvince?.amphure.find((a) => a.id === amphureId) || null;
    setSelectedAmphure(amphure);
    setSelectedTambon(null);
    setSelectedAmphureName(amphure?.name_th || "");
  };

  const handleTambonChange = (tambonId: number) => {
    const tambon =
      selectedAmphure?.tambon.find((t) => t.id === tambonId) || null;
    setSelectedTambon(tambon);
    setSelectedTambonName(tambon?.name_th || "");
    setSelectedPostalCode(tambon?.zip_code.toString() || "");
  };

  const handleaddress = async () => {
    if (
      selectedProvinceName === "" ||
      selectedAmphureName === "" ||
      selectedTambonName === "" ||
      selectedPostalCode === ""
    ) {
      alert("Wrong selected");
      return;
    }
    const check = await dispatch(
      createaddress({
        province: selectedProvinceName,
        district: selectedAmphureName,
        subdistrict: selectedTambonName,
        postalCode: selectedPostalCode,
        userId: userId,
      }) as any
    );
    console.log("check", check);
    navigation.navigate("ConfirmyourOrder");
  };

  return (
    <View style={styles.container}>
      <View style={styles.bottomLinetop}></View>
      <View style={styles.bottomLinebot}></View>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back"
            size={28}
            color="black"
            style={{ marginRight: 5 }}
          />
        </TouchableOpacity>
        <Text
          style={{
            flex: 1,
            fontSize: 20,
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          Edit Address
        </Text>
      </View>

      <View style={[styles.inputContainer, { marginBottom: 13 }]}>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>Country</Text>
        <TextInput
          style={[styles.disabledInput, styles.placeholderText]}
          placeholder="ประเทศไทย (Thailand)"
          editable={false}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>Province</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedProvince?.id}
            onValueChange={(itemValue: any) => handleProvinceChange(itemValue)}
            style={{ height: 55, color: "gray" }}
          >
            <Picker.Item label="-- Select Province --" value="" />
            {provinces.map((province) => (
              <Picker.Item
                key={province.id}
                label={`${province.name_th} (${province.name_en})`}
                value={province.id}
                style={styles.PickerDropdown}
              />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>District</Text>
        <View
          style={[
            styles.pickerContainer,
            selectedProvince === null && { backgroundColor: "#f2f2f2" },
          ]}
        >
          <Picker
            selectedValue={selectedAmphure?.id}
            onValueChange={(itemValue: any) => handleAmphureChange(itemValue)}
            style={{ height: 55, color: "gray" }}
            enabled={selectedProvince !== null}
          >
            <Picker.Item label="-- Select District --" value="" />
            {selectedProvince?.amphure.map((amphure) => (
              <Picker.Item
                key={amphure.id}
                label={`${amphure.name_th} (${amphure.name_en})`}
                value={amphure.id}
                style={styles.PickerDropdown}
              />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>Sub-district</Text>
        <View
          style={[
            styles.pickerContainer,
            selectedAmphure === null && { backgroundColor: "#f2f2f2" },
          ]}
        >
          <Picker
            selectedValue={selectedTambon?.id}
            onValueChange={(itemValue: any) => handleTambonChange(itemValue)}
            style={{ height: 55, color: "gray" }}
            enabled={selectedAmphure !== null}
          >
            <Picker.Item label="-- Select Sub-district --" value="" />
            {selectedAmphure?.tambon.map((tambon) => (
              <Picker.Item
                key={tambon.id}
                label={`${tambon.name_th} (${tambon.name_en})`}
                value={tambon.id}
                style={styles.PickerDropdown}
              />
            ))}
          </Picker>
        </View>
      </View>

      {selectedTambon && (
        <View style={styles.inputContainer}>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>Postal Code</Text>
          <TextInput
            style={[
              styles.disabledInputPostalCode,
              styles.placeholderTextPostalCode,
            ]}
            editable={false}
            value={selectedPostalCode}
          />
        </View>
      )}

      <View style={{ marginTop: 20 }}>
        <TouchableOpacity onPress={handleaddress}>
          <LinearGradient
            style={{
              borderRadius: 10,
              alignItems: "center",
            }}
            colors={["#d139ff", "#ffbaba"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 20,
                fontWeight: "500",
                padding: 12,
              }}
            >
              Save and Continue
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditAddressScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 20,
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
    top: 65,
    borderColor: "#e2e2e2",
  },
  bottomLinebot: {
    borderWidth: 0.2,
    width: 400,
    position: "absolute",
    top: 115,
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
});
