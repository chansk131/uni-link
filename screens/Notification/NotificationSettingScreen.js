import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
// header
// how to do turn off turn on switch

class NotificationSettingScreen extends React.Component {
  render() {
    return (
      <View style={styles.screenContainer}>
        <View style={[styles.groupBtnContainer, { marginTop: 25 }]}>
          <TouchableOpacity style={styles.btnContainer}>
            <Text style={styles.txt}>Turn on notifications</Text>
            <Text style={styles.txt}>button</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  screenContainer: { flex: 1, backgroundColor: 'white' },
  groupBtnContainer: {
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#707070',
  },
  btnContainer: {
    shadowColor: 'grey',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    flexDirection: 'row',
    width: 325,
    height: 43,
    alignItems: 'center',
    justifyContent: 'space-between',
    //paddingHorizontal: 20,
  },
  txt: { fontSize: 13 },
})

export default NotificationSettingScreen
