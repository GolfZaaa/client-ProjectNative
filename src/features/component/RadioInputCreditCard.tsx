import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const RadioInputCreditCard = ({ label, selected, onSelect }:any) => {
  return (
    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={onSelect}>
      <View
        style={{
          width: 20,
          height: 20,
          borderRadius: 10,
          borderWidth: 2,
          borderColor: selected ? '#c88cf0' : '#9b9b9b',
          marginRight: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {selected && (
          <View
            style={{
              width: 12,
              height: 12,
              borderRadius: 6,
              backgroundColor: '#df01df',
            }}
          />
        )}
      </View>
      <Text style={{ fontSize: 16, color: '#9b9b9b', fontWeight: '400' }}>{label}</Text>
    </TouchableOpacity>
  )
}

export default RadioInputCreditCard

const styles = StyleSheet.create({})