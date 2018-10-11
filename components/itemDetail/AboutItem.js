import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'

export const AboutItem = ({ label, text }) => (
  <View style={{ flexDirection: 'row' }}>
    <Text style={{ fontSize: 16, color: '#525252', flex: 4 }}>{label}</Text>
    <Text style={{ fontSize: 16, flex: 6 }}>{text}</Text>
  </View>
)
