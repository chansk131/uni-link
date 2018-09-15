import React from 'react'
import { Text, View, ScrollView } from 'react-native'
import { connect } from 'react-redux'

import Ionicons from 'react-native-vector-icons/Ionicons'
import { Username } from '../components/Username'
import { Followers } from '../components/FollowingFollower'
import { ProfilePic } from '../components/ProfilePic'
import { Items } from '../components/Items'
import { ItemsCard1 } from '../components/ItemsCard1'
import { RecentFeedback } from '../components/RecentFeedback'

class SellerScreen extends React.Component {
  state = {
    itemLoaded: false,
  }
  // need to set rule, to select only data for that particular user in future
  componentDidMount() {
    fetch('https://uni-link-9f8f5.firebaseio.com/products.json')
      .then(response => response.json())
      .then(results => {
        let resultsArr = []
        Object.keys(results).forEach(function(key) {
          resultsArr.push({ key: key, keyFirebase: key, ...results[key] })
        })
        return resultsArr
      })
      .then(resultsArr => {
        this.setState({ products: resultsArr, itemLoaded: true })
      })
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}
      >
        <ScrollView>
          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <View style={{ width: '40%', height: 76 }}>
              <ProfilePic />
            </View>
            <View>
              <Username user={this.props.user} />
              <Followers user={this.props.user} />
            </View>
          </View>
          <View style={{ marginTop: 30, marginRight: 25, marginLeft: 10 }}>
            <Items />
            {this.state.itemLoaded ? (
              <ItemsCard1 products={this.state.products} />
            ) : null}
          </View>
          <View
            style={{ flexDirection: 'column', marginRight: 25, marginLeft: 25 }}
          >
            <RecentFeedback />
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
})
export default connect(mapStateToProps)(SellerScreen)
