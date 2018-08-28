import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Card, Button, SearchBar } from 'react-native-elements';
import { Constants } from 'expo';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { HomeTitle } from '../components/HomeTitle'
import { PopularSearch } from '../components/PopularSearch'
import { RecentSearch } from '../components/RecentSearch'

export default class Home extends React.Component {

  static navigationOptions = {
    headerTitle: <SearchBar containerStyle={{ width: '100%', }} lightTheme placeholder='Type Here...' />,
    headerRight: <Ionicons name={'ios-mail'} size={25} color={'black'} />,
    headerRightContainerStyle: {marginRight: '1%'},
  }

  render() {
    return (
      <View style={{flex: 1, paddingTop: Constants.statusBarHeight, paddingLeft: '7%', paddingRight: '7%', paddingTop: 18, backgroundColor: 'white'}}>
        <HomeTitle />
        <PopularSearch />
        <RecentSearch />
      </View>
    );
  }
}