import React from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native'
import ActionSheet from 'react-native-actionsheet'
import Expo from 'expo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as firebase from 'firebase'

export default class PhotoUploadScreen extends React.Component {
  state = {
    key: null,
    uid: null,
    chosenImage: null,
    firstFreeKey: 'pic1',
    uploading: false,
    pictures: {
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
  }

  componentDidMount() {
    const { navigation } = this.props
    const key = navigation.getParam('key')
    const section = navigation.getParam('section')
    const pic = navigation.getParam('pic')
    const uid = navigation.getParam('uid')
    pic != null
      ? this.setState({ key, uid, pictures: pic, section })
      : this.setState({ key, uid })
    console.log(key)
  }

  launchCameraRollAsync = async () => {
    let { status } = await Expo.Permissions.askAsync(
      Expo.Permissions.CAMERA_ROLL
    )
    if (status != 'granted') {
      console.error('Camera roll perms not granted')
      return
    }

    if (this.state.pictures.pic12 != '') {
      console.log('Cannot upload more images')
      alert('Maximum number of photos reached')
      return
    }

    let img = await Expo.ImagePicker.launchImageLibraryAsync({
      quality: 0.8
    })
    console.log(img.uri)
    const manipResult = await Expo.ImageManipulator.manipulate(
      img.uri,
      [{ resize: { width: 1080 } }],
      { format: 'jpeg', compress: 0.8 }
    )
    console.log(manipResult)
    img.uri = manipResult.uri
    if (!img.cancelled) {
      this.setState({ chosenImage: img })
      this.handleImagePicked(img, this.state.key)
    }
  }

  launchCameraAsync = async () => {
    let { status } = await Expo.Permissions.askAsync(
      Expo.Permissions.CAMERA
    )
    if (status != 'granted') {
      console.error('Camera roll perms not granted')
      return
    }

    if (this.state.pictures.pic12 != '') {
      console.log('Cannot upload more images')
      alert('Maximum number of photos reached')
      return
    }

    let img = await Expo.ImagePicker.launchCameraAsync({
      quality: 0.8
    })
    console.log(img.uri)
    const manipResult = await Expo.ImageManipulator.manipulate(
      img.uri,
      [{ resize: { width: 1080 } }],
      { format: 'jpeg', compress: 0.8 }
    )
    console.log(manipResult)
    img.uri = manipResult.uri
    if (!img.cancelled) {
      this.setState({ chosenImage: img })
      this.handleImagePicked(img, this.state.key)
    }
  }

  handleImagePicked = async (pickerResult, imgId) => {
    console.log(pickerResult)
    try {
      this.setState({ uploading: true })
      let form = this.state.pictures

      for (let key in form) {
        if (form['pic12'] != '') {
          console.log('cannot add more photos')
          return
        } else if (form[key] == '') {
          console.log(`uploading to key ${key}`)
          uploadUrl = await uploadImageAsync(pickerResult.uri, imgId, key)
          break
        }
      }
    } catch (e) {
      console.log(e)
      alert('Upload failed, sorry :(')
      return false
    } finally {
      let form = this.state.pictures
      console.log(this.state)
      console.log('not cancelled')
      console.log(`url is ${uploadUrl}`)
      let firstFreeKey = 'pic1'
      for (let key in form) {
        if (form['pic12'] != '') {
          console.log('cannot add more photos')
          return false
        }
        if (form[key] == '') {
          form[key] = uploadUrl
          firstFreeKey = key
          break
        }
      }
      try {
        this.addToDatabase(form)
      } catch (err) {
        console.log('fail')
        console.log(err)
      }
      this.setState({ uploading: false, pictures: form, firstFreeKey })
      console.log('success')
      return true
    }
  }

  addToDatabase = form => {
    let updates = {}
    updates['/products/' + this.state.key + '/pictures'] = form
    updates['/products/' + this.state.key + '/pic'] = form.pic1
    updates['/products/' + this.state.key + '/status'] = 'draft'
    updates[
      '/productsByOwners/' + this.state.uid + '/' + this.state.key + '/pic'
    ] = form.pic1
    updates[
      '/productsByOwners/' + this.state.uid + '/' + this.state.key + '/status'
    ] = 'draft'
    console.log(updates)
    return firebase
      .database()
      .ref()
      .update(updates)
  }

  renderPhotoGrid = () => {
    let picsArr = []
    Object.keys(this.state.pictures).forEach(key => {
      picsArr.push({ key: key, pics: this.state.pictures[key] })
    })

    return (
      <View style={{ marginHorizontal: '5%', marginTop: 10 }}>
        <FlatList
          numColumns={4}
          data={picsArr}
          renderItem={({ item }) =>
            item.pics == '' ? (
              <View
                style={[styles.imgContainer, { backgroundColor: 'lightgrey' }]}
              />
            ) : (
              <Image
                key={item.key}
                style={styles.imgContainer}
                source={
                  { uri: item.pics } // show uploading actionindicator
                }
              />
            )
          }
        />
      </View>
    )
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Text style={styles.txtLabel}>Upload photo of the product/service</Text>

        <TouchableOpacity
          style={{
            marginTop: 10,
            borderWidth: 1,
            borderColor: 'lightgrey',
            padding: 10,
            width: '90%',
            marginHorizontal: '5%',
            alignItems: 'center',
          }}
          onPress={() => {
            this.ActionSheet.show()
          }}
        >
          <Text>Select photo to upload</Text>
        </TouchableOpacity>
        <ActionSheet
            ref={o => (this.ActionSheet = o)}
            title={'Select image source'}
            options={['Camera', 'Camera Roll', 'Cancel']}
            cancelButtonIndex={2}
            // destructiveButtonIndex={2}
            onPress={index => {
              /* do something */
              if (index === 0) {
                // launch camera
                this.launchCameraAsync()
              } else if (index === 1) {
                // launch camera roll
                this.launchCameraRollAsync()
              }
            }}
          />
        {this.renderPhotoGrid()}

        <TouchableOpacity
          style={{
            marginTop: 10,
            borderWidth: 1,
            borderColor: 'lightgrey',
            padding: 10,
            width: '90%',
            marginHorizontal: '5%',
            alignItems: 'center',
          }}
          onPress={() => {
            this.props.navigation.navigate('AddItem', {
              pic: this.state.pictures,
            })
          }}
        >
          <Text>Done</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const screenWidth = Dimensions.get('window').width
const imgWidth = (screenWidth * 0.9 - 5) * 0.25
const styles = StyleSheet.create({
  txtLabel: {
    fontSize: 20,
    marginTop: 10,
    marginHorizontal: '5%',
  },
  imgContainer: {
    width: imgWidth,
    height: imgWidth,
    margin: 1,
  },
})

async function uploadImageAsync(uri, imgId, index) {
  try {
    const type = uri.split(".")[1]
    console.log(type)
    const response = await fetch(uri)
    const blob = await response.blob()
    const ref = firebase
      .storage()
      .ref()
      .child('products/' + imgId + '/' + index + '.' + type)

    const snapshot = await ref.put(blob)
    const url = await ref.getDownloadURL()
    return url
  } catch (e) {
    console.log(e)
  }
}
