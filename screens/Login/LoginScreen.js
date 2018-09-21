import React from 'react'
import { Text, View, Button, TextInput, Image, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

// import LoginForm from './Login/loginForm'

export default class LoginScreen extends React.Component {
  state = {
    uid: '',
    isLoading: true,
    uploading: false,
    hasErrors: false,
    form: {
      email: {
        value: '',
        valid: false,
        rules: {
          isRequired: true,
          isEmail: true,
        },
      },
      password: {
        value: '',
        valid: false,
        rules: {
          isRequired: true,
          minLength: 6,
        },
      },
    },
  }

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
        <View
          style={{
            flex: 5,
            justifyContent: 'flex-start',
            width: '100%',
            padding: '20%',
          }}
        >
          <TextInput
            style={styles.txtInput}
            // onChangeText={value => this.updateInput('name', value)}
            value={this.state.form.name.value}
            placeholder="University email"
          />
          <TextInput
            style={styles.txtInput}
            // onChangeText={value => this.updateInput('name', value)}
            value={this.state.form.name.value}
            placeholder="Password"
            secureTextEntry
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  txtInputContainer: {
    marginLeft: 0,
    paddingHorizontal: '10%',
    marginBottom: 5,
  },
  txtInput: {
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: '#eaeaea',
    fontSize: 14,
    padding: 5,
    marginBottom: 20,
  },
})
