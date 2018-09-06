import React from "react";
import {
  Text,
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity
} from "react-native";
import {
  createBottomTabNavigator,
  createStackNavigator,
  createDrawerNavigator,
  createSwitchNavigator,
  DrawerItems,
  BottomTabBar
} from "react-navigation";
import { Constants } from "expo";
import Ionicons from "react-native-vector-icons/Ionicons";

import LoginScreen from "../screens/LoginScreen";
import HomeScreenContent from "../screens/HomeScreen";
import ExploreScreen from "../screens/ExploreScreen";
import SellingScreen from "../screens/SellingScreen";
import AddItemScreen from "../screens/AddItemScreen";
import NotificationScreen from "../screens/NotificationScreen";
import UserScreen from "../screens/UserScreen";
import ItemDetailScreen from "../screens/ItemDetailScreen";
import MyAccountScreen from "../screens/MyAccountScreen";
import MyOrderScreen from "../screens/MyOrderScreen";
import AboutScreen from "../screens/AboutScreen";
import WishListScreen from "../screens/WishListScreen";
import RecentlyViewedScreen from "../screens/RecentlyViewedScreen";
import HelpScreen from "../screens/HelpScreen";
import SellerScreen from "../screens/SellerScreen";
import { HeaderTitle } from "../components/HeaderTitle";
import { HeaderProfile } from "../components/HeaderProfile";

const HomeScreenStackNavigator = createStackNavigator({
  HomeContent: {
    screen: HomeScreenContent,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        height: 100,
        backgroundColor: "white",
        borderBottomWidth: 0,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: "grey",
        shadowOpacity: 0.5
      },
      headerTitle: <HeaderTitle navigation={navigation} />,
      headerRightContainerStyle: { marginRight: "1%" }
    })
  },
  Categories: ExploreScreen,
  ItemDetail: ItemDetailScreen,
  Seller: {
    screen: SellerScreen,
    navigationOptions: {}
  }
});

const SellingScreenStackNavigator = createStackNavigator({
  SellingContent: {
    screen: SellingScreen,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "white",
        borderBottomWidth: 0,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: "grey",
        shadowOpacity: 0.5
      },
      headerTitle: <HeaderProfile navigation={navigation} />,
      headerRightContainerStyle: { marginRight: "1%" }
    })
  }
});

const UserScreenStackNavigator = createStackNavigator({
  UserContent: {
    screen: UserScreen,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  },
  WishList: { screen: WishListScreen },
  MyOrder: { screen: MyOrderScreen },
  RecentlyViewed: { screen: RecentlyViewedScreen },
  Help: { screen: HelpScreen }
});

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeScreenStackNavigator,
    Selling: SellingScreenStackNavigator,
    Add: AddItemScreen,
    Notifications: NotificationScreen,
    User: {
      screen: UserScreenStackNavigator,
      navigationOptions: { tabBarLabel: "My U-Links" }
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Home") {
          iconName = `ios-home${focused ? "" : "-outline"}`;
        } else if (routeName === "Selling") {
          iconName = `ios-pricetag${focused ? "" : "-outline"}`;
        } else if (routeName === "Add") {
          iconName = `ios-add${focused ? "" : "-outline"}`;
        } else if (routeName === "Notifications") {
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
      style: {
        backgroundColor: "white",
        borderTopWidth: 0,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: "grey",
        shadowOpacity: 0.5,
        elevation: 5
      }
    }
  }
);

const CustomDrawerComponent = props => (
  <SafeAreaView style={{ flex: 1 }}>
    <ScrollView>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: 50,
          backgroundColor: "black",
          paddingTop: Constants.statusBarHeight
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 20, color: "white" }}>
          WELCOME BACK
        </Text>
      </View>
      <DrawerItems {...props} />
    </ScrollView>
  </SafeAreaView>
);

const DrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: TabNavigator,
      navigationOptions: {
        drawerLabel: "HOME"
      }
    },
    MyAccount: {
      screen: MyAccountScreen,
      navigationOptions: {
        drawerLabel: "MY ACCOUNT"
      }
    },
    MyOrder: {
      screen: MyOrderScreen,
      navigationOptions: {
        drawerLabel: "MY ORDER"
      }
    },
    About: {
      screen: AboutScreen,
      navigationOptions: {
        drawerLabel: "ABOUT"
      }
    },
    Help: {
      screen: HelpScreen,
      navigationOptions: {
        drawerLabel: "HELP / FAQ"
      }
    }
  },
  {
    contentComponent: CustomDrawerComponent,
    contentOptions: {
      labelStyle: { fontWeight: "bold", fontSize: 15, textAlign: "center" },
      itemStyle: {
        borderColor: "#707070",
        borderBottomWidth: 0.5,
        alignItems: "center"
      }
    }
  }
);

export const SwitchNavigator = createSwitchNavigator({
  Login: LoginScreen,
  Home: DrawerNavigator
});
