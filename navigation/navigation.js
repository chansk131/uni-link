import React from 'react'
import { Text, SafeAreaView, ScrollView, View } from 'react-native'
import { createDrawerNavigator, DrawerItems } from 'react-navigation'

import { MessagingStackNavigator } from './messagingStackNavigator'
import { TabNavigator } from './tabNavigator'

import MyOrderScreen from '../screens/User/MyOrderScreen'
import MyAccountScreen from '../screens/User/MyAccountScreen'
import AboutScreen from '../screens/AboutScreen'
import HelpScreen from '../screens/HelpScreen'
import {
  MessageHeader,
  LogoHeaderWithText
} from '../components/header/HeaderIcons'

const CustomDrawerComponent = props => (
  <SafeAreaView style={{ flex: 1 }}>
    <ScrollView style={{ flex: 1 }}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: 50,
          backgroundColor: 'black'
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
        drawerLabel: 'HOME'
      }
    },
    MyAccount: {
      screen: MyAccountScreen,
      navigationOptions: {
        drawerLabel: 'MY ACCOUNT'
      }
    },
    MyOrder: {
      screen: MyOrderScreen,
      navigationOptions: {
        drawerLabel: 'MY ORDER'
      }
    },
    Message: {
      screen: MessagingStackNavigator,
      navigationOptions: {
        drawerLabel: 'MESSAGES'
      }
    },
    About: {
      screen: AboutScreen,
      navigationOptions: {
        drawerLabel: 'ABOUT'
      }
    },
    Help: {
      screen: HelpScreen,
      navigationOptions: {
        drawerLabel: 'HELP / FAQ'
      }
    }
  },
  {
    contentComponent: CustomDrawerComponent,
    contentOptions: {
      labelStyle: { fontWeight: 'bold', fontSize: 15, textAlign: 'center' },
      itemStyle: {
        borderColor: '#707070',
        borderBottomWidth: 0.5,
        alignItems: 'center'
      }
    }
  }
)
