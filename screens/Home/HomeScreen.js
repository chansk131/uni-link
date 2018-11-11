import React from 'react'
import { View, ScrollView, StyleSheet, RefreshControl, TouchableOpacity, Text } from 'react-native'
import { connect } from 'react-redux'
import { updateUser, fetchUser } from '../../redux/actions'
import * as firebase from 'firebase'

import Search from '../../components/header/Search'
import { DefaultHome } from './DefaultHome'
import SearchButton from '../../components/header/SearchButton'
import {
  LogoHeader,
  LogoHeaderWithText,
  HamburgerHeader,
  MessageHeader,
  LogoHeaderWithTextButton,
} from '../../components/header/HeaderIcons'
import { HomeTitle } from '../../components/home/HomeTitle'
import { PopularSearch } from '../../components/home/PopularSearch'
import { RecentSearch } from '../../components/home/RecentSearch'

class Home extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: 'white',
      borderBottomWidth: 0,
      elevation: 3,
    },
    headerLeft: <HamburgerHeader navigation={navigation} />,
    headerTitle: navigation.getParam('signIn') ? (
      <LogoHeader />
    ) : (
      <LogoHeaderWithTextButton text={'Sign in'} navigation={navigation} />
    ),
    headerRight: <MessageHeader navigation={navigation} />,
  })

  state = {
    refreshing: false,
    section: 'marketplace',
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

  onRefresh = () => {
    console.log(`state = ${this.state.uid}`)
    this.setState({ refreshing: true })
    if (this.state.uid) {
      this.fetchRecentView(this.state.uid)
    }
    this.fetchProducts().then(() => {
      this.setState({ refreshing: false })
    })
  }

  fetchRecentView = uid => {
    this.setState({ itemLoaded: false })
    return firebase
      .database()
      .ref('/recentView/' + uid)
      .once('value')
      .then(snapshot => {
        let results = snapshot.val()
        let resultsArr = []
        console.log(results)
        if (results) {
          Object.keys(results).forEach(function(key) {
            resultsArr.push({ key: key, objectID: key, ...results[key] })
          })
          console.log(resultsArr)
          this.setState({ products: resultsArr, itemLoaded: true })
        }
      })
  }

  fetchProducts = () => {
    this.setState({ itemLoaded: false })
    return firebase
      .database()
      .ref('/products/')
      .orderByChild('status')
      .equalTo('unsold')
      .once('value')
      .then(snapshot => {
        let results = snapshot.val()
        let resultsArr = []
        if (results) {
          Object.keys(results).forEach(function(key) {
            resultsArr.push({ key: key, objectID: key, ...results[key] })
          })
          this.setState({ allProducts: resultsArr, itemLoaded: true })
        }
      })
  }

  listenForAuth = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user != null) {
        // User is signed in.
        console.log(user)

        this.fetchProducts()
        this.fetchRecentView(user.uid)
        this.props.navigation.setParams({ signIn: true })
        this.props.updateUser({ uid: user.uid })
        this.setState({ uid: user.uid })
      } else {
        console.log('Signed out')
        this.fetchProducts()
        this.props.updateUser()
        this.props.navigation.setParams({ signIn: false })
      }
    })
  }

  changeSection = () => {
    if (this.state.section == 'marketplace') {
      this.setState({section: 'services'})
    } else {
      this.setState({section: 'marketplace'})
    }
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <SearchButton
          onFocus={() => {
            this.props.navigation.navigate('SearchScreen')
          }}
        />
        <ScrollView
          style={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
        >
          <HomeTitle section={this.state.section} />
          <TouchableOpacity onPress={()=>this.changeSection()} ><Text>Change Section</Text></TouchableOpacity>
          <PopularSearch navigation={this.props.navigation} {...this.state} />

          {this.state.itemLoaded ? (
            <RecentSearch navigation={this.props.navigation} {...this.state} />
          ) : null}
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
