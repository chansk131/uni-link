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
} from 'react-native'
import { connect } from 'react-redux'
import { updateUser } from '../../redux/actions'
import * as firebase from 'firebase'

class Categories extends React.Component {
  state = {
    menuIsLoading: true,
    chosenCategory: '',
    categories: [],
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

  fetchItemsInCategory = chosenCategory => {
    return firebase
      .database()
      .ref('/products/')
      .orderByChild('category')
      .equalTo(chosenCategory)
      .once('value')
      .then(snapshot => {
        console.log(snapshot.val())
      })
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
            {this.state.menuIsLoading ? (
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
            )}
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
