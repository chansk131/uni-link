import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons'

import HomeScreenContent from '../screens/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import AddItemScreen from '../screens/AddItemScreen';
import NotificationScreen from '../screens/NotificationScreen';
import UserScreen from '../screens/UserScreen';
import ItemDetailScreen from '../screens/ItemDetailScreen';

const HomeScreenNavigator = createStackNavigator({
  "HomeContent" : HomeScreenContent,
  "ItemDetail" : ItemDetailScreen,
})

export const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeScreenNavigator,
    Explore: ExploreScreen,
    Add: AddItemScreen,
    Notification: NotificationScreen,
    User: UserScreen,
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-home${focused ? '' : '-outline'}`;
        } else if (routeName === 'Explore') {
          iconName = `ios-compass${focused ? '' : '-outline'}`;
        } else if (routeName === 'Add') {
          iconName = `ios-add${focused ? '' : '-outline'}`;
        } else if (routeName === 'Notification') {
          iconName = `ios-notifications${focused ? '' : '-outline'}`;
        } else if (routeName === 'User') {
          iconName = `ios-person${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'black',
      showLabel: false,
    },
  }  
)
