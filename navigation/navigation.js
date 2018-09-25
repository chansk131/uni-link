import React from 'react'
import {
  Text,
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native'
import { Badge } from 'react-native-elements'
import {
  createBottomTabNavigator,
  createStackNavigator,
  createDrawerNavigator,
  createSwitchNavigator,
  DrawerItems,
  BottomTabBar,
} from 'react-navigation'
import { Constants } from 'expo'
import Ionicons from 'react-native-vector-icons/Ionicons'

import HomeScreenContent from '../screens/Home/HomeScreen'
import SearchScreen from '../screens/Home/SearchScreen'

import LoginPanel from '../screens/Login/loginPanel'
import LoginForm from '../screens/Login/loginForm'
import RegisterForm from '../screens/Login/registerForm'

import ExploreScreen from '../screens/ExploreScreen'
import AddItemScreen from '../screens/AddItemScreen'
import NotificationScreen from '../screens/NotificationScreen'

import UserScreen from '../screens/User/UserScreen'
import WishListScreen from '../screens/User/WishListScreen'
import MyOrderScreen from '../screens/User/MyOrderScreen'
import InviteFriendsScreen from '../screens/User/InviteFriendsScreen'
import SellingScreen from '../screens/User/SellingScreen'
import MyAccountScreen from '../screens/User/MyAccountScreen'

import SettingScreen from '../screens/Setting/SettingScreen'
import EditProfileScreen from '../screens/Setting/EditProfileScreen'

import ItemDetailScreen from '../screens/ItemDetailScreen'
import SellerScreen from '../screens/SellerScreen'
import AboutScreen from '../screens/AboutScreen'
import HelpScreen from '../screens/HelpScreen'
import {
  HamburgerHeader,
  MessageHeader,
  LogoHeader,
  LogoHeaderWithText,
} from '../components/header/HeaderIcons'

const HomeScreenStackNavigator = createStackNavigator({
  HomeContent: {
    screen: HomeScreenContent,
    headerLayoutPreset: 'left',
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: 'white',
        borderBottomWidth: 0,
        elevation: 3,
      },
      headerLeft: <HamburgerHeader navigation={navigation} />,
      headerTitle: <LogoHeader />,
      headerRight: <MessageHeader navigation={navigation} />,
    }),
  },
  SearchScreen: {
    screen: SearchScreen,
    headerLayoutPreset: 'left',
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: 'white',
        borderBottomWidth: 0,
        elevation: 3,
      },
      headerTitle: <LogoHeader />,
      headerRight: <MessageHeader navigation={navigation} />,
    }),
  },
  Categories: {
    screen: ExploreScreen,
    headerLayoutPreset: 'left',
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: 'white',
        borderBottomWidth: 0,
        elevation: 3,
      },
      headerLeft: <HamburgerHeader navigation={navigation} />,
      headerTitle: <LogoHeader />,
      headerRight: <MessageHeader navigation={navigation} />,
    }),
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
        elevation: 3,
      },
      // headerLeft: <HamburgerHeader navigation={navigation} />,
      headerTitle: <LogoHeader />,
      headerRight: <MessageHeader navigation={navigation} />,
    }),
  },
})

const SellingScreenStackNavigator = createStackNavigator({
  SellingContent: {
    screen: SellingScreen,
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
      headerRight: <MessageHeader navigation={navigation} />,
    }),
  },
})

const UserScreenStackNavigator = createStackNavigator({
  UserContent: {
    screen: UserScreen,
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  },
  WishList: { screen: WishListScreen },
  MyOrder: { screen: MyOrderScreen },
  InviteFriends: { screen: InviteFriendsScreen },
  Help: { screen: HelpScreen },
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
})

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeScreenStackNavigator,
    Selling: SellingScreenStackNavigator,
    Add: AddItemScreen,
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
    About: {
      screen: AboutScreen,
      navigationOptions: {
        drawerLabel: 'ABOUT',
      },
    },
    Help: {
      screen: HelpScreen,
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
