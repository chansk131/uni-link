import React from 'react'
import {
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  FlatList,
} from 'react-native'
import { connect } from 'react-redux'
import { updateUser } from '../../redux/actions'
import * as firebase from 'firebase'

// TODO add forYou category

class Categories extends React.Component {
  state = {
    menuIsLoading: true,
    itemIsLoading: true,
    chosenCategory: '',
    categories: [],
    products: null,
  }

  componentDidMount() {
    console.log(this.props)
    this.fetchCategories()
    this.fetchItems()
  }

  fetchCategories = () => {
    return firebase
      .database()
      .ref('/categories/')
      .once('value')
      .then(snapshot => {
        var results = snapshot.val()
        let resultsArr = []
        Object.keys(results).forEach(function(key) {
          resultsArr.push({ key: key, ...results[key] })
        })
        this.setState({ categories: resultsArr, menuIsLoading: false })
      })
  }

  renderMenu() {
    return this.state.menuIsLoading ? (
      <View style={styles.indicatorContainer}>
        <ActivityIndicator />
      </View>
    ) : (
      this.state.categories.map(category => (
        <MenuBtn
          key={category.key}
          text={category.txt}
          onPress={() => {
            if (category.name != 'foryou') {
              this.fetchItemsInCategory(category.name)
            } else {
              this.fetchItems()
            }
          }}
        />
      ))
    )
  }

  fetchItemsInCategory = chosenCategory => {
    this.setState({ itemIsLoading: true })
    return firebase
      .database()
      .ref('/products/')
      .orderByChild('category')
      .equalTo(chosenCategory)
      .once('value')
      .then(snapshot => {
        var results = snapshot.val()
        if (results !== null) {
          let resultsArr = []
          Object.keys(results).forEach(function(key) {
            resultsArr.push({ key: key, ...results[key] })
          })
          this.setState({
            products: resultsArr,
            itemIsLoading: false,
            chosenCategory: chosenCategory,
          })
          console.log(this.state)
        } else {
          this.setState({
            products: null,
            itemIsLoading: false,
            chosenCategory: chosenCategory,
          })
        }
      })
  }

  fetchItems = () => {
    this.setState({ itemIsLoading: true })
    return firebase
      .database()
      .ref('/products/')
      .once('value')
      .then(snapshot => {
        var results = snapshot.val()
        if (results !== null) {
          let resultsArr = []
          Object.keys(results).forEach(function(key) {
            resultsArr.push({ key: key, ...results[key] })
          })
          this.setState({
            products: resultsArr,
            itemIsLoading: false,
          })
          console.log(this.state)
        } else {
          this.setState({
            products: null,
            itemIsLoading: false,
          })
        }
      })
  }

  renderProducts() {
    return this.state.itemIsLoading ? (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    ) : this.state.products ? (
      <FlatList
        style={{ flex: 1, paddingHorizontal: '5%' }}
        numColumns={3}
        // ListFooterComponent={<View style={{ margin: 10 }} />}
        renderItem={({ item }) => <ListedItem key={item.key} {...item} />}
        data={this.state.products}
      />
    ) : (
      <View>
        <Text>Product for {this.state.chosenCategory} is not available</Text>
      </View>
    )
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
            {this.renderMenu()}
          </ScrollView>
        </View>
        <View style={{ flex: 1, paddingTop: 10 }}>{this.renderProducts()}</View>
      </View>
    )
  }
}

const ListedItem = props => {
  // var name = props.name
  // if (props.name.length > 10) {
  //   name = props.name.substring(0, 10) + '...'
  // }
  return (
    <View style={{ alignContent: 'flex-start', marginBottom: 5 }}>
      <Image
        style={{
          resizeMode: 'contain',
          width: 100,
          height: 56.25,
          borderRadius: 10,
          marginRight: 12,
          marginBottom: 5,
          borderWidth: 0.5,
        }}
        source={{ uri: props.pic }}
      />
      <View>
        <Text ellipsizeMode="tail" numberOfLines={2} style={{width: 100}}>
          {props.name}
        </Text>
        <Text style={{ fontWeight: 'bold' }}>£{props.price}</Text>
        <Text>By: {props.user}</Text>
      </View>
    </View>
  )
}

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
  indicatorContainer: {
    height: imageHeight,
    width: dimensions.width,
    alignItems: 'center',
    justifyContent: 'center',
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

const MenuBtn = props => (
  <TouchableOpacity onPress={() => props.onPress()}>
    <Image
      style={styles.image}
      source={require('../../assets/images/placeholder.png')}
    />
    <View style={styles.textOverlay}>
      <Text>{props.text}</Text>
    </View>
  </TouchableOpacity>
)

const mapStateToProps = state => ({
  search: state.search.searchTxt,
  user: state.user,
})

export default connect(
  mapStateToProps,
  { updateUser }
)(Categories)
