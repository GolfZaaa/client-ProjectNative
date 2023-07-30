import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createaddress, selectuserid, selectusername } from "./accountSlice";
import {
  Amphure,
  Province,
  Tambon,
  ZipCode,
} from "../../../assets/api/thailandData";
import thailandData from "../../../assets/api/thailandData.json";
import { Picker } from "@react-native-picker/picker";

const Address = ({ navigation }: any) => {
  const [province, setprovince] = useState("");
  const [district, setDistrict] = useState("");
  const [subdistrict, setsubdistrict] = useState("");

  const [loading, setLoading] = useState(true);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [postalCode, setPostalCode] = useState<string>("");

  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);
  const [selectedAmphure, setSelectedAmphure] = useState<Amphure | null>(null);
  const [selectedTambon, setSelectedTambon] = useState<Tambon | null>(null);

  const [selectedProvinceName, setSelectedProvinceName] = useState<string>("");
  const [selectedAmphureName, setSelectedAmphureName] = useState<string>("");
  const [selectedTambonName, setSelectedTambonName] = useState<string>("");
  const [selectedPostalCode, setSelectedPostalCode] = useState<string>("");

  const nameuser = useSelector(selectusername);


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
    console.log("Selected Province:", province);
  };

  // \อำเภอ
  const handleAmphureChange = (amphureId: number) => {
    const amphure =
      selectedProvince?.amphure.find((a) => a.id === amphureId) || null;
    setSelectedAmphure(amphure);
    setSelectedTambon(null);
    setSelectedAmphureName(amphure?.name_th || "");
    console.log("Selected Amphure:", amphure);
  };

  // \ตำบล
  const handleTambonChange = (tambonId: number) => {
    const tambon =
      selectedAmphure?.tambon.find((t) => t.id === tambonId) || null;
    setSelectedTambon(tambon);
    setSelectedTambonName(tambon?.name_th || "");
    setSelectedPostalCode(tambon?.zip_code.toString() || "");
    console.log("Selected Tambon:", tambon);
  };

  const userId = useSelector(selectuserid);
  const dispatch = useDispatch();

  const handleaddress = async () => {
    await dispatch(
      createaddress({
        province: selectedProvinceName,
        district: selectedAmphureName,
        subdistrict: selectedTambonName,
        postalCode: selectedPostalCode,
        userId: userId,
      }) as any
    );
    console.log(selectedProvinceName);
    console.log(selectedAmphureName);
    console.log(selectedTambonName);
    console.log(selectedPostalCode);
    navigation.navigate("orders");
  };

  return (
    <View style={styles.container}>
      {/* เลือกจังหวัด */}
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Contact</Text>
      <Text>{nameuser}</Text>

      <Text style={{ fontSize: 20, marginBottom: 20 }}>Address</Text>

      <Text>Select Province:</Text>
      <View>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedProvince?.id}
            onValueChange={(itemValue) => handleProvinceChange(itemValue)}
          >
            <Picker.Item label="-- Select Province --" value="" />
            {provinces.map((province) => (
              <Picker.Item
                key={province.id}
                label={`${province.name_th} (${province.name_en})`}
                value={province.id}
              />
            ))}
          </Picker>
        </View>

        <View>
          {/* เลือกอำเภอ */}
          {selectedProvince && (
            <>
              <Text>Select Amphure:</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedAmphure?.id}
                  onValueChange={(itemValue) => handleAmphureChange(itemValue)}
                >
                  <Picker.Item label="-- Select Amphure --" value="" />
                  {selectedProvince.amphure.map((amphure) => (
                    <Picker.Item
                      key={amphure.id}
                      label={`${amphure.name_th} (${amphure.name_en})`}
                      value={amphure.id}
                    />
                  ))}
                </Picker>
              </View>
            </>
          )}
        </View>

        <View>
          {/* เลือกตำบล */}
          {selectedAmphure && (
            <>
              <Text>Select Tambon:</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedTambon?.id}
                  onValueChange={(itemValue) => handleTambonChange(itemValue)}
                >
                  <Picker.Item label="-- Select Tambon --" value="" />
                  {selectedAmphure.tambon.map((tambon) => (
                    <Picker.Item
                      key={tambon.id}
                      label={`${tambon.name_th} (${tambon.name_en})`}
                      value={tambon.id}
                    />
                  ))}
                </Picker>
              </View>
            </>
          )}
        </View>

        <View>
          {selectedTambon && (
            <>
              <Text>รหัสไปรณีย์: {selectedTambon.zip_code.toString()}</Text>
              <Text>จังหวัด: {selectedProvince?.name_th}</Text>
              <Text>อำเภอ: {selectedAmphure?.name_th}</Text>
              <Text>ตำบล: {selectedTambon?.name_th}</Text>
            </>
          )}

          <TouchableOpacity
            style={{ width: 120, backgroundColor: "red" }}
            onPress={handleaddress}
          >
            <Text>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Address;

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: "white",
    flex: 1,
    padding: 40,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    marginBottom: 20,
  },
});
