import moment from 'moment-timezone'
import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

//The bubbles that appear on the left or the right for the messages.
export default class ChatBubble extends Component {
  renderBubbleHeader() {
    const { sender, time, showHeader } = this.props

    if (showHeader) {
      var formattedTime = moment.unix(time / 1000).calendar()

      return (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginTop: 8
          }}
        >
          <Text style={styles.senderText}>{sender}</Text>
          <Text>{formattedTime}</Text>
        </View>
      )
    }
  }

  render() {
    const { text } = this.props
    //These spacers make the message bubble stay to the left or the right, depending on who is speaking, even if the message is multiple lines.
    var leftSpacer =
      this.props.direction === 'left' ? null : <View style={{ width: 70 }} />
    var rightSpacer =
      this.props.direction === 'left' ? <View style={{ width: 70 }} /> : null

    var bubbleStyles =
      this.props.direction === 'left'
        ? [styles.messageBubble, styles.messageBubbleLeft]
        : [styles.messageBubble, styles.messageBubbleRight]
    if (this.props.showHeader) {
      bubbleStyles = [...bubbleStyles, styles.messageBubbleShowHeader]
    }

    return (
      <View
        style={{
          justifyContent: 'flex-start',
          flexDirection: 'row'
        }}
      >
        {leftSpacer}
        <View
          style={{
            flex: 1,
            flexDirection: 'column'
          }}
        >
          {this.renderBubbleHeader()}
          <View style={bubbleStyles}>
            <Text style={styles.messageBubbleText}>{text}</Text>
          </View>
        </View>
        {rightSpacer}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  senderText: {
    paddingLeft: 10,
    paddingRight: 30,
    fontWeight: 'bold'
  },
  messageBubble: {
    borderRadius: 5,
    marginTop: 4,
    paddingBottom: 8,
    marginRight: 10,
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  messageBubbleShowHeader: {
    marginTop: 8
  },
  messageBubbleLeft: {
    backgroundColor: '#000000'
  },

  messageBubbleText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15
  },

  messageBubbleRight: {
    backgroundColor: '#8D8D8D'
  }
})
