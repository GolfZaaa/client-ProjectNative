import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native';

const HomeScreen = ({navigation}:any) => {
  return (
    <View>
      <TouchableOpacity style={{marginTop:20}} onPress={() => navigation.navigate('productdetail')} >
      <View style={{ borderWidth: 1, margin: 20 }}>
        <Image
          source={{
            uri: "https://images.pexels.com/photos/162993/food-thai-spicy-asian-162993.jpeg?cs=srgb&dl=pexels-pixabay-162993.jpg&fm=jpg",
          }}
          style={styles.image}
        />
        <View style={{ flexDirection: "row" ,marginBottom:10 }}>
          <Text style={{ fontSize: 20, marginRight: 170,marginLeft:10 }}>papaya salad</Text>
          <Text style={{ fontSize: 20 }}>200$</Text>
        </View>
      </View>
      </TouchableOpacity>
    </View>
  );
}

export default HomeScreen

const styles = StyleSheet.create({
  image: {
    height: 200,
    margin:20
  },
});