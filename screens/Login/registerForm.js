import React from 'react'
import { Text, ScrollView, KeyboardAvoidingView, Button } from 'react-native'
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
import { ProfilePic } from '../../components/ProfilePic'

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
        },
      },
      confirmPassword: {
        value: '',
        valid: false,
        rules: {
          isRequired: true,
          isValid: true,
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
    if (register != true) {
      // show edit profile detail
      console.log(this.props.user)
    }
  }

  changeProfilePic = () => {
    console.log('change profile pic')
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
        <ScrollView style={{ width: '100%' }}>
          <ProfilePic onPress={() => this.changeProfilePic()} />
          <StyleProvider style={getTheme(platform)}>
            <Form style={{ width: '100%', padding: '5%' }}>
              <Item floatingLabel>
                <Label>First Name</Label>
                <Input />
              </Item>
              <Item floatingLabel theme={{ inputHeightBase: 0 }}>
                <Label>Surname</Label>
                <Input />
              </Item>
              <Item floatingLabel>
                <Label>Password</Label>
                <Input secureTextEntry />
              </Item>
              <Item floatingLabel>
                <Label>Re-type Password</Label>
                <Input secureTextEntry />
              </Item>
              <Item stackedLabel>
                <Label>Date of Birth</Label>
                <DatePicker
                  defaultDate={new Date()}
                  minimumDate={new Date(2018, 1, 1)}
                  maximumDate={new Date(2018, 12, 31)}
                  locale={'en'}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={'fade'}
                  androidMode={'default'}
                  placeHolderText={this.state.chosenDate
                    .toString()
                    .substr(4, 12)}
                  textStyle={{ color: 'green' }}
                  placeHolderTextStyle={{ color: '#d3d3d3' }}
                  onDateChange={this.setDate}
                />
              </Item>
              <Item floatingLabel>
                <Label>University email</Label>
                <Input />
              </Item>
              <Item floatingLabel>
                <Label>University</Label>
                <Input />
              </Item>
              <Item floatingLabel>
                <Label>Location</Label>
                <Input />
              </Item>
              <Item floatingLabel>
                <Label>Telephone number</Label>
                <Input />
              </Item>
            </Form>
          </StyleProvider>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps)(RegisterForm)
