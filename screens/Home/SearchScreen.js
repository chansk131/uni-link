import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { updateUser } from '../../redux/actions'

import { ProductSearchView } from './ProductSearchView'
import Search from '../../components/header/Search'

class SearchScreen extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}
      >
        <Search autoFocus={true} />
        <View style={{ flex: 1, paddingHorizontal: '5%', paddingTop: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
            Search Result {JSON.stringify(this.props.search)}
          </Text>
          <ProductSearchView />
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  search: state.search.searchTxt,
  user: state.user,
})

export default connect(
  mapStateToProps,
  { updateUser }
)(SearchScreen)
