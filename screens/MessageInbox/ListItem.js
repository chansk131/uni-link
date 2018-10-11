import React, { Component } from 'react'
import firebase from 'firebase'
import { withNavigation } from 'react-navigation'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { ProfilePicChat } from '../../components'

class ListItem extends Component {
  state = {
    chatPicUrl: null
  }

  async componentDidMount() {
    const { users } = this.props
    let chatPicUserId = null

    if (users.length === 2) {
      if (users[0].userId === firebase.auth().currentUser.uid) {
        chatPicUserId = users[1].userId
      } else {
        chatPicUserId = users[0].userId
      }
      const chatPicRef = firebase
        .storage()
        .ref()
        .child(`users/${chatPicUserId}`)
      let chatPicUrl = null
      try {
        chatPicUrl = await chatPicRef.getDownloadURL()
      } catch (error) {
        return error
      }
      this.setState({ chatPicUrl })
    }
  }

  render() {
    const { id, title, lastMessage, status, navigation } = this.props
    const { chatPicUrl } = this.state

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Chat', { chatId: id })}
        style={styles.btnContainer}
      >
        <ProfilePicChat source={chatPicUrl} status={status} />
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
