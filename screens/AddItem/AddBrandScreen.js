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

export default class AddBrandScreen extends React.Component {
  state = {
    uid: null,
    key: null,
    section: null,
    form: {
      brand: {
        value: '',
        valid: true,
        rules: {
          // isRequired: true,
        },
      },
    },
  }

  componentDidMount() {
    const { navigation } = this.props
    const uid = navigation.getParam('uid') || null
    const key = navigation.getParam('key') || null
    const section = navigation.getParam('section') || null
    const brand = navigation.getParam('brand') || ''
    if (brand != '') {
      this.updateInput('brand', brand)
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
      this.state.form.brand.valid &&
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
      brand: this.state.form.brand.value,
      section: this.state.section,
    })
  }

  addToDatabase = () => {
    let updates = {}
    updates[
      '/products/' + this.state.key + '/brand'
    ] = this.state.form.brand.value
    updates['/products/' + this.state.key + '/isAvailable'] = false

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
        <Label label={'Brand'} required={false} />
        <TextInput
          autoFocus
          style={styles.txtInput}
          onChangeText={value => this.updateInput('brand', value)}
          value={this.state.form.brand.value}
          placeholder="Enter product brand, ..."
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
