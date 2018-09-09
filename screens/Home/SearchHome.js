import React from 'react'
import { View, Text } from 'react-native'

import { ProductSearchView } from './ProductSearchView'

export const SearchHome = props => (
  <View
    style={{
      flex: 1,
      paddingHorizontal: '5%',
    }}
  >
    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
      Search Result for {JSON.stringify(props.data.search)}
    </Text>
    <ProductSearchView />
  </View>
)
