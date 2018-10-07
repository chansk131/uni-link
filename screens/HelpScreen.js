import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
// couldn't find file location
export default class HelpScreen extends React.Component {
  render() {
    return (
      <View style={styles.screenContainer}>
        <View style={styles.ctnContainer}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Image
              style={{ width: 81, height: 81.5 }}
              source={require('../assets/images/LogoULinks-small.jpeg')}
            />
          </View>
        </View>
        <View style={styles.dtnContainer}>
          <View style={{ height: 50 }}>
            <Text style={{ fontSize: 14, textAlign: 'center' }}>
              Unilinks is the leading online student marketplace for freelance
              services and beyond
            </Text>
          </View>
        </View>
        <View style={styles.groupBtnContainer}>
          <TouchableOpacity style={styles.btnContainer}>
            <Text style={styles.txt}>Contact us / FAQs</Text>
            <Text style={styles.txt}>></Text>
          </TouchableOpacity>
        </View>
        <View style={styles.groupBtnContainer}>
          <TouchableOpacity style={styles.btnContainer}>
            <Text style={styles.txt}>Cookie policy</Text>
            <Text style={styles.txt}>></Text>
          </TouchableOpacity>
        </View>
        <View style={styles.groupBtnContainer}>
          <TouchableOpacity style={styles.btnContainer}>
            <Text style={styles.txt}>Terms and Conditions</Text>
            <Text style={styles.txt}>></Text>
          </TouchableOpacity>
        </View>
        <View style={styles.groupBtnContainer}>
          <TouchableOpacity style={styles.btnContainer}>
            <Text style={styles.txt}>Privacy Policy</Text>

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
  ctnContainer: {
    flexDirection: 'row',
    height: 120,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  dtnContainer: {
    flexDirection: 'row',
    height: 45,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  btnContainer: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  txt: { fontSize: 18, fontWeight: 'bold' },
})
