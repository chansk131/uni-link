import React, { Component } from 'react'
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native'
import AutogrowInput from 'react-native-autogrow-input'

//The bar at the bottom with a textbox and a send button.
export default class InputBar extends Component {
  //AutogrowInput doesn't change its size when the text is changed from the outside.
  //Thus, when text is reset to zero, we'll call it's reset function which will take it back to the original size.
  //Another possible solution here would be if InputBar kept the text as state and only reported it when the Send button
  //was pressed. Then, resetInputText() could be called when the Send button is pressed. However, this limits the ability
  //of the InputBar's text to be set from the outside.
  componentWillReceiveProps(nextProps) {
    if (nextProps.text === '') {
      this.autogrowInput.resetInputText()
    }
  }

  render() {
    return (
      <View>
        <View style={styles.inputBar}>
          <AutogrowInput
            style={styles.textBox}
            ref={ref => {
              this.autogrowInput = ref
            }}
            multiline={true}
            defaultHeight={48}
            onChangeText={text => this.props.onChangeText(text)}
            onContentSizeChange={this.props.onSizeChange}
            value={this.props.text}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginTop: 5,
            marginBottom: 5
          }}
        >
          <TouchableHighlight
            style={styles.sendButton}
            onPress={() => this.props.onSendPressed()}
          >
            <Text
              style={{
                fontWeight: 'bold'
              }}
            >
              SEND
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  inputBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 3
  },

  textBox: {
    borderWidth: 1,
    borderColor: 'black',
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10
  },

  sendButton: {
    marginRight: 10,
    marginLeft: 10
  }
})
