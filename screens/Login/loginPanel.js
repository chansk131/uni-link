import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'

class LoginPanel extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
        <View style={{ flex: 3, justifyContent: 'flex-end' }}>
          <Image
            style={{ width: 128, height: 128 }}
            source={require('../../assets/images/LogoULinks-small.jpeg')}
          />
        </View>
        <View style={{ flex: 1 }} />
        <View style={{ flex: 5, justifyContent: 'flex-start' }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('LoginForm')}
            style={[styles.btnContainer]}
          >
            <Text style={{ color: 'white', fontSize: 20 }}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('RegisterForm', { register: true })
            }
            style={[styles.btnContainer, { marginTop: 30 }]}
          >
            <Text style={{ color: 'white', fontSize: 20 }}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  btnContainer: {
    width: 150,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    padding: 4,
  },
})

export default LoginPanel
