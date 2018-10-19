import React from 'react'
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Button,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { CheckBox } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as firebase from 'firebase'
import Expo from 'expo'
import { connect } from 'react-redux'
import { withNavigationFocus } from 'react-navigation'

import ValidationRules from '../../components/forms/validationRules'

class AddItemScreen extends React.Component {
  state = {
    uid: null,
    form: {
      condition: {
        value: '',
        valid: false,
        rules: {
          isRequired: true,
        },
      },
      category: {
        value: '',
        valid: false,
        rules: {
          isRequired: true,
        },
      },
      name: {
        value: '',
        valid: false,
        rules: {
          isRequired: true,
        },
      },
      price: {
        value: '',
        valid: false,
        rules: {
          isRequired: true,
          isNumber: true,
        },
      },
      location: {
        value: '',
        valid: false,
        rules: {
          isRequired: true,
        },
      },
      type: {
        value: '',
        valid: false,
        rules: {
          // isRequired: true,
        },
      },
    },
  }

  componentDidMount() {
    const newPostKey = firebase
      .database()
      .ref()
      .child('posts')
      .push().key
    this.setState({ key: newPostKey })
    console.log('activated')
    this.checkAuth()
    this._onFocusListener = this.props.navigation.addListener(
      'didFocus',
      payload => {
        this.checkCondition()
        this.checkCategory()
        console.log(this.state.form)
      }
    )
  }

  checkAuth = () => {
    if (this.props.user.uid) {
      const uid = this.props.user.uid
      this.setState({ uid })
      console.log('logged in')
    } else {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.setState({ uid: user.uid })
          console.log('logged in')
        } else {
          console.log('logged out')
        }
      })
    }
    console.log(this.props.user)
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
    console.log(this.state.form)
  }

  checkCondition = () => {
    const { navigation } = this.props
    const condition = navigation.getParam('condition')
    if (condition != undefined) {
      console.log(`condition is ${condition}`)
      this.updateInput('condition', condition)
    }
  }

  checkCategory = () => {
    const { navigation } = this.props
    const category = navigation.getParam('category')
    if (category != undefined) {
      console.log(`category is ${category}`)
      this.updateInput('category', category)
    }
  }

  renderCondition = () => {
    const { navigation } = this.props
    const condition = navigation.getParam('condition')
    if (condition) {
      return (
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
          }}
          onPress={() => {
            this.props.navigation.navigate('Condition', { condition })
          }}
        >
          <Ionicons name={'md-radio-button-on'} size={20} color={'black'} />
          <Text> {condition}</Text>
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
          }}
          onPress={() => {
            this.props.navigation.navigate('Condition')
          }}
        >
          <Ionicons name={'md-radio-button-off'} size={20} color={'black'} />
          <Text style={{ color: 'lightgrey' }}> Press to choose condition</Text>
        </TouchableOpacity>
      )
    }
  }

  renderCategory = () => {
    const { navigation } = this.props
    const category = navigation.getParam('category')
    if (category) {
      return (
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
          }}
          onPress={() => {
            this.props.navigation.navigate('CategoryItem', { category })
          }}
        >
          <Ionicons name={'md-radio-button-on'} size={20} color={'black'} />
          <Text> {category}</Text>
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
          }}
          onPress={() => {
            this.props.navigation.navigate('CategoryItem')
          }}
        >
          <Ionicons name={'md-radio-button-off'} size={20} color={'black'} />
          <Text style={{ color: 'lightgrey' }}> Press to choose category</Text>
        </TouchableOpacity>
      )
    }
  }

  render() {
    return (
      <ScrollView
        style={{
          flex: 1,
          paddingTop: 10,
          backgroundColor: 'white',
        }}
      >
        {this.state.uid ? (
          <View style={{ marginHorizontal: '5%' }}>
            <Text style={styles.txtLabel}>Title</Text>
            <TextInput
              style={styles.txtInput}
              onChangeText={value => this.updateInput('name', value)}
              value={this.state.form.name.value}
              placeholder="Name of product"
            />
            <Text style={styles.txtLabel}>Photos</Text>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('PhotoUpload')
              }}
            >
              <Text>Photos</Text>
            </TouchableOpacity>
            <Text style={styles.txtLabel}>Condition</Text>
            {this.renderCondition()}
            {/* show selected choice and this view can be pressed to go to new selecting radio buttons choices */}

            <Text style={styles.txtLabel}>Pricing</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={{
                  fontSize: 14,
                  marginTop: 10,
                }}
              >
                £
              </Text>
              <TextInput
                style={styles.txtInput}
                onChangeText={value => this.updateInput('price', value)}
                value={this.state.form.price.value}
                placeholder="9"
                keyboardType="number-pad"
              />
            </View>

            <Text style={styles.txtLabel}>Category</Text>
            {this.renderCategory()}
            <Text style={styles.txtLabel}>Product/Service Type</Text>
            <TextInput
              style={styles.txtInput}
              onChangeText={value => this.updateInput('type', value)}
              value={this.state.form.type.value}
              placeholder="Tablet, Novel, Computing, ..."
            />
            <Text style={styles.txtLabel}>About</Text>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('AboutItem')
              }}
            >
              <Text>ABOUT</Text>
            </TouchableOpacity>
            <Text style={styles.txtLabel}>Prefered location</Text>
            <TextInput
              style={styles.txtInput}
              onChangeText={value => this.updateInput('location', value)}
              value={this.state.form.location.value}
              placeholder="Enter location you preferred to sell this product/service"
            />
          </View>
        ) : (
          <Button
            title="go sign up"
            onPress={() => {
              this.props.navigation.navigate('Signin')
            }}
          />
        )}
      </ScrollView>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps)(withNavigationFocus(AddItemScreen))

const styles = StyleSheet.create({
  txtLabel: {
    fontSize: 20,
    marginTop: 10,
  },
  txtInput: {
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: '#eaeaea',
    fontSize: 14,
    padding: 5,
    marginTop: 10,
  },
})

/*
https://uni-link-9f8f5.firebaseio.com/products.json/
key
  - name
  - price
  - pic
  - location
  - user_id
  - description
  - is_available
  - rating
  - category
  - favoriteCount

User
key
  - name
  - email
  - password
  - pic
  - prefPlace: prefered place
  - university
  - std_id_pic: ID card photo
  - exp_date: expiry date
  - is_active
  - is_not_blocked
  - recent search
    - product_id
    - ...
  - category count
    - a: 5
  - group
    - group_id

Group
key
  - name
  - user
    - user_id
*/
