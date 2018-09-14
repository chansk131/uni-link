import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { Card, Button } from 'react-native-elements'

export const Plus = props => (
  <TouchableOpacity style={styles.container}>
    <Text style={{ fontSize: 14, color: '#FFFFFF', fontWeight: 'bold' }}>
      +
    </Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#54A545',
  },
})
