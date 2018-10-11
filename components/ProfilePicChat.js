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

const renderOnlineIndicator = online => {
  let onlineIndicatorStyle = styles.onlineIndicator
  if (online) onlineIndicatorStyle.backgroundColor = '#52C181'
  else onlineIndicatorStyle.backgroundColor = '#8B3535'
  return <View style={onlineIndicatorStyle} />
}

const ProfilePicChat = props => {
  const { notCache, onPress, source, status } = props

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {renderImage({ notCache, source })}
      {renderOnlineIndicator(status)}
    </TouchableOpacity>
  )
}

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
