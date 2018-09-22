import React from 'react'
import {
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Button,
  TextInput,
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native'
import { DatePicker } from 'native-base'
import ActionSheet from 'react-native-actionsheet'
import { connect } from 'react-redux'
import * as firebase from 'firebase'
import { NavigationActions, StackActions } from 'react-navigation'

import { ProfilePic } from '../../components/ProfilePic'
import ValidationRules from '../../components/forms/validationRules'

// USE ACTION SHEET FOR SELECTING CAMERA ROLL OR CAMERA
class RegisterForm extends React.Component {
  state = {
    uid: '',
    isLoading: true,
    uploadForm: false,
    isRegisterForm: false,
    chosenImage: null,
    chosenDate: new Date().toString().substr(4, 12),
    picUrl: null,
    uploading: false,
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

  componentDidMount() {
    const { navigation } = this.props
    const registerForm = navigation.getParam('register') // check wheter it is registration or not
    this.setState({ isRegisterForm: registerForm })

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        var uid = user.uid
        this.setState({ uid })
        console.log('auth changed')

        if (this.state.uploadForm === true) {
          console.log('upload form')

          this.addUserToDatabase(uid)
        }

        if (registerForm === false) {
          console.log(`edit profile with uid: ${uid}`)
          // TODO Get data from firebase to populate the form
          // TODO remove password/ confirm password div

          firebase
            .database()
            .ref('/users/' + uid)
            .once('value')
            .then(snapshot => {
              this.setState({
                ...this.state,
                isLoading: false,
                chosenDate: snapshot.val().dob,
                form: {
                  ...this.state.form,
                  name: {
                    ...this.state.form.name,
                    value: snapshot.val().name,
                  },
                  surname: {
                    ...this.state.form.surname,
                    value: snapshot.val().surname,
                  },
                  email: {
                    ...this.state.form.email,
                    value: snapshot.val().email,
                  },
                  university: {
                    ...this.state.form.university,
                    value: snapshot.val().university,
                  },
                  location: {
                    ...this.state.form.location,
                    value: snapshot.val().location,
                  },
                  tel: { ...this.state.form.tel, value: snapshot.val().tel },
                },
              })
              console.log(this.state.form)

              // ...
            })
        }
      } else {
        // User is signed out.
      }
    })
  }

  // Set Profile Picture
  showProfilePictureActionSheet = () => {
    this.ActionSheet.show()
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
  }

  _handleImagePicked = async (pickerResult, imgId) => {
    try {
      this.setState({ uploading: true })

      if (!pickerResult.cancelled) {
        uploadUrl = await uploadImageAsync(pickerResult.uri, imgId)
        this.setState({ picUrl: uploadUrl })
      }
    } catch (e) {
      console.log(e)
      alert('Upload failed, sorry :(')
      return false
    } finally {
      this.setState({ uploading: false })
      return true
    }
  }

  // Prepare User Detail for Upload

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

  setDate = newDate => {
    this.setState({ chosenDate: newDate.toString().substr(4, 12) })
    console.log(newDate.toString().substr(4, 12))
  }

  submitForm = () => {
    if (this.state.isRegisterForm === true) {
      this.setState({ uploadForm: true })
      this.registertUser()
    } else {
      // EditProfileScreen
      console.log(`submit with uid: ${this.state.uid}`)
      this.addUserToDatabase(this.state.uid)
    }
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

  // Store Data to Database
  addUserToDatabase = async uid => {
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

    if (
      this.state.chosenImage !== null &&
      this.state.chosenImage.cancelled === false
    ) {
      const img = await this._handleImagePicked(this.state.chosenImage, uid)

      if (img) {
        postUserData['pic'] = this.state.picUrl
      }
    }

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {}
    updates['/users/' + uid] = postUserData

    return firebase
      .database()
      .ref()
      .update(updates)
      .then(() => {
        if (this.state.isRegisterForm) {
          const backAction = NavigationActions.back({})
          this.props.navigation.dispatch(backAction)
          this.props.navigation.navigate('Home')
        } else {
          this.props.navigation.goBack()
        }
      })
  }

  render() {
    return this.state.isLoading ? (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
        }}
      >
        <ActivityIndicator size="large" color="lightgrey" />
      </View>
    ) : (
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
            onPress={() => this.showProfilePictureActionSheet()}
            status={'registerForm'}
            source={
              this.state.chosenImage !== null
                ? this.state.chosenImage.uri
                : null
            }
          />
          <ActionSheet
            ref={o => (this.ActionSheet = o)}
            title={'Select image source'}
            options={['Camera', 'Camera Roll', 'Cancel']}
            cancelButtonIndex={2}
            // destructiveButtonIndex={2}
            onPress={index => {
              /* do something */
              if (index === 0) {
                // launch camera
              } else if (index === 1) {
                // launch camera roll
                this.launchCameraRollAsync()
              }
            }}
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
          {this.state.isRegisterForm ? (
            <View style={{ width: '100%' }}>
              <TextInput
                style={styles.txtInput}
                onChangeText={value => this.updateInput('password', value)}
                value={this.state.form.password.value}
                placeholder="Password"
                secureTextEntry
              />
              <TextInput
                style={styles.txtInput}
                onChangeText={value =>
                  this.updateInput('confirmPassword', value)
                }
                value={this.state.form.confirmPassword.value}
                placeholder="Re-type Password"
                secureTextEntry
              />
            </View>
          ) : null}

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
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'flex-start',
            }}
          >
            <DatePicker
              defaultDate={new Date()}
              minimumDate={new Date(1990, 1, 1)}
              maximumDate={new Date(2018, 12, 31)}
              locale={'en'}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType={'fade'}
              androidMode={'default'}
              placeHolderText={this.state.chosenDate}
              textStyle={{ color: 'black', fontSize: 14 }}
              placeHolderTextStyle={{ color: 'black', fontSize: 14 }}
              onDateChange={this.setDate}
            />
          </View>
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
              onPress={() => this.props.navigation.goBack()}
            >
              <Text style={styles.btnTxt}>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.bntContainer, { backgroundColor: '#428bca' }]}
              onPress={() => this.submitForm()}
            >
              <Text style={[styles.btnTxt, { color: 'white' }]}>OKAY</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

async function uploadImageAsync(uri, imgId) {
  try {
    const response = await fetch(uri)
    const blob = await response.blob()
    const ref = firebase
      .storage()
      .ref()
      .child('users/' + imgId)

    const snapshot = await ref.put(blob)
    const url = await ref.getDownloadURL()
    return url
  } catch (e) {
    console.log(e)
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

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps)(RegisterForm)
