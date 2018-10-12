import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'

export default () => {
  return (
    <View style={styles.btnContainer}>
      <TouchableOpacity style={styles.btnSettingContainer}>
        <Text style={styles.btnText}>Block</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnMessageContainer}>
        <Text style={styles.btnText}>Create Chat</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  btnContainer: {
    height: 40,
    borderBottomColor: '#707070',
    borderBottomWidth: 0.5,
    flexDirection: 'row'
  },
  btnSettingContainer: {
    flex: 1,
    height: 40,
    borderBottomColor: '#707070',
    borderBottomWidth: 0.5,
    borderRightColor: '#707070',
    borderRightWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    flexDirection: 'row'
  },
  btnMessageContainer: {
    flex: 1,
    height: 40,
    borderBottomColor: '#707070',
    borderBottomWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    flexDirection: 'row'
  },
  btnSmallText: {
    fontWeight: 'bold',
    fontSize: 15
  }
})
