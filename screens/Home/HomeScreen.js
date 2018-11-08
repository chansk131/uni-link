import React from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { updateUser, fetchUser } from '../../redux/actions'
import * as firebase from 'firebase'

import Search from '../../components/header/Search'
import { DefaultHome } from './DefaultHome'
import SearchButton from '../../components/header/SearchButton'

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

  componentWillMount() {
    // if user is logged then get their data from firebase
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.fetchUser()
      }
    })
  }

  componentDidMount() {
    this.listenForAuth()
  }

  fetchRecentView = uid => {
    return firebase
      .database()
      .ref('/recentView/' + uid)
      .once('value')
      .then(snapshot => {
        let results = snapshot.val()
        let resultsArr = []
        if (results) {
          Object.keys(results).forEach(function(key) {
            resultsArr.push({ key: key, objectID: key, ...results[key] })
          })
          console.log(results)
          this.setState({ products: resultsArr, itemLoaded: true })
        }
      })
  }

  listenForAuth = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user != null) {
        // User is signed in.
        this.props.updateUser({ uid: user.uid })
        this.fetchRecentView(user.uid)
      } else {
        console.log('Signed out')
        this.props.updateUser()
      }
    })
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <SearchButton
          onFocus={() => {
            this.props.navigation.navigate('SearchScreen')
          }}
        />
        <ScrollView style={styles.container}>
          <DefaultHome
            data={this.state}
            navigation={this.props.navigation}
            signIn={this.props.user.uid}
          />
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
  { updateUser, fetchUser }
)(Home)
