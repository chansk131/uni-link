import React from 'react'
import { Text, View, TextInput, StyleSheet, Button } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as firebase from 'firebase'

export default class AddItemScreen extends React.Component {
  state = {
    isFormValid: false,
    form: {
      name: '',
      price: '',
      user: 'chan',
      location: '',
      description: '',
      category: '',
      isAvailable: true,
      timestamp: Date.now(),
    },
  }

  componentDidMount() {
    if (firebase.auth().currentUser.uid !== null) {
      const uid = firebase.auth().currentUser.uid
      this.setState({ form: { ...this.state.form, uid }, isFormValid: true })
      console.log(uid)
    }
  }

  handleInput = (value, type) => {
    this.setState({ form: { ...this.state.form, [type]: value } })
  }

  writeNewPost = () => {
    // A post entry.
    var postData = this.state.form

    var postDataSelling = {
      name: this.state.form.name,
      price: this.state.form.price,
      isAvailable: this.state.form.isAvailable,
      timestamp: Date.now(),
    }

    // Get a key for a new Post.
    var newPostKey = firebase
      .database()
      .ref()
      .child('products')
      .push().key

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {}
    updates['/products/' + newPostKey] = postData
    updates[
      '/productsByOwners/' + this.state.form.uid + '/' + newPostKey
    ] = postDataSelling

    return firebase
      .database()
      .ref()
      .update(updates)
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ width: '80%', height: '5%' }}>
          <Text>Name</Text>
          <TextInput
            style={{ borderColor: 'black', borderWidth: 0.5, flex: 1 }}
            value={this.state.form.name}
            onChangeText={name => this.handleInput(name, 'name')}
          />
        </View>
        <View style={{ width: '80%', height: '5%' }}>
          <Text>Price</Text>
          <TextInput
            style={{ borderColor: 'black', borderWidth: 0.5, flex: 1 }}
            value={this.state.form.price}
            onChangeText={price => this.handleInput(price, 'price')}
          />
        </View>
        <View style={{ width: '80%', height: '5%' }}>
          <Text>Location</Text>
          <TextInput
            style={{ borderColor: 'black', borderWidth: 0.5, flex: 1 }}
            value={this.state.form.location}
            onChangeText={location => this.handleInput(location, 'location')}
          />
        </View>
        <View style={{ width: '80%', height: '5%' }}>
          <Text>Description</Text>
          <TextInput
            style={{ borderColor: 'black', borderWidth: 0.5, flex: 1 }}
            value={this.state.form.description}
            onChangeText={description =>
              this.handleInput(description, 'description')
            }
          />
        </View>
        <View style={{ width: '80%', height: '5%' }}>
          <Text>Category</Text>
          <TextInput
            style={{ borderColor: 'black', borderWidth: 0.5, flex: 1 }}
            value={this.state.form.category}
            onChangeText={category => this.handleInput(category, 'category')}
          />
        </View>
        <Button
          onPress={this.writeNewPost}
          title="Add"
          disabled={!this.state.isFormValid}
        />
      </View>
    )
  }
}

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
