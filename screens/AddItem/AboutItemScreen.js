import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default class AboutItemScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ marginHorizontal: '5%', marginTop: 10 }}>
          <Text style={{ fontSize: 20 }}>About Item</Text>
        </View>

        <View
          style={{
            borderWidth: 1,
            borderColor: 'lightgrey',
            borderRadius: 5,
            marginHorizontal: '5%',
            marginTop: 10,
            paddingVertical: 10,
          }}
        >
          <Text style={{ fontSize: 18, marginHorizontal: '5%' }}>Label</Text>
          <TextInput style={styles.txtInput} />
          <Text style={{ fontSize: 18, marginTop: 10, marginHorizontal: '5%' }}>
            Detail
          </Text>

          <TextInput style={styles.txtInput} />
        </View>

        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          <View style={{ flex: 1 }} />
          <View style={{ flex: 1 }} />

          <TouchableOpacity
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: 'lightgrey',
              borderRadius: 5,
              marginHorizontal: '10%',
              padding: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: 16, color: 'teal' }}>Add</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.bntContainer}
          onPress={() => this.submit()}
        >
          <Text style={styles.btnTxt}>OKAY</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  btnContainer: {
    width: '90%',
    marginVertical: 5,
    marginHorizontal: '5%',
    backgroundColor: 'white',
    paddingVertical: 8,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    elevation: 3,
  },
  btnTxt: { fontSize: 18 },
  txtInput: {
    width: '90%',
    marginHorizontal: '5%',
    borderBottomWidth: 2,
    borderBottomColor: '#eaeaea',
    fontSize: 14,
    padding: 5,
    marginTop: 10,
  },
})
