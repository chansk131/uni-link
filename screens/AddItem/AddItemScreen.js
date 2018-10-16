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

class AddItemScreen extends React.Component {
  state = {
    form: {
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
          // isNumber: true,
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

  componentDidMount() {}

  render() {
    return (
      <ScrollView
        style={{
          flex: 1,
          paddingTop: 10,
          backgroundColor: 'white',
        }}
      >
        <View style={{ marginHorizontal: '5%' }}>
          <Text style={styles.txtLabel}>Title</Text>
          <TextInput
            style={styles.txtInput}
            onChangeText={value => this.updateInput('name', value)}
            value={this.state.form.name.value}
            placeholder="Name of product"
          />
          <Text style={styles.txtLabel}>Condition</Text>
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
            <Ionicons name={'md-radio-button-on'} size={20} color={'black'} />
            <Text> New</Text>
          </TouchableOpacity>
          {/* show selected choice and this view can be pressed to go to new selecting radio buttons choices */}
          <Text style={styles.txtLabel}>Pricing</Text>
          <TextInput
            style={styles.txtInput}
            onChangeText={value => this.updateInput('price', value)}
            value={`£ ${this.state.form.price.value}`}
            placeholder="£9"
            keyboardType="number-pad"
          />
          <Text style={styles.txtLabel}>Prefered selling location</Text>
          <TextInput
            style={styles.txtInput}
            onChangeText={value => this.updateInput('location', value)}
            value={this.state.form.location.value}
            placeholder="Enter location you preferred to sell this product/service"
          />
          <Text style={styles.txtLabel}>Product/Service Type</Text>
          <TextInput
            style={styles.txtInput}
            onChangeText={value => this.updateInput('type', value)}
            value={this.state.form.type.value}
            placeholder="Tablet, Novel, Computing, ..."
          />
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps)(AddItemScreen)

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
