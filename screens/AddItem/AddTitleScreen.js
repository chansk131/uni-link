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
import * as firebase from 'firebase'

export default class AddTitleScreen extends React.Component {
  state = {
    uid: null,
    key: null,
    section: null,
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

  componentDidMount() {
    const { navigation } = this.props
    const uid = navigation.getParam('uid') || null
    const key = navigation.getParam('key') || null
    const section = navigation.getParam('section') || null
    const name = navigation.getParam('name') || ''
    if (name != '') {
      this.updateInput('name', name)
    }
    this.setState({ uid, key, section })
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

  submit = () => {
    if (
      this.state.form.name.valid &&
      this.state.key != null &&
      this.state.uid != null
    ) {
      try {
        this.addToDatabase()
      } catch (e) {
        console.log(e)
      } finally {
        this.navigateBack()
      }
    } else {
      alert('Please add title')
    }
  }

  navigateBack = () => {
    this.props.navigation.navigate('AddItem', {
      name: this.state.form.name.value,
      section: this.state.section,
    })
  }

  addToDatabase = () => {
    const name = this.state.form.name.value
    let updates = {}
    updates['/products/' + this.state.key + '/name'] = name
    updates['/products/' + this.state.key + '/isAvailable'] = false
    updates[
      '/productsByOwners/' + this.state.uid + '/' + this.state.key + '/name'
    ] = name
    updates[
      '/productsByOwners/' +
        this.state.uid +
        '/' +
        this.state.key +
        '/isAvailable'
    ] = false
    return firebase
      .database()
      .ref()
      .update(updates)
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
