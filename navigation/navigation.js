import React from 'react'
import { Text, SafeAreaView, ScrollView, View } from 'react-native'
import { createDrawerNavigator, DrawerItems } from 'react-navigation'

import { MessagingStackNavigator } from './messagingStackNavigator'
import { TabNavigator } from './tabNavigator'
import { HelpScreenStackNavigator } from './helpScreenStackNavigator'

import { MessageListScreen } from '../screens/'
import MyOrderScreen from '../screens/User/MyOrderScreen'
import MyAccountScreen from '../screens/User/MyAccountScreen'
import AboutScreen from '../screens/AboutScreen'
import {
  MessageHeader,
  AddUserHeader,
  LogoHeaderWithText,
} from '../components/header/HeaderIcons'

const CustomDrawerComponent = props => (
  <SafeAreaView style={{ flex: 1 }}>
    <ScrollView style={{ flex: 1 }}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: 50,
          backgroundColor: 'black',
        }}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white' }}>
          WELCOME BACK
        </Text>
      </View>
      <DrawerItems {...props} />
    </ScrollView>
  </SafeAreaView>
)

export const DrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: TabNavigator,
      navigationOptions: {
        drawerLabel: 'HOME',
      },
    },
    MyAccount: {
      screen: MyAccountScreen,
      navigationOptions: {
        drawerLabel: 'MY ACCOUNT',
      },
    },
    MyOrder: {
      screen: MyOrderScreen,
      navigationOptions: {
        drawerLabel: 'MY ORDER',
      },
    },
    Messaging: {
      screen: MessageListScreen,
      headerLayoutPreset: 'left',
      navigationOptions: ({ navigation }) => ({
        drawerLabel: 'MESSAGES',
        headerStyle: {
          backgroundColor: 'white',
          borderBottomWidth: 0,
          elevation: 3,
        },
        // headerLeft: <HamburgerHeader navigation={navigation} />,
        headerTitle: <LogoHeaderWithText text="Messenger" />,
        headerRight: <AddUserHeader navigation={navigation} />,
      }),
    },
    About: {
      screen: AboutScreen,
      navigationOptions: {
        drawerLabel: 'ABOUT',
      },
    },
    Help: {
      screen: HelpScreenStackNavigator,
      navigationOptions: {
        drawerLabel: 'HELP / FAQ',
      },
    },
  },
  {
    contentComponent: CustomDrawerComponent,
    contentOptions: {
      labelStyle: { fontWeight: 'bold', fontSize: 15, textAlign: 'center' },
      itemStyle: {
        borderColor: '#707070',
        borderBottomWidth: 0.5,
        alignItems: 'center',
      },
    },
  }
)
