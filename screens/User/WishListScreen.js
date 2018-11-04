import React from 'react'
import { Text, View, FlatList, Image } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import * as firebase from 'firebase'
import { ProductCard } from '../../components/productCard/ProductCard'

class WishListScreen extends React.Component {
  state = {
    itemLoaded: false,
    products: null,
  }

  componentDidMount() {
    this.fetchWishlist()
  }

  fetchWishlist = () => {
    var userId = this.props.user.uid
    return firebase
      .database()
      .ref('/wishlist/' + userId)
      .once('value')
      .then(snapshot => {
        var results = snapshot.val()
        let resultsArr = []
        if (results) {
          Object.keys(results).forEach(function(key) {
            resultsArr.push({ key: key, keyFirebase: key, ...results[key] })
          })
          this.setState({ products: resultsArr })
        }
      })
  }

  renderWishlistProducts = props => {
    if (props !== null) {
      var result = Object.values(props)
      console.log(result.length)
      if (result.length) {
        return (
          <View style={{ flex: 1 }}>
            <FlatList
              horizontal={true}
              style={{
                marginTop: 10,
                marginLeft: '5%',
                height: 2,
              }}
              // ListFooterComponent={<View style={{ margin: 10 }} />}
              renderItem={({ item }) => (
                <ProductCard key={item.key} {...item} />
              )}
              data={result}
            />
          </View>
        )
      }
      return (
        <View
          style={{
            margin: 20,
            alignContent: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{ fontSize: 20, color: 'lightgrey', fontWeight: 'bold' }}
          >
            No Product Wishlist Found
          </Text>
        </View>
      )
    }

    return (
      <View
        style={{
          margin: 20,
          alignContent: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ fontSize: 20, color: 'lightgrey', fontWeight: 'bold' }}>
          No Product Wishlist Found
        </Text>
      </View>
    )
  }

  renderWishlistServices = props => {
    if (props) {
      var result = Object.values(props)
      console.log(result.length)
      if (result.length) {
        return (
          <View style={{ flex: 1 }}>
            <FlatList
              horizontal={true}
              style={{
                marginTop: 10,
                marginHorizontal: '5%',
                height: 200,
              }}
              // ListFooterComponent={<View style={{ margin: 10 }} />}
              renderItem={({ item }) => (
                <ProductCard key={item.key} {...item} />
              )}
              data={result}
            />
          </View>
        )
      }
      return (
        <View
          style={{
            margin: 20,
            alignContent: 'center',
            justifyContent: 'center',
            flex: 1,
          }}
        >
          <Text
            style={{ fontSize: 20, color: 'lightgrey', fontWeight: 'bold' }}
          >
            No Service Wishlist Found
          </Text>
        </View>
      )
    }

    return (
      <View
        style={{
          margin: 20,
          alignContent: 'center',
          justifyContent: 'center',
          flex: 1,
        }}
      >
        <Text style={{ fontSize: 20, color: 'lightgrey', fontWeight: 'bold' }}>
          No Service Wishlist Found
        </Text>
      </View>
    )
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}
      >
        <Text style={{ marginTop: 10, marginHorizontal: '5%', fontSize: 20 }}>
          Products
        </Text>
        {this.renderWishlistProducts(this.state.products)}
        <Text style={{ marginTop: 10, marginHorizontal: '5%', fontSize: 20 }}>
          Services
        </Text>
        {this.renderWishlistServices(this.state.products)}
      </View>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
})
export default connect(mapStateToProps)(WishListScreen)

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
