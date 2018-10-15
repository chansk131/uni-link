import React from 'react'
import { View } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { HomeScreenStackNavigator } from './homeScreenStackNavigator'
import { SellingScreenStackNavigator } from './sellingScreenStackNavigator'
import { UserScreenStackNavigator } from './userScreenStackNavigator'

import AddItemScreen from '../screens/AddItemScreen'
import NotificationScreen from '../screens/Notification/NotificationScreen'
import { HamburgerHeader, LogoHeader } from '../components/header/HeaderIcons'
import { AddItemScreenStackNavigator } from './addItemScreenStackNavigator'

export const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeScreenStackNavigator,
    Selling: SellingScreenStackNavigator,
    Add: AddItemScreenStackNavigator,
    Notifications: NotificationScreen,
    User: {
      screen: UserScreenStackNavigator,
      navigationOptions: { tabBarLabel: 'My U-Links' },
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state
        let iconName
        if (routeName === 'Home') {
          iconName = `ios-home${focused ? '' : '-outline'}`
        } else if (routeName === 'Selling') {
          iconName = `ios-pricetag${focused ? '' : '-outline'}`
        } else if (routeName === 'Add') {
          iconName = `ios-add${focused ? '' : '-outline'}`
        } else if (routeName === 'Notifications') {
          iconName = `ios-notifications${focused ? '' : '-outline'}`
        } else if (routeName === 'User') {
          iconName = `ios-person${focused ? '' : '-outline'}`
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return (
          <View>
            <Ionicons name={iconName} size={25} color={tintColor} />
            {/* <View
              style={{
                position: "absolute",
                right: -10,
                top: -2,
                backgroundColor: "red",
                borderRadius: 7,
                minWidth: 13,
                height: 13,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={{ color: "white", fontSize: 9 }}>4</Text>
            </View> */}
          </View>
        )
      },
    }),
    tabBarOptions: {
      activeTintColor: 'black',
      style: {
        backgroundColor: 'white',
        borderTopWidth: 0,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: 'grey',
        shadowOpacity: 0.5,
        elevation: 5,
      },
    },
  }
)
