import React from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'

import Input from '../../components/forms/inputs'
import ValidationRules from '../../components/forms/validationRules'

class LoginForm extends React.Component {
  state = {
    type: 'Login',
    action: 'Login',
    actionMode: 'Not a user, Register',
    hasErrors: false,
    form: {
      email: {
        value: '',
        valid: false,
        type: 'textinput',
        rules: {
          isRequired: true,
          isEmail: true,
        },
      },
      password: {
        value: '',
        valid: false,
        type: 'textinput',
        rules: {
          isRequired: true,
          minLength: 6,
        },
      },
      confirmPassword: {
        value: '',
        valid: false,
        type: 'textinput',
        rules: {
          confirmPass: 'password',
        },
      },
    },
  }

  updateInput = (name, value) => {
    this.setState({
      hasErrors: false,
    })

    let formCopy = this.state.form
    formCopy[name].value = value

    let rules = formCopy[name].rules
    let valid = ValidationRules(value, rules, formCopy)

    formCopy[name].valid = valid

    this.setState({
      form: formCopy,
    })
  }

  confirmPassword = () =>
    this.state.type != 'Login' ? (
      <Input
        placeholder="Confirm your password"
        type={this.state.form.confirmPassword.type}
        value={this.state.form.confirmPassword.value}
        onChangeText={value => this.updateInput('confirmPassword', value)}
        autoCapitalize={'none'}
        secureTextEntry
      />
    ) : null

  changeFormType = () => {
    const type = this.state.type
    this.setState({
      type: type === 'Login' ? 'Register' : 'Login',
      action: type === 'Login' ? 'Register' : 'Login',
      actionMode:
        type === 'Login' ? 'Already registered, Login' : 'Not a user, Register',
    })
  }

  render() {
    return (
      <View style={styles.formInputContainer}>
        <Input
          placeholder="Enter your university email"
          type={this.state.form.email.type}
          value={this.state.form.email.value}
          onChangeText={value => this.updateInput('email', value)}
          autoCapitalize={'none'}
          keyboardType={'email-address'}
        />

        <Input
          placeholder="Enter your password"
          type={this.state.form.password.type}
          value={this.state.form.password.value}
          onChangeText={value => this.updateInput('password', value)}
          autoCapitalize={'none'}
          secureTextEntry
        />

        {this.confirmPassword()}

        <View>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              padding: 8,
            }}
            onPress={() => alert('action')}
          >
            <Text style={{ color: '#fd9727', fontSize: 20 }}>
              {this.state.action}
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              padding: 8,
            }}
            onPress={this.changeFormType}
          >
            <Text style={{ color: 'lightgrey', fontSize: 20 }}>
              {this.state.actionMode}
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              padding: 8,
            }}
            onPress={() => alert('action')}
          >
            <Text style={{ color: 'lightgrey', fontSize: 20 }}>skip</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  formInputContainer: {
    minHeight: 400,
    minWidth: 400,
  },
})

export default LoginForm
