import React from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native'
import { connect } from 'react-redux'

import Ionicons from 'react-native-vector-icons/Ionicons'
import { Username } from '../components/Username'
import { Followers } from '../components/FollowingFollower'
import { ProfilePic } from '../components/ProfilePic'

class SellingScreen extends React.Component {
  state = {
    showUnsold: true,
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
            paddingHorizontal: '7%',
            paddingTop: '7%',
          }}
        >
          <View style={{ width: '40%', height: 76 }}>
            <ProfilePic />
          </View>
          <View>
            <Username user={this.props.user} />
            <Followers user={this.props.user} />
          </View>
        </View>
        <View style={{ paddingTop: 10, flex: 1 }}>
          <View style={style.soldTab}>
            <TouchableOpacity
              onPress={() =>
                this.setState(() => ({
                  showUnsold: false,
                }))
              }
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
              onPress={() =>
                this.setState(() => ({
                  showUnsold: true,
                }))
              }
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
          <ScrollView style={{ flex: 1 }}>
            {this.state.showUnsold ? (
              <UnsoldItemView showUnsold={this.state.showUnsold} />
            ) : (
              <SoldItemView showUnsold={this.state.showUnsold} />
            )}
          </ScrollView>
        </View>
      </View>
    )
  }
}

const SoldItemView = props => (
  <View style={{ paddingTop: 30, paddingHorizontal: 20 }}>
    <ListedItem product={'Sold'} />
    <ListedItem product={'Sold'} />
    <ListedItem product={'Sold'} />
    <ListedItem product={'Sold'} />
  </View>
)

const UnsoldItemView = props => (
  <View style={{ paddingTop: 30, paddingHorizontal: 20 }}>
    <ListedItem product={'Unsold'} />
    <ListedItem product={'Unsold'} />
    <ListedItem product={'Unsold'} />
    <ListedItem product={'Unsold'} />
  </View>
)

const ListedItem = props => (
  <View style={{ flexDirection: 'row', alignContent: 'flex-start' }}>
    <Image
      style={{
        width: 200,
        height: 120,
        borderRadius: 10,
        marginRight: 10,
        marginBottom: 30,
      }}
      source={require('../assets/images/placeholder.png')}
    />
    <View>
      <Text>{props.product}</Text>
      <Text>$500</Text>
      <Text>By User</Text>
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
