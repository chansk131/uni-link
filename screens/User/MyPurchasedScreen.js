import React from 'react'
import {
  Text,
  View,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as firebase from 'firebase'
import { connect } from 'react-redux'
import { ProductOrderedCard } from '../../components/productCard/ProductCard'

class MyPurchasedOrderScreen extends React.Component {
  state = {
    purchasedItems: null,
    itemLoaded: false,
  }

  componentDidMount() {
    this.fetchMyPurchased()
  }

  fetchMyPurchased = () => {
    // fetch mypurchased from firebase
    return firebase
      .database()
      .ref('/orders/' + this.props.user.uid + '/')
      .orderByChild('status')
      .equalTo('Ordered')
      .once('value')
      .then(snapshot => {
        var products = snapshot.val()
        if (products !== null) {
          let productsArr = []
          Object.keys(products).forEach(function(key) {
            productsArr.push({ key: key, ...products[key] })
          })
          this.setState({
            purchasedItems: productsArr,
            itemLoaded: true,
          })
        }
      })
  }

  renderPurchasedItems = () => {
    if (!this.state.itemLoaded) {
      console.log('similar item loading')
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator />
        </View>
      )
    }

    if (this.state.purchasedItems.length == 0) {
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
      console.log(this.state.purchasedItems.length)
      return (
        <FlatList
          style={{ height: 240, paddingLeft: '5%' }}
          ListFooterComponent={<View style={{ margin: 10 }} />}
          horizontal={true}
          renderItem={({ item }) => (
            <ProductOrderedCard
              navigation={this.props.navigation}
              key={item.key}
              {...item}
            />
          )}
          data={this.state.purchasedItems}
        />
      )
    }
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        {this.renderPurchasedItems()}
      </View>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
})
export default connect(mapStateToProps)(MyPurchasedOrderScreen)

const styles = StyleSheet.create({
  txtLabel: {
    fontSize: 20,
    marginTop: 10,
    marginHorizontal: '5%',
  },
})
