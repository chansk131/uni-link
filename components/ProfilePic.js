import React from 'react'
import { Image, TouchableOpacity, StyleSheet, View, Text } from 'react-native'
import CacheImage from './CacheImage'

const renderImage = ({ notCache, source }) => {
  if (!source) {
    return (
      <Image
        style={styles.image}
        defaultSource={require('../assets/images/user.png')}
      />
    )
  }

  if (notCache) {
    return <Image style={styles.image} source={{ uri: source }} />
  }

  return <CacheImage style={styles.image} uri={source} />
}

const renderPlus = status => {
  if (status === 'registerForm') {
    return (
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
          alignItems: 'center'
        }}
      >
        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
          +
        </Text>
      </View>
    )
  }
}

export const ProfilePic = props => {
  const { notCache, onPress, source, status } = props

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {renderImage({ notCache, source })}
      {renderPlus(status)}
    </TouchableOpacity>
  )
}

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
    marginLeft: 10
  },
  image: {
    width: 84,
    height: 84,
    borderRadius: 42
  }
})
