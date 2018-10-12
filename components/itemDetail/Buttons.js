import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'

export const BuyButton = () => (
  <TouchableOpacity style={[styles.btnContainer, { backgroundColor: 'black' }]}>
    <Text style={[styles.btnTxt, { color: 'white' }]}>Buy now</Text>
  </TouchableOpacity>
)

export const CartButton = () => (
  <TouchableOpacity style={styles.btnContainer}>
    <Text style={styles.btnTxt}>Add to basket</Text>
  </TouchableOpacity>
)

export const MessageSellerButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.btnContainer}>
    <Text style={styles.btnTxt}>Message seller</Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  btnContainer: {
    width: '90%',
    marginVertical: 5,
    marginHorizontal: '5%',
    backgroundColor: 'white',
    paddingVertical: 8,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    elevation: 3
  },
  btnTxt: { fontSize: 18 }
})
