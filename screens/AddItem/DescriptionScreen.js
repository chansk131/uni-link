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
    uid: null,
    key: null,
    section: null,
    input: '',
    description: [],
    height: 50,
    newValue: '',
  }

  componentDidMount() {
    const { navigation } = this.props
    const uid = navigation.getParam('uid') || null
    const key = navigation.getParam('key') || null
    const section = navigation.getParam('section') || null
    const description = navigation.getParam('description') || ''
    if (description) {
      this.setState({ description })
    }
    this.setState({ uid, key, section })
  }

  renderDescription = () => {
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
    const key = navigation.getParam('key')
    console.log(key)
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
      () => this.updateFirebase(key)
    )
  }

  updateFirebase = key => {
    try {
      console.log('updating data to firebase')
      var updates = {}
      this.state.description.map(val => {
        updates['/products/' + key + '/description/' + val.key] = val.value
        console.log(`val is ${val.value}, key is ${val.key}`)
      })
      updates['/products/' + key + '/' + 'status'] = 'draft'
      console.log(updates)
      return firebase
        .database()
        .ref()
        .update(updates)
    } catch (e) {
      console.log(e)
      alert('Saving description failed')
    }
  }

  submit = () => {
    this.props.navigation.navigate('AddItem', {
      description: this.state.description,
      section: this.state.section,
    })
  }

  updateSize = height => {
    this.setState({ height })
  }

  render() {
    const { newValue, height } = this.state
    let newStyle = {
      height,
      width: '100%',
      marginBottom: 5,
    }
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
              height: height + 30,
              backgroundColor: '#eaeaea',
              justifyContent: 'flex-end',
              alignItems: 'center',
              position: 'absolute',
              bottom: 50,
              paddingHorizontal: '5%',
              paddingVertical: 10,
            }}
          >
            <TextInput
              style={newStyle}
              onChangeText={value => this.updateInput(value)}
              onContentSizeChange={e =>
                this.updateSize(e.nativeEvent.contentSize.height)
              }
              multiline
              editable
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
              <Ionicons
                style={{ marginBottom: 10 }}
                name={'ios-paper-plane'}
                size={25}
                color={'grey'}
              />
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
