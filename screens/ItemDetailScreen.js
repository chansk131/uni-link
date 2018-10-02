import React from 'react'
import { Text, ScrollView, View, Image, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import * as firebase from 'firebase'

class ItemDetail extends React.Component {
  state = {
    products: null,
  }

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
      <ScrollView>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
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
          <Image
            style={{ width: 500, height: 500, borderRadius: 10 }}
            source={{ uri: products.pic }}
          />
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
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
})
export default connect(mapStateToProps)(ItemDetail)
