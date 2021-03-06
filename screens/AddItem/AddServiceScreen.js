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
  KeyboardAvoidingView,
  Dimensions,
  FlatList,
} from 'react-native'
import { CheckBox } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as firebase from 'firebase'
import Expo from 'expo'
import { connect } from 'react-redux'
import { withNavigationFocus } from 'react-navigation'

import ValidationRules from '../../components/forms/validationRules'

class AddServiceScreen extends React.Component {
  state = {
    uid: null,
    key: null,
    pic: null,
    description: [],
    qualification: [],
    form: {
      category: {
        value: '',
        valid: false,
        rules: {
          isRequired: true,
        },
      },
      pic: {
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
        this.checkCategory()
        this.checkPic()
        this.checkDescription()
        this.checkQualification()
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

  checkCategory = () => {
    const { navigation } = this.props
    const category = navigation.getParam('category')
    if (category != undefined) {
      console.log(`category is ${category}`)
      this.updateInput('category', category)
    }
  }

  checkDescription = () => {
    const { navigation } = this.props
    const description = navigation.getParam('description')
    if (description != undefined) {
      this.setState({ description })
    }
  }

  checkQualification = () => {
    const { navigation } = this.props
    const qualification = navigation.getParam('qualification')
    if (qualification != undefined) {
      this.setState({ qualification })
    }
  }

  checkPic = () => {
    const { navigation } = this.props
    const pic = navigation.getParam('pic')
    if (pic != undefined) {
      console.log(`category is ${pic}`)
      this.updateInput('pic', pic.pic1)
      let pictures = {}
      for (let picture in pic) {
        if (pic[picture] != '') pictures[picture] = pic[picture]
      }
      this.setState({ pic: pictures })
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

  renderPic = () => {
    const { navigation } = this.props
    const pic = navigation.getParam('pic')
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
        }}
      >
        {pic ? (
          <Image
            style={{
              width: screenWidth * 0.6,
              aspectRatio: 16 / 9,
              borderRadius: 5,
              marginLeft: '5%',
              resizeMode: 'contain',
            }}
            source={{
              uri: pic.pic1,
            }}
          />
        ) : (
          <View
            style={{
              width: screenWidth * 0.6,
              aspectRatio: 16 / 9,
              borderRadius: 5,
              marginLeft: '5%',
              backgroundColor: 'lightgrey',
            }}
          />
        )}

        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('PhotoUpload', {
              firebaseKey: this.state.key,
              pic,
              section: 'service',
            })
          }}
          style={{
            width: screenWidth * 0.2,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: 'lightgrey',
            marginRight: '5%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 48, color: 'lightgrey' }}>+</Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderDescription = () => {
    const { navigation } = this.props
    const description = navigation.getParam('description')
    console.log(description)
    if (description == null || description.length == 0) {
      return (
        <TouchableOpacity
          style={{ marginTop: 10 }}
          onPress={() => {
            this.props.navigation.navigate('DescriptionItem', {
              firebaseKey: this.state.key,
            })
          }}
        >
          <Text style={{ marginHorizontal: '5%', color: 'lightgrey' }}>
            Add Description
          </Text>
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity
          style={{ marginTop: 10 }}
          onPress={() => {
            this.props.navigation.navigate('DescriptionItem', {
              firebaseKey: this.state.key,
            })
          }}
        >
          <FlatList
            data={this.state.description}
            renderItem={({ item }) => (
              <View
                key={item.key}
                style={{
                  paddingVertical: 4,
                  paddingHorizontal: '5%',
                }}
              >
                <Text style={{ fontSize: 16 }}>
                  {BULLET + '  ' + item.value}
                </Text>
              </View>
            )}
          />
        </TouchableOpacity>
      )
    }
  }

  renderQualification = () => {
    const { navigation } = this.props
    const qualification = navigation.getParam('qualification')
    console.log(qualification)
    if (qualification == null || qualification.length == 0) {
      return (
        <TouchableOpacity
          style={{ marginTop: 10 }}
          onPress={() => {
            this.props.navigation.navigate('QualificationItem', {
              firebaseKey: this.state.key,
            })
          }}
        >
          <Text style={{ marginHorizontal: '5%', color: 'lightgrey' }}>
            Add Qualification
          </Text>
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity
          style={{ marginTop: 10 }}
          onPress={() => {
            this.props.navigation.navigate('QualificationItem', {
              firebaseKey: this.state.key,
            })
          }}
        >
          <FlatList
            data={this.state.qualification}
            renderItem={({ item }) => (
              <View
                key={item.key}
                style={{
                  paddingVertical: 4,
                  paddingHorizontal: '5%',
                }}
              >
                <Text style={{ fontSize: 16 }}>
                  {BULLET + '  ' + item.value}
                </Text>
              </View>
            )}
          />
        </TouchableOpacity>
      )
    }
  }

  submit = () => {
    // check if form is valid
    let isformValid = true
    const formCopy = this.state.form
    for (let key in formCopy) {
      isformValid = isformValid && formCopy[key].valid
    }
    if (isformValid) {
      try {
        this.addToDatabase()
      } catch (e) {
        console.log(e)
        return
      } finally {
        let postProductByOwnerData = {
          isAvailable: true,
          name: this.state.form.name.value,
          pic: this.state.form.pic.value,
          price: this.state.form.price.value,
          timestamp: firebase.database.ServerValue.TIMESTAMP,
          objectID: this.state.key,
          user: this.props.user.username,
        }
        this.props.navigation.navigate('ItemDetail', {
          products: postProductByOwnerData,
        })
      }
    } else {
      console.log('not valid')
    }
  }

  addToDatabase = () => {
    let description = {}

    for (let key in this.state.description) {
      description[this.state.description[key]['key']] = this.state.description[
        key
      ]['value']
    }

    let qualification = {}

    for (let key in this.state.qualification) {
      qualification[
        this.state.qualification[key]['key']
      ] = this.state.qualification[key]['value']
    }

    let postProductData = {
      category: this.state.form.category.value,
      pic: this.state.form.pic.value,
      name: this.state.form.name.value,
      price: this.state.form.price.value,
      location: this.state.form.location.value,
      type: this.state.form.type.value,
      pictures: this.state.pic,
      description,
      qualification,
      uid: this.props.user.uid,
      user: this.props.user.username,
      isAvailable: true,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
    }

    let postProductByOwnerData = {
      isAvailable: true,
      name: this.state.form.name.value,
      pic: this.state.form.pic.value,
      price: this.state.form.price.value,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
    }

    let updates = {}

    updates['/products/' + this.state.key] = postProductData
    updates[
      '/productsByOwners/' + this.props.user.uid + '/' + this.state.key
    ] = postProductByOwnerData

    return firebase
      .database()
      .ref()
      .update(updates)
  }

  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="height" enabled>
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
                placeholder="Name of Service"
              />
              <Text style={styles.txtLabel}>Photos</Text>
              {this.renderPic()}

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
                  placeholder="50.00"
                  keyboardType="number-pad"
                />
              </View>

              <Text style={styles.txtLabel}>Category</Text>
              {this.renderCategory()}
              <Text style={styles.txtLabel}>Service Type</Text>
              <TextInput
                style={styles.txtInput}
                onChangeText={value => this.updateInput('type', value)}
                value={this.state.form.type.value}
                placeholder="Tutorial, photography, cooking..."
              />

              <Text style={styles.txtLabel}>Description</Text>
              {this.renderDescription()}
              <Text style={styles.txtLabel}>Qualification</Text>
              {this.renderQualification()}

              <Text style={styles.txtLabel}>Prefered location</Text>
              <TextInput
                style={styles.txtInput}
                onChangeText={value => this.updateInput('location', value)}
                value={this.state.form.location.value}
                placeholder="Enter location you preferred to sell this service"
              />
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 3 }} />
                <TouchableOpacity
                  onPress={() => this.submit()}
                  style={{
                    flex: 1,
                    backgroundColor: 'white',
                    shadowOffset: { width: 1, height: 1 },
                    shadowColor: 'grey',
                    shadowOpacity: 0.5,
                    elevation: 3,
                    paddingVertical: 4,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 10,
                    marginBottom: 50,
                    marginHorizontal: '5%',
                    borderRadius: 20,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                    }}
                  >
                    OKAY
                  </Text>
                </TouchableOpacity>
                <View style={{ height: 50 }} />
              </View>
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
      </KeyboardAvoidingView>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps)(withNavigationFocus(AddServiceScreen))

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

const screenWidth = Dimensions.get('window').width
const BULLET = '\u2022'

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
