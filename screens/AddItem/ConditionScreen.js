import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { CheckBox } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default class ConditionScreen extends React.Component {
  state = {
    checked: null,
  }

  check = value => {
    this.setState({})
  }

  submit = () => {
    this.props.navigation.navigate('Add', { condition: this.state.checked })
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ marginHorizontal: '5%', marginTop: 10 }}>
          <Text style={{ fontSize: 20 }}>Condition!</Text>
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
          title="Part"
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checkedColor="black"
          checked={this.state.checked == 'Parts'}
          onPress={() => this.setState({ checked: 'Parts' })}
        />
        <TouchableOpacity
          style={styles.bntContainer}
          onPress={() => this.submit()}
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
    marginHorizontal: '5%',
    marginTop: 10,
  },
  btnTxt: {
    fontWeight: 'bold',
  },
})
