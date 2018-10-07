import React from 'react'
import { createStackNavigator } from 'react-navigation'

import {
  MessageHeader,
  LogoHeaderWithText
} from '../components/header/HeaderIcons'
import LoginPanel from '../screens/Login/loginPanel'
import LoginForm from '../screens/Login/loginForm'
import SettingScreen from '../screens/Setting/SettingScreen'
import EditProfileScreen from '../screens/Setting/EditProfileScreen'
import InviteFriendsScreen from '../screens/User/InviteFriendsScreen'
import UserScreen from '../screens/User/UserScreen'
import WishListScreen from '../screens/User/WishListScreen'
import RegisterForm from '../screens/Login/registerForm'
import MyOrderScreen from '../screens/User/MyOrderScreen'
import HelpScreen from '../screens/HelpScreen'

export const UserScreenStackNavigator = createStackNavigator({
  UserContent: {
    screen: UserScreen,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  },
  WishList: { screen: WishListScreen },
  MyOrder: { screen: MyOrderScreen },
  InviteFriends: { screen: InviteFriendsScreen },
  /*Help: { screen: HelpScreen }, error when navigating from side bar to help/faq then back to home */
  Signin: {
    screen: LoginPanel,
    navigationOptions: {
      headerStyle: {
        backgroundColor: 'white',
        borderBottomWidth: 0,
        elevation: 0
      }
    }
  },
  LoginForm: {
    screen: LoginForm,
    navigationOptions: {
      headerStyle: {
        backgroundColor: 'white',
        borderBottomWidth: 0,
        elevation: 0
      }
    }
  },
  RegisterForm: {
    screen: RegisterForm,
    navigationOptions: {
      headerStyle: {
        backgroundColor: 'white',
        borderBottomWidth: 0,
        elevation: 0
      }
    }
  },
  Setting: {
    screen: SettingScreen,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: 'white',
        borderBottomWidth: 0,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: 'grey',
        shadowOpacity: 0.5,
        elevation: 3
      },
      // headerLeft: <HamburgerHeader navigation={navigation} />,
      headerTitle: <LogoHeaderWithText text={'Setting'} />,
      headerRight: <MessageHeader navigation={navigation} />
    })
  },
  EditProfile: {
    screen: EditProfileScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: 'white',
        borderBottomWidth: 0,
        elevation: 0
      }
    }
  }
})
