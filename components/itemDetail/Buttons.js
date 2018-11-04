import React from 'react'
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

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

export const EditButton = ({ onEdit }) => (
  <TouchableOpacity
    onPress={onEdit}
    style={[styles.btnContainer, { backgroundColor: 'black' }]}
  >
    <Text style={[styles.btnTxt, { color: 'white' }]}>Edit detail</Text>
  </TouchableOpacity>
)

export const MessageSellerButton = ({ onPress, disabled }) => {
  const opacity = disabled ? 0.5 : 1

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.btnContainer,
        { width: '40%', marginHorizontal: '2%', marginLeft: '5%', opacity },
      ]}
    >
      <Text style={styles.btnTxt}>Message seller</Text>
    </TouchableOpacity>
  )
}

export const WishListButton = ({ onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.btnContainer,
      {
        width: '45%',
        marginHorizontal: '2%',
        marginRight: '5%',
        flexDirection: 'row',
      },
    ]}
  >
    <Ionicons name={'md-heart'} size={20} color={'red'} />
    <Text style={styles.btnTxt}> Add to wishlist</Text>
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
    elevation: 3,
  },
  btnTxt: { fontSize: 18 },
})
