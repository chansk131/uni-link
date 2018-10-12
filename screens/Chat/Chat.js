import _ from 'lodash'
import firebase from 'firebase'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, ScrollView, Keyboard } from 'react-native'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import HeaderButtons from './HeaderButtons'
import ChatBubble from './ChatBubble'
import InputBar from './Inputbar'
import { fetchMessage, stopFetchingMessage } from '../../redux/actions'

// The actual chat view itself- a ScrollView of BubbleMessages, with an InputBar at the bottom, which moves with the keyboard
class Chat extends Component {
  constructor(props) {
    super(props)

    this.state = {
      inputBarText: ''
    }
  }

  static navigationOptions = {
    title: 'Chat',
    loading: false
  }

  //fun keyboard stuff- we use these to get the end of the ScrollView to "follow" the top of the InputBar as the keyboard rises and falls
  componentWillMount() {
    const chatId = this.props.navigation.getParam('chatId')
    const { fetchMessage } = this.props
    fetchMessage(chatId)
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShow.bind(this)
    )
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide.bind(this)
    )
  }

  componentWillUnmount() {
    const chatId = this.props.navigation.getParam('chatId')
    const { stopFetchingMessage } = this.props
    stopFetchingMessage(chatId)
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  //When the keyboard appears, this gets the ScrollView to move the end back "up" so the last message is visible with the keyboard up
  //Without this, whatever message is the keyboard's height from the bottom will look like the last message.
  keyboardDidShow(e) {
    this.scrollView.scrollToEnd()
  }

  //When the keyboard dissapears, this gets the ScrollView to move the last message back down.
  keyboardDidHide(e) {
    this.scrollView.scrollToEnd()
  }

  //scroll to bottom when first showing the view
  componentDidMount() {
    setTimeout(
      function() {
        this.scrollView.scrollToEnd()
      }.bind(this)
    )
  }

  //this is a bit sloppy: this is to make sure it scrolls to the bottom when a message is added, but
  //the component could update for other reasons, for which we wouldn't want it to scroll to the bottom.
  componentDidUpdate() {
    setTimeout(
      function() {
        this.scrollView.scrollToEnd()
      }.bind(this)
    )
  }

  async sendMessage() {
    const chatId = this.props.navigation.getParam('chatId')
    const { inputBarText } = this.state

    if (inputBarText.length) {
      this.setState({ loading: true, inputBarText: '' })
      try {
        const dbMessagesWrite = firebase
          .functions()
          .httpsCallable('dbMessagesWrite')
        const { data } = await dbMessagesWrite({
          chatId,
          message: inputBarText
        })

        if (!data.success) throw data

        this.setState({ loading: false })
      } catch (error) {
        alert(error.details)
      }
    }
  }

  _onChangeInputBarText(text) {
    this.setState({
      inputBarText: text
    })
  }

  //This event fires way too often.
  //We need to move the last message up if the input bar expands due to the user's new message exceeding the height of the box.
  //We really only need to do anything when the height of the InputBar changes, but AutogrowInput can't tell us that.
  //The real solution here is probably a fork of AutogrowInput that can provide this information.
  _onInputSizeChange() {
    setTimeout(
      function() {
        this.scrollView.scrollToEnd({ animated: false })
      }.bind(this)
    )
  }

  render() {
    var messages = []

    this.props.messages.forEach(function(message, index) {
      messages.push(
        <ChatBubble
          key={index}
          sender={message.sender}
          time={message.time}
          direction={message.direction}
          text={message.text}
          showHeader={message.showHeader}
        />
      )
    })

    return (
      <View style={styles.outer}>
        <HeaderButtons />
        <ScrollView
          contentContainerStyle={{
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'flex-end'
          }}
          ref={ref => {
            this.scrollView = ref
          }}
          style={styles.messages}
        >
          {messages}
        </ScrollView>
        <InputBar
          onSendPressed={() => this.sendMessage()}
          onSizeChange={() => this._onInputSizeChange()}
          onChangeText={text => this._onChangeInputBarText(text)}
          text={this.state.inputBarText}
          loading={this.state.loading}
        />
        <KeyboardSpacer />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'white'
  },

  messages: {
    flex: 1
  }
})

const mapStateToProps = state => {
  const { message, user } = state

  var previousTime, previousSender
  const messages = _.map(message, (value, time) => {
    let direction
    if (value.name === user.username) direction = 'right'
    else direction = 'left'

    let showHeader = true
    if (previousTime && previousSender) {
      dif = time - previousTime
      if (dif < 10 * 60 * 1000 && previousSender == value.name)
        showHeader = false
      else showHeader = true
    }
    previousTime = time
    previousSender = value.name

    return {
      time,
      sender: value.name,
      text: value.message,
      direction,
      showHeader
    }
  })

  return { messages }
}

Chat = connect(
  mapStateToProps,
  { fetchMessage, stopFetchingMessage }
)(Chat)
export default Chat
