import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { selectEmail, selectToken, selectusername, updateToken } from "./accountSlice";
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";

const SettingUser = ({navigation}:any) => {
    
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const email = useSelector(selectEmail);


  console.log(email);


  const handleLogout = async () => {
    if (token !== "") {
      try {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('userid');
        dispatch(updateToken(null));
      } catch (error) {
        console.log("Error removing token:", error);
      }
    }
  };
  
  
  


  return (
    <View style={styles.container}>
      <View style={{padding:80,borderWidth:1,borderRadius:30}}>
        <FontAwesome
          name="user-circle-o"
          size={184}
          color="black"
          style={{ marginBottom: 30, bottom: 30 }}
        />
        <Text>{email}</Text>
        <TouchableOpacity style={styles.button} >
          <Text style={styles.buttonText}>ChangeEmail</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} >
          <Text style={styles.buttonText}>ChangeName</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} >
          <Text style={styles.buttonText}>ChangePassword</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",

  },
  button: {
    backgroundColor: "lightblue",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SettingUser;
