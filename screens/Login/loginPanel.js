import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import LoginForm from './loginForm'

class LoginPanel extends React.Component {
  render() {
    return (
      <View>
        <LoginForm />
      </View>
    )
  }
}

const styels = StyleSheet.create({})

export default LoginPanel
