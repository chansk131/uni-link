import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  FlatList,
  View,
  TouchableOpacity,
  StyleSheet,
  Text
} from 'react-native'
import ListItem from './ListItem'
import { Constants } from 'expo'
import Ionicons from 'react-native-vector-icons/Ionicons'

class MessageList extends Component {
  keyExtractor = (item, index) => item.id

  renderItem({ item }) {
    return (
      <ListItem
        id={item.id}
        title={title}
        users={item.users}
        lastMessage={item.lastMessage}
      />
    )
  }

  render() {
    return (
      <View style={styles.root}>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Setting')}
            style={styles.btnSettingContainer}
          >
            <Text style={styles.btnText}>Create Group</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnMessageContainer}>
            <Text style={styles.btnText}>Create Chat</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={this.props.chats}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white'
  },
  btnContainer: {
    height: 40,
    borderBottomColor: '#707070',
    borderBottomWidth: 0.5,
    flexDirection: 'row'
  },
  btnSettingContainer: {
    flex: 1,
    height: 40,
    borderBottomColor: '#707070',
    borderBottomWidth: 0.5,
    borderRightColor: '#707070',
    borderRightWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    flexDirection: 'row'
  },
  btnMessageContainer: {
    flex: 1,
    height: 40,
    borderBottomColor: '#707070',
    borderBottomWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    flexDirection: 'row'
  },
  btnSmallText: {
    fontWeight: 'bold',
    fontSize: 15
  }
})

const mapStateToProps = state => {
  const { chat } = state
  const { username } = state.user

  const chats = _.map(chat, (value, chatId) => {
    title = value.title
    const usernames = _.map(value.users, (username, usersId) => {
      return username
    })
    if (title === '') {
      i = 0
      while (usernames[i] === username && i < usernames.length) {
        i++
      }
      title = usernames[i]
    }
    return {
      id: chatId,
      title,
      lastMessage: value.lastMessage.message,
      usernames
    }
  })

  return { chats }
}

MessageList = connect(mapStateToProps)(MessageList)
export { MessageList }
