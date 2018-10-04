import { createStackNavigator } from 'react-navigation'
import { MessageListScreen, AddUserScreen, ChatScreen } from '../screens'

export const MessagingStackNavigator = createStackNavigator(
  {
    Messaging: MessageListScreen,
    AddUser: AddUserScreen,
    Chat: ChatScreen
  },
  {
    initialRouteName: 'Messaging'
  }
)
