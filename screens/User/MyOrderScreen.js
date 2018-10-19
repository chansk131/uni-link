import React from 'react'
import { Text, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default class MyOrderScreen extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}
      >
        <View style={{ flex: 1 }}>
          <Text>Requested</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text>Accepted</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text>Purchased</Text>
        </View>
      </View>
    )
  }
}
