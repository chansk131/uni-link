import React from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
} from 'react-native'
import { connect } from 'react-redux'
import * as firebase from 'firebase'

import Ionicons from 'react-native-vector-icons/Ionicons'
import { Username } from '../../components/Username'
import { Followers } from '../../components/FollowingFollower'
import { ProfilePic } from '../../components/ProfilePic'

class SellingScreen extends React.Component {
  state = {
    showUnsold: true,
    itemLoaded: false,
  }

  componentDidMount() {
    if (this.props.user.uid != null) {
      this.fetchUnSoldData()
      this.fetchSoldData()
    }
  }

  fetchUnSoldData = async () => {
    var userId = firebase.auth().currentUser.uid
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
          resultsArr.push({ key: key, keyFirebase: key, ...results[key] })
        })
        this.setState({
          products: { ...this.state.products, unSold: resultsArr },
        })
        console.log(this.state)
      })
  }

  fetchSoldData = async () => {
    var userId = firebase.auth().currentUser.uid
    return firebase
      .database()
      .ref('/productsByOwners/' + userId)
      .orderByChild('isAvailable')
      .equalTo(false)
      .once('value')
      .then(snapshot => {
        var results = snapshot.val()
        let resultsArr = []
        Object.keys(results).forEach(function(key) {
          resultsArr.push({ key: key, keyFirebase: key, ...results[key] })
        })
        this.setState({
          products: { ...this.state.products, sold: resultsArr },
          itemLoaded: true,
        })
        console.log(this.state)
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
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
          }}
        >
          <View style={{ width: '40%', alignItems: 'center' }}>
            <ProfilePic />
          </View>
          <View>
            <Username user={this.props.user} />
            <Followers user={this.props.user} />
          </View>
        </View>
        <View style={{ paddingTop: 15, flex: 1 }}>
          <View style={style.soldTab}>
            <TouchableOpacity
              onPress={() => {
                this.setState(() => ({
                  showUnsold: false,
                }))
              }}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {this.state.showUnsold ? (
                <Text style={{ color: '#9D9B9B' }}>Sold</Text>
              ) : (
                <Text>Sold</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState(() => ({
                  showUnsold: true,
                }))
              }}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {this.state.showUnsold ? (
                <Text>Unsold</Text>
              ) : (
                <Text style={{ color: '#9D9B9B' }}>Unsold</Text>
              )}
            </TouchableOpacity>
          </View>
          {this.state.itemLoaded ? (
            <ScrollView style={{ flex: 1 }}>
              {this.state.showUnsold ? (
                <UnsoldItemView {...this.state.products.unSold} />
              ) : (
                <SoldItemView {...this.state.products.sold} />
              )}
            </ScrollView>
          ) : null}
        </View>
      </View>
    )
  }
}

const SoldItemView = props => {
  var result = Object.values(props)
  if (result.length) {
    return (
      <View style={{ paddingTop: 30, paddingHorizontal: 20 }}>
        <FlatList
          style={{ flex: 1 }}
          // ListFooterComponent={<View style={{ margin: 10 }} />}
          renderItem={({ item }) => <ListedItem key={item.key} {...item} />}
          data={result}
        />
      </View>
    )
  }
  return false
}

const UnsoldItemView = props => {
  var result = Object.values(props)
  if (result.length) {
    return (
      <View style={{ paddingTop: 30, paddingHorizontal: 20 }}>
        <FlatList
          style={{ flex: 1 }}
          // ListFooterComponent={<View style={{ margin: 10 }} />}
          renderItem={({ item }) => <ListedItem key={item.key} {...item} />}
          data={result}
        />
      </View>
    )
  }
  return false
}

const ListedItem = props => (
  <View style={{ flexDirection: 'row', alignContent: 'flex-start' }}>
    <Image
      style={{
        resizeMode: 'contain',
        width: 200,
        height: 120,
        borderRadius: 10,
        marginRight: 10,
        marginBottom: 30,
      }}
      source={{ uri: props.pic }}
    />
    <View>
      <Text>{props.name}</Text>
      <Text>£{props.price}</Text>
      <Text>Viewers: </Text>
    </View>
  </View>
)

const mapStateToProps = state => ({
  user: state.user,
})
export default connect(mapStateToProps)(SellingScreen)

const style = StyleSheet.create({
  soldTab: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'center',
    height: 40,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    elevation: 1,
  },
})
