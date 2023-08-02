import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  ChangeEmailUser,
  ChangeNameUser,
  GetDetailUserById,
  changename,
  selectEmail,
  selectuserid,
  selectusername,
  updateEmail,
} from "../features/account/accountSlice";
import { HttpStatusCode } from "axios";

const StackSetting = () => {
  const username: any = useSelector(selectusername);
  const email: any = useSelector(selectEmail);
  const [newUserName, setnewUserName] = useState("");
  const [newEmail, setnewEmail] = useState("");

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isNewEmailModalVisible, setIsNewEmailModalVisible] = useState(false);

  const [data, setData] = useState<any>(null);

  const dispatch = useDispatch();
  const userId = useSelector(selectuserid);

  const ChangeName = async () => {
    try {
      const asd = await dispatch(
        ChangeNameUser({
          userId: userId,
          username: username,
          newUserName: newUserName,
        }) as any
      );
      handleCloseModal();
      dispatch(changename(newUserName));
      fetchData(newUserName);
      setData(asd.meta.arg.newUserName);
    } catch (error) {
      console.error(error);
    }
  };

  // อันนี้เช็คError start
  const ChangeEmail = async () => {
    try {
      if (email !== newEmail) {
        const asd = await dispatch(
          ChangeEmailUser({
            userId: userId,
            email: email,
            newEmail: newEmail,
          }) as any
        );
        console.log("🤷‍♀️", HttpStatusCode.BadRequest);
        console.log("🤷‍♀️", asd);
        // if (asd?.error?.code === undefined || asd?.error.code === null) {
        //   alert("ching");
        // }
        if (asd?.error?.code !== "ERR_BAD_REQUEST") {
          handleCloseNewEmailModal();
          dispatch(updateEmail(newEmail));
          fetchData(newEmail);
          setData(asd.meta.arg.email);
          console.log("😍", asd);
        } else {
          alert("mail is exist");
        }
      } else {
        alert("kwaeqwe");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // อันนี้เช็คError end

  const fetchData = async (username: any) => {
    try {
      const goof = await dispatch(
        GetDetailUserById({ username: username }) as any
      );
      setData(goof.payload);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData(username);
  }, []);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleOpenNewEmailModal = () => {
    setIsNewEmailModalVisible(true);
  };

  const handleCloseNewEmailModal = () => {
    setIsNewEmailModalVisible(false);
  };

  console.log("data:", username);
  console.log("Email", email);

  return (
    <SafeAreaView
      style={{ backgroundColor: "white", flex: 1, paddingVertical: 10 }}
    >
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={28}
          color="black"
          style={{ marginRight: 5 }}
        />
        <Text style={{ fontSize: 20, fontWeight: "500" }}>
          Account Information
        </Text>
      </View>

      <View>
        <TouchableOpacity onPress={handleOpenModal}>
          <View
            style={{
              borderBottomWidth: 1,
              borderTopWidth: 0.9,
              borderColor: "#f5f5f5",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingLeft: 20,
              paddingRight: 20,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "400",
                marginTop: 15,
                marginBottom: 15,
              }}
            >
              Full Name
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "400",
                marginTop: 15,
                marginBottom: 15,
                color: "gray",
              }}
            >
              {username ? (
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "400",
                    marginTop: 15,
                    marginBottom: 15,
                  }}
                >
                  {username}
                </Text>
              ) : (
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "400",
                    marginTop: 15,
                    marginBottom: 15,
                  }}
                >
                  Loading...
                </Text>
              )}
            </Text>
            <AntDesign name="right" size={24} color="gray" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleOpenModal}>
          <View
            style={{
              borderBottomWidth: 1,
              borderTopWidth: 0.9,
              borderColor: "#f5f5f5",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingLeft: 20,
              paddingRight: 20,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "400",
                marginTop: 15,
                marginBottom: 15,
              }}
            >
              Change Password
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "400",
                marginTop: 15,
                marginBottom: 15,
              }}
            ></Text>
            <AntDesign name="right" size={24} color="gray" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleOpenNewEmailModal}>
          <View
            style={{
              borderBottomWidth: 1,
              borderTopWidth: 0.9,
              borderColor: "#f5f5f5",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingLeft: 20,
              paddingRight: 20,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "400",
                marginTop: 15,
                marginBottom: 15,
              }}
            >
              Change Email
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "400",
                marginTop: 15,
                marginBottom: 15,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "400",
                  marginTop: 15,
                  marginBottom: 15,
                }}
              >
                {email ? (
                  <Text style={{ color: "gray" }}>
                    {/* email.substring(0, 3) จากตัวที่ 0 ถึงตัวที่ 3 start */}
                    {email.substring(0, 3)}******
                    {email.substring(email.lastIndexOf("@"))}
                    {/* email.substring(0, 3) จากตัวที่ 0 ถึงตัวที่ 3 end */}
                  </Text>
                ) : (
                  <Text style={{ color: "gray" }}>Loading...</Text>
                )}
              </Text>
            </Text>
            <AntDesign name="right" size={24} color="gray" />
          </View>
        </TouchableOpacity>

        <Modal visible={isModalVisible} animationType="slide">
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <TextInput
              placeholder="Enter new Full Name"
              value={newUserName}
              onChangeText={(text) => setnewUserName(text)}
              style={{
                borderWidth: 1,
                borderColor: "gray",
                borderRadius: 5,
                padding: 10,
                width: "80%",
              }}
            />
            <Button title="Save" onPress={ChangeName} />
            <Button title="Cancel" onPress={handleCloseModal} />
          </View>
        </Modal>

        {/* ModalEmail Start */}
        <Modal visible={isNewEmailModalVisible} animationType="slide" transparent={true}>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <TextInput
        placeholder="Enter new Email"
        value={newEmail}
        onChangeText={(text) => setnewEmail(text)}
        style={styles.input}
      />
      <Button title="Save" onPress={ChangeEmail} />
      <Button title="Cancel" onPress={handleCloseNewEmailModal} />
    </View>
  </View>
</Modal>

        {/* ModalEmail End */}
      </View>
    </SafeAreaView>
  );
};

export default StackSetting;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
    paddingLeft: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});
