import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Switch } from 'react-native'
// header
class NotificationSetting extends React.Component {
  render() {
    return (
      <View style={styles.screenContainer}>
        <View style={[styles.WhiteBoxContainer, { marginTop: 25 }]}>
          <TouchableOpacity style={styles.btnContainer}>
            <Text style={styles.txt}>Turn on notifications</Text>
            <Switch>
              onValueChange = {props.toggleSwitch1}
              value = {props.switch1Value}
              trackColor = '#78E574'
            </Switch>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    flexDirection: 'center',
    justifyContent: 'center',
  },
  WhiteBoxContainer: {
    width: 325,
    height: 43,
    backgroundColor: 'white',
    borderBottomWidth: 0.5,
    borderColor: '#707070',
    shadowColor: 'grey',
    shadowOffset: { width: 0.1, height: 1 },
    shadowOpacity: 0.5,
    paddingHorizontal: 20,
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txt: { fontSize: 13 },
})

export default NotificationSetting
