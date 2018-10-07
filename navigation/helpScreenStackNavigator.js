import React from 'react'
import { createStackNavigator } from 'react-navigation'

import HelpScreen from '../screens/HelpScreen'
import {
  HamburgerHeader,
  MessageHeader,
  LogoHeaderWithText,
} from '../components/header/HeaderIcons'

export const HelpScreenStackNavigator = createStackNavigator({
  Help: {
    screen: HelpScreen,
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  },
})
