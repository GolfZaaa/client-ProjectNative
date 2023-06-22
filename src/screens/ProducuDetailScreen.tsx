import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const ProducuDetailScreen = ({navigation}:any) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://images.pexels.com/photos/162993/food-thai-spicy-asian-162993.jpeg?cs=srgb&dl=pexels-pixabay-162993.jpg&fm=jpg' }}
        style={styles.image}
      />
      <Text style={styles.title}>Product Title</Text>
      <Text style={styles.price}>$99.99</Text>
      <Text style={styles.description}>Tam-style pounded salads are integral to the cuisines of Laos and Isan, and they have become a fast-food, on-the-go item that can now be found all over Thailand and pretty much any place that serves Lao or Thai dishes outside of Southeast Asia.</Text>
    </View>
  )
}

export default ProducuDetailScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
    },
    image: {
      width: 200,
      height: 200,
      marginBottom: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    price: {
      fontSize: 18,
      marginBottom: 8,
    },
    description: {
      fontSize: 16,
    },
  });