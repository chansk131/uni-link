import React from 'react'
import {
  Text,
  View,
  Button,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import ValidationRules from '../../components/forms/validationRules'
import * as firebase from 'firebase'

export default class LoginForm extends React.Component {
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

  updateInput = (field, value) => {
    // copy input into formCopy
    let formCopy = this.state.form
    formCopy[field].value = value

    // validate input
    let rules = formCopy[field].rules
    let valid = ValidationRules(value, rules, formCopy)
    formCopy[field].valid = valid

    // store input in state
    this.setState({
      form: formCopy,
    })
  }

  submitForm = () => {
    console.log(this.state.form)
    firebase
      .auth()
      .signInWithEmailAndPassword(
        this.state.form.email.value,
        this.state.form.password.value
      )
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code
        var errorMessage = error.message
        // ...
        console.log(errorMessage)
      })
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
            onChangeText={value => this.updateInput('email', value)}
            value={this.state.form.email.value}
            placeholder="University email"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.txtInput}
            onChangeText={value => this.updateInput('password', value)}
            value={this.state.form.password.value}
            placeholder="Password"
            secureTextEntry
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'flex-end',
              flexDirection: 'row',
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              style={styles.bntContainer}
              onPress={() => this.submitForm()}
            >
              <Text style={styles.btnTxt}>OKAY</Text>
            </TouchableOpacity>
          </View>
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
  bntContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 8,
    elevation: 5,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    marginHorizontal: 5,
  },
  btnTxt: {
    fontWeight: 'bold',
  },
})
