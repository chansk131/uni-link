import React from 'react'
import { Text, View, ScrollView, StyleSheet, FlatList } from 'react-native'

import { ProductCard } from '../productCard/ProductCard'

export const RecentSearch = props => (
  <View>
        <Text style={styles.recentFont}>PICKS OF THE DAY</Text>
    <FlatList
      style={{ height: 240, paddingLeft: '5%' }}
      ListFooterComponent={<View style={{ margin: 10 }} />}
      horizontal={true}
      renderItem={({ item }) => (
        <ProductCard navigation={props.navigation} key={item.key} {...item} />
      )}
      data={props.items}
    />
    <Text style={styles.recentFont}>RECENT SEARCHES</Text>
    <FlatList
      style={{ height: 240, paddingLeft: '5%' }}
      ListFooterComponent={<View style={{ margin: 10 }} />}
      horizontal={true}
      renderItem={({ item }) => (
        <ProductCard navigation={props.navigation} key={item.key} {...item} />
      )}
      data={props.recentItems}
    />

  </View>
)

const styles = StyleSheet.create({
  recentFont: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#313131',
    marginBottom: 13,
    paddingHorizontal: '5%',
  },
})
