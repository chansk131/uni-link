import React from 'react'
import {
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Button,
  TextInput,
  StyleSheet,
} from 'react-native'
import {
  DatePicker,
  Form,
  Item,
  Input,
  Label,
  Icon,
  StyleProvider,
} from 'native-base'
import getTheme from '../../native-base-theme/components'
import platform from '../../native-base-theme/variables/platform'
import { connect } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as firebase from 'firebase'

import { ProfilePic } from '../../components/ProfilePic'
import ValidationRules from '../../components/forms/validationRules'

// USE ACTION SHEET FOR SELECTING CAMERA ROLL OR CAMERA
class RegisterForm extends React.Component {
  state = {
    chosenDate: new Date(),
    hasErrors: false,
    form: {
      name: {
        value: '',
        valid: false,
        rules: {
          isRequired: true,
        },
      },
      surname: {
        value: '',
        valid: false,
        rules: {
          isRequired: true,
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
      confirmPassword: {
        value: '',
        valid: false,
        rules: {
          isRequired: true,
          confirmPass: 'password',
        },
      },
      email: {
        value: '',
        valid: false,
        rules: {
          isRequired: true,
          isEmail: true,
        },
      },
      university: {
        value: '',
        valid: false,
        rules: {
          isRequired: true,
        },
      },
      location: {
        value: '',
        valid: false,
        rules: {},
      },
      tel: {
        value: '',
        valid: false,
        rules: {},
      },
    },
  }

  setDate = newDate => {
    this.setState({ chosenDate: newDate })
  }

  componentDidMount() {
    const { navigation } = this.props
    const register = navigation.getParam('register') // check wheter it is registration or not
    console.log(register)
    // if (register != true) {
    // show edit profile detail
    // console.log(this.props.user)
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        var uid = user.uid
        console.log('auth changed')
        this.addUserToDatabase(uid)
        // ...
      } else {
        // User is signed out.
        // ...
      }
    })
    // }
  }

  changeProfilePic = () => {
    console.log('change profile pic')
  }

  launchCameraRollAsync = async () => {
    let { status } = await Expo.Permissions.askAsync(
      Expo.Permissions.CAMERA_ROLL
    )
    if (status != 'granted') {
      console.error('Camera roll perms not granted')
      return
    }

    let img = await Expo.ImagePicker.launchImageLibraryAsync()
    this.setState({ chosenImage: img })
    console.log(this.state.chosenImage)
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

  registertUser = () => {
    let isformValid = true
    let formToSubmit = {}
    const formCopy = this.state.form
    for (let key in formCopy) {
      isformValid = isformValid && formCopy[key].valid
      if (key !== 'confirmPassword') {
        formToSubmit[key] = formCopy[key].value
      }
    }

    if (isformValid) {
      console.log(formToSubmit)
      this.signup(formToSubmit['email'], formToSubmit['password'])
    } else {
      this.setState({ hasErrors: true })
      console.log('form error')
    }
  }

  signup = (email, password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(error => {
        // Handle Errors here.
        var errorCode = error.code
        var errorMessage = error.message
        this.setState({ hasErrors: true, loginErr: error.message })
        console.log(errorMessage)
        // ...
      })
  }

  addUserToDatabase = uid => {
    // Get a key for a new Post.
    // var newPostKey = firebase
    //   .database()
    //   .ref()
    //   .child('products')
    //   .push().key

    // const img = await this._handleImagePicked(
    //   this.state.chosenImage,
    //   newPostKey
    // )

    // if (img) {
    // A post entry.

    var postUserData = {
      name: this.state.form.name.value,
      surname: this.state.form.surname.value,
      dob: this.state.chosenDate,
      email: this.state.form.email.value,
      university: this.state.form.university.value,
      location: this.state.form.location.value,
      tel: this.state.form.tel.value,
      isAvailable: true,
      timestamp: Date.now(),
    }
    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {}
    updates['/users/' + uid] = postUserData

    return firebase
      .database()
      .ref()
      .update(updates)
    // }
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}
        behavior="padding"
        enabled
      >
        <ScrollView
          style={{
            width: '100%',
            paddingHorizontal: '10%',
          }}
          contentContainerStyle={{ alignItems: 'center' }}
        >
          <ProfilePic
            style={{ marginBottom: 30 }}
            onPress={() => this.launchCameraRollAsync()}
          />
          <TextInput
            style={styles.txtInput}
            onChangeText={value => this.updateInput('name', value)}
            value={this.state.form.name.value}
            placeholder="First Name"
          />
          <TextInput
            style={styles.txtInput}
            onChangeText={value => this.updateInput('surname', value)}
            value={this.state.form.surname.value}
            placeholder="Surname"
          />
          <TextInput
            style={styles.txtInput}
            onChangeText={value => this.updateInput('password', value)}
            value={this.state.form.password.value}
            placeholder="Password"
            secureTextEntry
          />
          <TextInput
            style={styles.txtInput}
            onChangeText={value => this.updateInput('confirmPassword', value)}
            value={this.state.form.confirmPassword.value}
            placeholder="Re-type Password"
            secureTextEntry
          />
          <Text
            style={{
              width: '100%',
              alignContent: 'flex-start',
              fontSize: 13,
              marginTop: 5,
              color: 'grey',
            }}
          >
            Date of Birth
          </Text>
          <DatePicker
            defaultDate={new Date()}
            minimumDate={new Date(1990, 1, 1)}
            maximumDate={new Date(2018, 12, 31)}
            locale={'en'}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={'fade'}
            androidMode={'default'}
            placeHolderText={this.state.chosenDate.toString().substr(4, 12)}
            textStyle={{ color: 'black', fontSize: 14 }}
            placeHolderTextStyle={{ color: '#d3d3d3', fontSize: 14 }}
            onDateChange={this.setDate}
          />
          <TextInput
            style={styles.txtInput}
            onChangeText={value => this.updateInput('email', value)}
            value={this.state.form.email.value}
            placeholder="University email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.txtInput}
            onChangeText={value => this.updateInput('university', value)}
            value={this.state.form.university.value}
            placeholder="University"
          />
          <TextInput
            style={styles.txtInput}
            onChangeText={value => this.updateInput('location', value)}
            value={this.state.form.location.value}
            placeholder="Location"
          />
          <TextInput
            style={styles.txtInput}
            onChangeText={value => this.updateInput('tel', value)}
            value={this.state.form.tel.value}
            placeholder="Telephone"
            keyboardType="phone-pad"
          />
          <Button onPress={() => this.registertUser()} title="OKAY" />
        </ScrollView>
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
    marginTop: 10,
  },
  txt: {
    width: '100%',
    fontSize: 14,
    padding: 5,
    marginTop: 10,
  },
})

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps)(RegisterForm)
