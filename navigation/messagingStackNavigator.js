import { createStackNavigator } from 'react-navigation'
import MessageListScreen from '../screens/MessageInbox/MessageListScreen'

export const MessagingStackNavigator = createStackNavigator({
  Messaging: {
    screen: MessageListScreen,
    navigationOptions: { header: null }
  }
})
