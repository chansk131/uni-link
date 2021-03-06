import React from 'react'
import { createStackNavigator } from 'react-navigation'

import {
  HamburgerHeader,
  LogoHeader,
  MessageHeader,
} from '../components/header/HeaderIcons'
import NotificationScreen from '../screens/Notification/NotificationScreen'

export const NotificationScreenStackNavigator = createStackNavigator({
  Notification: {
    screen: NotificationScreen,
    headerLayoutPreset: 'left',
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: 'white',
        borderBottomWidth: 0,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: 'grey',
        shadowOpacity: 0.5,
        elevation: 3,
      },
      headerLeft: <HamburgerHeader navigation={navigation} />,
      headerTitle: <LogoHeader />,
      headerRight: <MessageHeader navigation={navigation} />,
    }),
  },
})
