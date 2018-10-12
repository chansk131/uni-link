import React, { Component } from 'react'
import { MessageList } from './MessageList'

class MessageListScreen extends Component {
  render() {
    return <MessageList navigation={this.props.navigation} />
  }
}

export { MessageListScreen }
