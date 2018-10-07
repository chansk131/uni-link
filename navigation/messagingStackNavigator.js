import React from 'react'
import { createStackNavigator } from 'react-navigation'

import { MessageListScreen, AddUserScreen, ChatScreen } from '../screens'
import {
  HamburgerHeader,
  AddUserHeader,
  LogoHeaderWithText
} from '../components/header/HeaderIcons'

export const MessagingStackNavigator = createStackNavigator(
  {
    Messaging: {
      screen: MessageListScreen,
      headerLayoutPreset: 'left',
      navigationOptions: ({ navigation }) => ({
        headerStyle: {
          backgroundColor: 'white',
          borderBottomWidth: 0,
          elevation: 3
        },
        headerLeft: <HamburgerHeader navigation={navigation} />,
        headerTitle: <LogoHeaderWithText text="Messenger" />,
        headerRight: <AddUserHeader navigation={navigation} />
      })
    },
    AddUser: AddUserScreen,
    Chat: ChatScreen
  },
  {
    initialRouteName: 'Messaging'
  }
)
