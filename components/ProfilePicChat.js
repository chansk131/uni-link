import React from 'react'
import { Image, TouchableOpacity, StyleSheet, View, Text } from 'react-native'

const ProfilePicChat = props => (
  <TouchableOpacity onPress={props.onPress} style={styles.container}>
    {props.source ? (
      <Image style={styles.image} source={{ uri: props.source }} />
    ) : (
      <Image
        style={styles.image}
        defaultSource={require('../assets/images/user.png')}
      />
    )}
    <View style={styles.onlineIndicator} />
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    width: 54,
    height: 54,
    borderRadius: 42,
    borderColor: '#707070',
    borderWidth: 0.5,
    marginLeft: 10
  },
  image: {
    width: 54,
    height: 54,
    borderRadius: 42
  },
  onlineIndicator: {
    position: 'absolute',
    right: 0,
    top: 2,
    backgroundColor: '#8B3535',
    borderRadius: 6,
    width: 12,
    height: 12,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export { ProfilePicChat }
