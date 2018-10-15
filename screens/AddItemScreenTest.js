import React from 'react'
import { Text, View, TextInput, StyleSheet, Button, Image } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as firebase from 'firebase'
import Expo from 'expo'
import { connect } from 'react-redux'

class AddItemScreen extends React.Component {
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
    chosenImage: null,
  }

  componentDidMount() {
    // if (firebase.auth().currentUser.uid !== null) {
    //   const uid = firebase.auth().currentUser.uid
    //   this.setState({ form: { ...this.state.form, uid }, isFormValid: true })
    //   console.log(uid)
    // }

    if (this.props.user.uid) {
      console.log(this.props.user.uid)
      this.setState({
        form: { ...this.state.form, ...this.props.user.uid },
        isFormValid: true,
      })
    }
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
    console.log(this.state.chosenImage)
  }

  handleInput = (value, type) => {
    this.setState({ form: { ...this.state.form, [type]: value } })
  }

  _handleImagePicked = async (pickerResult, imgId) => {
    try {
      this.setState({ uploading: true })

      if (!pickerResult.cancelled) {
        uploadUrl = await uploadImageAsync(pickerResult.uri, imgId)
        this.setState({ form: { ...this.state.form, pic: uploadUrl } })
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

  writeNewPost = async () => {
    console.log(this.state)
    // Get a key for a new Post.
    var newPostKey = firebase
      .database()
      .ref()
      .child('products')
      .push().key

    const img = await this._handleImagePicked(
      this.state.chosenImage,
      newPostKey
    )

    if (img) {
      // A post entry.
      var postData = this.state.form

      var postDataSelling = {
        name: this.state.form.name,
        price: this.state.form.price,
        isAvailable: this.state.form.isAvailable,
        pic: this.state.form.pic,
        timestamp: Date.now(),
      }
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
        <Button
          title="Launch Camera Roll"
          onPress={() => {
            this.launchCameraRollAsync()
          }}
        />

        {(this.state.chosenImage && (
          <Image
            style={{ width: 200, height: 200 }}
            source={{ uri: this.state.chosenImage.uri }}
          />
        )) ||
          null}
      </View>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps)(AddItemScreen)

async function uploadImageAsync(uri, imgId) {
  try {
    const response = await fetch(uri)
    const blob = await response.blob()
    const ref = firebase
      .storage()
      .ref()
      .child('products/' + imgId)

    const snapshot = await ref.put(blob)
    const url = await ref.getDownloadURL()
    return url
  } catch (e) {
    console.log(e)
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
