import React from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'

import { connect } from 'react-redux'
import { signUp, signIn, logInUser } from '../../redux/actions'
import store from '../../redux/store'
import { bindActionCreators } from 'redux'

import { login } from '../../api'

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

  formHasErrors = () =>
    this.state.hasErrors ? (
      <View style={styles.errorContainer}>
        <Text style={styles.errorLabel}>Oops, check your info</Text>
      </View>
    ) : null

  //submission
  submitUser = () => {
    let isformValid = true
    let formToSumit = {}
    const formCopy = this.state.form
    for (let key in formCopy) {
      if (this.state.type === 'Login') {
        if (key !== 'confirmPassword') {
          isformValid = isformValid && formCopy[key].valid
          formToSumit[key] = formCopy[key].value
        }
      } else {
        isformValid = isformValid && formCopy[key].valid
        formToSumit[key] = formCopy[key].value
      }
    }
    if (isformValid) {
      if (this.state.type === 'Login') {
        // this.props.signIn(formToSumit).then(() => {
        //   console.log(this.props.User)
        // })
        ///////////////////
        // login(formToSumit.email, formToSumit.password)
        // this.props.logInUser(formToSumit.email, formToSumit.password)
      } else {
        this.props.signUp(formToSumit).then(() => {
          console.log(this.props.user)
        })
      }
    } else {
      this.setState({ hasErrors: true })
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   // if (nextProps.token) {
  //   //   this.props.navigation.navigate('Main')
  //   // }
  //   console.log(nextProps)
  // }

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
        {this.formHasErrors()}

        <View>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              padding: 8,
            }}
            onPress={this.submitUser}
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
            onPress={() => this.props.navigation.navigate('Home')}
          >
            <Text style={{ color: 'lightgrey', fontSize: 20 }}>
              skip, go to Home page
            </Text>
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
  errorContainer: {
    marginBottom: 20,
    marginTop: 10,
  },
  errorLabel: {
    color: 'red',
    fontWeight: 'bold',
  },
})

const mapStateToProps = state => ({
  user: state.user,
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ signUp, signIn }, dispatch)
}

// export default LoginForm

export default connect(
  mapStateToProps,
  { logInUser }
)(LoginForm)
