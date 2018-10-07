import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Constants } from 'expo'

export const MenuButton = ({ navigation, name, goto, handlePress }) => (
  <TouchableOpacity
    onPress={() => {
      navigation.navigate(goto)
      if (handlePress) {
        handlePress()
      }
    }}
    style={styles.btnContainer}
  >
    <Text style={styles.btnText}>{name}</Text>
    <Text style={styles.btnText}>></Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  btnContainer: {
    height: 60,
    borderBottomColor: '#707070',
    borderBottomWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    flexDirection: 'row'
  },
  btnText: {
    fontWeight: 'bold',
    fontSize: 20
  }
})
