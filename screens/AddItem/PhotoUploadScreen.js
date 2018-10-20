import React from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
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

    let img = await Expo.ImagePicker.launchImageLibraryAsync()
    this.handleImagePicked(img, this.state.firebaseKey)
    this.setState({ chosenImage: img })

    console.log(this.state.chosenImage)
  }

  handleImagePicked = async (pickerResult, imgId) => {
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
      console.log('success')
      return true
    }
  }

  renderPhotos = () => {
    // let picsArr = []
    // picsArr = Object.values(this.state.pictures)
    // return (
    //   <View style={{ marginHorizontal: '5%', flex: 1, padding: 10 }}>
    //     {picsArr.map((val, key) => (
    //       <Image
    //         key={key}
    //         style={styles.imgContainer}
    //         source={
    //           val != ''
    //             ? { uri: val }
    //             : require('../../assets/images/placeholder.png')
    //         }
    //       />
    //     ))}
    //   </View>
    // )

    return (
      <View style={{ marginHorizontal: '5%' }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: 2,
          }}
        >
          <Image
            style={styles.imgContainer}
            source={
              this.state.pictures.pic1 != ''
                ? { uri: this.state.pictures.pic1 }
                : require('../../assets/images/placeholder.png')
            }
          />
          <Image
            style={styles.imgContainer}
            source={
              this.state.pictures.pic2 != ''
                ? { uri: this.state.pictures.pic2 }
                : require('../../assets/images/placeholder.png')
            }
          />
          <Image
            style={styles.imgContainer}
            source={
              this.state.pictures.pic3 != ''
                ? { uri: this.state.pictures.pic3 }
                : require('../../assets/images/placeholder.png')
            }
          />
          <Image
            style={styles.imgContainer}
            source={
              this.state.pictures.pic4 != ''
                ? { uri: this.state.pictures.pic4 }
                : require('../../assets/images/placeholder.png')
            }
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: 2,
          }}
        >
          <Image
            style={styles.imgContainer}
            source={
              this.state.pictures.pic5 != ''
                ? { uri: this.state.pictures.pic5 }
                : require('../../assets/images/placeholder.png')
            }
          />
          <Image
            style={styles.imgContainer}
            source={
              this.state.pictures.pic6 != ''
                ? { uri: this.state.pictures.pic6 }
                : require('../../assets/images/placeholder.png')
            }
          />
          <Image
            style={styles.imgContainer}
            source={
              this.state.pictures.pic7 != ''
                ? { uri: this.state.pictures.pic7 }
                : require('../../assets/images/placeholder.png')
            }
          />
          <Image
            style={styles.imgContainer}
            source={
              this.state.pictures.pic8 != ''
                ? { uri: this.state.pictures.pic8 }
                : require('../../assets/images/placeholder.png')
            }
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: 2,
          }}
        >
          <Image
            style={styles.imgContainer}
            source={
              this.state.pictures.pic9 != ''
                ? { uri: this.state.pictures.pic9 }
                : require('../../assets/images/placeholder.png')
            }
          />
          <Image
            style={styles.imgContainer}
            source={
              this.state.pictures.pic10 != ''
                ? { uri: this.state.pictures.pic10 }
                : require('../../assets/images/placeholder.png')
            }
          />
          <Image
            style={styles.imgContainer}
            source={
              this.state.pictures.pic11 != ''
                ? { uri: this.state.pictures.pic11 }
                : require('../../assets/images/placeholder.png')
            }
          />
          <Image
            style={styles.imgContainer}
            source={
              this.state.pictures.pic12 != ''
                ? { uri: this.state.pictures.pic12 }
                : require('../../assets/images/placeholder.png')
            }
          />
        </View>
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
        {this.renderPhotos()}
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
  },
})

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
