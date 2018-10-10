import React from 'react'
import {
  Text,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { Icon } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import * as firebase from 'firebase'
import { CartButton, BuyButton } from '../../components/itemDetail/Buttons'
import { Divider } from '../../components/itemDetail/Divider'
import { ContentHeader } from '../../components/itemDetail/ContentHeader'

class ItemDetail extends React.Component {
  state = {
    product: null,
    itemLoaded: false,
  }

  componentDidMount() {
    const { navigation } = this.props
    const products = navigation.getParam('products')
    console.log(products.objectID)
    this.fetchDetail(products.objectID)
  }

  fetchDetail = objectID => {
    return firebase
      .database()
      .ref('/products/' + objectID)
      .once('value')
      .then(snapshot => {
        var productStatus = snapshot.val() && snapshot.val().isAvailable
        if (productStatus) {
          var product = snapshot.val()
          this.setState({ product: product, itemLoaded: true })
          // TODO ADD production later
        }
        // var product = (snapshot.val() && snapshot.val().username) || 'Anonymous'
        // console.log(snapshot.val())
        // ...
      })
  }

  renderDetail = () =>
    this.state.itemLoaded ? (
      <View>
        <BuyButton />
        <CartButton />
        <Divider />
        <ContentHeader text={'About this item'} />
        <View style={{ flexDirection: 'row', marginHorizontal: '8%' }}>
          <View style={{ flex: 4 }}>
            <Text style={{ fontSize: 16, color: '#525252' }}>Condition</Text>
            <Text style={{ fontSize: 16, color: '#525252' }}>Brand</Text>
            <Text style={{ fontSize: 16, color: '#525252' }}>Type</Text>
          </View>
          <View style={{ flex: 6 }}>
            <Text style={{ fontSize: 16 }}>{this.state.product.condition}</Text>
            <Text style={{ fontSize: 16 }}>{this.state.product.brand}</Text>
            <Text style={{ fontSize: 16 }}>{this.state.product.type}</Text>
          </View>
        </View>
        <Divider />
        <ContentHeader text={'Item description'} />
        <Text>Item description</Text>
        <Text>{this.state.product.description}</Text>
      </View>
    ) : (
      <View style={{ flex: 1 }}>
        <ActivityIndicator />
      </View>
    )

  addWishList = products => {
    console.log(this.props.user.uid)
    if (this.props.user.uid) {
      var postData = {
        name: products.name,
        pic: products.pic,
        price: products.price,
      }
      // Write the new post's data simultaneously in the posts list and the user's post list.
      var updates = {}
      updates[
        '/wishlist/' + this.props.user.uid + '/' + products.keyFirebase
      ] = postData

      return firebase
        .database()
        .ref()
        .update(updates)
    }
  }

  render() {
    const { navigation } = this.props
    const products = navigation.getParam('products')
    return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}
      >
        <Image
          style={{
            width: '90%',
            aspectRatio: 16 / 9,
            resizeMode: 'contain',
            marginHorizontal: '5%',
          }}
          source={{ uri: products.pic }}
        />
        <View style={{ marginHorizontal: '5%', marginVertical: 10 }}>
          <Text style={{ fontSize: 20 }}>{products.name}</Text>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
            £{products.price}
          </Text>
          <Text style={{ fontSize: 20 }}>By {products.user}</Text>
        </View>
        {this.renderDetail()}

        {/* <Image
            style={{
              width: '100%',
              aspectRatio: 16 / 9,
              // height: 189,
              resizeMode: 'contain',
              marginHorizontal: '5%',
            }}
            source={{ uri: products.pic }}
          />
          <TouchableOpacity onPress={() => this.addWishList(products)}>
            <Text>ADD TO WISHLIST</Text>
          </TouchableOpacity>
          <Text>{products.keyFirebase}</Text>
          <Text>{products.name}</Text>
          <Text>{products.price}</Text>
          <Text>{products.description}</Text>
          <Text>{products.location}</Text>
          <Text>{products.pic}</Text>
          <Text>{products.uid}</Text>
          <Text>{products.category}</Text>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('Seller', {
                sellerId: products.uid,
                sellerName: products.user,
              })
            }
          >
            <Text>{products.user}</Text>
          </TouchableOpacity> */}
      </ScrollView>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
})
export default connect(mapStateToProps)(ItemDetail)
