import { StyleSheet, Text, View,Image, Dimensions } from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper';
import Lottie from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const {width, height} = Dimensions.get('window'); 

const StackOnboard = ({navigation}:any) => {


    const handleDone = () => {
        navigation.navigate('firstScreen')
    }

  return (
    <View style={styles.container}>
        <Onboarding
        onDone={handleDone}
        onSkip={handleDone}
        containerStyles={{paddingHorizontal:15}}
        pages={[
              {
             backgroundColor: '#a7f0f3',
           image: (
            <View style={styles.lottie}>
                    <Lottie source={require('../../assets/icons/lottie/onboarding1.json')} autoPlay loop />
            </View>
           ),
            title: 'Boost Productivty',
             subtitle: 'welcoming, orientation, and integration of new members, employees, users, or components into an existing setup ',
           },
           {
            backgroundColor: '#ffed89',
            image: (
                <View style={styles.lottie}>
                <Lottie source={require('../../assets/icons/lottie/onboarding2.json')} autoPlay loop />
        </View>
            ),
             title: 'Work Seamlessly',
              subtitle: 'Information, training, resources, and access to tools to ensure a smooth transition into their roles.',
           },
           {
            backgroundColor: '#6e8dfd',
            image: (
                <View style={styles.lottie}>
                <Lottie source={require('../../assets/icons/lottie/onboarding3.json')} autoPlay loop />
        </View>
            ),
             title: 'Achieve Higher Goals',
              subtitle: 'Integrating new software modules, hardware components, or services into an existing system or architecture.',
           },
        ]}
            />
    </View>
  )
}

export default StackOnboard

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    lottie:{
        width:width*0.9,
        height:width,
    }
})