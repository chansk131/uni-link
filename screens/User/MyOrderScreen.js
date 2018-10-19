import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
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
        <TouchableOpacity style={{ flex: 1 }} onPress={()=>this.props.navigation.navigate('MyRequested')}>
          <Text>Requested</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1 }} onPress={()=>this.props.navigation.navigate('MyAccepted')}>
          <Text>Accepted</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1 }} onPress={()=>this.props.navigation.navigate('MyPurchased')}>
          <Text>Purchased</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
