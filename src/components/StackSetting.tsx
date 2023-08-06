import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  Button,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  ChangeEmailUser,
  ChangeNameUser,
  ChangePasswordUser,
  DeleteUser,
  GetDetailUserById,
  anonymousUser,
  changename,
  removeaddress,
  selectEmail,
  selectPassword,
  selectuserid,
  selectusername,
  updateEmail,
  updateToken,
  updateUserId,
  updateusername,
} from "../features/account/accountSlice";
import { HttpStatusCode } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateCart } from "../features/cart/cartSlice";

const StackSetting = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isNewEmailModalVisible, setIsNewEmailModalVisible] = useState(false);
  const [data, setData] = useState(null);
  const [isChangePasswordModalVisible, setIsChangePasswordModalVisible] =
    useState(false);
  const [isModalRemoveaccount, setisModalRemoveaccount] = useState(false);
  const modalBackgroundColor = useState(new Animated.Value(0))[0];
  const newEmailModalBackgroundColor = useState(new Animated.Value(0))[0];

  const username = useSelector(selectusername);
  const email = useSelector(selectEmail);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [newUserName, setnewUserName] = useState(username);
  const [newEmail, setnewEmail] = useState(email);
  const [newPassword, setNewPassword] = useState("");
  const [isPressed, setIsPressed] = useState(false);
  const dispatch = useDispatch();
  const userId = useSelector(selectuserid);
  console.log(userId)

  const ChangeName = async () => {
    try {
      if (newUserName === "") {
        console.log("Please enter a new username.");
        alert("Please enter a new username.");
        return;
      }
      if (username !== newUserName) {
        const asd = await dispatch(
          ChangeNameUser({
            userId: userId,
            username: username,
            newUserName: newUserName,
          }) as any
        );
        if (asd?.error?.code !== "ERR_BAD_REQUEST") {
          handleCloseModal();
          dispatch(changename(newUserName));
          fetchData(newUserName);
          setData(asd.meta.arg.newUserName);
        } else {
          alert("Username is already taken.");
        }
      } else {
        alert("Please enter a different Username.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const ChangeEmail = async () => {
    try {
      if (newEmail === "") {
        console.log("Please enter a new Email.");
        alert("Please enter a new Email.");
        return;
      }
      if (email !== newEmail) {
        const asd = await dispatch(
          ChangeEmailUser({
            userId: userId,
            email: email,
            newEmail: newEmail,
          }) as any
        );
        if (asd?.error?.code !== "ERR_BAD_REQUEST") {
          handleCloseNewEmailModal();
          dispatch(updateEmail(newEmail));
          fetchData(newEmail);
          setData(asd.meta.arg.email);
        } else {
          alert("Email is already taken.");
        }
      } else {
        alert("Please enter a different email.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const ChangePassword = async () => {
    await dispatch(
      ChangePasswordUser({
        userId: userId,
        newPassword: newPassword,
      }) as any
    );
  };

  const RemoveUser = async () => {
    try {
      const response = await dispatch(DeleteUser({ userId: userId }) as any);
      await AsyncStorage.multiRemove(["token", "userId", "anonymous","username,email"]);
      dispatch(updateToken(null));
      dispatch(anonymousUser(false));
      dispatch(updateUserId(null));
      dispatch(removeaddress(null));
      dispatch(updateusername(null));
      dispatch(updateCart(null));
      dispatch(updateEmail(null));
      console.log(response); // Log the response for debugging purposes
      console.log("Success")
    } catch (error) {
      console.error(error);
    }
  };
  

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
    Animated.timing(modalBackgroundColor, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleCloseModal = () => {
    Animated.timing(modalBackgroundColor, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setIsModalVisible(false);
      setnewUserName(username);
    });
  };

  const handleOpenNewEmailModal = () => {
    setIsNewEmailModalVisible(true);
    Animated.timing(newEmailModalBackgroundColor, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleCloseNewEmailModal = () => {
    Animated.timing(newEmailModalBackgroundColor, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setIsNewEmailModalVisible(false);
      setnewEmail(email);
    });
  };

  const handleClearTextInput = () => {
    setnewUserName("");
  };

  const handleClearTextInputEmail = () => {
    setnewEmail("");
  };

  const handleOpenChangePasswordModal = () => {
    setIsChangePasswordModalVisible(true);
  };

  const handleCloseChangePasswordModal = () => {
    setIsChangePasswordModalVisible(false);
    setNewPassword("");
  };

  const handleRemoveAccount = () => {
    setIsPressed(!isPressed);
    setisModalRemoveaccount(true);
  };

  const handleRemoveAccountClose = () => {
    setIsPressed(!isPressed);
    setisModalRemoveaccount(false);
  };

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
          <View style={styles.itemContainer}>
            <Text style={styles.label}>Full Name</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 18, marginRight: 18 }}>
                {username ? (
                  <Text style={styles.text}>{username}</Text>
                ) : (
                  <Text style={styles.text}>Loading...</Text>
                )}
              </Text>
              <AntDesign name="right" size={24} color="gray" />
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleOpenNewEmailModal}>
          <View style={styles.itemContainer}>
            <Text style={styles.label}>Change Email</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 18, marginRight: 18 }}>
                {email ? (
                  <Text style={{ color: "gray" }}>
                    {email.substring(0, email.indexOf("@"))}**
                    {email.substring(email.lastIndexOf("@"))}
                  </Text>
                ) : (
                  <Text style={{ color: "gray" }}>Loading...</Text>
                )}
              </Text>
              <AntDesign name="right" size={24} color="gray" />
            </View>
          </View>
        </TouchableOpacity>

        {/* UserName Start */}
        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
        >
          <View style={styles.modalBackground}>
            <Animated.View style={[styles.modalContainer]}>
              <View style={[styles.modalContent]}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      flex: 1,
                      marginBottom: 10,
                      fontSize: 20,
                      fontWeight: "700",
                      textAlign: "center",
                    }}
                  >
                    Full Name
                  </Text>
                  <TouchableOpacity onPress={handleCloseModal}>
                    <Ionicons name="ios-close" size={24} color="gray" />
                  </TouchableOpacity>
                </View>

                <Text style={{ fontWeight: "400" }}>Username</Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    borderBottomWidth: 1,
                    borderColor: "gray",
                    marginBottom: 10,
                  }}
                >
                  <TextInput
                    placeholder="Enter new Full Name"
                    value={newUserName}
                    onChangeText={(text) => setnewUserName(text)}
                    style={{ flex: 1, padding: 5 }}
                  />
                  <TouchableOpacity
                    onPress={handleClearTextInput}
                    style={{ paddingRight: 5 }}
                  >
                    <Ionicons name="ios-close-circle" size={20} color="gray" />
                  </TouchableOpacity>
                </View>

                <Button title="Save" onPress={ChangeName} />
              </View>
            </Animated.View>
          </View>
        </Modal>
        {/* UserName End */}

        {/* Email Start */}
        <Modal
          visible={isNewEmailModalVisible}
          animationType="slide"
          transparent={true}
        >
          <View style={styles.modalBackground}>
            <Animated.View style={[styles.modalContainer]}>
              <View style={styles.modalContent}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      flex: 1,
                      marginBottom: 10,
                      fontSize: 20,
                      fontWeight: "700",
                      textAlign: "center",
                    }}
                  >
                    Email
                  </Text>
                  <TouchableOpacity onPress={handleCloseNewEmailModal}>
                    <Ionicons name="ios-close" size={24} color="gray" />
                  </TouchableOpacity>
                </View>
                <Text>Email User</Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    borderBottomWidth: 1,
                    borderColor: "gray",
                    marginBottom: 10,
                  }}
                >
                  <TextInput
                    placeholder="Enter new Email"
                    value={newEmail}
                    onChangeText={(text) => setnewEmail(text)}
                    style={{ flex: 1, padding: 5 }}
                  />
                  <TouchableOpacity
                    onPress={handleClearTextInputEmail}
                    style={{ paddingRight: 5 }}
                  >
                    <Ionicons name="ios-close-circle" size={20} color="gray" />
                  </TouchableOpacity>
                </View>
                <Button title="Save" onPress={ChangeEmail} />
              </View>
            </Animated.View>
          </View>
        </Modal>

        {/* Email End */}

        {/* Password Start */}
        <TouchableOpacity onPress={handleOpenChangePasswordModal}>
          <View style={styles.itemContainer}>
            <Text style={styles.label}>Change Password</Text>
            <AntDesign name="right" size={24} color="gray" />
          </View>
        </TouchableOpacity>

        <Modal
          visible={isChangePasswordModalVisible}
          animationType="slide"
          transparent={true}
        >
          <View style={styles.modalBackground}>
            <Animated.View style={[styles.modalContainer]}>
              <View style={styles.modalContent}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      flex: 1,
                      marginBottom: 10,
                      fontSize: 20,
                      fontWeight: "700",
                      textAlign: "center",
                    }}
                  >
                    Change Password
                  </Text>
                  <TouchableOpacity onPress={handleCloseChangePasswordModal}>
                    <Ionicons name="ios-close" size={24} color="gray" />
                  </TouchableOpacity>
                </View>
                <Text>Password</Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    borderBottomWidth: 1,
                    borderColor: "gray",
                    marginBottom: 10,
                  }}
                >
                  <TextInput
                    placeholder="Enter new password"
                    value={newPassword}
                    onChangeText={(text) => setNewPassword(text)}
                    secureTextEntry={!isPasswordVisible}
                    style={{ flex: 1, padding: 5 }}
                  />
                  <TouchableOpacity
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                    style={{ paddingRight: 5 }}
                  >
                    <Ionicons
                      name={isPasswordVisible ? "ios-eye-off" : "ios-eye"}
                      size={20}
                      color="gray"
                    />
                  </TouchableOpacity>
                </View>
                <Button title="Save" onPress={ChangePassword} />
              </View>
            </Animated.View>
          </View>
        </Modal>

        {/* Password End */}

        {/* Remove accunt Start */}
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <TouchableOpacity
            style={[
              {
                padding: 10,
                borderRadius: 20,
                width: 160,
                height: 45,
                alignItems: "center",
                marginTop: 50,
                borderWidth: 2,
                borderColor: "#ff5e5e",
              },
              {
                backgroundColor: isPressed ? "red" : "#ffffff",
                borderColor: isPressed ? "#ff00b3" : "red",
              },
            ]}
            onPress={handleRemoveAccount}
          >
            <View>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "500",
                  color: isPressed ? "white" : "black",
                }}
              >
                Remove account
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* Remove accunt End */}

        {/* Remove account modal Start */}
        <Modal
          visible={isModalRemoveaccount}
          animationType="slide"
          transparent={true}
        >
          <View style={styles.modalBackground}>
            <Animated.View style={[styles.modalContainer, { bottom: 30 }]}>
              <View
                style={[
                  styles.modalContent,
                  {
                    width: "90%",
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                  },
                ]}
              >
                <Text style={{ fontSize: 16 }}>
                  Removing the account will delete all of its message. contact,
                  and other data from the device. Continue?
                </Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonWithDivider]}
                    onPress={handleRemoveAccountClose}
                  >
                    <Text style={{ fontSize: 19 }}>Cancel</Text>
                  </TouchableOpacity>
                  <View style={styles.divider} />
                  <TouchableOpacity
                    style={[styles.button, styles.buttonWithDivider]}
                    onPress={RemoveUser}
                  >
                    <Text style={{ fontSize: 19, color: "red" }}>
                      Remove account
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Animated.View>
          </View>
        </Modal>

        {/* Remove modal End */}
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
  itemContainer: {
    borderBottomWidth: 1,
    borderTopWidth: 0.9,
    borderColor: "#f5f5f5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
  },
  modalContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  modalBackground: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(128, 128, 128, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
    width: "100%",
    height: "100%",
  },
  input: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    padding: 10,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "400",
    marginTop: 15,
    marginBottom: 15,
  },
  value: {
    fontSize: 18,
    fontWeight: "400",
    marginTop: 15,
    marginBottom: 15,
  },
  text: {
    color: "gray",
  },
  button: {
    padding: 10,
    borderRadius: 20,
    width: 160,
    height: 45,
    alignItems: "center",
    marginTop: 20,
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonWithDivider: {},
  divider: {
    width: 0.5,
    height: 30,
    backgroundColor: "gray",
    position: "absolute",
    top: 30,
  },
});
