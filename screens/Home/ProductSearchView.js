import React from 'react'
import { View, Text, FlatList } from 'react-native'

import { ProductCardHalfPage } from '../../components/productCard/ProductCardHalfPage'

export const ProductSearchView = props => (
  <View style={{ flex: 1 }}>
    <FlatList
      numColumns={2}
      renderItem={({ item }) => <ProductCardHalfPage {...item} />}
      data={[
        { key: 'a' },
        { key: 'b' },
        { key: 'c' },
        { key: 'd' },
        { key: 'e' },
        { key: 'f' },
        { key: 'g' },
        { key: 'h' },
        { key: 'i' },
        { key: 'j' },
        { key: 'k' },
      ]}
    />
    <Text>SimilarSearch</Text>
  </View>
)
