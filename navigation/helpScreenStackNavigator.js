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
    headerLayoutPreset: 'left',
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: 'white',
        borderBottomWidth: 0,
        elevation: 3,
      },
      headerLeft: <HamburgerHeader navigation={navigation} />,
      headerTitle: <LogoHeaderWithText text={'Help'} />,
      headerRight: <MessageHeader navigation={navigation} />,
    }),
  },
})
