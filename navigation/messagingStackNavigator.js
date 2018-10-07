import React from 'react'
import { createStackNavigator } from 'react-navigation'

import { MessageListScreen, AddUserScreen, ChatScreen } from '../screens'
import {
  HamburgerHeader,
  AddUserHeader,
  LogoHeaderWithText,
} from '../components/header/HeaderIcons'

export const MessagingStackNavigator = createStackNavigator(
  {
    Messaging: {
      screen: MessageListScreen,
      headerLayoutPreset: 'left',
      navigationOptions: ({ navigation }) => ({
        header: null,
      }),
    },
    AddUser: AddUserScreen,
    Chat: ChatScreen,
  },
  {
    initialRouteName: 'Messaging',
  }
)
