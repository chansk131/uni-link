import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { CheckBox } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default class ConditionScreen extends React.Component {
  state = {
    new: true,
    used: false,
    part: false,
  }

  check = value => {
    this.setState({})
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ marginHorizontal: '5%' }}>
          <Text style={{ fontSize: 20 }}>Condition!</Text>
        </View>
        <CheckBox
          title="New"
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checkedColor="black"
          checked={this.state.new}
          onPress={() => this.setState({ new: true, used: false, part: false })}
        />
        <CheckBox
          title="Used"
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checkedColor="black"
          checked={this.state.used}
          onPress={() => this.setState({ new: false, used: true, part: false })}
        />
        <CheckBox
          title="Part"
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checkedColor="black"
          checked={this.state.part}
          onPress={() => this.setState({ new: false, used: false, part: true })}
        />
        <TouchableOpacity
          style={styles.bntContainer}
          onPress={() => this.submitForm()}
        >
          <Text style={styles.btnTxt}>OKAY</Text>
        </TouchableOpacity>
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
    marginHorizontal: 5,
    marginTop: 10,
  },
  btnTxt: {
    fontWeight: 'bold',
  },
})
