import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView
} from 'react-native'

export default class NotificationScreen extends React.Component {
  render() {
    return (
      <ScrollView>
        <View style={styles.screenContainer}>
          <View style={styles.groupBtnContainer}>
            <View style={styles.btnContainergrey}>
              <CloseText />
              <TouchableOpacity>
                <Text style={styles.txt3}>View</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.groupBtnContainer}>
            <View style={styles.btnContainer}>
              <CloseText1 />
              <TouchableOpacity>
                <Text style={styles.txt3}>View</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.groupBtnContainer}>
            <View style={styles.btnContainer}>
              <CloseText2 />
            </View>
          </View>
          <View style={styles.groupBtnContainer}>
            <View style={styles.btnContainer}>
              <CloseText />
              <TouchableOpacity>
                <Text style={styles.txt3}>View</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.groupBtnContainer}>
            <View style={styles.btnContainer}>
              <CloseText />
              <TouchableOpacity>
                <Text style={styles.txt3}>View</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.groupBtnContainer}>
            <View style={styles.btnContainer}>
              <CloseText2 />
            </View>
          </View>
          <View style={styles.groupBtnContainer}>
            <View style={styles.btnContainer}>
              <CloseText2 />
            </View>
          </View>
          <View style={styles.groupBtnContainer}>
            <View style={styles.btnContainer}>
              <CloseText2 />
            </View>
          </View>
          <View style={styles.groupBtnContainer}>
            <View style={styles.btnContainer}>
              <CloseText />
              <TouchableOpacity>
                <Text style={styles.txt3}>View</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.groupBtnContainer}>
            <View style={styles.btnContainer}>
              <CloseText3 />
              <TouchableOpacity>
                <Text style={styles.txt3}>View</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    )
  }
}

export const CloseText = () => (
  <View style={styles.ctnContainer}>
    <TouchableOpacity>
      <Text style={styles.txt}>#Name </Text>
    </TouchableOpacity>
    <Text style={styles.txt2}>started following you</Text>
  </View>
)
export const CloseText1 = () => (
  <View style={styles.ctnContainer}>
    <TouchableOpacity>
      <Text style={styles.txt}>#ProductName </Text>
    </TouchableOpacity>
    <Text style={styles.txt2}>has been sold</Text>
  </View>
)
export const CloseText2 = () => (
  <View style={styles.ctnContainer}>
    <TouchableOpacity>
      <Text style={styles.txt}>#ProductName </Text>
    </TouchableOpacity>
    <Text style={styles.txt2}>is being watched</Text>
  </View>
)
export const CloseText3 = () => (
  <View style={styles.ctnContainer}>
    <Text style={styles.txt2}>You have recieved an offer for your </Text>
    <TouchableOpacity>
      <Text style={styles.txt}>#Service </Text>
    </TouchableOpacity>
  </View>
)

const styles = StyleSheet.create({
  screenContainer: { flex: 1, backgroundColor: 'white' },
  groupBtnContainer: {
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#707070'
  },
  ctnContainer: {
    flexDirection: 'row'
  },
  dtnContainer: {
    flexDirection: 'row',
    height: 48,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20
  },
  btnContainer: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20
  },
  btnContainergrey: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: '#EFEFEF'
  },
  txt: { fontSize: 12, fontWeight: 'bold' },
  txt2: { fontSize: 12 },
  txt3: { fontSize: 12, textDecorationLine: 'underline' }
})
