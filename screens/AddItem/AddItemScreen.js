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
import { toUpperFirst } from '../../utils/misc'

import ValidationRules from '../../components/forms/validationRules'

class AddItemScreen extends React.Component {
  state = {
    general: {
      section: null,
      uid: null,
      key: null,
    },
    section: null,
    uid: null,
    key: null,
    pic: {
      pic1: '',
      pic2: '',
      pic3: '',
      pic4: '',
      pic5: '',
      pic6: '',
      pic7: '',
      pic8: '',
      pic9: '',
      pic10: '',
      pic11: '',
      pic12: '',
    },
    description: [],
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
        valid: true,
        rules: {
          // isRequired: true,
        },
      },
      brand: {
        value: '',
        valid: true,
        rules: {
          // isRequired: true,
        },
      },
      qualification: {
        value: '',
        valid: true,
        rules: {
          // isRequired: true,
        },
      },
    },
  }

  componentDidMount() {
    // check is it product or service page
    const { navigation } = this.props
    const section = navigation.getParam('section')
    let key = navigation.getParam('key')
    this.setState({ section })
    // let general = { ...this.state.general }
    // general.section = section

    // this.setState({ general }, console.log(this.state.general))

    this.checkAuth()
    if (!key) {
      console.log('create new key')
      key = firebase
        .database()
        .ref()
        .child('posts')
        .push().key
    } else if (key && !section) {
      this.fetchItemDetail(key)
    } else {
      console.log('other cases?')
    }
    this.setState({ key })
    this._onFocusListener = this.props.navigation.addListener(
      'didFocus',
      payload => {
        this.checkInput()
        this.checkPic()
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
  }

  fetchItemDetail = key => {
    console.log(`key is ${key}`)
    return firebase
      .database()
      .ref('/products/' + key)
      .once('value')
      .then(snapshot => {
        const product = snapshot.val()
        const section = product.section
        this.setState({ section })
        this.updateInput('name', product.name)
        this.updateInput('condition', product.condition)
        this.updateInput('price', product.price)
        this.updateInput('category', product.category)
        this.updateInput('type', product.type)
        this.updateInput('brand', product.brand)
        this.updateInput('location', product.location)
        this.updateInput('qualification', product.qualification)
        let description = []
        Object.entries(product.description).forEach((val, key) => {
          description.push({ key: val[0], value: val[1] })
        })
        this.setState({ description })
        let pic = product.pictures
        for (i = 1; i <= 12; i++) {
          let picKey = 'pic' + i
          if (!pic[picKey]) {
            pic[picKey] = ''
          }
        }
        this.setState({ pic })
        // pic
      })
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

  checkInput = () => {
    const { navigation } = this.props
    const name = navigation.getParam('name')
    if (name != undefined) {
      console.log(`name is ${name}`)
      this.updateInput('name', name)
    }
    const condition = navigation.getParam('condition')
    if (condition != undefined) {
      console.log(`condition is ${condition}`)
      this.updateInput('condition', condition)
    }
    const price = navigation.getParam('price')
    if (price != undefined) {
      console.log(`price is ${price}`)
      this.updateInput('price', price)
    }
    const category = navigation.getParam('category')
    if (category != undefined) {
      console.log(`category is ${category}`)
      this.updateInput('category', category)
    }
    const type = navigation.getParam('type')
    if (type != undefined) {
      console.log(`type is ${type}`)
      this.updateInput('type', type)
    }
    const brand = navigation.getParam('brand')
    if (brand != undefined) {
      console.log(`brand is ${brand}`)
      this.updateInput('brand', brand)
    }
    const description = navigation.getParam('description')
    if (description != undefined) {
      this.setState({ description })
    }
    const location = navigation.getParam('location')
    if (location != undefined) {
      console.log(`location is ${location}`)
      this.updateInput('location', location)
    }
    const qualification = navigation.getParam('qualification')
    if (qualification != undefined) {
      console.log(`qualification is ${qualification}`)
      this.updateInput('qualification', qualification)
    }
  }

  checkPic = () => {
    const { navigation } = this.props
    const pic = navigation.getParam('pic')
    if (pic && pic.pic1) {
      console.log(`pic is ${pic}`)
      this.updateInput('pic', pic.pic1)
      let pictures = {}
      for (let picture in pic) {
        if (pic[picture] != '') pictures[picture] = pic[picture]
      }
      this.setState({ pic: pictures })
    }
  }

  renderTitle = () => {
    return (
      <View>
        <Label label={'Title'} required={true} />
        <TextInput
          style={styles.txtInput}
          onFocus={() =>
            this.props.navigation.navigate('AddTitle', {
              uid: this.state.uid,
              key: this.state.key,
              section: this.state.section,
              name: this.state.form.name.value,
            })
          }
          onChangeText={value => this.updateInput('name', value)}
          value={this.state.form.name.value}
          placeholder={`Name of ${this.state.section}`}
        />
      </View>
    )
  }

  renderPic = () => {
    const { navigation } = this.props
    let pic = navigation.getParam('pic')
    if (!pic && this.state.pic) {
      pic = this.state.pic
    }
    console.log(pic)
    return (
      <View>
        <Label label={'Photos'} required={true} />
        <View style={styles.photoSectionContainer}>
          {pic && pic.pic1 != '' ? (
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
                borderWidth: 1,
                borderColor: 'lightgrey',
                // backgroundColor: '#eaeaea',
              }}
            />
          )}

          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('PhotoUpload', {
                key: this.state.key,
                uid: this.state.uid,
                pic,
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
            <Text style={styles.photoAddTxt}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  renderCondition = () => {
    const { navigation } = this.props
    let condition = navigation.getParam('condition')
    if (!condition && this.state.form.condition.value != '') {
      condition = this.state.form.condition.value
    }
    return this.state.section == 'product' ? (
      <View>
        <Label label={'Condition'} required={true} />

        <TouchableOpacity
          style={{
            marginTop: 10,
          }}
          onPress={() => {
            this.props.navigation.navigate('Condition', {
              condition,
              uid: this.state.uid,
              key: this.state.key,
              section: this.state.section,
            })
          }}
        >
          {condition ? (
            <View style={styles.conditionRadioBtn}>
              <Ionicons name={'md-radio-button-on'} size={20} color={'black'} />
              <Text> {condition}</Text>
            </View>
          ) : (
            <View style={styles.conditionRadioBtn}>
              <Ionicons
                name={'md-radio-button-off'}
                size={20}
                color={'black'}
              />
              <Text style={{ color: 'lightgrey' }}>
                {' '}
                Press to choose condition
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    ) : null
  }

  renderPricing = () => {
    return (
      <View>
        <Label label={'Pricing'} required={true} />
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
            onFocus={() =>
              this.props.navigation.navigate('AddPrice', {
                uid: this.state.uid,
                key: this.state.key,
                section: this.state.section,
                price: this.state.form.price.value,
              })
            }
            style={styles.txtInput}
            onChangeText={value => this.updateInput('price', value)}
            value={this.state.form.price.value}
            placeholder="50.00"
            keyboardType="number-pad"
          />
        </View>
      </View>
    )
  }

  renderUnit = () => {
    return this.state.section == 'skillshare' ? <Text>UNIT</Text> : null
  }

  renderCategory = () => {
    const { navigation } = this.props
    let category = navigation.getParam('category')
    if (!category && this.state.form.category.value != '') {
      category = this.state.form.category.value
    }
    if (category) {
      return (
        <View>
          <Label label={'Category'} required={true} />
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
            }}
            onPress={() => {
              this.props.navigation.navigate('CategoryItem', {
                uid: this.state.uid,
                key: this.state.key,
                category: categorySmall,
                section: this.state.section,
              })
            }}
          >
            <Ionicons name={'md-radio-button-on'} size={20} color={'black'} />
            <Text> {category}</Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <View>
          <Label label={'Category'} required={true} />
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
            }}
            onPress={() => {
              this.props.navigation.navigate('CategoryItem', {
                uid: this.state.uid,
                key: this.state.key,
                section: this.state.section,
              })
            }}
          >
            <Ionicons name={'md-radio-button-off'} size={20} color={'black'} />
            <Text style={{ color: 'lightgrey' }}>
              {' '}
              Press to choose category
            </Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  renderType = () => {
    if (this.state.section == 'product') {
      var type = 'Product Type'
      var placeholder = 'Tablet, Novel, Shoes...'
    } else if (this.state.section == 'skillshare') {
      var type = 'Skillshare Type'
      var placeholder = 'Engineering Mathematics, Photoshops, Python...'
    }
    return (
      <View>
        <Label label={type} required={false} />
        <TextInput
          onFocus={() =>
            this.props.navigation.navigate('AddType', {
              uid: this.state.uid,
              key: this.state.key,
              section: this.state.section,
              type: this.state.form.type.value,
            })
          }
          style={styles.txtInput}
          onChangeText={value => this.updateInput('type', value)}
          value={this.state.form.type.value}
          placeholder={placeholder}
        />
      </View>
    )
  }

  renderProductBrand = () => {
    return this.state.section == 'product' ? (
      <View>
        <Label label={'Brand'} required={false} />
        <TextInput
          onFocus={() =>
            this.props.navigation.navigate('AddBrand', {
              uid: this.state.uid,
              key: this.state.key,
              section: this.state.section,
              brand: this.state.form.brand.value,
            })
          }
          style={styles.txtInput}
          onChangeText={value => this.updateInput('brand', value)}
          value={this.state.form.brand.value}
          placeholder="Enter product brand, ..."
        />
      </View>
    ) : null
  }

  renderDescription = () => {
    const { navigation } = this.props
    let description = navigation.getParam('description')
    if (
      (description == null || description.length == 0) &&
      this.state.description.length != 0
    ) {
      description = this.state.description
    }
    if (description == null || description.length == 0) {
      return (
        <View>
          <Label label={'Description'} required={false} />
          <TouchableOpacity
            style={{ marginTop: 10 }}
            onPress={() => {
              this.props.navigation.navigate('DescriptionItem', {
                uid: this.state.uid,
                key: this.state.key,
                section: this.state.section,
                description: this.state.description,
              })
            }}
          >
            <Text style={{ marginHorizontal: '5%', color: 'lightgrey' }}>
              Add Description
            </Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      // console.log(description)
      return (
        <View>
          <Label label={'Description'} required={false} />
          <TouchableOpacity
            style={{ marginTop: 10 }}
            onPress={() => {
              this.props.navigation.navigate('DescriptionItem', {
                uid: this.state.uid,
                key: this.state.key,
                section: this.state.section,
                description: this.state.description,
              })
            }}
          >
            <FlatList
              data={this.state.description}
              renderItem={({ item }) => (
                <View key={item.key} style={styles.listItemContainer}>
                  <Text style={styles.listItemTxt}>
                    {BULLET + '  ' + item.value}
                  </Text>
                </View>
              )}
            />
          </TouchableOpacity>
        </View>
      )
    }
  }

  renderQualification = () => {
    return this.state.section == 'skillshare' ? (
      <View>
        <Label label={'Relevant Qualification'} required={false} />
        <TextInput
          onFocus={() =>
            this.props.navigation.navigate('AddQualification', {
              uid: this.state.uid,
              key: this.state.key,
              section: this.state.section,
              qualification: this.state.form.qualification.value,
            })
          }
          style={styles.txtInput}
          onChangeText={value => this.updateInput('qualification', value)}
          value={this.state.form.qualification.value}
          placeholder="Enter relevant qualification"
        />
      </View>
    ) : null
  }

  renderPreferedLocation = () => {
    var placeholder =
      'Enter location you preferred to sell this ' + this.state.section
    return (
      <View>
        <Label label={'Prefered location'} required={true} />
        <TextInput
          onFocus={() =>
            this.props.navigation.navigate('AddLocation', {
              uid: this.state.uid,
              key: this.state.key,
              section: this.state.section,
              location: this.state.form.location.value,
            })
          }
          style={styles.txtInput}
          onChangeText={value => this.updateInput('location', value)}
          value={this.state.form.location.value}
          placeholder={placeholder}
        />
      </View>
    )
  }

  submit = () => {
    // check if form is valid
    let isformValid = true
    const formCopy = this.state.form
    for (let key in formCopy) {
      isformValid = isformValid && formCopy[key].valid
    }
    if (isformValid) {
      console.log('valid')
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

    let postProductData = {
      condition: this.state.form.condition.value,
      category: this.state.form.category.value,
      pic: this.state.form.pic.value,
      name: this.state.form.name.value,
      price: this.state.form.price.value,
      location: this.state.form.location.value,
      type: this.state.form.type.value,
      brand: this.state.form.brand.value,
      pictures: this.state.pic,
      description,
      section: this.state.section,
      uid: this.props.user.uid,
      user: this.props.user.username,
      isAvailable: true,
      status: 'unsold',
      timestamp: firebase.database.ServerValue.TIMESTAMP,
    }

    let postProductByOwnerData = {
      isAvailable: true,
      status: 'unsold',
      name: this.state.form.name.value,
      pic: this.state.form.pic.value,
      price: this.state.form.price.value,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
    }

    console.log(postProductData)

    let updates = {}

    updates['/products/' + this.state.key] = postProductData
    updates[
      '/productsByOwners/' + this.props.user.uid + '/' + this.state.key
    ] = postProductByOwnerData

    // return firebase
    //   .database()
    //   .ref()
    //   .update(updates)
  }

  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
        <ScrollView
          style={{
            flex: 1,
            paddingTop: 10,
            backgroundColor: 'white',
          }}
        >
          {this.state.uid ? (
            <View style={{ marginHorizontal: '5%' }}>
              {this.renderTitle()}
              {this.renderPic()}
              {/* product condition only for product */}
              {this.renderCondition()}
              {this.renderPricing()}
              {/* unit only for skillshare */}
              {this.renderUnit()}
              {this.renderCategory()}
              {this.renderType()}
              {this.renderProductBrand()}
              {this.renderDescription()}
              {this.renderQualification()}
              {this.renderPreferedLocation()}

              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 3 }} />
                <TouchableOpacity
                  onPress={() => this.submit()}
                  style={[styles.submitButtonContainer]}
                >
                  <Text style={[styles.submitButtonTxt]}>List</Text>
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

export default connect(mapStateToProps)(withNavigationFocus(AddItemScreen))

const styles = StyleSheet.create({
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
  txtInput: {
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: '#eaeaea',
    fontSize: 14,
    padding: 5,
    marginTop: 10,
  },
  photoSectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  photoContainer: {
    width: screenWidth * 0.6,
    aspectRatio: 16 / 9,
    borderRadius: 5,
    marginLeft: '5%',
    resizeMode: 'contain',
  },
  photoAddTxt: { fontSize: 48, color: 'lightgrey' },
  conditionRadioBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemContainer: {
    paddingVertical: 4,
    paddingHorizontal: '5%',
  },
  listItemTxt: { fontSize: 16 },
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
    marginTop: 10,
    marginBottom: 50,
    marginHorizontal: '5%',
    borderRadius: 20,
  },
  submitButtonTxt: {
    fontSize: 20,
  },
})

const screenWidth = Dimensions.get('window').width
const BULLET = '\u2022'

const Label = ({ label, required }) => (
  <View style={styles.txtLabelContainer}>
    <Text style={styles.txtLabel}>{label}</Text>
    {required ? <Text style={styles.txtRequired}>*</Text> : null}
  </View>
)

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
