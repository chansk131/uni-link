import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { Card, Button } from 'react-native-elements'

export const Plus = props => (
  <TouchableOpacity style={styles.container}>
    <Card containerStyle={styles.cardContainer}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 12, color: '#FFFFFF', fontWeight: 'bold' }}>
          +
        </Text>
      </View>
    </Card>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#54A545',
  },
})
