import React from 'react'
import {
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as firebase from 'firebase'
import { connect } from 'react-redux'

class DescriptionScreen extends React.Component {
  state = {
    input: '',
    description: [],
  }

  componentDidMount() {}

  renderDescription = () => {
    console.log(this.state.description)
    return (
      <View style={{ marginTop: 10 }}>
        <FlatList
          data={this.state.description}
          renderItem={({ item }) => (
            <View
              key={item.key}
              style={{
                paddingVertical: 4,
                paddingHorizontal: '5%',
              }}
            >
              <Text style={{ fontSize: 16 }}>{BULLET + '  ' + item.value}</Text>
            </View>
          )}
        />
      </View>
    )
  }

  updateInput = input => {
    this.setState({ input })
  }

  addDescription = () => {
    const { navigation } = this.props
    const firebaseKey = navigation.getParam('firebaseKey')
    console.log(firebaseKey)
    let length = this.state.description.length + 1
    let newKey = 'line' + length
    this.setState(
      {
        description: [
          ...this.state.description,
          { key: newKey, value: this.state.input },
        ],
        input: '',
      },
      () => this.updateFirebase(firebaseKey)
    )
  }

  updateFirebase = firebaseKey => {
    console.log('updating data to firebase')
    var updates = {}
    updates[
      '/products/' + firebaseKey + '/' + 'description'
    ] = this.state.description
    updates['/products/' + firebaseKey + '/' + 'isAvailable'] = false

    firebase
      .database()
      .ref()
      .update(updates)
  }

  submit = () => {
    this.props.navigation.navigate('Add', {
      description: this.state.description,
    })
  }

  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="height" enabled>
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <Text style={{ fontSize: 20, marginHorizontal: '5%', marginTop: 10 }}>
            Product Description
          </Text>
          <Text style={{ color: 'grey', marginHorizontal: '5%' }}>
            (press plane button to enter new bulletpoint)
          </Text>
          {this.renderDescription()}
          <View
            style={{
              width: '100%',
              height: 50,
              backgroundColor: '#eaeaea',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              bottom: 50,
              paddingHorizontal: '5%',
            }}
          >
            <TextInput
              style={{
                width: '100%',
                height: 50,
              }}
              onChangeText={value => this.updateInput(value)}
              value={this.state.input}
            />
            <TouchableOpacity
              onPress={() => this.addDescription()}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                right: 0,
                paddingHorizontal: '5%',
              }}
            >
              <Ionicons name={'ios-paper-plane'} size={25} color={'grey'} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              width: '100%',
              height: 50,
              backgroundColor: 'teal',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              bottom: 0,
              paddingHorizontal: '5%',
            }}
            onPress={() => this.submit()}
          >
            <Text style={{ fontSize: 20, color: 'white' }}>Back</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps)(DescriptionScreen)

const BULLET = '\u2022'
