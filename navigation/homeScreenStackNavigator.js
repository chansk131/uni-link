import React from 'react'
import { createStackNavigator } from 'react-navigation'

import HomeScreenContent from '../screens/Home/HomeScreen'
import SearchScreen from '../screens/Home/SearchScreen'
import ExploreScreen from '../screens/Home/ExploreScreen'
import SellerScreen from '../screens/Seller/SellerScreen'
import ItemDetailScreen from '../screens/ItemDetailScreen'
import {
  HamburgerHeader,
  MessageHeader,
  LogoHeader
} from '../components/header/HeaderIcons'

export const HomeScreenStackNavigator = createStackNavigator({
  HomeContent: {
    screen: HomeScreenContent,
    headerLayoutPreset: 'left',
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: 'white',
        borderBottomWidth: 0,
        elevation: 3
      },
      headerLeft: <HamburgerHeader navigation={navigation} />,
      headerTitle: <LogoHeader />,
      headerRight: <MessageHeader navigation={navigation} />
    })
  },
  SearchScreen: {
    screen: SearchScreen,
    headerLayoutPreset: 'left',
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: 'white',
        borderBottomWidth: 0,
        elevation: 3
      },
      headerTitle: <LogoHeader />,
      headerRight: <MessageHeader navigation={navigation} />
    })
  },
  Categories: {
    screen: ExploreScreen,
    headerLayoutPreset: 'left',
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: 'white',
        borderBottomWidth: 0,
        elevation: 3
      },
      headerTitle: <LogoHeader />,
      headerRight: <MessageHeader navigation={navigation} />
    })
  },
  ItemDetail: ItemDetailScreen,
  Seller: {
    screen: SellerScreen,
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
      headerTitle: <LogoHeader />,
      headerRight: <MessageHeader navigation={navigation} />
    })
  }
})