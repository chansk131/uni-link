import React from 'react'
import { Text, View, Button, TextInput } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import LoginPanel from './Login/loginPanel'

export default class LoginScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#fff' }}>
        <Text>LoginScreen!</Text>
        <LoginPanel />
        <Button
          onPress={() => this.props.navigation.navigate('Home')}
          title="Home"
        />
      </View>
    )
  }
}
