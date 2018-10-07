import React, { Component } from 'react'
import { withNavigation } from 'react-navigation'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { ProfilePicChat } from '../../components'

class ListItem extends Component {
  render() {
    const { id, title, navigation } = this.props

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Chat', { chatId: id })}
        style={styles.btnContainer}
      >
        <ProfilePicChat />
        <Text style={styles.btnText}>{title}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  btnContainer: {
    height: 70,
    borderBottomColor: '#707070',
    borderBottomWidth: 0.5,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingHorizontal: 21,
    paddingTop: 8,
    flexDirection: 'row'
  },
  btnText: {
    fontWeight: 'bold',
    fontSize: 15,
    paddingLeft: 15
  }
})

export default withNavigation(ListItem)
