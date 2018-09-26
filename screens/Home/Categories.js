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
            this.fetchItemsInCategory(category.name)
          }}
        />
      ))
    )
  }

  fetchItemsInCategory = chosenCategory => {
    return firebase
      .database()
      .ref('/products/')
      .orderByChild('category')
      .equalTo(chosenCategory)
      .once('value')
      .then(snapshot => {
        var results = snapshot.val()
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
      })
  }

  renderProducts() {
    return this.state.products ? (
      <View>
        {/* <Text>{JSON.stringify(this.state.products)}</Text> */}
        <FlatList
          style={{ flex: 1 }}
          // ListFooterComponent={<View style={{ margin: 10 }} />}
          renderItem={({ item }) => <ListedItem key={item.key} {...item} />}
          data={this.state.products}
        />
      </View>
    ) : null
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
        <ScrollView style={{ flex: 1, paddingTop: 15 }}>
          <Text>Content</Text>
          <Text>{this.state.chosenCategory}</Text>
          {this.renderProducts()}
        </ScrollView>
      </View>
    )
  }
}

const ListedItem = props => (
  <View style={{ flexDirection: 'row', alignContent: 'flex-start' }}>
    <Image
      style={{
        resizeMode: 'contain',
        width: 200,
        height: 120,
        borderRadius: 10,
        marginRight: 10,
        marginBottom: 30,
      }}
      source={{ uri: props.pic }}
    />
    <View>
      <Text>{props.name}</Text>
      <Text>£{props.price}</Text>
      <Text>Viewers: </Text>
    </View>
  </View>
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
