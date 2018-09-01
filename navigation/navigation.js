import React from "react";
import { TouchableOpacity } from "react-native";
import {
  createBottomTabNavigator,
  createStackNavigator,
  createDrawerNavigator
} from "react-navigation";
import Ionicons from "react-native-vector-icons/Ionicons";

import HomeScreenContent from "../screens/HomeScreen";
import ExploreScreen from "../screens/ExploreScreen";
import AddItemScreen from "../screens/AddItemScreen";
import NotificationScreen from "../screens/NotificationScreen";
import UserScreen from "../screens/UserScreen";
import ItemDetailScreen from "../screens/ItemDetailScreen";
import MyAccountScreen from "../screens/MyAccountScreen";
import MyOrderScreen from "../screens/MyOrderScreen";
import AboutScreen from "../screens/AboutScreen";
import HelpScreen from "../screens/HelpScreen";

import { HeaderTitle } from "../components/HeaderTitle";

const HomeScreenStackNavigator = createStackNavigator({
  HomeContent: {
    screen: HomeScreenContent,
  },
  ItemDetail: ItemDetailScreen
});

const HomeScreenDrawerNavigator = createDrawerNavigator({
  HomeStack: {
    screen: HomeScreenStackNavigator
  },
  Account: {
    screen: MyAccountScreen
  },
  Order: {
    screen: MyOrderScreen
  },
  About: {
    screen: AboutScreen
  },
  Help: {
    screen: HelpScreen
  }
});

const ExploreScreenDrawerNavigator = createDrawerNavigator({
  ExploreStack: {
    screen: ExploreScreen
  },
  Account: {
    screen: MyAccountScreen
  },
  Order: {
    screen: MyOrderScreen
  },
  About: {
    screen: AboutScreen
  },
  Help: {
    screen: HelpScreen
  }
});

const AddItemScreenDrawerNavigator = createDrawerNavigator({
  AddItemStack: {
    screen: AddItemScreen
  },
  Account: {
    screen: MyAccountScreen
  },
  Order: {
    screen: MyOrderScreen
  },
  About: {
    screen: AboutScreen
  },
  Help: {
    screen: HelpScreen
  }
});

const NotificationScreenDrawerNavigator = createDrawerNavigator({
  NotificationStack: {
    screen: NotificationScreen
  },
  Account: {
    screen: MyAccountScreen
  },
  Order: {
    screen: MyOrderScreen
  },
  About: {
    screen: AboutScreen
  },
  Help: {
    screen: HelpScreen
  }
});

const UserScreenDrawerNavigator = createDrawerNavigator({
  UserStack: {
    screen: UserScreen
  },
  Account: {
    screen: MyAccountScreen
  },
  Order: {
    screen: MyOrderScreen
  },
  About: {
    screen: AboutScreen
  },
  Help: {
    screen: HelpScreen
  }
});

export const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeScreenDrawerNavigator,
    Explore: ExploreScreenDrawerNavigator,
    Add: AddItemScreenDrawerNavigator,
    Notification: NotificationScreenDrawerNavigator,
    User: UserScreenDrawerNavigator
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Home") {
          iconName = `ios-home${focused ? "" : "-outline"}`;
        } else if (routeName === "Explore") {
          iconName = `ios-compass${focused ? "" : "-outline"}`;
        } else if (routeName === "Add") {
          iconName = `ios-add${focused ? "" : "-outline"}`;
        } else if (routeName === "Notification") {
          iconName = `ios-notifications${focused ? "" : "-outline"}`;
        } else if (routeName === "User") {
          iconName = `ios-person${focused ? "" : "-outline"}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: "black",
      showLabel: false
    }
  }
);
