import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { CheckBox } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default class CategoryItemScreen extends React.Component {
  state = {
    checked: null,
  }

  componentDidMount() {
    const { navigation } = this.props
    const category = navigation.getParam('category')
    this.setState({ checked: category })
  }

  check = value => {
    this.setState({})
  }

  submit = () => {
    this.props.navigation.navigate('Add', { category: this.state.checked })
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ marginHorizontal: '5%', marginTop: 10 }}>
          <Text style={{ fontSize: 20 }}>Product Category</Text>
        </View>
        <CheckBox
          title="University"
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checkedColor="black"
          checked={this.state.checked == 'University'}
          onPress={() => this.setState({ checked: 'University' })}
        />
        <CheckBox
          title="Electronics"
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checkedColor="black"
          checked={this.state.checked == 'Electronics'}
          onPress={() => this.setState({ checked: 'Electronics' })}
        />
        <CheckBox
          title="Fashion"
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checkedColor="black"
          checked={this.state.checked == 'Fashion'}
          onPress={() => this.setState({ checked: 'Fashion' })}
        />
        <CheckBox
          title="Accommodation"
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checkedColor="black"
          checked={this.state.checked == 'Accommodation'}
          onPress={() => this.setState({ checked: 'Accommodation' })}
        />
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 2 }} />
          <View style={{ flex: 2 }} />

          <TouchableOpacity
            style={[styles.bntContainer, { flex: 1, alignItems: 'center' }]}
            onPress={() => this.submit()}
          >
            <Text style={styles.btnTxt}>OKAY</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  bntContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 8,
    elevation: 5,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    marginHorizontal: '5%',
    marginTop: 10,
  },
  btnTxt: {
    fontWeight: 'bold',
  },
})
