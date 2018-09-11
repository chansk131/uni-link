import React from 'react'
import { Text, View, FlatList } from 'react-native'
import { Card, Button, SearchBar } from 'react-native-elements'
import { Constants } from 'expo'

import { ProductCard } from './ProductCard'

export const ItemsCard1 = props => (
  <View>
    <FlatList
      style={{ height: 240, paddingLeft: '5%' }}
      ListFooterComponent={<View style={{ margin: 10 }} />}
      horizontal={true}
      renderItem={({ item }) => (
        <ProductCard navigation={props.navigation} key={item.key} {...item} />
      )}
      data={props.products}
    />
  </View>
)
