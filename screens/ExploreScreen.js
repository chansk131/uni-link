import React from 'react'
import {
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native'
import { Card } from 'react-native-elements'
import { Constants } from 'expo'
import { connect } from 'react-redux'
import { updateUser } from '../redux/actions'
import * as firebase from 'firebase'

// import { checkAuth } from '../api'

import Search from '../components/header/Search'
import Ionicons from 'react-native-vector-icons/Ionicons'
import SearchButton from '../components/header/SearchButton'

// TODO make the menubutton  snap when pressing the menubutton

class ExplorScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <SearchButton
          onFocus={() => {
            this.props.navigation.navigate('SearchScreen')
          }}
        />
        <View
          style={{
            flex: 1,
            paddingTop: 18,
          }}
        >
          <Categories />
        </View>
      </View>
    )
  }
}

class Categories extends React.Component {
  state = {
    chosenCategory: '',
  }

  componentDidMount() {
    console.log(this.state)
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            marginBottom: 10,
            marginHorizontal: '7%',
          }}
        >
          Categories
        </Text>
        <View style={styles.menuContainer}>
          <ScrollView
            horizontal={true}
            style={styles.container}
            contentContainerStyle={{ flexDirection: 'row' }}
            snapToInterval={6}
            decelerationRate={'fast'}
          >
            <MenuBtn
              text={'For YOU'}
              onPress={() => {
                this.setState({ chosenCategory: 'forYou' })
              }}
            />
            <MenuBtn
              text={'CLOTHING'}
              onPress={() => {
                this.setState({ chosenCategory: 'clothing' })
              }}
            />
            <MenuBtn
              text={'ACCOMMODATION'}
              onPress={() => {
                this.setState({ chosenCategory: 'accommodation' })
              }}
            />
            <MenuBtn
              text={'UNIVERSITIES'}
              onPress={() => {
                this.setState({ chosenCategory: 'universities' })
              }}
            />
            <MenuBtn
              text={'ELECTRONICS'}
              onPress={() => {
                this.setState({ chosenCategory: 'electronics' })
              }}
            />
            <MenuBtn
              text={'SERVICES'}
              onPress={() => {
                this.setState({ chosenCategory: 'services' })
              }}
            />
          </ScrollView>
        </View>
        <ScrollView style={{ flex: 1, paddingTop: 15 }}>
          <Text>Content</Text>
          <Text>{this.state.chosenCategory}</Text>
        </ScrollView>
      </View>
    )
  }
}

connect(
  mapStateToProps,
  { updateUser }
)(Categories)

const MenuBtn = props => (
  <TouchableOpacity onPress={() => props.onPress()}>
    <Image
      style={styles.image}
      source={require('../assets/images/placeholder.png')}
    />
    <View style={styles.textOverlay}>
      <Text>{props.text}</Text>
    </View>
  </TouchableOpacity>
)

const dimensions = Dimensions.get('window')
const imageHeight = Math.round(dimensions.width * 0.18)
const styles = StyleSheet.create({
  menuContainer: {
    shadowOffset: { width: 1, height: 1 },
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    elevation: 3,
  },
  container: {
    width: '100%',
    // paddingHorizontal: '4%',
    paddingVertical: 16,
    backgroundColor: '#F8F8F8',
    borderRadius: 5,
    borderWidth: 0,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    elevation: 3,
  },
  image: {
    marginLeft: 10,
    width: imageHeight,
    height: imageHeight,
    borderRadius: 10,
  },
  textOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const mapStateToProps = state => ({
  search: state.search.searchTxt,
  user: state.user,
})

export default connect(
  mapStateToProps,
  { updateUser }
)(ExplorScreen)
