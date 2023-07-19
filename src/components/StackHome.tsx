import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';

const StackHome = () => {

    const background = require('../../assets/background/home.png');

    const backgroundfood = require('../../assets/background/food.png');

  return (
    <View style={styles.container}>
      <View style={styles.card}>
      <Image source={background} style={styles.cardBackground} />
        <Text style={styles.title}>Get special discount</Text>
        <Text style={styles.discount}>up to 85%</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Claim Voucher</Text>
        </TouchableOpacity>
        <Image source={backgroundfood} style={{position: 'absolute', resizeMode: 'contain', width: 320, height: 320,left:120,top:30}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#ffffff',
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: 30,
      padding: 20,
      width: '80%',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      marginTop: 80,
      position: 'relative', 
      overflow: 'hidden', 
    },
    cardBackground: {
      position: 'absolute', 
      top: 0,
      left: 0,
      width: 500,
      height:  300,
      opacity: 0.8, 
    },
    title: {
      fontSize: 17,
      fontWeight: '500',
      marginBottom: 10,
      marginTop: 10,
      color: '#ffffff', // คุณอาจต้องเปลี่ยนสีตัวอักษรให้เหมือนกับพื้นหลังใน card เพื่อให้อ่านง่าย
    },
    discount: {
      fontSize: 38,
      marginBottom: 20,
      fontWeight: '700',
      color: '#ffffff', // คุณอาจต้องเปลี่ยนสีตัวอักษรให้เหมือนกับพื้นหลังใน card เพื่อให้อ่านง่าย
    },
    button: {
      backgroundColor: '#ffffff',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      borderRadius: 25,
      width: 130,
      marginBottom: 10,
    },
    buttonText: {
      color: '#ff8800',
      fontSize: 13,
      fontWeight: 'bold',
      marginRight: 10,
    },
  });
  

export default StackHome;
