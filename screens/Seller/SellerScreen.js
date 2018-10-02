import React from 'react'
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { connect } from 'react-redux'
import * as firebase from 'firebase'

import { Username } from '../../components/Username'
import { Followers } from '../../components/FollowingFollower'
import { ProfilePic } from '../../components/ProfilePic'
import { ItemsCard } from '../../components/productCard/ItemsCard'
import { RecentFeedback } from '../../components/RecentFeedback'

// TODO push new page when pressing at the item card to go to itemDetailScreen
// TODO see more
class SellerScreen extends React.Component {
  state = {
    itemLoaded: false,
    seller: null,
  }

  componentDidMount() {
    const { navigation } = this.props
    const sellerId = navigation.getParam('sellerId')
    const sellerName = navigation.getParam('sellerName')
    // console.log(sellerId)

    this.fetchUser(sellerId, sellerName)
    this.fetchData(sellerId, sellerName)
  }

  fetchUser = async (userId, username) => {
    return firebase
      .database()
      .ref('/users/' + userId)
      .once('value')
      .then(snapshot => {
        var results = snapshot.val()
        results['username'] = username
        this.setState({ seller: results })
        console.log(this.state)
      })
  }

  fetchData = async (userId, userName) => {
    return firebase
      .database()
      .ref('/productsByOwners/' + userId)
      .orderByChild('isAvailable')
      .equalTo(true)
      .once('value')
      .then(snapshot => {
        var results = snapshot.val()
        let resultsArr = []
        Object.keys(results).forEach(function(key) {
          resultsArr.push({
            key: key,
            keyFirebase: key,
            user: userName,
            ...results[key],
          })
        })
        this.setState({ products: resultsArr, itemLoaded: true })

        // console.log(this.state)
      })
  }

  renderProfilePic = () => {
    return this.state.itemLoaded ? (
      <ProfilePic source={this.state.seller.pic} />
    ) : null
    //
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.profileContainer}>
            <View style={styles.profilePicContainer}>
              {this.renderProfilePic()}
            </View>
            <View>
              {this.state.seller ? <Username user={this.state.seller} /> : null}
              <Followers user={this.props.user} />
            </View>
          </View>
          <View style={{ marginTop: 30, marginRight: 25, marginLeft: 10 }}>
            <View style={styles.itemsContainer}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Items</Text>
              <TouchableOpacity>
                <Text style={{ fontSize: 12 }}>see more</Text>
              </TouchableOpacity>
            </View>
            <View style={{ height: 240 }}>
              {this.state.itemLoaded ? (
                <ItemsCard
                  navigation={this.props.navigation}
                  products={this.state.products}
                />
              ) : null}
            </View>
          </View>
          <View style={styles.recentFeedbackContainer}>
            <RecentFeedback />
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  profileContainer: { flexDirection: 'row', marginTop: 20 },
  profilePicContainer: { width: '40%', alignItems: 'center' },
  itemsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 10,
    marginLeft: 20,
  },
  recentFeedbackContainer: {
    flexDirection: 'column',
    marginRight: 25,
    marginLeft: 25,
  },
})

const mapStateToProps = state => ({
  user: state.user,
})
export default connect(mapStateToProps)(SellerScreen)
