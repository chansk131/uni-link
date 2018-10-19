import React from 'react'
import { createStackNavigator } from 'react-navigation'

import {
  HamburgerHeader,
  LogoHeader,
  MessageHeader,
} from '../components/header/HeaderIcons'
import AddItemScreen from '../screens/AddItem/AddItemScreen'
import ConditionScreen from '../screens/AddItem/ConditionScreen'
import AboutItemScreen from '../screens/AddItem/AboutItemScreen'
import PhotoUploadScreen from '../screens/AddItem/PhotoUploadScreen'

export const AddItemScreenStackNavigator = createStackNavigator({
  Add: {
    screen: AddItemScreen,
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
    }),
  },
  Condition: {
    screen: ConditionScreen,
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
      headerTitle: <LogoHeader />,
    }),
  },
  AboutItem: {
    screen: AboutItemScreen,
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
      headerTitle: <LogoHeader />,
    }),
  },
  PhotoUpload: {
    screen: PhotoUploadScreen,
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
      headerTitle: <LogoHeader />,
    }),
  },
})
