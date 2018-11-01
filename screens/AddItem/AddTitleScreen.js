import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import ValidationRules from '../../components/forms/validationRules'

export default class AddTitleScreen extends React.Component {
  state = {
    form: {
      name: {
        value: '',
        valid: false,
        rules: {
          isRequired: true,
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
    this.setState(
      {
        form: formCopy,
      })
  }

  submit = () => {
    this.state.form.name.valid
      ? console.log(this.state.form.name.value)
      : console.log('not valid ')
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          paddingHorizontal: '5%',
          paddingTop: 10,
        }}
      >
        <Label label={'Title'} required={true} />
        <TextInput
          autoFocus
          style={styles.txtInput}
          onChangeText={value => this.updateInput('name', value)}
          value={this.state.form.name.value}
          placeholder={`Name of ${this.state.section}`}
        />
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 3 }} />
          <TouchableOpacity
            onPress={() => this.submit()}
            style={styles.submitButtonContainer}
          >
            <Text style={styles.submitButtonTxt}>OKAY</Text>
          </TouchableOpacity>
          <View style={{ height: 50 }} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  txtInput: {
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: '#eaeaea',
    fontSize: 14,
    padding: 5,
    marginTop: 10,
  },
  txtLabelContainer: {
    marginTop: 10,
    flexDirection: 'row',
  },
  txtLabel: {
    fontSize: 20,
  },
  txtRequired: {
    fontSize: 20,

    color: 'red',
  },
  submitButtonContainer: {
    flex: 1,
    backgroundColor: 'white',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    elevation: 3,
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 50,
    marginHorizontal: '5%',
    borderRadius: 20,
  },
  submitButtonTxt: {
    fontSize: 20,
  },
})

const Label = ({ label, required }) => (
  <View style={styles.txtLabelContainer}>
    <Text style={styles.txtLabel}>{label}</Text>
    {required ? <Text style={styles.txtRequired}>*</Text> : null}
  </View>
)
