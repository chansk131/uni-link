import React from 'react'
import { Text, View } from 'react-native'
import { CheckBox } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default class ConditionScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Text>Condition!</Text>
        <CheckBox
          title="New"
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
        />
        <CheckBox
          title="Used"
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
        />
        <CheckBox
          title="Part"
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
        />
      </View>
    )
  }
}
