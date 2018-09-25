import React from 'react'
import { View, Text } from 'react-native'

import { ProductSearchView } from './ProductSearchView'
import Search from '../../components/header/Search'

export default class SearchScreen extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}
      >
        <Search autoFocus={true} />
      </View>
    )
  }
}
