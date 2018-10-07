import React from 'react'
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { Card, Button, SearchBar } from 'react-native-elements'
import { Constants } from 'expo'
import Ionicons from 'react-native-vector-icons/Ionicons'

export const HamburgerHeader = ({ navigation }) => (
  <TouchableOpacity
    onPress={() => navigation.toggleDrawer()}
    style={{ marginLeft: 10 }}
  >
    <Ionicons name={'ios-menu'} size={25} color={'black'} />
  </TouchableOpacity>
)

export const MessageHeader = ({ navigation }) => (
  <TouchableOpacity
    onPress={() => navigation.navigate('Messaging')}
    style={{ marginRight: 10 }}
  >
    <Ionicons name={'ios-mail'} size={25} color={'black'} />
  </TouchableOpacity>
)

export const AddUserHeader = ({ navigation }) => (
  <TouchableOpacity
    onPress={() => navigation.navigate('AddUser')}
    style={{ marginRight: 10 }}
  >
    <Ionicons name={'md-add'} size={25} color={'black'} />
  </TouchableOpacity>
)

export const LogoHeader = () => (
  <View style={{ flex: 1, alignItems: 'flex-start' }}>
    <Image
      style={{ width: 36, height: 36 }}
      source={require('../../assets/images/LogoULinks-small.jpeg')}
    />
  </View>
)

export const LogoHeaderWithText = props => (
  <View style={{ flex: 1, flexDirection: 'row' }}>
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
      }}
    >
      <Image
        style={{ width: 36, height: 36 }}
        source={require('../../assets/images/LogoULinks-small.jpeg')}
      />
    </View>
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{props.text}</Text>
    </View>
    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-start' }} />
  </View>
)
