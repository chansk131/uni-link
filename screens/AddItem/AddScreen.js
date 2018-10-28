import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default class AddScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('AddItem')}
        >
          <Text>Add Marketplace Product</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('AddService')}
        >
          <Text>Add Skillshare Service</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
