import React from 'react'
import { Text, ScrollView, View, Image, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default class ItemDetail extends React.Component {
  render() {
    const { navigation } = this.props
    const products = navigation.getParam('products')
    return (
      <ScrollView>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
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
