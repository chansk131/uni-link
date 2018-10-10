import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'

export const ContentHeader = ({ text }) => (
  <View
    style={{
      flexDirection: 'row',
      marginHorizontal: '5%',
      marginBottom: 10,
    }}
  >
    <Icon style={{ marginVertical: 10 }} name="keyboard-arrow-down" />
    <Text
      style={{
        fontSize: 18,
      }}
    >
      {text}
    </Text>
  </View>
)
