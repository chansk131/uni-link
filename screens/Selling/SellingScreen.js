import React from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native'
import { connect } from 'react-redux'
import * as firebase from 'firebase'

import Ionicons from 'react-native-vector-icons/Ionicons'
import { Username } from '../../components/Username'
import { Followers } from '../../components/FollowingFollower'
import { ProfilePic } from '../../components/ProfilePic'

class SellingScreen extends React.Component {
  state = {
    selected: 'Unsold',
    uid: null,
    draft: [],
    unsold: [],
    sold: [],
  }

  componentDidMount() {
    this.checkAuth()
    if (this.props.user.uid) {
      try {
        this.fetchData(this.props.user.uid)
      } catch (e) {
        console.log(e)
      }
    }
    ß
  }

  checkAuth = () => {
    if (this.props.user.uid) {
      const uid = this.props.user.uid
      this.setState({ uid })
      console.log('logged in')
    } else {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.setState({ uid: user.uid })
          console.log('logged in')
        } else {
          console.log('logged out')
        }
      })
    }
  }

  fetchData = uid => {
    this.setState({ loading: true })
    return firebase
      .database()
      .ref('/productsByOwners/' + uid)
      .once('value')
      .then(snapshot => {
        const productsObj = snapshot.val()
        let draftArr = []
        let unsoldArr = []
        let soldArr = []
        Object.keys(productsObj).forEach(key => {
          switch (productsObj[key].status) {
            case 'draft':
              draftArr.push({ key: key, objectID: key, ...productsObj[key] })
              break
            case 'unsold':
              unsoldArr.push({ key: key, objectID: key, ...productsObj[key] })
              break
            case 'sold':
              soldArr.push({ key: key, objectID: key, ...productsObj[key] })
              break
            default:
              console.log('no status')
          }
        })
        this.setState({
          draft: draftArr,
          unsold: unsoldArr,
          sold: soldArr,
          loading: false,
        })
      })
  }

  pressItem = item => {
    console.log(item)
    if (this.state.selected == 'Sold') {
      this.props.navigation.navigate('SoldDetail', {
        products: item,
      })
    } else if (this.state.selected == 'Unsold') {
      this.props.navigation.navigate('UnsoldDetail', {
        products: item,
      })
    } else if (this.state.selected == 'Draft') {
      this.props.navigation.navigate('AddItem', {
        key: item.key,
      })
    }
  }

  renderProducts = () => {
    var products
    switch (this.state.selected) {
      case 'Draft':
        products = this.state.draft
        break
      case 'Unsold':
        products = this.state.unsold
        break
      case 'Sold':
        products = this.state.sold
        break
      default:
        console.log('no selected')
    }
    if (products.length) {
      return (
        <View>
          <FlatList
            style={{ marginTop: 10, marginBottom: 20, marginHorizontal: '2%' }}
            data={products}
            renderItem={({ item }) => (
              <ListedItem
                key={item.key}
                {...item}
                // navigation={this.props.navigation}
                onSelect={() => this.pressItem(item)}
              />
            )}
          />
        </View>
      )
    } else {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{ fontSize: 24, fontWeight: 'bold', color: 'lightgrey' }}
          >
            No Item Found
          </Text>
        </View>
      )
    }
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
            <TabButton
              selected={this.state.selected}
              status={'Sold'}
              onPress={() => {
                this.setState({ selected: 'Sold' })
              }}
            />
            <TabButton
              selected={this.state.selected}
              status={'Unsold'}
              onPress={() => {
                this.setState(
                  { selected: 'Unsold' },
                  console.log(this.state.selected)
                )
              }}
            />
            <TabButton
              selected={this.state.selected}
              status={'Draft'}
              onPress={() => {
                this.setState({ selected: 'Draft' })
              }}
            />
          </View>
          {this.renderProducts()}
          {/* {!this.state.loading ? (
            <ScrollView style={{ flex: 1 }}>
              {this.state.showUnsold ? (
                <UnsoldItemView
                  products={this.state.products.unSold}
                  navigation={this.props.navigation}
                />
              ) : (
                <SoldItemView
                  products={this.state.products.sold}
                  navigation={this.props.navigation}
                />
              )}
            </ScrollView>
          ) : null} */}
        </View>
      </View>
    )
  }
}

const TabButton = props => {
  return (
    <TouchableOpacity
      onPress={() => {
        props.onPress()
      }}
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {props.selected != props.status ? (
        <Text style={{ color: '#9D9B9B' }}>{props.status}</Text>
      ) : (
        <Text>{props.status}</Text>
      )}
    </TouchableOpacity>
  )
}

const ListedItem = props => {
  // const props.
  return (
    <TouchableOpacity
      onPress={() => {
        props.onSelect()
      }}
      style={{
        flexDirection: 'row',
        alignContent: 'flex-start',
        width: '100%',
      }}
    >
      <Image
        style={{
          resizeMode: 'contain',
          width: 200,
          height: 120,
          borderRadius: 10,
          marginRight: 5,
          marginBottom: 30,
          borderWidth: 1,
          borderColor: '#eaeaea',
        }}
        source={{ uri: props.pic }}
      />
      <View style={{ width: (screenWidth / 2) * 0.7 }}>
        <Text ellipsizeMode="tail" numberOfLines={2}>
          {props.name}
        </Text>
        <Text style={{ fontWeight: 'bold' }}>£{props.price}</Text>
        {/* <Text>Viewers: </Text> */}
      </View>
    </TouchableOpacity>
  )
}

const screenWidth = Dimensions.get('window').width

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
