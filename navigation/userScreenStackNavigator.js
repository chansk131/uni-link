import React from 'react'
import { Text } from 'react-native'
import { createStackNavigator } from 'react-navigation'

import {
  MessageHeader,
  AddUserHeader,
  LogoHeaderWithText,
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

import { MessageListScreen, AddUserScreen, ChatScreen } from '../screens'
import { HelpScreenStackNavigator } from './helpScreenStackNavigator'
import NotificationSettingScreen from '../screens/User/NotificationSettingScreen'
import MyRequestedOrderScreen from '../screens/User/MyRequestedOrderScreen'
import MyAcceptedOrderScreen from '../screens/User/MyAcceptedOrderScreen'
import MyPurchasedOrderScreen from '../screens/User/MyPurchasedScreen'
import FeedbackScreen from '../screens/User/FeedbackScreen'

export const UserScreenStackNavigator = createStackNavigator({
  UserContent: {
    screen: UserScreen,
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  },
  WishList: { screen: WishListScreen },
  MyOrder: {
    screen: MyOrderScreen,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: 'white',
        borderBottomWidth: 0,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: 'grey',
        shadowOpacity: 0.5,
        elevation: 3,
      },
      // headerLeft: <HamburgerHeader navigation={navigation} />,
      headerTitle: <LogoHeaderWithText text={'My Order'} />,
      headerRight: <MessageHeader navigation={navigation} />,
    }),
  },
  MyRequested: {
    screen: MyRequestedOrderScreen,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: 'white',
        borderBottomWidth: 0,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: 'grey',
        shadowOpacity: 0.5,
        elevation: 3,
      },
      // headerLeft: <HamburgerHeader navigation={navigation} />,
      headerTitle: <LogoHeaderWithText text={'My Order'} />,
      headerRight: <MessageHeader navigation={navigation} />,
    }),
  },
  MyAccepted: {
    screen: MyAcceptedOrderScreen,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: 'white',
        borderBottomWidth: 0,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: 'grey',
        shadowOpacity: 0.5,
        elevation: 3,
      },
      // headerLeft: <HamburgerHeader navigation={navigation} />,
      headerTitle: <LogoHeaderWithText text={'My Order'} />,
      headerRight: <MessageHeader navigation={navigation} />,
    }),
  },
  MyPurchased: {
    screen: MyPurchasedOrderScreen,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: 'white',
        borderBottomWidth: 0,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: 'grey',
        shadowOpacity: 0.5,
        elevation: 3,
      },
      // headerLeft: <HamburgerHeader navigation={navigation} />,
      headerTitle: <LogoHeaderWithText text={'My Purchased Items'} />,
      headerRight: <MessageHeader navigation={navigation} />,
    }),
  },
  Feedback: {
    screen: FeedbackScreen,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: 'white',
        borderBottomWidth: 0,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: 'grey',
        shadowOpacity: 0.5,
        elevation: 3,
      },
      // headerLeft: <HamburgerHeader navigation={navigation} />,
      headerTitle: <LogoHeaderWithText text={'My Purchased Items'} />,
    }),
  },
  InviteFriends: { screen: InviteFriendsScreen },
  Signin: {
    screen: LoginPanel,
    navigationOptions: {
      headerStyle: {
        backgroundColor: 'white',
        borderBottomWidth: 0,
        elevation: 0,
      },
    },
  },
  LoginForm: {
    screen: LoginForm,
    navigationOptions: {
      headerStyle: {
        backgroundColor: 'white',
        borderBottomWidth: 0,
        elevation: 0,
      },
    },
  },
  RegisterForm: {
    screen: RegisterForm,
    navigationOptions: {
      headerStyle: {
        backgroundColor: 'white',
        borderBottomWidth: 0,
        elevation: 0,
      },
    },
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
        elevation: 3,
      },
      // headerLeft: <HamburgerHeader navigation={navigation} />,
      headerTitle: <LogoHeaderWithText text={'Setting'} />,
      headerRight: <MessageHeader navigation={navigation} />,
    }),
  },
  NotificationSetting: {
    screen: NotificationSettingScreen,
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
      headerTitle: <LogoHeaderWithText text={'Notifications'} />,
      headerRight: <MessageHeader navigation={navigation} />,
    }),
  },
  EditProfile: {
    screen: EditProfileScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: 'white',
        borderBottomWidth: 0,
        elevation: 0,
      },
    },
  },
  Help: {
    screen: HelpScreenStackNavigator,
    // headerLayoutPreset: 'left',
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: 'white',
        borderBottomWidth: 0,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: 'grey',
        shadowOpacity: 0.5,
        elevation: 3,
      },
      // headerLeft: <HamburgerHeader navigation={navigation} />,
      headerTitle: <LogoHeaderWithText text={'Help'} />,
      headerRight: <MessageHeader navigation={navigation} />,
    }),
  },
  Messaging: {
    screen: MessageListScreen,
    headerLayoutPreset: 'left',
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: 'white',
        borderBottomWidth: 0,
        elevation: 3,
      },
      headerTitle: <LogoHeaderWithText text="Messenger" />,
      headerRight: <AddUserHeader navigation={navigation} />,
    }),
  },
  AddUser: {
    screen: AddUserScreen,
    headerLayoutPreset: 'left',
    navigationOptions: {
      headerStyle: {
        backgroundColor: 'white',
        borderBottomWidth: 0,
        elevation: 3,
      },
      headerTitle: <LogoHeaderWithText text="Search for contact" />,
      headerRight: (
        <Text
          style={{
            paddingRight: 20,
            fontWeight: 'bold',
            fontSize: 15,
          }}
        >
          Okay
        </Text>
      ),
    },
  },
  Chat: {
    screen: ChatScreen,
    headerLayoutPreset: 'left',
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: 'white',
        borderBottomWidth: 0,
        elevation: 3,
      },
      headerTitle: <LogoHeaderWithText text="Chat" />,
      headerRight: <AddUserHeader navigation={navigation} />,
    }),
  },
})
