import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FlatList } from 'react-native'
import ListItem from './ListItem'
import { fetchUser } from '../../redux/actions'

class MessageList extends Component {
  keyExtractor = (item, index) => item.id

  renderItem({ item }) {
    return <ListItem id={item.id} title={item.title} />
  }

  render() {
    return (
      <FlatList
        data={this.props.chats}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
      />
    )
  }
}

const mapStateToProps = state => {
  const { chat } = state

  const chats = _.map(chat, (value, chatId) => {
    return { id: chatId, title: value.title }
  })

  return { chats }
}

MessageList = connect(
  mapStateToProps,
  { fetchUser }
)(MessageList)
export { MessageList }
