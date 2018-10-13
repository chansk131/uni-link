import React from 'react'
import {
  Text,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from 'react-native'
import { Icon } from 'react-native-elements'
import Swiper from 'react-native-swiper'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import * as firebase from 'firebase'
import {
  CartButton,
  BuyButton,
  MessageSellerButton,
} from '../../components/itemDetail/Buttons'
import { Divider } from '../../components/itemDetail/Divider'
import { ContentHeader } from '../../components/itemDetail/ContentHeader'
import { AboutItem } from '../../components/itemDetail/AboutItem'
import SearchButton from '../../components/header/SearchButton'
import { createChat } from '../../redux/actions'

const { width, height } = Dimensions.get('window')

class ItemDetail extends React.Component {
  constructor(props) {
    super(props)

    this.onMessageSellerButtonPress = this.onMessageSellerButtonPress.bind(this)

    this.state = {
      product: null,
      itemLoaded: false,
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
          let picsArr = []
          if (product.pictures) {
            picsArr = Object.values(product.pictures)
          }
          this.setState({
            product: product,
            itemLoaded: true,
            pictures: picsArr,
          })
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

  renderSwipePics = () => {
    this.state.pictures.map((val, key) => console.log(val + key))
    return (
      <Swiper
        style={styles.swiperStyle}
        showsButtons={true}
        paginationStyle={styles.paginationStyle}
      >
        {this.state.pictures.map((val, key) => (
          <Image key={key} style={styles.imgContainer} source={{ uri: val }} />
        ))}
      </Swiper>
    )
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
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}
      >
        <SearchButton
          onFocus={() => {
            this.props.navigation.navigate('SearchScreen')
          }}
        />

        <ScrollView
          style={{
            flex: 1,
            // backgroundColor: 'white',
          }}
        >
          {this.state.itemLoaded &&
          this.state.product &&
          this.state.product.pictures ? (
            this.renderSwipePics()
          ) : (
            <Image style={styles.imgContainer} source={{ uri: products.pic }} />
          )}

          <View style={{ marginHorizontal: '5%', marginVertical: 10 }}>
            <Text style={styles.headerTxt}>{products.name}</Text>
            <Text style={[styles.headerTxt, { fontWeight: 'bold' }]}>
              £{products.price}
            </Text>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('Seller', {
                  sellerId: products.uid,
                  sellerName: products.user,
                })
              }
            >
              <Text style={styles.headerTxt}>By {products.user}</Text>
            </TouchableOpacity>
          </View>
          {this.renderDetail()}
          <View style={{ height: 20, width: '100%' }} />

          {/* 
          <TouchableOpacity onPress={() => this.addWishList(products)}>
            <Text>ADD TO WISHLIST</Text>
          </TouchableOpacity>
          
           */}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {},
  swiperStyle: { height: (9 * width) / 16 + 10, marginTop: 10 },
  imgContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    resizeMode: 'contain',
    marginTop: 10,
    marginBottom: 10,
  },
  paginationStyle: {
    position: 'absolute',
    bottom: -5,
    left: 0,
    right: 0,
  },
  headerTxt: {
    fontSize: 20,
  },
})

const mapStateToProps = state => ({
  user: state.user,
})
export default connect(
  mapStateToProps,
  { createChat }
)(ItemDetail)
