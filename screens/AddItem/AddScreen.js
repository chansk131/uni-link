import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default class AddScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Text style={styles.label}>Choose Platform</Text>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={[styles.menuContainer]}
            onPress={() =>
              this.props.navigation.navigate('AddItem', {
                section: 'product',
              })
            }
          >
            <Text style={styles.menu}>Marketplace Product</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuContainer}
            onPress={() =>
              this.props.navigation.navigate('AddItem', {
                section: 'skillshare',
              })
            }
          >
            <Text style={styles.menu}>Skillshare</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuContainer}
            onPress={() =>
              this.props.navigation.navigate('AddItem', {
                section: 'freelance',
              })
            }
          >
            <Text style={styles.menu}>Freelance Service</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  label: {
    marginTop: 30,
    marginBottom: 30,
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: '5%',
  },
  menuContainer: {
    flex: 1,
    // borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#eaeaea',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginHorizontal: '5%',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: 'grey',
    shadowOpacity: 0.5,
  },
  menu: {
    marginHorizontal: '5%',
    marginVertical: 20,
    fontSize: 24,
    // fontWeight: 'bold',
  },
})
