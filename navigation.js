import React from 'react';
import { createBottomTabNavigator } from 'react-navigation'

import HomeScreen from './screens/HomeScreen'
import ExploreScreen from './screens/ExploreScreen'
import AddItemScreen from './screens/AddItemScreen'
import NotificationScreen from './screens/NotificationScreen'
import UserScreen from './screens/UserScreen'

export const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Explore: ExploreScreen,
    Add: AddItemScreen,
    Notification: NotificationScreen,
    User: UserScreen,
  },
  {
    tabBarOptions: {
      activeTintColor: 'black',
    },
  }
)