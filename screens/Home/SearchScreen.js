import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native'
import { SearchBar } from 'react-native-elements'
import { connect } from 'react-redux'
import {
  InstantSearch,
  connectInfiniteHits,
  connectSearchBox,
  connectHighlight,
} from 'react-instantsearch-native'
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
        <InstantSearch
          appId="NKO22IO3FP"
          apiKey="eeb95603a82cde7e9393474518a67c27"
          indexName="products"
        >
          <SearchBox navigation={this.props.navigation} />
          <Hits navigation={this.props.navigation} />
          <View style={{ flex: 1, paddingHorizontal: '5%', paddingTop: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              Search Result {JSON.stringify(this.props.search)}
            </Text>

            {/* <ProductSearchView /> */}
          </View>
        </InstantSearch>
      </View>
    )
  }
}

const Hits = connectInfiniteHits(({ hits, hasMore, refine, navigation }) => {
  /* if there are still results, you can
  call the refine function to load more */
  const onEndReached = function() {
    if (hasMore) {
      refine()
    }
  }

  pressProduct = item => {
    console.log(JSON.stringify(item))
    navigation.navigate('ItemDetail', { products: item })
  }

  return (
    <View style={{ paddingHorizontal: '5%', paddingTop: 20 }}>
      <FlatList
        numColumns={2}
        data={hits}
        onEndReached={onEndReached}
        keyExtractor={(item, index) => item.objectID}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => this.pressProduct(item)}
              style={{
                flex: 1,
                aspectRatio: 1.15,
                minHeight: 140,
                maxHeight: 304,
                backgroundColor: 'white',
              }}
            >
              <Image
                style={{
                  resizeMode: 'contain',
                  maxWidth: '90%',
                  maxHeight: '60%',
                  borderRadius: 10,
                  aspectRatio: 1.78,
                }}
                source={{ uri: item.pic }}
              />
              <Text style={{ fontSize: 10 }}>
                <Highlight attribute="name" hit={item} />
              </Text>
              <Text style={{ fontSize: 10, fontWeight: 'bold' }}>
                £<Highlight attribute="price" hit={item} />
              </Text>
              <Text style={{ fontSize: 10 }}>
                By <Highlight attribute="user" hit={item} />
              </Text>
            </TouchableOpacity>
          )
        }}
      />
    </View>
  )
})

const SearchBox = connectSearchBox(
  ({ refine, currentRefinement, navigation }) => {
    const styles = StyleSheet.create({
      searchContainer: {
        backgroundColor: 'white',
        borderBottomWidth: 0,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: 'grey',
        shadowOpacity: 0.5,
        elevation: 3,
      },
      searchBarInput: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#C9C9C9',
      },
      searchBarContainer: {
        backgroundColor: 'white',
        width: '100%',
        borderBottomWidth: 0,
        borderTopWidth: 0,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: 'grey',
        shadowOpacity: 0.5,
        elevation: 3,
      },
    })

    return (
      <View style={styles.searchBarContainer}>
        <SearchBar
          autoFocus={true}
          onChangeText={text => {
            refine(text)
          }}
          onClearText={() => navigation.goBack()}
          value={currentRefinement}
          spellCheck={false}
          autoCorrect={false}
          autoCapitalize={'none'}
          clearIcon
          round
          inputStyle={styles.searchBarInput}
          containerStyle={styles.searchBarContainer}
          placeholder="Search a product..."
        />
      </View>
    )
  }
)

const Highlight = connectHighlight(
  ({ highlight, attribute, hit, highlightProperty }) => {
    const parsedHit = highlight({
      attribute,
      hit,
      highlightProperty: '_highlightResult',
    })
    const highlightedHit = parsedHit.map((part, idx) => {
      if (part.isHighlighted)
        return (
          <Text key={idx} style={{ fontWeight: 'bold' }}>
            {part.value}
          </Text>
        )
      return part.value
    })
    return <Text>{highlightedHit}</Text>
  }
)

const mapStateToProps = state => ({
  search: state.search.searchTxt,
  user: state.user,
})

export default connect(
  mapStateToProps,
  { updateUser }
)(SearchScreen)
