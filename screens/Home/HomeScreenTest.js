import React from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { updateUser } from '../../redux/actions'
import * as firebase from 'firebase'

import Search from '../../components/header/Search'
import { DefaultHome } from './DefaultHome'
import { SearchHome } from './SearchHome'

class Home extends React.Component {
  state = {
    uid: '',
    signedIn: false,
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
    this.listenForAuth()
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

  listenForAuth = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user != null) {
        // User is signed in.
        this.props.updateUser({ uid: user.uid })
      } else {
        console.log('Signed out')
        this.props.updateUser()
      }
    })
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Search />
        <ScrollView style={styles.container}>
          {this.props.search ? (
            <SearchHome data={this.props} />
          ) : (
            <DefaultHome
              data={this.state}
              navigation={this.props.navigation}
              signIn={this.props.user.uid}
            />
          )}
          <View style={{ height: 50 }} />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 18,
  },
})

const mapStateToProps = state => ({
  search: state.search.searchTxt,
  user: state.user,
})

export default connect(
  mapStateToProps,
  { updateUser }
)(Home)
