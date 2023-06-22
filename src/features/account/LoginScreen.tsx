import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';


import { useSelector, useDispatch } from 'react-redux'

import { decrement, increment, incrementByAmount } from './accountSlice';
import { RootState } from '../../redux/app/store';

const LoginScreen = ({navigation}:any) => {
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [seePassword, setSeePassword] = useState(true);
  const [checkValidusername, setCheckValidusername] = useState(false);

  const count = useSelector((state: RootState) => state.counter.value); // ใช้ RootState ในการเข้าถึงค่า counter
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  const handleIncrementByAmount = () => {
    dispatch(incrementByAmount(5)); // ตัวอย่างการเพิ่มค่าทีละ 5
  };

  const handleCheckusername = (text: string) => {
    setusername(text);
  };


  return (
    // <View style={styles.container}>
    //   <Text style={{marginBottom:50,fontSize:40}}>Login Screen</Text>
    //   <View style={styles.wrapperInput}>
    //     <TextInput
    //       style={styles.input}
    //       placeholder="UserName"
    //       value={username}
    //       onChangeText={text => handleCheckusername(text)}
    //     />
    //   </View>
    //   {checkValidusername ? (
    //     <Text style={styles.textFailed}>Wrong format email</Text>
    //   ) : (
    //     <Text style={styles.textFailed}> </Text>
    //   )}
    //   <View style={styles.wrapperInput}>
    //     <TextInput
    //       style={styles.input}
    //       placeholder="Password"
    //       value={password}
    //       secureTextEntry={seePassword}
    //       onChangeText={text => setPassword(text)}
    //     />
    //     <TouchableOpacity
    //       style={styles.wrapperIcon}
    //       onPress={() => setSeePassword(!seePassword)}
    //     >
    //       {/* Add your icon here */}
    //     </TouchableOpacity>
    //   </View>
    //   {username === '' || password === '' || checkValidusername === true ? (
    //     <TouchableOpacity
    //       disabled
    //       style={styles.buttonDisable}
    //     >
    //       <Text style={styles.text}>Login</Text>
    //     </TouchableOpacity>
    //   ) : (
    //     <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('home')} >
    //       <Text style={styles.text}>Login</Text>
    //     </TouchableOpacity>
    //   )}
    //   <TouchableOpacity onPress={() => navigation.navigate('register')}>
    //     <Text>Doesn't have an account ?</Text>
    //   </TouchableOpacity>
    // </View>

    <View>
      <Button onPress={handleIncrement} title='qwe'></Button>
      <Button onPress={handleDecrement} title='asd'></Button>
      <Text>{count}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  wrapperInput: {
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: 'grey',
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    padding: 10,
    width: '100%',
  },
  wrapperIcon: {
    position: 'absolute',
    right: 0,
    padding: 10,
  },
  button: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
    borderRadius: 5,
    marginTop: 25,
  },
  buttonDisable: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey',
    borderRadius: 5,
    marginTop: 25,
  },
  text: {
    color: 'white',
    fontWeight: '700',
  },
  textFailed: {
    alignSelf: 'flex-end',
    color: 'red',
  },
});

export default LoginScreen;
