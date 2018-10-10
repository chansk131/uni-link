import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import InlineButton from '../../components/InlineButton'
import { MessageList } from './MessageList'

class MessageListScreen extends Component {
  // static navigationOptions = ({ navigation }) => ({
  //   title: 'Messages',
  //   headerRight: (
  //     <InlineButton
  //       style={{ marginRight: 10 }}
  //       onPress={() => navigation.navigate('AddUser')}
  //     >
  //       <Icon name="person-add" size={25} />
  //     </InlineButton>
  //   )
  // })

  render() {
    return <MessageList navigation={this.props.navigation} />
  }
}

export { MessageListScreen }
