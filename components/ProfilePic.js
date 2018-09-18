import React from 'react'
import { Image, TouchableOpacity, StyleSheet } from 'react-native'

export const ProfilePic = props => (
  <TouchableOpacity style={styles.container}>
    <Image style={styles.image} source={require('../assets/icon.png')} />
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    width: 84,
    height: 84,
    borderRadius: 42,
    shadowColor: 'grey',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    elevation: 5,
    borderWidth: 0,
    marginLeft: 10,
  },
  image: {
    width: 84,
    height: 84,
    borderRadius: 42,
  },
})
