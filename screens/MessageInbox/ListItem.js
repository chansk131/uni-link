import React, { Component } from 'react'
import { withNavigation } from 'react-navigation'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { ProfilePicChat } from '../../components'

class ListItem extends Component {
  render() {
    const { id, title, lastMessage, navigation } = this.props

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Chat', { chatId: id })}
        style={styles.btnContainer}
      >
        <ProfilePicChat />
        <View>
          <Text style={styles.btnTitle}>{title}</Text>
          <Text style={styles.btnMessage}>{lastMessage}</Text>
        </View>
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
  btnTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    paddingLeft: 15
  },
  btnMessage: {
    fontSize: 14,
    paddingTop: 3,
    paddingLeft: 15
  }
})

export default withNavigation(ListItem)
