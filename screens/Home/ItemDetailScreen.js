import React from 'react'
import {
  Text,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import { Icon } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import * as firebase from 'firebase'
import {
  CartButton,
  BuyButton,
  MessageSellerButton
} from '../../components/itemDetail/Buttons'
import { Divider } from '../../components/itemDetail/Divider'
import { ContentHeader } from '../../components/itemDetail/ContentHeader'
import { AboutItem } from '../../components/itemDetail/AboutItem'
import SearchButton from '../../components/header/SearchButton'
import { createChat } from '../../redux/actions'

class ItemDetail extends React.Component {
  constructor(props) {
    super(props)

    this.onMessageSellerButtonPress = this.onMessageSellerButtonPress.bind(this)

    this.state = {
      product: null,
      itemLoaded: false
    }
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

  onMessageSellerButtonPress() {
    const { product } = this.state
    if (product) {
      const { uid } = product
      const { createChat } = this.props

      createChat({ value: uid })
    }
  }

  renderDetail = () => {
    const product = this.state.product
    var aboutArr = []
    if (product !== null) {
      if (product.about !== undefined) {
        const aboutObj = product.about
        Object.keys(aboutObj).forEach(function(key) {
          let nameKey = key.charAt(0).toUpperCase() + key.slice(1)
          aboutArr.push({ key: nameKey, value: aboutObj[key] })
        })
      }
    }
    return this.state.itemLoaded && product && aboutArr ? (
      <View>
        <BuyButton />
        <CartButton />
        <MessageSellerButton onPress={this.onMessageSellerButtonPress} />
        <Divider />
        <ContentHeader text={'About this item'} />
        <View style={{ marginHorizontal: '8%' }}>
          <AboutItem label={'Condition'} text={product.condition} />
          <AboutItem label={'Type'} text={product.type} />
          {aboutArr.map(about => (
            <AboutItem key={about.key} label={about.key} text={about.value} />
          ))}
        </View>
        <Divider />
        <ContentHeader text={'Item description'} />
        <Text style={{ fontSize: 16, marginHorizontal: '8%' }}>
          {product.description}
        </Text>
      </View>
    ) : (
      <View style={{ flex: 1 }}>
        <ActivityIndicator />
      </View>
    )
  }

  addWishList = products => {
    console.log(this.props.user.uid)
    if (this.props.user.uid) {
      var postData = {
        name: products.name,
        pic: products.pic,
        price: products.price
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
      <View
        style={{
          flex: 1,
          backgroundColor: 'white'
        }}
      >
        <SearchButton
          onFocus={() => {
            this.props.navigation.navigate('SearchScreen')
          }}
        />

        <ScrollView
          style={{
            flex: 1
            // backgroundColor: 'white',
          }}
        >
          <Image
            style={{
              width: '90%',
              aspectRatio: 16 / 9,
              resizeMode: 'contain',
              marginHorizontal: '5%'
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
          <View style={{ height: 20, width: '100%' }} />

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
      </View>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})
export default connect(
  mapStateToProps,
  { createChat }
)(ItemDetail)
