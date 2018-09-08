import React from 'react'
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Button,
  Image,
  FlatList,
} from 'react-native'
import { SearchBar } from 'react-native-elements'
import { Constants } from 'expo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import Search from '../components/header/Search'
import NewSearch from '../components/header/Search'
// import { SearchBarHeader } from "../components/header/SearchBarHeader";
import { HomeTitle } from '../components/home/HomeTitle'
import { PopularSearch } from '../components/home/PopularSearch'
import { RecentSearch } from '../components/home/RecentSearch'

import { fetchUsers } from '../api'

class Home extends React.Component {
  state = {
    products: null,
    itemLoaded: false,
    populars: [
      {
        key: 1,
        name: 'Accommodation',
      },
      {
        key: 2,
        name: 'Jewelry',
      },
      {
        key: 3,
        name: 'Engineering',
      },
      {
        key: 4,
        name: 'Kitchen Supplies',
      },
      {
        key: 5,
        name: 'Gloves',
      },
      {
        key: 6,
        name: 'Textbooks',
      },
      {
        key: 7,
        name: 'Furniture',
      },
    ],
  }

  componentDidMount() {
    // this.getUsers();
    fetch('https://uni-link-9f8f5.firebaseio.com/products.json')
      .then(response => response.json())
      .then(results => {
        let resultsArr = []
        Object.keys(results).forEach(function(key) {
          resultsArr.push({ key: key, keyFirebase: key, ...results[key] })
        })
        return resultsArr
      })
      .then(resultsArr => {
        this.setState({ products: resultsArr, itemLoaded: true })
      })
  }

  // getUsers = async () => {
  //   const results = await fetchUsers();
  //   this.setState({products: results, itemLoaded: true})
  // };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.searchContainer}>
          <Search />
        </View>
        <ScrollView style={styles.container}>
          {/* <Text>55555 {JSON.stringify(this.props.search)}</Text> */}
          {this.props.search ? (
            <SearchHome data={this.props} />
          ) : (
            <DefaultHome data={this.state} navigation={this.props.navigation} />
          )}
          <View style={{ height: 50 }} />
        </ScrollView>
      </View>
    )
  }
}

const DefaultHome = props => (
  <View>
    <View>
      <HomeTitle />
      <PopularSearch navigation={props.navigation} {...props.data} />
    </View>
    {props.data.itemLoaded ? (
      <RecentSearch navigation={props.navigation} {...props.data} />
    ) : null}
    <Button
      style={{ marginBottom: 50 }}
      onPress={() => props.navigation.navigate('Seller')}
      title={'goToSellerScreen'}
    />
  </View>
)

const SearchHome = props => (
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

const ProductSearchView = props => (
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

const ProductCardHalfPage = props => (
  <View
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
        maxWidth: '90%',
        maxHeight: '60%',
        borderRadius: 10,
        aspectRatio: 1.78,
      }}
      source={require('../assets/images/placeholder.png')}
    />
    <Text style={{ fontSize: 10 }}>ProductName</Text>
    <Text style={{ fontSize: 10, fontWeight: 'bold' }}>£400.00</Text>
    <Text style={{ fontSize: 10 }}>By User</Text>
    <Text style={{ fontSize: 10 }}>Rating</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 18,
    backgroundColor: 'white',
  },
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

const mapStateToProps = state => ({
  search: state.search.searchTxt,
})
export default connect(mapStateToProps)(Home)
