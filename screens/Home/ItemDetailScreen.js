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
  FlatList,
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
  WishListButton,
} from '../../components/itemDetail/Buttons'
import { Divider } from '../../components/itemDetail/Divider'
import { ContentHeader } from '../../components/itemDetail/ContentHeader'
import { AboutItem } from '../../components/itemDetail/AboutItem'
import SearchButton from '../../components/header/SearchButton'
import { createChat } from '../../redux/actions'
import { ProductCard } from '../../components/productCard/ProductCard'

const { width, height } = Dimensions.get('window')

class ItemDetail extends React.Component {
  constructor(props) {
    super(props)

    this.onMessageSellerButtonPress = this.onMessageSellerButtonPress.bind(this)

    this.state = {
      product: null,
      itemLoaded: false,
      similarItemLoaded: false,
    }
  }

  componentDidMount() {
    const { navigation } = this.props
    const product = navigation.getParam('products')
    this.fetchDetail(product.objectID)
  }

  fetchDetail = objectID => {
    console.log(`objectID is ${objectID}`)
    return firebase
      .database()
      .ref('/products/' + objectID)
      .once('value')
      .then(snapshot => {
        var productStatus = snapshot.val() && snapshot.val().isAvailable
        if (productStatus) {
          var product = snapshot.val()
          var date = new Date(product.timestamp)
          let picsArr = []
          if (product.pictures) {
            picsArr = Object.values(product.pictures)
          }
          console.log(picsArr)
          this.setState({
            product: product,
            itemLoaded: true,
            pictures: picsArr,
            objectID: objectID,
          })

          this.fetchSimilarItems(objectID)
          // TODO ADD production later
        }
        // var product = (snapshot.val() && snapshot.val().username) || 'Anonymous'
        // console.log(snapshot.val())
        // ...
      })
  }

  fetchSimilarItems = objectID => {
    return firebase
      .database()
      .ref('/products/')
      .orderByChild('type')
      .equalTo(this.state.product.type)
      .once('value')
      .then(snapshot => {
        var similarObj = snapshot.val()
        if (similarObj !== null) {
          let similarArr = []
          Object.keys(similarObj).forEach(function(key) {
            if (key != objectID && similarObj[key].isAvailable) {
              similarArr.push({ key: key, objectID: key, ...similarObj[key] })
            }
          })
          this.setState({
            similarItems: similarArr,
            similarItemLoaded: true,
          })
        }
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

  renderSimilarItem = () => {
    if (!this.state.similarItemLoaded) {
      console.log('similar item loading')
      return <ActivityIndicator />
    }

    if (this.state.similarItems.length == 0) {
      console.log(`no similar item`)
      return (
        <View>
          <Text
            style={{ fontSize: 16, marginHorizontal: '8%', marginBottom: 10 }}
          >
            No similar item found
          </Text>
        </View>
      )
    } else {
      console.log(`similar item found`)
      console.log(this.state.similarItems.length)
      return (
        <FlatList
          style={{ height: 240, paddingLeft: '5%' }}
          ListFooterComponent={<View style={{ margin: 10 }} />}
          horizontal={true}
          renderItem={({ item }) => (
            <ProductCard
              navigation={this.props.navigation}
              key={item.key}
              {...item}
            />
          )}
          data={this.state.similarItems}
        />
      )
    }
  }

  renderDetail = () => {
    const product = this.state.product
    var aboutArr = []
    var descriptionArr = []
    var qualificationArr = []
    if (product !== null) {
      if (product.about !== undefined) {
        const aboutObj = product.about
        Object.keys(aboutObj).forEach(function(key) {
          let nameKey = key.charAt(0).toUpperCase() + key.slice(1)
          aboutArr.push({ key: nameKey, value: aboutObj[key] })
        })
      }
      if (product.description !== undefined) {
        const descriptionObj = product.description
        Object.keys(descriptionObj).forEach(function(key) {
          descriptionArr.push({ key, value: descriptionObj[key] })
        })
      }
      if (product.qualification !== undefined) {
        const qualificationObj = product.qualification
        Object.keys(qualificationObj).forEach(function(key) {
          qualificationArr.push({ key, value: qualificationObj[key] })
        })
      }
    }
    return this.state.itemLoaded && product && aboutArr ? (
      <View>
        <BuyButton />
        <CartButton />
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-evenly',
          }}
        >
          <MessageSellerButton onPress={this.onMessageSellerButtonPress} />
          <WishListButton onPress={() => this.addWishList(product)} />
        </View>
        <Divider />
        <ContentHeader text={'About this item'} />
        <View style={{ marginHorizontal: '8%' }}>
          <AboutItem label={'Condition'} text={product.condition} />
          <AboutItem label={'Type'} text={product.type} />
          <AboutItem label={'Brand'} text={product.brand} />
          {aboutArr.map(about => (
            <AboutItem key={about.key} label={about.key} text={about.value} />
          ))}
        </View>
        <Divider />
        <ContentHeader text={'Item description'} />
        {descriptionArr.map(desc => (
          <Text
            key={desc.key}
            style={{ fontSize: 16, marginHorizontal: '8%', marginBottom: 10 }}
          >
            {'\u2022' + '   ' + desc.value}
          </Text>
        ))}

        <Divider />
        <ContentHeader text={'Similar Items'} />

        {this.renderSimilarItem()}
      </View>
    ) : (
      <View style={{ flex: 1 }}>
        <ActivityIndicator />
      </View>
    )
  }

  addWishList = products => {
    // console.log(this.props.user.uid)
    if (this.props.user.uid) {
      var postData = {
        name: products.name,
        pic: products.pic,
        price: products.price,
      }
      // Write the new post's data simultaneously in the posts list and the user's post list.
      var updates = {}
      updates[
        '/wishlist/' + this.props.user.uid + '/' + this.state.objectID
      ] = postData

      return firebase
        .database()
        .ref()
        .update(updates)
    } else {
      this.props.navigation.navigate('Signin')
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
  swiperStyle: { height: (9 * width) / 16 + 10 },
  imgContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    resizeMode: 'contain',
    marginTop: 10,
    marginBottom: 10,
  },
  paginationStyle: {
    position: 'absolute',
    bottom: -15,
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
