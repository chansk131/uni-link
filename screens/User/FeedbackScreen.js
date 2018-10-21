import React from 'react'
import {
  Text,
  View,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { Rating, AirbnbRating } from 'react-native-ratings'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as firebase from 'firebase'
import { connect } from 'react-redux'
import { ProfilePic } from '../../components/ProfilePic'

class FeedbackScreen extends React.Component {
  state = {
    pic: null,
    sellerId: null,
    sellerUsername: null,
    productName: null,
    productId: null,
    pictureLoaded: true,
    rating: 3,
    note: '',
  }

  componentDidMount() {
    this.fetchItemDetail()
  }

  fetchItemDetail = () => {
    // console.log(this.props.user.uid)
    const { navigation } = this.props
    const sellerId = navigation.getParam('sellerId')
    const sellerUsername = navigation.getParam('sellerUsername')
    const productName = navigation.getParam('productName')
    const productId = navigation.getParam('productId')
    this.setState({
      sellerId,
      sellerUsername,
      productName,
      productId,
    })
  }

  fetchUserDetail = () => {
    this.setState({ pictureLoaded: false })
    return firebase
      .database()
      .ref('/users/' + this.state.sellerId + '/pic')
      .once('value')
      .then(snapshot => {
        var pic = snapshot.val()
        if (pic !== null) {
          this.setState({ pic, pictureLoaded: true })
        }
      })
  }

  renderSellerPic = () => {
    if (!this.state.pictureLoaded) {
      console.log('item loading')
      return <ActivityIndicator />
    } else {
      return <ProfilePic source={this.state.pic} />
    }
  }

  ratingCompleted = rating => {
    console.log(rating)
    this.setState(this.rating)
  }

  updateInput = value => {
    this.setState({ note: value })
  }

  submit = () => {
    var postData = {
      productName: this.state.productName,
      productId: this.state.productId,
      note: this.state.note,
      // buyerUsername: this.state.username
      buyerId: this.props.user.uid,
      rating: this.state.rating,
    }

    // Get a key for a new Post.
    var newPostKey = firebase
      .database()
      .ref()
      .child('feedback/' + this.state.sellerId)
      .push().key

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {}
    updates[newPostKey] = postData

    return firebase
      .database()
      .ref()
      .child('feedback/' + this.state.sellerId)
      .update(updates)
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingBottom: 10,
          }}
        >
          {this.renderSellerPic()}
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}
        >
          <Text style={{ fontSize: 24 }}>{this.state.sellerUsername}</Text>
          <Text style={{ fontSize: 20 }}>{this.state.productName}</Text>
        </View>
        <View style={{ flex: 2, alignItems: 'center' }}>
          <AirbnbRating
            imageSize={60}
            onFinishRating={this.ratingCompleted}
            defaultRating={3}
          />
          <TextInput
            style={styles.txtInput}
            onChangeText={value => this.updateInput(value)}
            value={this.state.note}
            placeholder="Leave a thank you note"
          />
          <TouchableOpacity
            onPress={() => this.submit()}
            style={{
              paddingVertical: 8,
              backgroundColor: 'black',
              borderRadius: 10,
              marginTop: 10,
              width: '90%',
              marginHorizontal: '5%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: 'white' }}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps)(FeedbackScreen)

const styles = StyleSheet.create({
  txtLabel: {
    fontSize: 20,
    marginTop: 10,
  },
  txtInput: {
    width: '90%',
    borderBottomWidth: 2,
    borderBottomColor: '#eaeaea',
    fontSize: 14,
    padding: 5,
    marginTop: 10,
    marginHorizontal: '5%',
  },
})
