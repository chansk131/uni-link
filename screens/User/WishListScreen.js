import React from 'react'
import { Text, View, FlatList, Image } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import * as firebase from 'firebase'

class WishListScreen extends React.Component {
  state = {
    itemLoaded: false,
    products: null,
  }

  componentDidMount() {
    this.fetchWishlist()
  }

  fetchWishlist = () => {
    var userId = this.props.user.uid
    return firebase
      .database()
      .ref('/wishlist/' + userId)
      .once('value')
      .then(snapshot => {
        var results = snapshot.val()
        console.log(results)
        let resultsArr = []
        Object.keys(results).forEach(function(key) {
          resultsArr.push({ key: key, keyFirebase: key, ...results[key] })
        })
        this.setState({ products: resultsArr })
      })
  }

  renderWishlist = props => {
    if (props !== null) {
      var result = Object.values(props)
      if (result.length) {
        return (
          <View style={{ paddingTop: 30, paddingHorizontal: 20 }}>
            <FlatList
              style={{ flex: 1 }}
              // ListFooterComponent={<View style={{ margin: 10 }} />}
              renderItem={({ item }) => <ListedItem key={item.key} {...item} />}
              data={result}
            />
          </View>
        )
      }
      return false
    }

    return false
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>WishListScreen!</Text>
        {this.renderWishlist(this.state.products)}
      </View>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
})
export default connect(mapStateToProps)(WishListScreen)

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
