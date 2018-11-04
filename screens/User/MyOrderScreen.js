import React from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as firebase from 'firebase'
import { connect } from 'react-redux'
import {
  ProductOrderedCard,
  ProductPurchasedCard,
} from '../../components/productCard/ProductCard'

class MyOrderScreen extends React.Component {
  state = {
    requestedItems: null,
    acceptedItems: null,
    purchasededItems: null,
    itemLoaded: false,
  }

  componentDidMount() {
    this.fetchDetail()
  }

  fetchDetail = () => {
    return firebase
      .database()
      .ref('/orders/' + this.props.user.uid + '/')
      .orderByChild('status')
      .equalTo('Purchased')
      .once('value')
      .then(snapshot => {
        var products = snapshot.val()
        if (products) {
          let productsArr = []
          Object.keys(products).forEach(function(key) {
            productsArr.push({ key: key, objectId: key, ...products[key] })
          })
          this.setState({
            purchasedItems: productsArr,
            itemLoaded: true,
          })
        }
      })
  }

  renderItems = () => {
    if (!this.state.itemLoaded) {
      console.log('item loading')
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator />
        </View>
      )
    }

    if (this.state.purchasedItems.length == 0) {
      console.log(`no item`)
      return (
        <View>
          <Text
            style={{ fontSize: 16, marginHorizontal: '8%', marginBottom: 10 }}
          >
            No item found
          </Text>
        </View>
      )
    } else {
      console.log(`item found`)
      console.log(this.state.purchasedItems.length)
      return (
        <View style={{ marginTop: 10 }}>
          <FlatList
            style={{ height: 240 }}
            // ListFooterComponent={<View style={{ margin: 10 }} />}
            horizontal={true}
            renderItem={({ item }) => (
              <ProductPurchasedCard
                navigation={this.props.navigation}
                key={item.key}
                {...item}
              />
            )}
            data={this.state.purchasedItems}
          />
        </View>
      )
    }
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        {this.renderItems()}
      </View>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
})
export default connect(mapStateToProps)(MyOrderScreen)

const styles = StyleSheet.create({
  txtLabel: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: '5%',
  },
})
