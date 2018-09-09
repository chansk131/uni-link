import React from 'react'
import { View, Text, Image } from 'react-native'

export const ProductCardHalfPage = props => (
  <View
    style={{
      flex: 1,
      aspectRatio: 1.15,
      minHeight: 140,
      maxHeight: 304,
      backgroundColor: 'white',
    }}
  >
    <Image
      style={{
        maxWidth: '90%',
        maxHeight: '60%',
        borderRadius: 10,
        aspectRatio: 1.78,
      }}
      source={require('../../assets/images/placeholder.png')}
    />
    <Text style={{ fontSize: 10 }}>ProductName</Text>
    <Text style={{ fontSize: 10, fontWeight: 'bold' }}>£400.00</Text>
    <Text style={{ fontSize: 10 }}>By User</Text>
    <Text style={{ fontSize: 10 }}>Rating</Text>
  </View>
)
