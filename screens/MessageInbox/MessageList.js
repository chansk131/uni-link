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
import { fetchUser } from '../../redux/actions'
import { Constants } from 'expo'
import Ionicons from 'react-native-vector-icons/Ionicons'

class MessageList extends Component {
  keyExtractor = (item, index) => item.id

  renderItem({ item }) {
    return <ListItem id={item.id} title={item.title} />
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
