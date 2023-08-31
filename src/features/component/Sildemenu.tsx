import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  AddProfile,
  GetDetailUserById,
  anonymousUser,
  removeaddress,
  selectEmail,
  selectProfileImage,
  selectToken,
  selectanonymous,
  selectstreet,
  selectuserid,
  selectusername,
  test,
  updateEmail,
  updateToken,
  updateUserId,
  updateusername,
} from "../account/accountSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome5 } from "@expo/vector-icons";
import { updateCart } from "../cart/cartSlice";
import agent from "../api/agent";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { FontAwesome } from '@expo/vector-icons';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';

const Sildemenu = ({ navigation }: any) => {
  const [open, setOpen] = useState(false);
  const [imageUri, setImageUri]: any = useState(null);
  const dispatch = useDispatch();
  const username = useSelector(selectusername);
  const token = useSelector(selectToken);
  const email = useSelector(selectEmail);
  const addresstest = useSelector(selectstreet);
  const ProfileImage = useSelector(selectProfileImage);
  const userId = useSelector(selectuserid);
  const [showModal, setShowModal] = useState(false);
  const anonymous = useSelector(selectanonymous);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handlesetting = () => {
    setOpen(!open), navigation.navigate("setting");
  };

  const handlemyOrder = () => {
    setOpen(!open), navigation.navigate("MyOrder");
  };

  const handleEditAddress = () => {
    setOpen(!open), navigation.navigate("EditAddressScreen");
  };

  const handleGuestVisit = () => {
    dispatch(test({ token: addresstest }));
  };

  const UrlImage = agent.UrlFolderOrderImage;

  const handleLogout = async () => {
    if (token !== "") {
      try {
        await AsyncStorage.multiRemove([
          "token",
          "userId",
          "anonymous",
          "username",
          "email",
        ]);
        dispatch(updateToken(null));
        dispatch(anonymousUser(false));
        dispatch(updateUserId(null));
        dispatch(removeaddress(null));
        dispatch(updateusername(null));
        dispatch(updateCart(null));
        dispatch(updateEmail(null));
      } catch (error) {
        console.log("Error removing token:", error);
      }
    }
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

  const HandleProfile = async () => {
    try {
      const check = await dispatch(
        AddProfile({
          userId: userId,
          ProfileImage: imageUri,
        }) as any
      );
      toggleModal();
      console.log("check", check);
      console.log("set", showModal);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  useEffect(() => {
    if (imageUri) {
      HandleProfile();
    }
  }, [imageUri]);

  useEffect(() => {
    dispatch(GetDetailUserById({ username: username }) as any);
  }, [showModal, username]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
      }}
    >

        {ProfileImage != "" ? (
           <TouchableOpacity onPress={() => setOpen(true)}>
           <Image
             style={{
               width: 60,
               height: 60,
               zIndex: 100,
               position: "absolute",
               top: 47,
               left: 300,
               borderRadius: 40,
             }}
             source={{
               uri: UrlImage + ProfileImage,
             }}
           />
         </TouchableOpacity>
        ):(
          <TouchableOpacity
          onPress={() => setOpen(true)}
          style={{ paddingLeft:310,paddingTop:45,position:'relative'}}
        >
          <FontAwesome name="user-circle-o" size={55} color="black" />
        </TouchableOpacity>
        )}


      <Modal
        animationIn={"slideInLeft"}
        animationOut={"slideOutLeft"}
        isVisible={open}
        backdropOpacity={0.5}
        onBackdropPress={() => setOpen(false)}
      >
        <View
          style={{
            alignItems: "center",
            width: "90%",
            height: "100%",
            justifyContent: "center",
            right: 20,
          }}
        >
          <View
            style={{
              width: "80%",
              height: "95%",
              backgroundColor: "white",
              borderRadius: 20,
            }}
          >
            <View style={{ marginTop: 290, marginLeft: 20 }}>
              <TouchableOpacity
                style={{
                  width: "90%",
                  height: 50,
                  flexDirection: "row",
                  marginBottom: 20,
                  marginLeft: 5,
                  marginTop: 20,
                }}
                onPress={handlemyOrder}
              >
                <SimpleLineIcons name="handbag" size={24} color="blue" />
                <Text
                  style={{
                    marginLeft: 20,
                    fontSize: 19,
                    color: "blue",
                    fontWeight: "400",
                  }}
                >
                  My Orders
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  width: "90%",
                  height: 50,
                  flexDirection: "row",
                  marginBottom: 20,
                  marginLeft: 5,
                }}
                onPress={handleEditAddress}
              >
<FontAwesome5 name="address-card" size={24} color="blue" />
                <Text
                  style={{
                    marginLeft: 20,
                    fontSize: 19,
                    color: "blue",
                    fontWeight: "400",
                  }}
                >
                  Edit Address
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleLogout}
                style={{
                  width: "90%",
                  height: 50,
                  flexDirection: "row",
                  marginLeft: 3,
                  marginBottom: 10,
                }}
              >
                <SimpleLineIcons name="logout" size={24} color="red" />
                <Text
                  style={{
                    marginLeft: 20,
                    fontSize: 19,
                    color: "red",
                    fontWeight: "400",
                  }}
                >
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              height: 120,
              position: "absolute",
              top: 100,
            }}
          >
            <View
              style={{
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                borderColor: "orange",
                width: "100%",
                height: 100,
                flexDirection: "row",
                alignItems: "center",
                paddingLeft: 20,
                paddingRight: 10,
                justifyContent: "space-between",
              }}
            >
              <View
                style={[
                  styles.container,
                  { alignItems: "center", justifyContent: "center"},
                ]}
              >
                {ProfileImage != "" ? (
                  <TouchableOpacity onPress={pickImage}>
                  <Image
                    style={{
                      width: 160,
                      height: 160,
                      borderRadius: 20,
                      marginTop: 20,
                    }}
                    source={{
                      uri: UrlImage + ProfileImage,
                    }}
                  />
                </TouchableOpacity>
                ):(
                  <TouchableOpacity onPress={pickImage}>
                  <FontAwesome name="user-circle-o" size={170} style={{height:'100%',width:'100%',marginBottom:80,top:20}} color="black" />
                </TouchableOpacity>
                )}

                <View style={{ marginLeft: 0 }}>
                  <Text
                    style={{ fontSize: 18, fontWeight: "600", color: "black" }}
                  ></Text>

                  <Text
                    style={{ fontSize: 18, fontWeight: "600", color: "black" }}
                  >
                    {username}
                  </Text>
                </View>
                <Text
                  style={{ fontSize: 16, fontWeight: "600", color: "black" }}
                >
                  {email}
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
                marginTop: -3,
              }}
            ></View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Sildemenu;

const styles = StyleSheet.create({
  modalContent: {
    alignItems: "center",
    width: "80%",
    height: "95%",
    backgroundColor: "white",
    borderRadius: 20,
  },
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});
