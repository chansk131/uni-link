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

class QualificationScreen extends React.Component {
  state = {
    input: '',
    qualification: [],
    height: 50,
    newValue: '',
  }

  componentDidMount() {}

  renderQualification = () => {
    console.log(this.state.qualification)
    return (
      <View style={{ marginTop: 10 }}>
        <FlatList
          data={this.state.qualification}
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

  addQualification = () => {
    const { navigation } = this.props
    const firebaseKey = navigation.getParam('firebaseKey')
    console.log(firebaseKey)
    let length = this.state.qualification.length + 1
    let newKey = 'line' + length
    this.setState(
      {
        qualification: [
          ...this.state.qualification,
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
      '/products/' + firebaseKey + '/' + 'qualification'
    ] = this.state.qualification
    updates['/products/' + firebaseKey + '/' + 'isAvailable'] = false

    firebase
      .database()
      .ref()
      .update(updates)
  }

  submit = () => {
    this.props.navigation.navigate('Add', {
      qualification: this.state.qualification,
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
            Your qualification (related to this service)
          </Text>
          <Text style={{ color: 'grey', marginHorizontal: '5%' }}>
            (press plane button to enter new bulletpoint)
          </Text>
          {this.renderQualification()}
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
              onPress={() => this.addQualification()}
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

export default connect(mapStateToProps)(QualificationScreen)

const BULLET = '\u2022'
