import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useDispatch } from "react-redux";
import { confirmUserAsync } from "./accountSlice";

const ConfirmEmailUser = ({ route, navigation }: any) => {

  const  {email}  = route.params;
  const [emailConfirmationToken, setEmailConfirmationToken] = useState("");


  const dispatch = useDispatch();



  const handleconfirm = () => {
    if (emailConfirmationToken == "") {
      return;
    }
    dispatch(confirmUserAsync({ email, emailConfirmationToken }) as any)
    .then(() => {
      navigation.navigate("login");
    })
    .catch(() => {
      console.log("Failed to Confirm");
    });
  };
  
  
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirm Email</Text>
      <Text style={styles.description}>
        Please enter your email address and click the button below to confirm.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Token Confirm"
        onChangeText={(text) => setEmailConfirmationToken(text)}
        value={emailConfirmationToken}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleconfirm}>
        <Text style={styles.buttonText}>Confirm Email</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 32,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#4287f5",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ConfirmEmailUser;
