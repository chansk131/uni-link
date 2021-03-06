import React from 'react'
import { connect } from 'react-redux'
import { fetchUser } from '../../redux/actions'
import {
  Text,
  View,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import ValidationRules from '../../components/forms/validationRules'
import * as firebase from 'firebase'

class LoginForm extends React.Component {
  state = {
    uid: '',
    isSubmitting: false,
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

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.navigateToMyUniLink()
      }
    })

    // redundant, but if they somehow end up back at here after while logged in,
    // send them to My U-Links (ie UserScreen)
    if (firebase.auth().currentUser) this.navigateToMyUniLink()
  }

  navigateToMyUniLink = () => {
    this.props.fetchUser()

    this.setState({ isSubmitting: false })
    this.props.navigation.navigate('UserContent')
  }

  updateInput = (field, value) => {
    // trim email
    value = field === 'email' ? value.trim() : value

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
    this.setState({ isSubmitting: true })
    let isformValid = true
    let formToSubmit = {}
    const formCopy = this.state.form
    for (let key in formCopy) {
      isformValid = isformValid && formCopy[key].valid
      formToSubmit[key] = formCopy[key].value
    }

    if (isformValid) {
      // console.log(formToSubmit)
      this.signIn(formToSubmit.email, formToSubmit.password)
    } else {
      this.setState({ hasErrors: true })
      this.setState({ isSubmitting: false })
      console.log('form error')
    }
  }

  signIn = (email, password) => {
    // console.log(email, password)
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => {
        // Handle Errors here.
        var errorCode = error.code
        var errorMessage = error.message
        // ...
        console.log(errorMessage)
        this.setState({ hasErrors: true, isSubmitting: false })
      })
  }

  formHasErrors = () =>
    this.state.hasErrors ? (
      <View style={styles.errorContainer}>
        <Text style={styles.errorLabel}>Oops, check your info</Text>
      </View>
    ) : null

  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
        <View
          style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}
        >
          <View style={{ flex: 3 }} />
          <View style={{ flex: 3, justifyContent: 'flex-end' }}>
            <Image
              style={{ width: 128, height: 128 }}
              source={require('../../assets/images/LogoULinks-small.jpeg')}
            />
          </View>
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
              keyboardType={Platform.OS === 'ios' ? 'email-address' : 'default'}
              autoCapitalize="none"
            />
            <View style={{ width: '100%', height: 20 }}>
              {this.formHasErrors()}
            </View>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'flex-end',
                flexDirection: 'row',
                marginTop: 10,
              }}
            >
              {this.state.isSubmitting ? (
                <ActivityIndicator size="large" color="lightgrey" />
              ) : (
                <TouchableOpacity
                  style={styles.bntContainer}
                  onPress={() => this.submitForm()}
                >
                  <Text style={styles.btnTxt}>OKAY</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
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
  errorContainer: {
    // marginBottom: 20,
    // marginTop: 10,
  },
  errorLabel: {
    color: 'red',
    fontWeight: 'bold',
  },
})

export default connect(
  null,
  { fetchUser }
)(LoginForm)
