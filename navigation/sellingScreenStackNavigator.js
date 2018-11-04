import React from 'react'
import { createStackNavigator } from 'react-navigation'

import SellingScreen from '../screens/Selling/SellingScreen'
import {
  HamburgerHeader,
  LogoHeader,
  MessageHeader,
} from '../components/header/HeaderIcons'
import SellingDetailScreen from '../screens/Selling/SoldDetailScreen'
import AddItemScreen from '../screens/AddItem/AddItemScreen'
import AddTitleScreen from '../screens/AddItem/AddTitleScreen'
import AddPriceScreen from '../screens/AddItem/AddPriceScreen'
import ConditionScreen from '../screens/AddItem/ConditionScreen'
import CategoryItemScreen from '../screens/AddItem/CategoryItemScreen'
import AddTypeScreen from '../screens/AddItem/AddTypeScreen'
import AddBrandScreen from '../screens/AddItem/AddBrandScreen'
import AddQualificationScreen from '../screens/AddItem/AddQualificationScreen'
import AddLocationScreen from '../screens/AddItem/AddLocationScreen'
import AboutItemScreen from '../screens/AddItem/AboutItemScreen'
import PhotoUploadScreen from '../screens/AddItem/PhotoUploadScreen'
import DescriptionScreen from '../screens/AddItem/DescriptionScreen'
import QualificationScreen from '../screens/AddItem/QualificationScreen'
import SoldDetailScreen from '../screens/Selling/SoldDetailScreen'
import UnsoldDetailScreen from '../screens/Selling/UnsoldDetailScreen'

export const SellingScreenStackNavigator = createStackNavigator({
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
  SoldDetail: {
    screen: SoldDetailScreen,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: 'white',
        borderBottomWidth: 0,
        elevation: 3,
      },
      // headerLeft: <HamburgerHeader navigation={navigation} />,
      headerTitle: <LogoHeader />,
      headerRight: <MessageHeader navigation={navigation} />,
    }),
  },
  UnsoldDetail: {
    screen: UnsoldDetailScreen,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: 'white',
        borderBottomWidth: 0,
        elevation: 3,
      },
      // headerLeft: <HamburgerHeader navigation={navigation} />,
      headerTitle: <LogoHeader />,
      headerRight: <MessageHeader navigation={navigation} />,
    }),
  },

  AddItem: {
    screen: AddItemScreen,
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
      headerTitle: <LogoHeader />,
    }),
  },
  AddTitle: {
    screen: AddTitleScreen,
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
      headerTitle: <LogoHeader />,
    }),
  },
  AddPrice: {
    screen: AddPriceScreen,
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
      headerTitle: <LogoHeader />,
    }),
  },
  Condition: {
    screen: ConditionScreen,
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
      headerTitle: <LogoHeader />,
    }),
  },
  CategoryItem: {
    screen: CategoryItemScreen,
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
      headerTitle: <LogoHeader />,
    }),
  },
  AddType: {
    screen: AddTypeScreen,
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
      headerTitle: <LogoHeader />,
    }),
  },
  AddBrand: {
    screen: AddBrandScreen,
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
      headerTitle: <LogoHeader />,
    }),
  },
  AddQualification: {
    screen: AddQualificationScreen,
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
      headerTitle: <LogoHeader />,
    }),
  },
  AddLocation: {
    screen: AddLocationScreen,
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
      headerTitle: <LogoHeader />,
    }),
  },
  AboutItem: {
    screen: AboutItemScreen,
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
      headerTitle: <LogoHeader />,
    }),
  },
  PhotoUpload: {
    screen: PhotoUploadScreen,
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
      headerTitle: <LogoHeader />,
    }),
  },
  DescriptionItem: {
    screen: DescriptionScreen,
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
      headerTitle: <LogoHeader />,
    }),
  },
  QualificationItem: {
    screen: QualificationScreen,
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
      headerTitle: <LogoHeader />,
    }),
  },
})
