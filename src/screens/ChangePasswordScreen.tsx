import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const ChangePasswordScreen = ({navigation}:any) => {
  return (
<View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'white'}
        translucent
      />
      <View style={styles.headerContainer}>
      </View>
      <Text style={styles.title}>Change Password</Text>
      <Text style={styles.content}>
        Enter your Password, so that we can help you to recover your.
      </Text>
        <View style={styles.wrapperInput}>
          <TextInput
            placeholder="Password"
            style={styles.input}
          />
        </View>
      <TouchableOpacity style={styles.signinButton}>
        <Text style={styles.signinButtonText}>Change Password</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ChangePasswordScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginTop:180,
    },
    headerTitle: {
      fontSize: 20,
      lineHeight: 20 * 1.4,
      textAlign: 'center',
    },
    title: {
      fontSize: 20,
      lineHeight: 20 * 1.4,
      marginTop: 50,
      marginBottom: 10,
      marginHorizontal: 20,
    },
    content: {
      fontSize: 20,
      marginTop: 10,
      marginBottom: 20,
      marginHorizontal: 20,
    },
    inputContainer: {
      backgroundColor: 'gray',
      paddingHorizontal: 10,
      marginHorizontal: 20,
      borderRadius: 8,
      borderWidth: 0.5,
      borderColor: 'gray',
      justifyContent: 'center',
    },
    wrapperInput: {
      borderWidth: 0.5,
      borderRadius: 5,
      borderColor: 'grey',
      marginTop: 10,
      flexDirection: 'row',
      alignItems: 'center',
      width: '90%',
      marginLeft:18
    },
    inputText: {
      fontSize: 18,
      textAlignVertical: 'center',
      padding: 0,
      color: 'black',
      flex: 1,
    },
    input: {
      padding: 10,
      width: '80%',
    },
    signinButton: {
      backgroundColor: 'green',
      borderRadius: 8,
      marginHorizontal: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
      width: '80%',
      marginLeft:35,
    },
    signinButtonText: {
      fontSize: 18,
      lineHeight: 18 * 2.4,
      color: "white",
      height:45,
    },
  });