import React from 'react'
import { Image, TouchableOpacity, StyleSheet, View, Text } from 'react-native'

export const ProfilePic = props => (
  <TouchableOpacity onPress={props.onPress} style={styles.container}>
    {props.source ? (
      <Image style={styles.image} source={{ uri: props.source }} />
    ) : (
      <Image
        style={styles.image}
        defaultSource={require('../assets/images/user.png')}
      />
    )}
    {props.status === 'registerForm' ? (
      <View
        style={{
          position: 'absolute',
          right: 5,
          top: 2,
          backgroundColor: '#8B3535',
          borderRadius: 10,
          minWidth: 20,
          height: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
          +
        </Text>
      </View>
    ) : null}
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
