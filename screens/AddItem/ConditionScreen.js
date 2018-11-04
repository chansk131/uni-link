import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { CheckBox } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as firebase from 'firebase'

export default class ConditionScreen extends React.Component {
  state = {
    key: null,
    section: null,
    checked: null,
  }

  componentDidMount() {
    const { navigation } = this.props
    const condition = navigation.getParam('condition')
    const section = navigation.getParam('section')
    const key = navigation.getParam('key')
    this.setState({ checked: condition, section, key })
  }

  check = value => {
    this.setState({})
  }

  submit = () => {
    if (this.state.checked == null) {
      alert('Please select the condition')
    } else if (this.state.key) {
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
    updates['/products/' + this.state.key + '/condition'] = this.state.checked
    updates['/products/' + this.state.key + '/status'] = 'draft'
    updates['/products/' + this.state.key + '/section'] = this.state.section

    return firebase
      .database()
      .ref()
      .update(updates)
  }

  navigateBack = () => {
    this.props.navigation.navigate('AddItem', {
      condition: this.state.checked,
      section: this.state.section,
    })
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ marginHorizontal: '5%', marginTop: 10 }}>
          <Text style={{ fontSize: 20 }}>Select Item Condition</Text>
        </View>
        <CheckBox
          title="New"
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checkedColor="black"
          checked={this.state.checked == 'New'}
          onPress={() => this.setState({ checked: 'New' })}
        />
        <CheckBox
          title="Used"
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checkedColor="black"
          checked={this.state.checked == 'Used'}
          onPress={() => this.setState({ checked: 'Used' })}
        />
        <CheckBox
          title="Part/Not working"
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checkedColor="black"
          checked={this.state.checked == 'Parts'}
          onPress={() => this.setState({ checked: 'Parts' })}
        />
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
