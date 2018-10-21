import React from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as firebase from 'firebase'
import { connect } from 'react-redux'
import { ProductOrderedCard } from '../../components/productCard/ProductCard'

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
      .ref('/orders/' + this.props.user.uid)
      .once('value')
      .then(snapshot => {
        var products = snapshot.val()
        if (products !== null) {
          let requestedArr = []
          let acceptedArr = []
          let purchasedArr = []
          Object.keys(products).forEach(function(key) {
            console.log(products[key]['status'])
            switch (products[key]['status']) {
              case 'Requested':
                requestedArr.push({ key: key, ...products[key] })
                break
              case 'Accepted':
                acceptedArr.push({ key: key, ...products[key] })
                break
              case 'Purchased':
                purchasedArr.push({ key: key, ...products[key] })
                break
            }
          })
          this.setState({
            requestedItems: requestedArr,
            acceptedItems: acceptedArr,
            purchasedItems: purchasedArr,
            itemLoaded: true,
          })
        }
      })
  }

  renderItems = type => {
    let products = []
    switch (type) {
      case 'Requested':
        products = this.state.requestedItems
        break
      case 'Accepted':
        products = this.state.acceptedItems
        break
      case 'Purchased':
        products = this.state.purchasedItems
        break
    }
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

    if (products.length == 0) {
      console.log(`no similar item`)
      return (
        <View>
          <Text
            style={{ fontSize: 16, marginHorizontal: '8%', marginBottom: 10 }}
          >
            No {type} item found
          </Text>
        </View>
      )
    } else {
      console.log(`similar item found`)
      console.log(products.length)
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
          data={products}
        />
      )
    }
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}
      >
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => this.props.navigation.navigate('MyRequested')}
        >
          <Text>Requested</Text>
          {this.renderItems('Requested')}
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => this.props.navigation.navigate('MyAccepted')}
        >
          <Text>Accepted</Text>
          {this.renderItems('Accepted')}
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => this.props.navigation.navigate('MyPurchased')}
        >
          <Text>Purchased</Text>
          {this.renderItems('Purchased')}
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
})
export default connect(mapStateToProps)(MyOrderScreen)
