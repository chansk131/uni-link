import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

class SettingScreen extends React.Component {
  render() {
    return (
      <View style={styles.screenContainer}>
        <View style={[styles.groupBtnContainer, { marginTop: 15 }]}>
          <TouchableOpacity
            style={{
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={styles.txt}>Sign Out</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.groupBtnContainer, { marginTop: 25 }]}>
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => this.props.navigation.navigate('EditProfile')}
          >
            <Text style={styles.txt}>Edit Profile</Text>
            <Text style={styles.txt}>></Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.groupBtnContainer, { marginTop: 25 }]}>
          <TouchableOpacity style={styles.btnContainer}>
            <Text style={styles.txt}>Notifications</Text>
            <Text style={styles.txt}>></Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.groupBtnContainer, { marginTop: 25 }]}>
          <TouchableOpacity style={styles.btnContainer}>
            <Text style={styles.txt}>Delivery Address</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnContainer}>
            <Text style={styles.txt}>Edit/Add Delivery Address</Text>
            <Text style={styles.txt}>></Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.groupBtnContainer, { marginTop: 25 }]}>
          <TouchableOpacity style={styles.btnContainer}>
            <Text style={styles.txt}>User Agreement</Text>
            <Text style={styles.txt}>></Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnContainer}>
            <Text style={styles.txt}>Privacy</Text>
            <Text style={styles.txt}>></Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnContainer}>
            <Text style={styles.txt}>About</Text>
            <Text style={styles.txt}>></Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnContainer}>
            <Text style={styles.txt}>Advertising</Text>
            <Text style={styles.txt}>></Text>
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
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  txt: { fontSize: 15 },
})

export default SettingScreen
