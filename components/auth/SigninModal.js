import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import Modal from 'react-native-modal'

export const SignInModal = ({ auth, onPress }) => {
  return (
    <View>
      <Modal isVisible={auth}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <TouchableOpacity
            onPress={onPress}
            style={{
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 20,
              borderRadius: 5
            }}
          >
            <Text>This feature requires signing in</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  )
}
