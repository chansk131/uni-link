import React from 'react';
import { Text, View } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons'

export default class ExplorScreen extends React.Component {
  
  static navigationOptions = {
    tabBarIcon: ({focused, tintColor}) => (
      <Ionicons name={`ios-compass${focused ? '' : '-outline'}`} size={25} color={tintColor} />
    ),
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Explore!</Text>
      </View>
    );
  }
}