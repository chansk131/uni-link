import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { SearchBar } from 'react-native-elements'

export default class SearchButton extends React.Component {
  render() {
    return (
      <View style={styles.searchBarContainer}>
        <SearchBar
          onFocus={() => {
            this.props.onFocus()
          }}
          round
          inputStyle={styles.searchBarInput}
          containerStyle={styles.searchBarContainer}
          placeholder="Type Here..."
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: 'white',
    borderBottomWidth: 0,
    // shadowOffset: { width: 1, height: 1 },
    // shadowColor: 'grey',
    // shadowOpacity: 0.5,
    // elevation: 3,
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
