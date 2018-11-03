import React from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'
import { CheckBox } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as firebase from 'firebase'
import { toUpperFirst } from '../../utils/misc'

export default class CategoryItemScreen extends React.Component {
  state = {
    uid: null,
    key: null,
    loading: false,
    category: null,
    section: null,
    checked: null,
  }

  componentDidMount() {
    const { navigation } = this.props
    const uid = navigation.getParam('uid')
    const key = navigation.getParam('key')
    const section = navigation.getParam('section')
    const category = navigation.getParam('category')
    console.log(`key is ${key}`)
    this.fetchCategories(section)
    if (category) {
      this.setState({ checked: category })
    }
    this.setState({ uid, key, section })
  }

  fetchCategories = section => {
    this.setState({ loading: true })
    console.log(`section is ${section}`)
    return firebase
      .database()
      .ref('section/' + section)
      .once('value')
      .then(snapshot => {
        const categoryObj = snapshot.val()
        const category = Object.keys(categoryObj)
        this.setState({ category, loading: false })
      })
  }

  renderCategories = () => {
    if (this.state.category) {
      return (
        <View>
          {this.state.category.map((val, key) => (
            <CheckBox
              key={key}
              title={toUpperFirst(val)}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checkedColor="black"
              checked={this.state.checked == val}
              onPress={() => this.setState({ checked: val })}
            />
          ))}
        </View>
      )
    } else {
      return <ActivityIndicator />
    }
  }

  check = value => {
    this.setState({})
  }

  submit = () => {
    if (this.state.checked == null) {
      alert('Please select the category')
    } else if (this.state.key && this.state.uid) {
      try {
        this.addToDatabase()
      } catch (e) {
        console.log(e)
      } finally {
        this.navigateBack()
      }
    } else {
      console.log('error')
    }
  }

  addToDatabase = () => {
    let updates = {}
    updates['/products/' + this.state.key + '/category'] = this.state.checked
    updates['/products/' + this.state.key + '/status'] = 'draft'

    return firebase
      .database()
      .ref()
      .update(updates)
  }

  navigateBack = () => {
    this.props.navigation.navigate('AddItem', {
      category: this.state.checked,
      section: this.state.section,
    })
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ marginHorizontal: '5%', marginTop: 10 }}>
          <Text style={{ fontSize: 20 }}>Category</Text>
        </View>
        {this.renderCategories()}
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 2 }} />
          <View style={{ flex: 2 }} />

          <TouchableOpacity
            style={[styles.bntContainer, { flex: 1, alignItems: 'center' }]}
            onPress={() => this.submit()}
          >
            <Text style={styles.btnTxt}>OKAY</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  bntContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 8,
    elevation: 5,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    marginHorizontal: '5%',
    marginTop: 10,
  },
  btnTxt: {
    fontWeight: 'bold',
  },
})
