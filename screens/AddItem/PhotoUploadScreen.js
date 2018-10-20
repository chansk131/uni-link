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
import Expo from 'expo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as firebase from 'firebase'

export default class PhotoUploadScreen extends React.Component {
  state = {
    firebaseKey: null,
    chosenImage: null,
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
    const firebaseKey = navigation.getParam('firebaseKey')
    this.setState({ firebaseKey })
    console.log(firebaseKey)
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
      console.error('Cannot upload more images')
      alert('Maximum number of photos reached')
      return
    }

    let img = await Expo.ImagePicker.launchImageLibraryAsync()
    // const manipResult = await Expo.ImageManipulator.manipulate(
    //   img.uri,
    //   [{ resize: { width: 1080 } }],
    //   { format: 'jpeg', compress: 0.8 }
    // )
    // img.uri = manipResult
    console.log(this.state.chosenImage)
    this.handleImagePicked(img, this.state.firebaseKey)
    this.setState({ chosenImage: img })
  }

  handleImagePicked = async (pickerResult, imgId) => {
    try {
      this.setState({ uploading: true })

      if (!pickerResult.cancelled) {
        let form = this.state.pictures

        for (let key in form) {
          if (form['pic12'] != '') {
            console.log('cannot add more photos')
            return
          } else if (form[key] == '') {
            console.log(`uploading to key ${key}`)
            console.log(this.state.pictures)
            uploadUrl = await uploadImageAsync(pickerResult.uri, imgId, key)
            break
          }
        }
      } else {
        throw 'Photo chosen cancelled!'
      }
    } catch (e) {
      console.log(e)
      alert('Upload failed, sorry :(')
      return false
    } finally {
      let form = this.state.pictures
      console.log(`url is ${uploadUrl}`)
      for (let key in form) {
        if (form['pic12'] != '') {
          console.log('cannot add more photos')
          return false
        }
        if (form[key] == '') {
          form[key] = uploadUrl
          break
        }
      }
      this.setState({ uploading: false, pictures: form })
      console.log('success')
      return true
      // Object.keys(this.state.pictures).forEach(key => {
      //   if (this.state.pictures[key] == '') {

      //   }
      // })
      // console.log('Too many pics')
      // return false
    }
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
          renderItem={({ item }) => (
            <Image
              key={item.key}
              style={styles.imgContainer}
              source={
                item.pics != ''
                  ? { uri: item.pics }
                  : require('../../assets/images/placeholder.png')
              }
            />
          )}
        />
      </View>
    )
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Text>PhotoUploadScreen!</Text>

        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: 'lightgrey',
            padding: 10,
            width: '90%',
            marginHorizontal: '5%',
          }}
          onPress={() => {
            this.launchCameraRollAsync()
          }}
        >
          <Text>Add</Text>
        </TouchableOpacity>
        {this.renderPhotoGrid()}
      </View>
    )
  }
}

const screenWidth = Dimensions.get('window').width
const imgWidth = (screenWidth * 0.9 - 5) * 0.25
const styles = StyleSheet.create({
  imgContainer: {
    width: imgWidth,
    height: imgWidth,
    margin: 1,
  },
})

async function uploadImageAsync(uri, imgId, index) {
  try {
    const response = await fetch(uri)
    const blob = await response.blob()
    const ref = firebase
      .storage()
      .ref()
      .child('products/' + imgId + '/' + index)

    const snapshot = await ref.put(blob)
    const url = await ref.getDownloadURL()
    return url
  } catch (e) {
    console.log(e)
  }
}
