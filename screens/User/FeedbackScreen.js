import React from 'react'
import {
  Text,
  View,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
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
    totalRating: 0,
    countFeedback: 0,
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
    this.setState(
      {
        sellerId,
        sellerUsername,
        productName,
        productId,
      },
      () => {
        this.fetchUserDetail()
        this.fetchPrevRating()
      }
    )
  }

  fetchUserDetail = () => {
    var sellerId = this.state.sellerId
    this.setState({ pictureLoaded: false })
    return firebase
      .database()
      .ref('/users/' + sellerId)
      .once('value')
      .then(snapshot => {
        var pic = snapshot.val().pic
        console.log(pic)
        if (pic !== null) {
          this.setState({ pic, pictureLoaded: true })
        }
      })
  }

  fetchPrevRating = async () => {
    var sellerId = this.state.sellerId
    return firebase
      .database()
      .ref('/feedback/' + sellerId)
      .once('value')
      .then(snapshot => {
        var feedback = snapshot.val()
        var totalRating = feedback.totalRating
        var countFeedback = feedback.countFeedback
        if (countFeedback !== null && totalRating !== null) {
          this.setState({ totalRating, countFeedback })
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
    this.setState({ rating })
  }

  updateInput = value => {
    this.setState({ note: value })
  }

  submit = () => {
    var countFeedback = this.state.countFeedback + 1
    var totalRating = this.state.totalRating + this.state.rating
    var newRating = totalRating / countFeedback
    console.log(newRating)
    var postData = {
      productName: this.state.productName,
      productId: this.state.productId,
      note: this.state.note,
      // buyerUsername: this.state.username
      buyerId: this.props.user.uid,
      rating: newRating,
    }

    // Get a key for a new Post.
    var newPostKey = firebase
      .database()
      .ref()
      .child('feedback/' + this.state.sellerId)
      .push().key

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {}
    updates['/feedback/' + this.state.sellerId + '/' + newPostKey] = postData
    updates['/feedback/' + this.state.sellerId + '/rating'] = newRating
    updates['/feedback/' + this.state.sellerId + '/totalRating'] = totalRating
    updates[
      '/feedback/' + this.state.sellerId + '/countFeedback'
    ] = countFeedback
    updates[
      '/orders/' +
        this.props.user.uid +
        '/' +
        this.state.productId +
        '/feedbackStatus'
    ] = 'Given'

    return firebase
      .database()
      .ref()
      .update(updates)
      .then(() => {
        this.props.navigation.goBack()
      })
  }

  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
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
      </KeyboardAvoidingView>
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
