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

import Search from '../components/header/Search'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { SearchHome } from './Home/SearchHome'

class ExplorScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Search />
        <ScrollView
          style={{
            flex: 1,
            paddingTop: 18,
          }}
        >
          {this.props.search ? (
            <SearchHome data={this.props} />
          ) : (
            <Text>Content</Text>
          )}
          <View style={{ height: 50 }} />
        </ScrollView>
      </View>
      // <View style={{ flex: 1 }}>
      //   <View style={styles.searchContainer}>
      //     <Search />
      //   </View>
      //   <View
      //     style={{
      //       flex: 1,
      //       paddingTop: 18,
      //       backgroundColor: 'white',
      //     }}
      //   >
      //     <View style={{ marginBottom: 10 }}>
      //       <Text
      //         style={{
      //           fontSize: 30,
      //           fontWeight: 'bold',
      //           marginBottom: 10,
      //           marginHorizontal: '7%',
      //         }}
      //       >
      //         Categories
      //       </Text>
      //     </View>
      //     <ScrollView
      //       horizontal={true}
      //       style={styles.container}
      //       contentContainerStyle={{ flexDirection: 'row' }}
      //     >
      //       <TouchableOpacity>
      //         <Image
      //           style={styles.image}
      //           source={require('../assets/images/placeholder.png')}
      //         />
      //       </TouchableOpacity>
      //     </ScrollView>
      //     <ScrollView style={{ flex: 1 }}>
      //       <Text>Content</Text>
      //     </ScrollView>
      //   </View>
      // </View>
    )
  }
}

const dimensions = Dimensions.get('window')
const imageHeight = Math.round(dimensions.width * 0.18)
const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 15,
    paddingHorizontal: '4%',
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
    marginRight: 5,
    width: imageHeight,
    height: imageHeight,
    borderRadius: 10,
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
